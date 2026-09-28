import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { corsHeaders } from '../_shared/cors.ts';
import { buildCheckoutPlan, type PlanForBilling } from '../_shared/subscription-logic.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    // Client con il token dell'utente: serve solo per identificarlo in modo
    // sicuro (RLS resta comunque attiva su ogni altra query fatta con esso).
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid session' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { planId } = await req.json();
    if (!planId) {
      return new Response(JSON.stringify({ error: 'planId is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Da qui in poi usiamo la service role: dobbiamo leggere/scrivere righe
    // che l'utente stesso non può toccare direttamente (piani, propria
    // sottoscrizione in stato pending, impostazioni).
    const admin = createClient(supabaseUrl, serviceRoleKey);

    const { data: plan, error: planError } = await admin
      .from('plans')
      .select('id, name, price_cents, duration_days, session_count, is_recurring, active')
      .eq('id', planId)
      .single();

    if (planError || !plan || !plan.active) {
      return new Response(JSON.stringify({ error: 'Plan not found or inactive' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: settings } = await admin
      .from('settings')
      .select('registration_fee_cents')
      .single();

    const { count: existingSubscriptionsCount } = await admin
      .from('subscriptions')
      .select('id', { count: 'exact', head: true })
      .eq('member_id', user.id);

    const chargeRegistrationFee = (existingSubscriptionsCount ?? 0) === 0;

    const { data: subscription, error: subscriptionError } = await admin
      .from('subscriptions')
      .insert({ member_id: user.id, plan_id: plan.id, status: 'pending' })
      .select('id')
      .single();

    if (subscriptionError || !subscription) {
      return new Response(JSON.stringify({ error: 'Could not create subscription' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const planForBilling: PlanForBilling = {
      id: plan.id,
      name: plan.name,
      price_cents: plan.price_cents,
      duration_days: plan.duration_days,
      session_count: plan.session_count,
      is_recurring: plan.is_recurring,
    };

    const checkoutPlan = buildCheckoutPlan(
      planForBilling,
      settings?.registration_fee_cents ?? 3000,
      chargeRegistrationFee,
    );

    const appUrl = Deno.env.get('APP_URL') ?? 'http://localhost:4200';

    const session = await stripe.checkout.sessions.create({
      mode: checkoutPlan.mode,
      line_items: checkoutPlan.lineItems,
      client_reference_id: user.id,
      metadata: { subscription_id: subscription.id },
      success_url: `${appUrl}/iscriviti/conferma?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/iscriviti/conferma?cancelled=1`,
    });

    await admin
      .from('subscriptions')
      .update({ stripe_checkout_session_id: session.id })
      .eq('id', subscription.id);

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('create-checkout-session error', error instanceof Error ? error.message : error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
