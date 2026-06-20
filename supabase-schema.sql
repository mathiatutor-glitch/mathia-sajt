-- =====================================================================
--  MATHIA — Supabase šema (nalozi, pretplate, izbor predmeta, napredak)
--  Pokreni ovo u Supabase → SQL Editor → New query → Run.
--  Posle ovoga, u nalog.html upiši SUPABASE_URL i SUPABASE_ANON_KEY.
-- =====================================================================

-- 1) PROFILI (proširuje auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  ime         text,
  email       text,
  created_at  timestamptz default now()
);

-- 2) PRETPLATE  (paket → koliko predmeta sme da izabere)
--    Za sada se postavlja ručno/test; KASNIJE je postavlja eFiskalizacija (webhook)
--    kada uplata prođe. Šifre se poklapaju sa eFiskalizacijom:
--    MATHIA-BASIC = 1 predmet, MATHIA-GOLD = 2, MATHIA-DIAMOND = 3.
create table if not exists public.subscriptions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade,  -- popuni se kad se korisnik uloguje
  email         text,            -- veza po email-u (uplata stiže pre login-a)
  paket         text not null check (paket in ('basic','gold','diamond')),
  sifra         text,            -- MATHIA-BASIC / MATHIA-GOLD / MATHIA-DIAMOND
  max_predmeta  int  not null,   -- 1 / 2 / 3
  status        text not null default 'active' check (status in ('active','inactive','expired')),
  pfr           text,            -- fiskalni broj računa (PFR), upisuje server
  started_at    timestamptz default now(),
  expires_at    timestamptz
);
create index if not exists idx_subs_user  on public.subscriptions(user_id, status);
create index if not exists idx_subs_email on public.subscriptions(email, status);
create unique index if not exists uniq_subs_email on public.subscriptions(email) where email is not null;

-- 3) IZABRANI PREDMETI  (ograničeno brojem max_predmeta iz pretplate)
create table if not exists public.selected_subjects (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  subject_key   text not null,
  subject_name  text not null,
  created_at    timestamptz default now(),
  unique (user_id, subject_key)
);

-- 4) NAPREDAK  (svaki kviz/lekcija/zadatak/minut učenja = jedan red)
create table if not exists public.progress_events (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  subject_key   text not null,
  kind          text not null check (kind in ('lesson','quiz','task','minutes')),
  label         text,
  score         numeric,        -- za kvizove: 0–100
  minutes       int,            -- za 'minutes': minuti učenja
  created_at    timestamptz default now()
);
create index if not exists idx_prog_user on public.progress_events(user_id, subject_key, created_at);

-- =====================================================================
--  SIGURNOST (Row Level Security) — svako vidi/menja SAMO svoje podatke
-- =====================================================================
alter table public.profiles         enable row level security;
alter table public.subscriptions    enable row level security;
alter table public.selected_subjects enable row level security;
alter table public.progress_events   enable row level security;

drop policy if exists "own_profile"        on public.profiles;
drop policy if exists "own_subs"            on public.subscriptions;
drop policy if exists "own_subjects"        on public.selected_subjects;
drop policy if exists "own_progress"        on public.progress_events;

create policy "own_profile"  on public.profiles
  for all using (auth.uid() = id)      with check (auth.uid() = id);
create policy "own_subs"     on public.subscriptions
  for all using (auth.uid() = user_id or email = (auth.jwt()->>'email'))
       with check (auth.uid() = user_id or email = (auth.jwt()->>'email'));
create policy "own_subjects" on public.selected_subjects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own_progress" on public.progress_events
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =====================================================================
--  Automatsko kreiranje profila pri registraciji
-- =====================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, ime)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'ime',''))
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================================
--  KASNIJE (kada se poveže eFiskalizacija):
--  uplata prođe → webhook (server, service_role) upiše red u subscriptions
--  sa paketom i max_predmeta prema kupljenoj šifri. Front se ne menja.
-- =====================================================================
