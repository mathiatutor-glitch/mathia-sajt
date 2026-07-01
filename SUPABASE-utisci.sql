-- ============================================================
--  MATHIA — tabela za utiske (recenzije)
--  Nalepi CEO ovaj tekst u Supabase → SQL Editor → RUN
-- ============================================================

create table if not exists public.mathia_utisci (
  id         uuid primary key default gen_random_uuid(),
  ime        text    not null   check (char_length(ime) between 2 and 40),
  razred     text               check (char_length(coalesce(razred,'')) <= 40),
  tekst      text    not null   check (char_length(tekst) between 10 and 600),
  zvezdice   int     not null default 5 check (zvezdice between 1 and 5),
  saglasnost boolean not null default false,
  odobreno   boolean not null default false,   -- ti prebacuješ na TRUE kad odobriš
  kreirano   timestamptz not null default now()
);

-- Uključi Row Level Security (bez ovoga niko ne bi mogao da piše/čita bezbedno)
alter table public.mathia_utisci enable row level security;

-- 1) Javnost (anon) SME da POŠALJE utisak — ali samo neodobren i uz saglasnost.
--    (Ne može niko sam sebe da "odobri" ni da preskoči saglasnost.)
drop policy if exists "anon_insert_utisci" on public.mathia_utisci;
create policy "anon_insert_utisci" on public.mathia_utisci
  for insert to anon
  with check (odobreno = false and saglasnost = true);

-- 2) Javnost (anon) SME da ČITA samo ODOBRENE utiske (to su oni na sajtu).
drop policy if exists "anon_read_odobreni" on public.mathia_utisci;
create policy "anon_read_odobreni" on public.mathia_utisci
  for select to anon
  using (odobreno = true);

-- ============================================================
--  KAKO SE ODOBRAVA UTISAK (bez koda):
--  Supabase → Table Editor → mathia_utisci → nađi red →
--  polje "odobreno" prebaci u TRUE → Save.
--  Čim sačuvaš, utisak se pojavi na naslovnoj strani.
--
--  Da vidiš najnovije prve: klikni na kolonu "kreirano" → Sort desc.
-- ============================================================
