-- Provisioning status model for marketplace_intakes
-- Apply in Supabase SQL Editor (safe to run multiple times).

alter table public.marketplace_intakes
  add column if not exists provisioning_status text,
  add column if not exists idempotency_key text,
  add column if not exists last_error text,
  add column if not exists attempts integer not null default 0,
  add column if not exists started_at timestamptz,
  add column if not exists finished_at timestamptz;

update public.marketplace_intakes
set provisioning_status = coalesce(provisioning_status, 'queued')
where provisioning_status is null;

alter table public.marketplace_intakes
  alter column provisioning_status set default 'queued',
  alter column provisioning_status set not null;

alter table public.marketplace_intakes
  drop constraint if exists marketplace_intakes_provisioning_status_check;

alter table public.marketplace_intakes
  add constraint marketplace_intakes_provisioning_status_check
  check (provisioning_status in ('queued', 'provisioning', 'deployed', 'failed', 'retrying'));

create unique index if not exists marketplace_intakes_idempotency_key_uidx
  on public.marketplace_intakes (idempotency_key)
  where idempotency_key is not null;

create index if not exists marketplace_intakes_provisioning_status_idx
  on public.marketplace_intakes (provisioning_status);

create index if not exists marketplace_intakes_started_at_idx
  on public.marketplace_intakes (started_at desc);

create index if not exists marketplace_intakes_finished_at_idx
  on public.marketplace_intakes (finished_at desc);
