-- Edge Marketplace Hub Task 4 runtime schema
-- Purpose: make Builder v3 publish -> Supabase -> /site/[subdomain] work.
-- Safe to run in Supabase SQL Editor. Designed for the existing production
-- marketplace_intakes table whose id is UUID/text-compatible, not BIGSERIAL.

create extension if not exists pgcrypto;

create table if not exists public.marketplace_intakes (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  owner_email text not null,
  subdomain text not null,
  template_id text not null default 'template-clothing-marketplace',
  brand_color text not null default '#2563eb',
  tagline text not null default '',
  products_text text not null default '',
  plan_type text not null default 'launch',
  status text not null default 'preview',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Existing production intakes may already exist with a smaller column set.
-- Add only the columns the current app/provisioning flow expects.
alter table if exists public.marketplace_intakes
  add column if not exists provisioning_status text not null default 'queued',
  add column if not exists idempotency_key text,
  add column if not exists attempts integer not null default 0,
  add column if not exists last_error text,
  add column if not exists started_at timestamptz,
  add column if not exists finished_at timestamptz,
  add column if not exists stripe_session_id text,
  add column if not exists payment_status text not null default 'pending',
  add column if not exists raw_payload jsonb not null default '{}'::jsonb,
  add column if not exists preview_url text,
  add column if not exists production_url text,
  add column if not exists updated_at timestamptz not null default now();

create unique index if not exists marketplace_intakes_idempotency_key_uidx
  on public.marketplace_intakes (idempotency_key)
  where idempotency_key is not null;

create index if not exists marketplace_intakes_subdomain_idx
  on public.marketplace_intakes (subdomain);

create index if not exists marketplace_intakes_provisioning_status_idx
  on public.marketplace_intakes (provisioning_status);

-- Published Puck storefronts. Keep intake_id as text because the app can produce
-- UUID Supabase ids or in-memory fallback ids like tenant_xxxxx.
create table if not exists public.marketplace_sites (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  intake_id text,
  subdomain text not null unique,
  full_url text generated always as ('https://' || subdomain || '.edgemarketplacehub.com') stored,
  business_name text,
  meta_description text,
  puck_data jsonb not null default '{"root":{"props":{}},"content":[],"zones":{}}'::jsonb,
  theme_name text not null default 'luxury-fashion',
  template_id text,
  status text not null default 'active' check (status in ('draft', 'active', 'suspended', 'archived')),
  published_content jsonb not null default '{}'::jsonb,
  custom_domain text unique,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists marketplace_sites_subdomain_idx
  on public.marketplace_sites (subdomain);

create index if not exists marketplace_sites_intake_id_idx
  on public.marketplace_sites (intake_id);

create index if not exists marketplace_sites_status_idx
  on public.marketplace_sites (status);

create table if not exists public.marketplace_inventory (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  site_id uuid references public.marketplace_sites(id) on delete cascade,
  title text not null,
  description text,
  price numeric(10,2) not null default 0,
  compare_at_price numeric(10,2),
  medusa_product_id text,
  images text[] not null default '{}',
  sku text,
  inventory_quantity integer not null default 0,
  allow_backorder boolean not null default false,
  status text not null default 'active' check (status in ('active', 'draft', 'archived')),
  metadata jsonb not null default '{}'::jsonb
);

create unique index if not exists marketplace_inventory_site_sku_uidx
  on public.marketplace_inventory (site_id, sku)
  where sku is not null;

create index if not exists marketplace_inventory_site_id_idx
  on public.marketplace_inventory (site_id);

create table if not exists public.marketplace_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  site_id uuid references public.marketplace_sites(id) on delete set null,
  stripe_session_id text unique,
  stripe_payment_intent_id text unique,
  stripe_customer_id text,
  total_amount numeric(10,2) not null default 0,
  currency text not null default 'USD',
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  customer_email text,
  customer_name text,
  shipping_address jsonb,
  items jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists marketplace_orders_site_id_idx
  on public.marketplace_orders (site_id);

create table if not exists public.marketplace_subscriptions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  site_id uuid references public.marketplace_sites(id) on delete cascade,
  stripe_subscription_id text unique,
  stripe_customer_id text,
  plan_name text not null default 'starter',
  billing_cycle text not null default 'monthly' check (billing_cycle in ('monthly', 'annual')),
  status text not null default 'active' check (status in ('active', 'past_due', 'canceled', 'unpaid')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists marketplace_subscriptions_site_id_idx
  on public.marketplace_subscriptions (site_id);

create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_marketplace_sites_updated_at on public.marketplace_sites;
create trigger update_marketplace_sites_updated_at
  before update on public.marketplace_sites
  for each row execute function public.update_updated_at_column();

drop trigger if exists update_marketplace_inventory_updated_at on public.marketplace_inventory;
create trigger update_marketplace_inventory_updated_at
  before update on public.marketplace_inventory
  for each row execute function public.update_updated_at_column();

drop trigger if exists update_marketplace_orders_updated_at on public.marketplace_orders;
create trigger update_marketplace_orders_updated_at
  before update on public.marketplace_orders
  for each row execute function public.update_updated_at_column();

drop trigger if exists update_marketplace_subscriptions_updated_at on public.marketplace_subscriptions;
create trigger update_marketplace_subscriptions_updated_at
  before update on public.marketplace_subscriptions
  for each row execute function public.update_updated_at_column();

alter table public.marketplace_sites enable row level security;
alter table public.marketplace_inventory enable row level security;
alter table public.marketplace_orders enable row level security;
alter table public.marketplace_subscriptions enable row level security;

-- Recreate policies idempotently; PostgreSQL does not support CREATE POLICY IF NOT EXISTS.
drop policy if exists marketplace_sites_public_active_read on public.marketplace_sites;
create policy marketplace_sites_public_active_read
  on public.marketplace_sites
  for select
  using (status = 'active');

drop policy if exists marketplace_inventory_public_active_read on public.marketplace_inventory;
create policy marketplace_inventory_public_active_read
  on public.marketplace_inventory
  for select
  using (
    status = 'active'
    and site_id in (select id from public.marketplace_sites where status = 'active')
  );

-- Browser clients should not write runtime tables. Server routes use service_role.
grant select on public.marketplace_sites to anon, authenticated;
grant select on public.marketplace_inventory to anon, authenticated;

grant all on public.marketplace_sites to service_role;
grant all on public.marketplace_inventory to service_role;
grant all on public.marketplace_orders to service_role;
grant all on public.marketplace_subscriptions to service_role;

-- Ask PostgREST to refresh schema cache after new tables/columns.
notify pgrst, 'reload schema';

select 'Task 4 marketplace runtime schema applied' as result;
