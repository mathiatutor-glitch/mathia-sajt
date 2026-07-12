-- =====================================================================
--  MATHIA — mathia_planer  (lični planer: cilj + raspored učenja)
--  Pokreni JEDNOM u Supabase → SQL Editor → New query → Run.
--  Jedan red po korisniku (user_id je primarni ključ).
-- =====================================================================

create table if not exists public.mathia_planer (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  cilj_naziv    text,                          -- npr. "Prijemni FTN"
  cilj_datum    date,                          -- rok (odbrojavanje)
  cilj_predmeti jsonb default '[]'::jsonb,      -- ["fax-analiza1","prijemni-matematika"]
  stavke        jsonb default '[]'::jsonb,      -- [{dan:"2026-07-14",predmet:"analiza1",tema:"Tejlor",min:40,gotovo:false}]
  navike        jsonb default '[]'::jsonb,      -- opciono: [{naziv:"Vežbanje",dani:[1,3,5]}]
  updated_at    timestamptz default now()
);

-- Sigurnost (RLS): svako vidi/menja SAMO svoj red
alter table public.mathia_planer enable row level security;
drop policy if exists own_planer on public.mathia_planer;
create policy own_planer on public.mathia_planer
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Automatsko osvežavanje updated_at pri izmeni
create or replace function public.touch_planer()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists trg_touch_planer on public.mathia_planer;
create trigger trg_touch_planer before update on public.mathia_planer
  for each row execute function public.touch_planer();
