-- Bhagwati Caterers dashboard: database setup (run ONCE in the Supabase SQL Editor).
-- Safe to read. Each step says what it does in simple English.
-- There is NO service-role key and NO delete permission anywhere: records are only "soft deleted" (hidden).

-- STEP 1. One table for everything (leads, quotes, events, payments ...).
-- 'entity' is the kind of record, e.g. 'leads'. 'data' holds the whole record as JSON.
-- 'id' is text (not uuid) because the app also has one fixed id: 'main' for Settings.
create table if not exists public.records (
  entity     text        not null check (entity in ('leads','quotes','events','tasks','staff','payments','menu','settings')),
  id         text        not null,
  data       jsonb       not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted    boolean     not null default false,   -- true = hidden ("deleted") but still in the database
  primary key (entity, id)
);

-- STEP 2. An index so reading the newest records is fast.
create index if not exists records_entity_updated_idx on public.records (entity, updated_at);

-- STEP 3. The list of people who may use the data. Only people in this list get access.
create table if not exists public.allowed_users (
  user_id uuid primary key references auth.users (id) on delete cascade
);

-- STEP 4. Turn row-level security ON for both tables.
-- With it ON and no matching rule, nobody can read or write anything.
alter table public.records       enable row level security;
alter table public.allowed_users enable row level security;

-- STEP 5. Take away all access from visitors who are not logged in ('anon'),
-- then give logged-in users only the few things they need. No delete for anyone.
revoke all on public.records       from anon, authenticated;
revoke all on public.allowed_users from anon, authenticated;
grant select, insert, update on public.records       to authenticated;
grant select                 on public.allowed_users to authenticated;

-- STEP 6. A small helper: "is the logged-in user in allowed_users?"
-- It runs with extra rights so it can look at allowed_users, but it only answers yes or no.
create or replace function public.is_allowed()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (select 1 from public.allowed_users where user_id = (select auth.uid()));
$$;
revoke all on function public.is_allowed() from public, anon;
grant execute on function public.is_allowed() to authenticated;

-- STEP 7. The rules (policies). Anyone can sign up on Supabase by default,
-- but a stranger who signs up is NOT in allowed_users, so these rules keep them out.
drop policy if exists records_select on public.records;
drop policy if exists records_insert on public.records;
drop policy if exists records_update on public.records;
create policy records_select on public.records for select to authenticated using (public.is_allowed());
create policy records_insert on public.records for insert to authenticated with check (public.is_allowed());
create policy records_update on public.records for update to authenticated using (public.is_allowed()) with check (public.is_allowed());
-- (No delete policy on purpose. Deleting is only hiding: deleted = true.)

-- A logged-in user may see ONLY their own row in allowed_users. This lets the app tell
-- "you are not allowed yet" apart from "no data yet". Nobody can add rows from the app.
drop policy if exists allowed_users_self on public.allowed_users;
create policy allowed_users_self on public.allowed_users for select to authenticated using (user_id = (select auth.uid()));

-- STEP 8. Automatic timestamps and "newer wins".
-- If the app sends an older copy of a record than the one stored, the old copy is ignored.
create or replace function public.records_before_write()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.created_at := coalesce(new.created_at, now());
    new.updated_at := coalesce(new.updated_at, now());
    return new;
  end if;
  new.created_at := old.created_at;                    -- creation time never changes
  new.updated_at := coalesce(new.updated_at, now());
  if new.updated_at < old.updated_at then
    return null;                                       -- stale copy: skip it
  end if;
  return new;
end;
$$;
drop trigger if exists records_before_write on public.records;
create trigger records_before_write before insert or update on public.records
  for each row execute function public.records_before_write();

-- STEP 9 (do this by hand, after you create your user in Authentication > Users).
-- Replace the email with YOUR login email and run this one line:
--
--   insert into public.allowed_users (user_id) select id from auth.users where email = 'your-email@example.com';
--
-- Then in the Supabase dashboard turn OFF "Allow new users to sign up" (see docs/supabase-setup.md).
