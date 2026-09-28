import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import { evaluateOtpAttempt, generateOtpCode, hashOtpCode, OTP_TTL_MINUTES } from '../_shared/otp-logic.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? '';
const emailFrom = Deno.env.get('EMAIL_FROM') ?? 'Steel Elite <noreply@steelelite.it>';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function sendOtpEmail(toEmail: string, code: string) {
  if (!resendApiKey) {
    // Nessuna chiave email configurata (es. ambiente locale senza Resend):
    // logghiamo soltanto, non blocchiamo il flusso di sviluppo.
    console.warn('contract-otp: RESEND_API_KEY not set, skipping email send');
    return;
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: emailFrom,
      to: [toEmail],
      subject: 'Il tuo codice di conferma Steel Elite',
      text: `Il tuo codice di conferma è: ${code}\n\nScade tra ${OTP_TTL_MINUTES} minuti. Non condividerlo con nessuno.`,
    }),
  });
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
    data: { user },
    error: userError,
  } = await userClient.auth.getUser();

  if (userError || !user || !user.email) {
    return jsonResponse({ error: 'Invalid session' }, 401);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);
  const body = await req.json().catch(() => ({}));
  const action = body.action as 'request' | 'verify' | undefined;

  if (action === 'request') {
    const code = generateOtpCode();
    const codeHash = await hashOtpCode(code, user.id);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60_000).toISOString();

    // Ripartenza pulita: invalida eventuali OTP non ancora usati per questo member.
    await admin.from('contract_otps').delete().eq('member_id', user.id).is('used_at', null);

    const { error: insertError } = await admin.from('contract_otps').insert({
      member_id: user.id,
      code_hash: codeHash,
      expires_at: expiresAt,
      attempts: 0,
    });

    if (insertError) {
      console.error('contract-otp: insert error', insertError.message);
      return jsonResponse({ error: 'Internal error' }, 500);
    }

    await sendOtpEmail(user.email, code);

    return jsonResponse({ sent: true });
  }

  if (action === 'verify') {
    const providedCode = (body.code as string | undefined)?.trim();
    if (!providedCode) {
      return jsonResponse({ error: 'code is required' }, 400);
    }

    const { data: record, error: fetchError } = await admin
      .from('contract_otps')
      .select('id, code_hash, expires_at, attempts, used_at')
      .eq('member_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError || !record) {
      return jsonResponse({ verified: false, error: 'not_found' });
    }

    const providedHash = await hashOtpCode(providedCode, user.id);
    const result = evaluateOtpAttempt(record, providedHash, new Date());

    switch (result.outcome) {
      case 'valid':
        await admin.from('contract_otps').update({ used_at: new Date().toISOString() }).eq('id', record.id);
        return jsonResponse({ verified: true });

      case 'invalid':
        await admin.from('contract_otps').update({ attempts: record.attempts + 1 }).eq('id', record.id);
        return jsonResponse({ verified: false, attemptsRemaining: result.attemptsRemaining });

      case 'blocked':
        await admin
          .from('contract_otps')
          .update({ attempts: Math.max(record.attempts + 1, 5) })
          .eq('id', record.id);
        return jsonResponse({ verified: false, blocked: true });

      case 'expired':
        return jsonResponse({ verified: false, expired: true });

      case 'already_used':
        return jsonResponse({ verified: false, alreadyUsed: true });
    }
  }

  return jsonResponse({ error: 'Unknown action' }, 400);
});
