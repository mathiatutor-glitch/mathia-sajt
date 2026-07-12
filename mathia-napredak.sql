-- =====================================================================
--  MATHIA — mathia_napredak  (napredak po predmetu: prsteni + statistika)
--  Pokreni JEDNOM u Supabase → SQL Editor → New query → Run.
--  Server (api/chat.js, service ključ) upisuje pri svakom pitanju na klonu;
--  nalog.html čita (RLS: svako vidi samo svoje).
-- =====================================================================

create table if not exists public.mathia_napredak (
  user_id        uuid not null references auth.users(id) on delete cascade,
  predmet        text not null,                 -- mode/subject key (npr. "fax-analiza1")
  minuta_ukupno  integer default 0,             -- ukupno minuta učenja
  pitanja        integer default 0,             -- broj pitanja
  serija         integer default 0,             -- niz dana zaredom
  procenat       integer default 0,             -- 0–100 za prsten napretka
  poslednja_tema text,                           -- "nastavi gde si stao"
  obaveze        jsonb default '[]'::jsonb,      -- [{naziv, g:true/false}] (opciono, ručno)
  provere        jsonb default '[]'::jsonb,      -- [{naziv, skor, datum}] (rezultati provera)
  azurirano      timestamptz default now(),
  primary key (user_id, predmet)
);
create index if not exists idx_napredak_user on public.mathia_napredak(user_id);

-- Sigurnost (RLS): svako vidi/menja SAMO svoje redove.
-- (Server koristi service ključ i zaobilazi RLS pri upisu.)
alter table public.mathia_napredak enable row level security;
drop policy if exists own_napredak on public.mathia_napredak;
create policy own_napredak on public.mathia_napredak
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
