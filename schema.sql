-- schema.sql — pokreni u Supabase SQL editoru
-- ───────────────────────────────────────────────────────────────────────────

-- Porudžbine (svaka kupovina, paket ili artikal)
create table if not exists porudzbine (
  id            uuid primary key default gen_random_uuid(),
  kupac_email   text not null,
  kupac_ime     text,
  iznos_rsd     integer not null,           -- u dinarima
  stavke        jsonb not null,             -- { detaljno:[...], predmeti:[...] }
  tip           text not null,              -- 'paket' | 'prodavnica'
  status        text not null default 'na_cekanju', -- na_cekanju | placeno | otkazano
  raiaccept_ref text,
  created_at    timestamptz default now()
);

-- Mesečne pretplate (bez automatskog obnavljanja)
create table if not exists pretplate (
  id                 uuid primary key default gen_random_uuid(),
  kupac_email        text not null,
  paket              text not null,         -- basic | gold | diamond
  predmeti           jsonb,                 -- izabrani predmeti
  pocinje            timestamptz not null default now(),
  istice             timestamptz not null,
  status             text not null default 'aktivna', -- aktivna | istekla
  obavesten_o_isteku boolean not null default false,
  created_at         timestamptz default now()
);
create index if not exists idx_pretplate_email on pretplate(kupac_email);
create index if not exists idx_pretplate_istice on pretplate(istice);

-- Fiskalni računi (dokaz o izdatom računu preko VPFR-a)
create table if not exists fiskalni_racuni (
  id            uuid primary key default gen_random_uuid(),
  porudzbina_id uuid references porudzbine(id),
  broj_racuna   text,
  qr            text,
  json          jsonb,
  created_at    timestamptz default now()
);

-- Napredak učenika („nastavi gde si stao")
create table if not exists napredak (
  kupac_email text not null,
  predmet     text not null,
  pozicija    jsonb,                         -- gde je stao (lekcija, zadatak…)
  updated_at  timestamptz default now(),
  primary key (kupac_email, predmet)
);

-- Napomena o bezbednosti (RLS):
-- Backend koristi SERVICE ključ i zaobilazi RLS. Ako sajt bude čitao bazu
-- direktno iz pregledača (anon ključ), uključi Row Level Security i napiši
-- politike da svako vidi samo svoje redove (po auth.email()).
