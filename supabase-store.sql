create table if not exists public.store_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.store_state enable row level security;

grant usage on schema public to service_role;
grant select, insert, update, delete on table public.store_state to service_role;
notify pgrst, 'reload schema';
