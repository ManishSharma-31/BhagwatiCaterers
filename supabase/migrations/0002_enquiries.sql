-- Bhagwati Caterers: website enquiries (run ONCE in the Supabase SQL Editor, after 0001_init.sql).
-- What it does, in simple English:
--  * The public quote form on the website can ADD an enquiry here (insert only).
--  * Nobody who is not logged in can READ, change or delete enquiries.
--  * Only people in allowed_users (the owner) can read them and mark them as imported.
-- The admin portal copies new enquiries into Leads when you are signed in.

create table if not exists public.enquiries (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text        not null check (char_length(name) between 1 and 120),
  phone       text        not null check (phone ~ '^[6-9][0-9]{9}$'),
  event_type  text        check (event_type is null or char_length(event_type) <= 40),
  event_date  date,
  guests      integer     not null check (guests >= 1),
  town        text        check (town is null or char_length(town) <= 40),
  order_type  text        check (order_type is null or char_length(order_type) <= 40),
  cuisines    text        check (cuisines is null or char_length(cuisines) <= 200),
  dishes      text        check (dishes is null or char_length(dishes) <= 6000),
  notes       text        check (notes is null or char_length(notes) <= 1500),
  lang        text        check (lang is null or lang in ('mr','en','hi')),
  imported_at timestamptz
);

alter table public.enquiries enable row level security;
revoke all on public.enquiries from anon, authenticated;
grant insert on public.enquiries to anon;
grant select, update on public.enquiries to authenticated;

drop policy if exists enquiries_public_insert on public.enquiries;
drop policy if exists enquiries_owner_select on public.enquiries;
drop policy if exists enquiries_owner_update on public.enquiries;
-- Visitors may only add a row that is not already marked as imported.
create policy enquiries_public_insert on public.enquiries for insert to anon, authenticated with check (imported_at is null);
create policy enquiries_owner_select on public.enquiries for select to authenticated using (public.is_allowed());
create policy enquiries_owner_update on public.enquiries for update to authenticated using (public.is_allowed()) with check (public.is_allowed());
-- (No delete policy on purpose.)
