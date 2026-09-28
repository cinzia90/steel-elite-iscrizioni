-- ============================================================
-- Steel Elite — Supporto pagamenti (Fase 2)
-- Quota di iscrizione configurabile + tabella di idempotenza
-- per il webhook Stripe (una riga per ogni evento processato).
-- ============================================================

alter table public.settings
  add column registration_fee_cents integer not null default 3000;

create table public.stripe_webhook_events (
  id text primary key, -- Stripe event id (evt_...)
  type text not null,
  processed_at timestamptz not null default now()
);

alter table public.stripe_webhook_events enable row level security;
-- Intentionally no policies: reachable only via the service role in the
-- stripe-webhook Edge Function.

-- Traccia se un member ha già una sottoscrizione (di qualunque stato):
-- serve a create-checkout-session per applicare la quota di iscrizione
-- una tantum solo al primo acquisto.
create index subscriptions_member_id_created_at_idx
  on public.subscriptions (member_id, created_at);
