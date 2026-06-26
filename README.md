# Mathia — sajt + prodavnica + naplata (komplet za GitHub)

Sve što je napravljeno u ovom radu, spremno za GitHub → Vercel.

## Strane (web root)
- `prodavnica.html` — prodavnica (katalog + korpa), zove `/api/checkout`
- `uslovi.html`, `privatnost.html`, `reklamacije.html` — pravne strane (popunjene: PIB 115779761, MB 68628091, Apatin, kontakt@mathia.rs, 069 3000 500)
- `e-skripta-matematika.html` — e-skripta za prijemni (fakulteti), svih 14 oblasti + tablice izvoda/integrala
- `e-skripta-mala-matura.html` — e-skripta za malu maturu (matematika)

> `index.html` ostaje tvoj postojeći. Treba samo povezati 3 dugmeta paketa (`#paketi`, sad `href="#"`) na isti checkout kao prodavnica — to radimo u novom četu.

## Backend (Vercel serverless)
- `api/checkout.js` — početak kupovine (iznos se računa na serveru)
- `api/raiaccept-callback.js` — posle uplate: fiskalni račun → baza → aktivacija → mejl
- `api/cron/proveri-istek.js` — dnevni mejl o isteku pretplate
- `lib/` — `proizvodi.js` (CENE/katalog), `raiaccept.js`, `esir.js`, `supabase.js`, `email.js`
- `schema.sql` — tabele za Supabase
- `.env.example` — svi ključevi (kopirati u Vercel env)
- `vercel.json` — raspored cron-a · `package.json` — zavisnosti

## Postavljanje (redosled)
1. Push na GitHub → poveži repo sa Vercel.
2. Supabase: pokreni `schema.sql`, ubaci `SUPABASE_*` u Vercel env.
3. RaiAccept (Rajfajzen): ubaci `RAIACCEPT_*`, priliv na dinarski račun.
4. Bezbednosni element (PEP → ePorezi → ESF) + izaberi ESIR → ubaci `ESIR_*`.
5. Email: ubaci `EMAIL_API_KEY`.

Bez koraka 4 ne može da se izda fiskalni račun — to je tačka na kojoj smo stali sa e-fiskalizacijom.

## Cene
Sve u **dinarima** (RSD). Fiskalni račun je uvek u RSD. Katalog/cene se menjaju na jednom mestu: `lib/proizvodi.js` (+ prikaz u `prodavnica.html`).

## Ostaje za sledeći čet
- E-skripta za **višu poslovnu školu (NS)** — to je test sa pitanjima iz 7 predmeta (drugačiji tip proizvoda: pitanja + odgovori), pravi se iz tvog PDF-a sa Drive-a.
- Povezivanje dugmadi paketa u `index.html` na checkout.
- Ubacivanje e-skripti u prodavnicu kao proizvoda (kad daš cene).
- Nastavak e-fiskalizacije kroz ePorezi.
