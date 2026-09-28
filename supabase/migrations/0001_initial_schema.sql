-- ============================================================
-- Steel Elite — Initial schema
-- Roles, profiles, plans, subscriptions, contracts, certificates,
-- access logs, settings, storage buckets, RLS policies.
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
-- ROLES
-- ============================================================
create type public.user_role as enum ('member', 'staff', 'admin');

-- ============================================================
-- PROFILES
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'member',
  first_name text,
  last_name text,
  fiscal_code text,
  birth_date date,
  phone text,
  address text,
  photo_path text,
  created_at timestamptz not null default now()
);

-- Security-definer helper to read the caller's role without RLS recursion.
create or replace function public.current_role()
returns public.user_role
language sql
security definer
stable
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

-- Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, first_name, last_name)
  values (
    new.id,
    'member',
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

create policy "member can read own profile"
  on public.profiles for select
  using (id = auth.uid());

create policy "member can update own profile"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = 'member'); -- members cannot self-promote

create policy "staff can read member profiles"
  on public.profiles for select
  using (public.current_role() in ('staff', 'admin') and role = 'member');

create policy "admin full access on profiles"
  on public.profiles for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

-- ============================================================
-- PLANS
-- ============================================================
create table public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text not null check (category in ('open', 'pt_privato', 'pt_small_group')),
  price_cents integer not null check (price_cents >= 0),
  duration_days integer, -- nullable: pacchetti a consumo non hanno una durata fissa
  session_count integer, -- nullable: valorizzato solo per pacchetti a lezioni (es. "10 lezioni")
  is_recurring boolean not null default false,
  stripe_price_id text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint duration_or_sessions check (duration_days is not null or session_count is not null)
);

alter table public.plans enable row level security;

create policy "anyone can read active plans"
  on public.plans for select
  using (active = true);

create policy "admin full access on plans"
  on public.plans for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

-- ============================================================
-- SUBSCRIPTIONS
-- Writes happen only via Edge Functions with the service role key
-- (Stripe webhook, admin overrides). No direct insert/update policy
-- for members: prevents self-granting an active subscription.
-- ============================================================
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  plan_id uuid not null references public.plans (id),
  status text not null default 'pending' check (status in ('pending', 'active', 'expired', 'cancelled')),
  start_date date,
  end_date date,
  sessions_remaining integer, -- per piani a consumo (pacchetti lezioni)
  stripe_checkout_session_id text,
  stripe_subscription_id text,
  created_at timestamptz not null default now()
);

create index subscriptions_member_id_idx on public.subscriptions (member_id);

alter table public.subscriptions enable row level security;

create policy "member can read own subscriptions"
  on public.subscriptions for select
  using (member_id = auth.uid());

create policy "admin full access on subscriptions"
  on public.subscriptions for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

-- ============================================================
-- CONTRACTS
-- ============================================================
create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  subscription_id uuid references public.subscriptions (id),
  template_version text not null,
  pdf_path text,
  pdf_sha256 text,
  otp_verified_at timestamptz,
  accepted_at timestamptz,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.contracts enable row level security;

create policy "member can read own contracts"
  on public.contracts for select
  using (member_id = auth.uid());

create policy "admin full access on contracts"
  on public.contracts for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

-- ============================================================
-- CONTRACT OTPS
-- No client-side policies: verified exclusively server-side
-- (Edge Function contract-otp) with the service role key.
-- ============================================================
create table public.contract_otps (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  code_hash text not null,
  expires_at timestamptz not null,
  attempts integer not null default 0,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.contract_otps enable row level security;
-- Intentionally no policies: table is only reachable via service role.

-- ============================================================
-- MEDICAL CERTIFICATES
-- Staff must see only the status, never the file: they get access
-- via the staff_certificate_status view below, not this table.
-- ============================================================
create table public.medical_certificates (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.profiles (id) on delete cascade,
  file_path text not null,
  expiry_date date not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references public.profiles (id),
  reviewed_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create index medical_certificates_member_id_idx on public.medical_certificates (member_id);

alter table public.medical_certificates enable row level security;

create policy "member can read own certificates"
  on public.medical_certificates for select
  using (member_id = auth.uid());

create policy "member can insert own certificate"
  on public.medical_certificates for insert
  with check (member_id = auth.uid());

create policy "admin full access on certificates"
  on public.medical_certificates for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

-- Safe view for staff: status only, never the file path.
create view public.staff_certificate_status
with (security_invoker = true)
as
  select member_id, status, expiry_date
  from public.medical_certificates;

grant select on public.staff_certificate_status to authenticated;

-- ============================================================
-- ACCESS LOGS
-- Inserted only by the verify-checkin Edge Function (service role).
-- ============================================================
create table public.access_logs (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.profiles (id) on delete set null,
  staff_id uuid references public.profiles (id) on delete set null,
  scanned_at timestamptz not null default now(),
  result text not null check (result in ('granted', 'denied')),
  reason text,
  token_jti uuid unique
);

create index access_logs_member_id_idx on public.access_logs (member_id);
create index access_logs_scanned_at_idx on public.access_logs (scanned_at);

alter table public.access_logs enable row level security;

create policy "member can read own access logs"
  on public.access_logs for select
  using (member_id = auth.uid());

create policy "staff and admin can read all access logs"
  on public.access_logs for select
  using (public.current_role() in ('staff', 'admin'));

create policy "admin full access on access logs"
  on public.access_logs for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

-- ============================================================
-- SETTINGS (single row)
-- ============================================================
create table public.settings (
  id boolean primary key default true, -- enforces a single row via check below
  gym_name text not null default 'Steel Elite',
  anti_passback_minutes integer not null default 120,
  require_approved_certificate boolean not null default true,
  whatsapp_support text,
  constraint settings_singleton check (id)
);

alter table public.settings enable row level security;

create policy "anyone authenticated can read settings"
  on public.settings for select
  using (auth.role() = 'authenticated');

create policy "admin can update settings"
  on public.settings for update
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

insert into public.settings (id, gym_name) values (true, 'Steel Elite');

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
insert into storage.buckets (id, name, public)
values
  ('photos', 'photos', false),
  ('certificates', 'certificates', false),
  ('contracts', 'contracts', false)
on conflict (id) do nothing;

-- photos: member can manage their own folder (<uid>/...), staff/admin can read all.
create policy "member manage own photos"
  on storage.objects for all
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "staff and admin read all photos"
  on storage.objects for select
  using (bucket_id = 'photos' and public.current_role() in ('staff', 'admin'));

-- certificates: member can upload/read their own, only admin can read everything else.
create policy "member manage own certificate files"
  on storage.objects for all
  using (bucket_id = 'certificates' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'certificates' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "admin read all certificate files"
  on storage.objects for select
  using (bucket_id = 'certificates' and public.current_role() = 'admin');

-- contracts: member can read their own signed PDF, admin can read everything.
create policy "member read own contract files"
  on storage.objects for select
  using (bucket_id = 'contracts' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "admin read all contract files"
  on storage.objects for select
  using (bucket_id = 'contracts' and public.current_role() = 'admin');
