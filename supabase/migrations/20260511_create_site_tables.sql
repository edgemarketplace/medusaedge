-- Create site_pages table
create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  site_id text not null,
  slug text not null default 'home',
  puck_data jsonb not null,
  normalized_manifest jsonb,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(site_id, slug)
);

-- Create deployments table
create table if not exists public.deployments (
  id uuid primary key default gen_random_uuid(),
  site_id text not null,
  page_id uuid references public.site_pages(id) on delete cascade,
  status text not null default 'draft',
  domain text,
  subdomain text,
  checkout_mode text,
  last_published_at timestamptz,
  deployment_metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create indexes
create index if not exists site_pages_site_id_idx on public.site_pages(site_id);
create index if not exists deployments_site_id_idx on public.deployments(site_id);
create index if not exists deployments_status_idx on public.deployments(status);

-- Enable RLS (Row Level Security) but allow service role full access
alter table public.site_pages enable row level security;
alter table public.deployments enable row level security;

-- Create policies for service role (bypasses RLS)
create policy "Service role can do anything" on public.site_pages
  for all using (auth.role() = 'service_role');

create policy "Service role can do anything" on public.deployments
  for all using (auth.role() = 'service_role');
