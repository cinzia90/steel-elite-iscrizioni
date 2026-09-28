import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { verify as verifyJwt } from 'https://deno.land/x/djwt@v3.0.2/mod.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { isSubscriptionEligibleForAccess } from '../_shared/access-token-logic.ts';
import { evaluateCheckin, isCertificateValidForCheckin, type CheckinDenyReason } from '../_shared/checkin-logic.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const jwtSecret = Deno.env.get('ACCESS_TOKEN_JWT_SECRET') ?? '';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function importVerifyKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

interface AccessPayload {
  sub: string;
  jti: string;
  exp: number;
}

// deno-lint-ignore no-explicit-any
async function buildMemberSnapshot(admin: any, memberId: string) {
  const { data: profile } = await admin
    .from('profiles')
    .select('first_name, last_name, photo_path, created_at')
    .eq('id', memberId)
    .single();

  let photoUrl: string | null = null;
  if (profile?.photo_path) {
    const { data: signed } = await admin.storage.from('photos').createSignedUrl(profile.photo_path, 60);
    photoUrl = signed?.signedUrl ?? null;
  }

  const { data: subscription } = await admin
    .from('subscriptions')
    .select('status, end_date, sessions_remaining, plans ( name )')
    .eq('member_id', memberId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: certificate } = await admin
    .from('medical_certificates')
    .select('status, expiry_date')
    .eq('member_id', memberId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const plan = subscription?.plans as unknown as { name: string } | null;

  return {
    memberName: `${profile?.first_name ?? ''} ${profile?.last_name ?? ''}`.trim(),
    photoUrl,
    planName: plan?.name ?? null,
    endDate: subscription?.end_date ?? null,
    certificateStatus: certificate?.status ?? 'missing',
    memberCreatedAt: profile?.created_at ? new Date(profile.created_at) : new Date(0),
    subscription,
    certificate,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return jsonResponse({ error: 'Missing Authorization header' }, 401);
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const {
    data: { user: staffUser },
    error: staffError,
  } = await userClient.auth.getUser();

  if (staffError || !staffUser) {
    return jsonResponse({ error: 'Invalid session' }, 401);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);

  const { data: staffProfile } = await admin.from('profiles').select('role').eq('id', staffUser.id).single();
  if (!staffProfile || !['staff', 'admin'].includes(staffProfile.role)) {
    return jsonResponse({ error: 'Forbidden' }, 403);
  }

  const body = await req.json().catch(() => ({}));
  const mode = (body.mode as 'qr' | 'manual' | undefined) ?? 'qr';
  const now = new Date();

  const { data: settings } = await admin
    .from('settings')
    .select('anti_passback_minutes, require_approved_certificate, certificate_grace_days')
    .single();
  const antiPassbackMinutes = settings?.anti_passback_minutes ?? 120;
  const requireApprovedCertificate = settings?.require_approved_certificate ?? true;
  const certificateGraceDays = settings?.certificate_grace_days ?? 10;

  if (mode === 'manual') {
    const memberId = body.memberId as string | undefined;
    if (!memberId) {
      return jsonResponse({ error: 'memberId is required' }, 400);
    }

    const snapshot = await buildMemberSnapshot(admin, memberId);

    await admin.from('access_logs').insert({
      member_id: memberId,
      staff_id: staffUser.id,
      result: 'granted',
      reason: 'manual',
      token_jti: null,
    });

    return jsonResponse({
      result: 'granted',
      memberName: snapshot.memberName,
      photoUrl: snapshot.photoUrl,
      planName: snapshot.planName,
      endDate: snapshot.endDate,
      certificateStatus: snapshot.certificateStatus,
    });
  }

  const token = body.token as string | undefined;
  if (!token) {
    return jsonResponse({ error: 'token is required' }, 400);
  }

  const key = await importVerifyKey(jwtSecret);

  let payload: AccessPayload | null = null;
  try {
    payload = (await verifyJwt(token, key)) as unknown as AccessPayload;
  } catch {
    payload = null;
  }

  if (!payload?.sub || !payload.jti) {
    await admin.from('access_logs').insert({
      member_id: null,
      staff_id: staffUser.id,
      result: 'denied',
      reason: 'invalid_token',
      token_jti: null,
    });
    return jsonResponse({ result: 'denied', reason: 'invalid_token' });
  }

  const notExpired = Math.floor(now.getTime() / 1000) < payload.exp;

  const { data: existingLog } = await admin
    .from('access_logs')
    .select('id')
    .eq('token_jti', payload.jti)
    .maybeSingle();
  const jtiAlreadyUsed = !!existingLog;

  const snapshot = await buildMemberSnapshot(admin, payload.sub);

  const subscriptionActive = isSubscriptionEligibleForAccess(snapshot.subscription, now);
  const certificateOk = isCertificateValidForCheckin(
    snapshot.certificate,
    requireApprovedCertificate,
    now,
    snapshot.memberCreatedAt,
    certificateGraceDays,
  );

  const { data: lastGranted } = await admin
    .from('access_logs')
    .select('scanned_at')
    .eq('member_id', payload.sub)
    .eq('result', 'granted')
    .order('scanned_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const decision = evaluateCheckin({
    tokenValid: notExpired,
    jtiAlreadyUsed,
    subscriptionActive,
    certificateOk,
    lastGrantedAt: lastGranted?.scanned_at ?? null,
    antiPassbackMinutes,
    now,
  });

  const reason: CheckinDenyReason | undefined = decision.result === 'denied' ? decision.reason : undefined;

  await admin.from('access_logs').insert({
    member_id: payload.sub,
    staff_id: staffUser.id,
    result: decision.result,
    reason: reason ?? null,
    // Solo il primo utilizzo di un jti viene registrato con il suo valore:
    // un secondo tentativo con lo stesso jti (token_reused) non può
    // riusare la stessa chiave unique, quindi viene loggato con jti nullo.
    token_jti: jtiAlreadyUsed ? null : payload.jti,
  });

  return jsonResponse({
    result: decision.result,
    reason,
    memberName: snapshot.memberName,
    photoUrl: snapshot.photoUrl,
    planName: snapshot.planName,
    endDate: snapshot.endDate,
    certificateStatus: snapshot.certificateStatus,
  });
});
