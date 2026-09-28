import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { create as createJwt } from 'https://deno.land/x/djwt@v3.0.2/mod.ts';
import { corsHeaders } from '../_shared/cors.ts';
import {
  ACCESS_TOKEN_TTL_SECONDS,
  buildAccessTokenPayload,
  isSubscriptionEligibleForAccess,
} from '../_shared/access-token-logic.ts';

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

async function importSigningKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
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

  if (userError || !user) {
    return jsonResponse({ error: 'Invalid session' }, 401);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);

  const { data: subscription } = await admin
    .from('subscriptions')
    .select('status, end_date, sessions_remaining')
    .eq('member_id', user.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const now = new Date();

  if (!isSubscriptionEligibleForAccess(subscription, now)) {
    return jsonResponse({ error: 'not_eligible' }, 403);
  }

  const jti = crypto.randomUUID();
  const payload = buildAccessTokenPayload(user.id, jti, now);
  const key = await importSigningKey(jwtSecret);
  const token = await createJwt({ alg: 'HS256', typ: 'JWT' }, { ...payload }, key);

  return jsonResponse({ token, exp: payload.exp, ttlSeconds: ACCESS_TOKEN_TTL_SECONDS });
});
