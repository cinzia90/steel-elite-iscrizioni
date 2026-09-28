import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import {
  buildCheckoutPlan,
  computeSubscriptionPeriod,
  extendEndDate,
  recurringIntervalFromDurationDays,
  type PlanForBilling,
} from './subscription-logic.ts';

const openMensile: PlanForBilling = {
  id: 'p1',
  name: 'Palestra Open — Mensile',
  price_cents: 7000,
  duration_days: 30,
  session_count: null,
  is_recurring: true,
};

const openTrimestrale: PlanForBilling = {
  id: 'p2',
  name: 'Palestra Open — Trimestrale',
  price_cents: 19000,
  duration_days: 90,
  session_count: null,
  is_recurring: true,
};

const pacchetto10: PlanForBilling = {
  id: 'p3',
  name: 'PT Privato — Pacchetto 10 lezioni',
  price_cents: 25000,
  duration_days: null,
  session_count: 10,
  is_recurring: false,
};

Deno.test('recurringIntervalFromDurationDays maps whole months', () => {
  assertEquals(recurringIntervalFromDurationDays(30), { interval: 'month', interval_count: 1 });
  assertEquals(recurringIntervalFromDurationDays(90), { interval: 'month', interval_count: 3 });
  assertEquals(recurringIntervalFromDurationDays(180), { interval: 'month', interval_count: 6 });
});

Deno.test('recurringIntervalFromDurationDays falls back to days for non-month multiples', () => {
  assertEquals(recurringIntervalFromDurationDays(45), { interval: 'day', interval_count: 45 });
});

Deno.test('buildCheckoutPlan uses subscription mode with recurring price for recurring plans', () => {
  const plan = buildCheckoutPlan(openMensile, 3000, true);
  assertEquals(plan.mode, 'subscription');
  assertEquals(plan.lineItems.length, 2);
  assertEquals(plan.lineItems[0].price_data.recurring, { interval: 'month', interval_count: 1 });
  assertEquals(plan.lineItems[1].price_data.unit_amount, 3000);
});

Deno.test('buildCheckoutPlan omits registration fee when not due', () => {
  const plan = buildCheckoutPlan(openMensile, 3000, false);
  assertEquals(plan.lineItems.length, 1);
});

Deno.test('buildCheckoutPlan uses one-off payment mode for consumption packages', () => {
  const plan = buildCheckoutPlan(pacchetto10, 3000, false);
  assertEquals(plan.mode, 'payment');
  assertEquals(plan.lineItems[0].price_data.recurring, undefined);
});

Deno.test('computeSubscriptionPeriod sets end_date from duration_days', () => {
  const period = computeSubscriptionPeriod(openTrimestrale, new Date('2026-01-01T00:00:00Z'));
  assertEquals(period.start_date, '2026-01-01');
  assertEquals(period.end_date, '2026-04-01');
  assertEquals(period.sessions_remaining, null);
});

Deno.test('computeSubscriptionPeriod sets sessions_remaining and null end_date for pure consumption plans', () => {
  const period = computeSubscriptionPeriod(pacchetto10, new Date('2026-01-01T00:00:00Z'));
  assertEquals(period.end_date, null);
  assertEquals(period.sessions_remaining, 10);
});

Deno.test('extendEndDate extends from current end_date when still in the future', () => {
  const result = extendEndDate('2026-03-01', 30, new Date('2026-02-01T00:00:00Z'));
  assertEquals(result, '2026-03-31');
});

Deno.test('extendEndDate extends from now when subscription already expired', () => {
  const result = extendEndDate('2026-01-01', 30, new Date('2026-02-15T00:00:00Z'));
  assertEquals(result, '2026-03-17');
});
