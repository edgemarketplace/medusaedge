# Edge Marketplace Hub Supabase intake setup

Project REST URL:

```text
https://nzxedlagqtzadyrmgkhq.supabase.co/rest/v1
```

## 1. Create the intake table

Run this in Supabase SQL Editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.marketplace_intakes (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  owner_email text not null,
  subdomain text not null,
  template_id text not null default 'modern-commerce',
  brand_color text not null default '#2563eb',
  tagline text not null default '',
  products_text text not null default '',
  plan_type text not null default 'launch' check (plan_type in ('launch', 'pro')),
  status text not null default 'preview' check (status in ('draft', 'preview', 'live', 'intake_received', 'repo_created', 'config_generated', 'deployment_started', 'preview_live', 'domain_pending', 'failed')),
  stripe_session_id text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  template_repo text,
  generated_repo text,
  vercel_project_id text,
  preview_url text,
  production_domain text,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists marketplace_intakes_owner_email_idx
  on public.marketplace_intakes (owner_email);

create index if not exists marketplace_intakes_subdomain_idx
  on public.marketplace_intakes (subdomain);

create index if not exists marketplace_intakes_status_idx
  on public.marketplace_intakes (status);
```

## 2. Keep browser writes disabled

The Next.js API route writes to Supabase from the server. That means the app should use `SUPABASE_SERVICE_ROLE_KEY` in Vercel environment variables, not a browser-exposed key.

Recommended Supabase posture:

```sql
alter table public.marketplace_intakes enable row level security;
```

Do not add public insert/select policies unless you intentionally want browser clients to write or read this table directly.

## 3. Add Vercel environment variables

Set these in Vercel for the Edge Marketplace Hub project:

```text
NEXT_PUBLIC_SUPABASE_URL=https://nzxedlagqtzadyrmgkhq.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_mAG0Ncil8LY4Ls-LcBUCUw_k_br_aI6
SUPABASE_REST_URL=https://nzxedlagqtzadyrmgkhq.supabase.co/rest/v1
SUPABASE_INTAKES_TABLE=marketplace_intakes
SUPABASE_SERVICE_ROLE_KEY=<server-only Supabase service role key>
GITHUB_TOKEN=<server-only GitHub token with repo/template generation access>
GITHUB_OWNER=edgemarketplace
VERCEL_TOKEN=<server-only Vercel token>
EDGE_MARKETPLACE_BASE_DOMAIN=edgemarketplacehub.com
```

Optional only if you choose RLS-based inserts instead of service-role server inserts:

```text
SUPABASE_ANON_KEY=<public anon key>
```

Do not commit the service role key to GitHub.

## 4. App flow

Both routes now use the same onboarding handler:

```text
POST /api/tenants/onboarding
POST /api/intake
```

The handler:

1. validates `businessName` and `email`
2. derives a safe subdomain from `subdomain` or `businessName`
3. writes the intake/tenant to Supabase when env vars are configured
4. falls back to in-memory storage if Supabase is not configured or errors
5. returns the tenant ID, subdomain, preview URL, and dashboard URL

## 5. Domain automation

Provisioning now attaches the generated marketplace to a wildcard-backed Vercel domain after the Vercel project is created.

One-time DNS requirement in Cloudflare:

```dns
*.edgemarketplacehub.com CNAME cname.vercel-dns.com
```

Provisioning flow:

```text
GitHub template repo -> marketplace-* repo
-> Vercel project import
-> POST /v10/projects/{projectId}/domains
-> https://{subdomain}.edgemarketplacehub.com
```

The helper lives in:

```text
src/lib/provision/vercel.js
```

It calls:

```http
POST https://api.vercel.com/v10/projects/{projectId}/domains
```

with:

```json
{ "name": "customer.edgemarketplacehub.com" }
```

Run the guardrail test after editing provisioning/domain code:

```bash
npm run test:provision-domain
```

## 6. Quick verification curl

After env vars are set in a deployed environment:

```bash
curl -sS -X POST https://www.edgemarketplacehub.com/api/intake \
  -H 'content-type: application/json' \
  -d '{
    "businessName":"Wizard Test Shop",
    "email":"test@example.com",
    "template":"modern-commerce",
    "plan":"launch",
    "brandColor":"#2563eb",
    "products":"Sample products"
  }'
```

Expected JSON shape:

```json
{
  "success": true,
  "tenantId": "<uuid from Supabase when configured>",
  "subdomain": "wizardtestshop",
  "previewUrl": "https://wizardtestshop.edgemarketplacehub.com",
  "dashboardUrl": "/dashboard?..."
}
```

Then verify a new row exists in `public.marketplace_intakes`.
