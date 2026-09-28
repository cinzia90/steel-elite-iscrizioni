import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { computeSubscriptionPeriod, extendEndDate, type PlanForBilling } from '../_shared/subscription-logic.ts';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
});

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '';

const admin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature ?? '', webhookSecret);
  } catch (error) {
    console.error('stripe-webhook: invalid signature', error instanceof Error ? error.message : error);
    return new Response('Invalid signature', { status: 400 });
  }

  // Idempotenza: se l'evento è già stato registrato, Stripe l'ha già
  // consegnato con successo in precedenza. Rispondiamo 200 senza rielaborare.
  const { error: insertEventError } = await admin
    .from('stripe_webhook_events')
    .insert({ id: event.id, type: event.type });

  if (insertEventError) {
    // Violazione della unique key sull'id: evento già processato.
    if (insertEventError.code === '23505') {
      return new Response(JSON.stringify({ received: true, duplicate: true }), { status: 200 });
    }
    console.error('stripe-webhook: could not record event', insertEventError.message);
    return new Response('Internal error', { status: 500 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.metadata?.subscription_id;
        if (!subscriptionId) break;

        const { data: subscription } = await admin
          .from('subscriptions')
          .select('id, plan_id, plans ( id, name, price_cents, duration_days, session_count, is_recurring )')
          .eq('id', subscriptionId)
          .single();

        if (!subscription) break;

        const plan = subscription.plans as unknown as PlanForBilling;
        const period = computeSubscriptionPeriod(plan, new Date());

        await admin
          .from('subscriptions')
          .update({
            status: 'active',
            start_date: period.start_date,
            end_date: period.end_date,
            sessions_remaining: period.sessions_remaining,
            stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
          })
          .eq('id', subscriptionId);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const stripeSubscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : null;
        if (!stripeSubscriptionId) break;

        const { data: subscription } = await admin
          .from('subscriptions')
          .select('id, end_date, plans ( duration_days )')
          .eq('stripe_subscription_id', stripeSubscriptionId)
          .single();

        if (!subscription) break;

        const durationDays = (subscription.plans as unknown as { duration_days: number | null })?.duration_days;
        if (!durationDays) break;

        const newEndDate = extendEndDate(subscription.end_date, durationDays, new Date());

        await admin
          .from('subscriptions')
          .update({ status: 'active', end_date: newEndDate })
          .eq('id', subscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const stripeSubscription = event.data.object as Stripe.Subscription;

        await admin
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('stripe_subscription_id', stripeSubscription.id);
        break;
      }

      default:
        break;
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('stripe-webhook: handler error', error instanceof Error ? error.message : error);
    return new Response('Internal error', { status: 500 });
  }
});
