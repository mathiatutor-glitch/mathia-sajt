-- =====================================================================
--  MATHIA — bezbedna provera/dopuna baze
--  Pokreni u Supabase → SQL Editor → New query → Run.
--  Bezbedno je pokrenuti i ako je sve već namešteno — ništa se ne briše.
--  Radi i ako tabele postoje BEZ novijih kolona (dodaje ih).
-- =====================================================================

-- 1) NAPREDAK -------------------------------------------------------
create table if not exists public.mathia_napredak (
  user_id uuid not null references auth.users(id) on delete cascade,
  predmet text not null,
  primary key (user_id, predmet)
);

-- kolone se dodaju i ako tabela već postoji (ovo "create table if not exists" NE radi)
alter table public.mathia_napredak add column if not exists minuta_ukupno  integer default 0;
alter table public.mathia_napredak add column if not exists pitanja        integer default 0;
alter table public.mathia_napredak add column if not exists serija         integer default 0;
alter table public.mathia_napredak add column if not exists procenat       integer default 0;
alter table public.mathia_napredak add column if not exists poslednja_tema text;
alter table public.mathia_napredak add column if not exists obaveze        jsonb default '[]'::jsonb;
alter table public.mathia_napredak add column if not exists provere        jsonb default '[]'::jsonb;
alter table public.mathia_napredak add column if not exists azurirano      timestamptz default now();

create index if not exists idx_napredak_user on public.mathia_napredak(user_id);

alter table public.mathia_napredak enable row level security;
drop policy if exists own_napredak on public.mathia_napredak;
create policy own_napredak on public.mathia_napredak
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2) PLANER ---------------------------------------------------------
create table if not exists public.mathia_planer (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.mathia_planer add column if not exists cilj_naziv    text;
alter table public.mathia_planer add column if not exists cilj_datum    date;
alter table public.mathia_planer add column if not exists cilj_predmeti jsonb default '[]'::jsonb;
alter table public.mathia_planer add column if not exists stavke        jsonb default '[]'::jsonb;
alter table public.mathia_planer add column if not exists navike        jsonb default '[]'::jsonb;
alter table public.mathia_planer add column if not exists updated_at    timestamptz default now();

alter table public.mathia_planer enable row level security;
drop policy if exists own_planer on public.mathia_planer;
create policy own_planer on public.mathia_planer
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.touch_planer()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists trg_touch_planer on public.mathia_planer;
create trigger trg_touch_planer before update on public.mathia_planer
  for each row execute function public.touch_planer();

-- 3) IZVEŠTAJ — šta sad imaš -----------------------------------------
select 'mathia_napredak' as tabela,
       count(*) filter (where column_name = 'poslednja_tema') as ima_poslednja_tema,
       count(*) as ukupno_kolona
from information_schema.columns
where table_schema='public' and table_name='mathia_napredak'
union all
select 'mathia_planer',
       count(*) filter (where column_name = 'stavke'),
       count(*)
from information_schema.columns
where table_schema='public' and table_name='mathia_planer';
