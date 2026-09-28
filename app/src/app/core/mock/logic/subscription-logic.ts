// Copia per la modalità demo (browser) di supabase/functions/_shared/subscription-logic.ts.
// Stesso codice, zero dipendenze Deno: tenerla allineata manualmente
// all'originale se le regole di business cambiano.
//
// Pure billing/period logic shared by create-checkout-session and
// stripe-webhook, kept free of Stripe/Supabase SDK imports so it can be
// unit-tested in isolation.

export interface PlanForBilling {
  id: string;
  name: string;
  price_cents: number;
  duration_days: number | null;
  session_count: number | null;
  is_recurring: boolean;
}

export interface CheckoutLineItem {
  price_data: {
    currency: 'eur';
    unit_amount: number;
    product_data: { name: string };
    recurring?: { interval: 'day' | 'month'; interval_count: number };
  };
  quantity: number;
}

export interface CheckoutPlan {
  mode: 'payment' | 'subscription';
  lineItems: CheckoutLineItem[];
}

export const REGISTRATION_FEE_LABEL = 'Iscrizione e assicurazione annuale';

export function recurringIntervalFromDurationDays(
  days: number,
): { interval: 'day' | 'month'; interval_count: number } {
  if (days % 30 === 0) {
    return { interval: 'month', interval_count: days / 30 };
  }
  return { interval: 'day', interval_count: days };
}

export function buildCheckoutPlan(
  plan: PlanForBilling,
  registrationFeeCents: number,
  chargeRegistrationFee: boolean,
): CheckoutPlan {
  const isSubscription = plan.is_recurring && plan.duration_days !== null;

  const lineItems: CheckoutLineItem[] = [
    {
      price_data: {
        currency: 'eur',
        unit_amount: plan.price_cents,
        product_data: { name: plan.name },
        ...(isSubscription
          ? { recurring: recurringIntervalFromDurationDays(plan.duration_days as number) }
          : {}),
      },
      quantity: 1,
    },
  ];

  if (chargeRegistrationFee && registrationFeeCents > 0) {
    lineItems.push({
      price_data: {
        currency: 'eur',
        unit_amount: registrationFeeCents,
        product_data: { name: REGISTRATION_FEE_LABEL },
      },
      quantity: 1,
    });
  }

  return { mode: isSubscription ? 'subscription' : 'payment', lineItems };
}

export interface SubscriptionPeriod {
  start_date: string;
  end_date: string | null;
  sessions_remaining: number | null;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function computeSubscriptionPeriod(plan: PlanForBilling, startDate: Date): SubscriptionPeriod {
  let end_date: string | null = null;
  if (plan.duration_days !== null) {
    const end = new Date(startDate);
    end.setUTCDate(end.getUTCDate() + plan.duration_days);
    end_date = toIsoDate(end);
  }

  return {
    start_date: toIsoDate(startDate),
    end_date,
    sessions_remaining: plan.session_count,
  };
}

// Estende la scadenza di un abbonamento ricorrente al rinnovo (invoice.paid):
// riparte dalla scadenza attuale se ancora futura, altrimenti da adesso.
export function extendEndDate(currentEndDate: string | null, durationDays: number, now: Date): string {
  const base = currentEndDate && new Date(`${currentEndDate}T00:00:00Z`) > now ? new Date(`${currentEndDate}T00:00:00Z`) : new Date(now);
  base.setUTCDate(base.getUTCDate() + durationDays);
  return toIsoDate(base);
}
