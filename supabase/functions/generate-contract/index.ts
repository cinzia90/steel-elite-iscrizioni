import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { PDFDocument, StandardFonts, rgb } from 'https://esm.sh/pdf-lib@1.17.1';
import { corsHeaders } from '../_shared/cors.ts';
import { buildContractLines } from '../_shared/contract-text.ts';
import { OTP_TTL_MINUTES } from '../_shared/otp-logic.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const TEMPLATE_VERSION = 'v1-placeholder';

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', bytes as BufferSource);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
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

  const body = await req.json().catch(() => ({}));
  const planId = body.planId as string | undefined;
  const acceptedTerms = body.acceptedTerms === true;
  const acceptedRules = body.acceptedRules === true;
  const acceptedPrivacy = body.acceptedPrivacy === true;

  if (!planId || !acceptedTerms || !acceptedRules || !acceptedPrivacy) {
    return jsonResponse({ error: 'Missing planId or acceptance checkboxes' }, 400);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);

  // L'OTP va verificato di recente: non ci fidiamo di un flag mandato dal
  // client, controlliamo lo stato reale in contract_otps.
  const { data: otpRecord } = await admin
    .from('contract_otps')
    .select('used_at')
    .eq('member_id', user.id)
    .not('used_at', 'is', null)
    .order('used_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const otpRecentEnough =
    otpRecord?.used_at &&
    Date.now() - new Date(otpRecord.used_at).getTime() < OTP_TTL_MINUTES * 60_000;

  if (!otpRecentEnough) {
    return jsonResponse({ error: 'otp_not_verified' }, 403);
  }

  const { data: plan, error: planError } = await admin
    .from('plans')
    .select('name, price_cents')
    .eq('id', planId)
    .single();

  if (planError || !plan) {
    return jsonResponse({ error: 'Plan not found' }, 404);
  }

  const { data: profile } = await admin
    .from('profiles')
    .select('first_name, last_name, fiscal_code')
    .eq('id', user.id)
    .single();

  const acceptedAt = new Date();
  const acceptedAtLabel = acceptedAt.toLocaleString('it-IT', { timeZone: 'Europe/Rome' });
  const priceLabel = (plan.price_cents / 100).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

  const lines = buildContractLines(
    {
      firstName: profile?.first_name ?? '',
      lastName: profile?.last_name ?? '',
      fiscalCode: profile?.fiscal_code ?? '',
    },
    { name: plan.name, priceLabel },
    acceptedAtLabel,
  );

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 800;
  for (const line of lines) {
    page.drawText(line, { x: 50, y, size: 11, font, color: rgb(0, 0, 0) });
    y -= 20;
  }

  const pdfBytes = await pdfDoc.save();
  const pdfSha256 = await sha256Hex(pdfBytes);

  const pdfPath = `${user.id}/contratto-${Date.now()}.pdf`;
  const { error: uploadError } = await admin.storage
    .from('contracts')
    .upload(pdfPath, pdfBytes, { contentType: 'application/pdf', upsert: false });

  if (uploadError) {
    console.error('generate-contract: upload error', uploadError.message);
    return jsonResponse({ error: 'Internal error' }, 500);
  }

  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const userAgent = req.headers.get('user-agent') ?? 'unknown';

  const { data: contract, error: contractError } = await admin
    .from('contracts')
    .insert({
      member_id: user.id,
      // Il pagamento (Fase 2, create-checkout-session) avviene dopo la firma
      // del contratto: subscription_id viene collegato in un secondo
      // momento, quando la sottoscrizione viene effettivamente creata.
      subscription_id: null,
      template_version: TEMPLATE_VERSION,
      pdf_path: pdfPath,
      pdf_sha256: pdfSha256,
      otp_verified_at: otpRecord?.used_at,
      accepted_at: acceptedAt.toISOString(),
      ip,
      user_agent: userAgent,
    })
    .select('id')
    .single();

  if (contractError || !contract) {
    console.error('generate-contract: insert error', contractError?.message);
    return jsonResponse({ error: 'Internal error' }, 500);
  }

  return jsonResponse({ contractId: contract.id, pdfPath, pdfSha256 });
});
