# MATHIA — puštanje u prodaju (naplata + fiskalizacija)

Tok jedne kupovine:
`prodavnica/placanje` → `/api/checkout` (server računa iznos, pravi porudžbinu) → `/api/pay-start` (potpisana UPC forma) → **UPC stranica (kartica)** → `/api/raiaccept-callback` (banka javlja ishod) → provera potpisa → **fiskalni račun (ESIR)** → status „placeno" → **aktivacija pretplate** (`pretplate`) → mejl kupcu.

---

## 1) Fiskalizacija (eFiskalizacija.cloud / ESIR)
1. Na eFiskalizacija.cloud nalogu **otpremi bezbednosni element (PFX)**.
2. Podešavanja → Bezbednost: generiši **API ključ** i **API secret** → `ESIR_API_KEY`, `ESIR_API_SECRET`.
3. Podešavanja → Webhooks: URL = `https://mathia.rs/api/efisk-webhook`, iskopiraj secret → `EFISK_WEBHOOK_SECRET`.
4. `ESIR_API_URL`: za probu `https://staging.efiskalizacija.cloud`; **za produkciju prebaci na produkcijski URL**.
5. Potvrdi **poresku oznaku za paušalca** (van PDV): u kodu je `pdv_stopa: 0`, `pdv_kategorija: "nije_u_pdv"`, oznaka `A` (`lib/proizvodi.js`). Ako provajder traži drugu oznaku — javi da izmenim na 1 mestu.

## 2) Plaćanje karticom (UPC / Raiffeisen)
1. Iz UGOVORA za UPC unesi: `UPC_MERCHANT_ID`, `UPC_TERMINAL_ID`, `UPC_PRIVATE_KEY` (tvoj PEM), `UPC_SERVER_CERT` (UPC PEM).
2. `UPC_GATEWAY_URL`: test `https://ecg.test.upc.ua/rbrs/pay`; **za produkciju prebaci na produkcijski URL banke** (i produkcijski `UPC_SERVER_CERT`).
3. Na UPC Merchant portalu podesi:
   - **NOTIFY_URL** = `https://mathia.rs/api/raiaccept-callback`
   - **SUCCESS_URL** = `https://mathia.rs/hvala.html`
   - **FAILURE_URL** = `https://mathia.rs/placanje.html` (ili tvoja strana greške)

## 3) Env + deploy
1. U Vercel (`project-y23je`) → Settings → Environment Variables unesi sve iz `.env.example` (bar sve `[NUŽNO]`).
2. Proveri da `ANTHROPIC_API_KEY` ima **Opus** pristup i `SUPABASE_SERVICE_KEY` je postavljen.
3. Upload poslednjih izmena (naplata + novi predmeti) → **Redeploy**.
4. U Supabase pokreni SQL ako već nisi: `mathia-planer.sql`, `mathia-napredak.sql`, `mathia-migracija-predmeti.sql`.

## 4) Test kupovina (malim iznosom, u produkciji ili UPC test režimu)
1. Prijavi se na `nalog.html` (email kod), izaberi paket + predmet(e) i idi na plaćanje.
2. Plati karticom na UPC stranici.
3. Trebalo bi da te vrati na `hvala.html`.

## 5) Provera da je sve prošlo
- **Supabase → tabela `pretplate`**: nov red sa `kupac_email`, `status='aktivna'`, `predmeti` (izabrani), `istice` (~30 dana).
- **Supabase → `fiskalni_racuni`** (i `porudzbine.status='placeno'`): upisan fiskalni račun / PFR.
- **Mejl kupcu**: stigao fiskalni račun + link ka nalogu.
- **`nalog.html`**: „Moji predmeti" prikazuju kupljeni predmet; otvori materijal — **otključan** (nema „15 min" katanca).
- **Chat**: klon tog predmeta odgovara (bez „tehnički zastoj").
- Ako pretplata NIJE aktivna: proveri Vercel logove za `upc-callback` (najčešće: „LOS POTPIS" → pogrešan `UPC_SERVER_CERT`; „amount mismatch" → iznos; „nema Supabase naloga za email" → kupac se nije ranije ulogovao istim mejlom).

---

## Bezbednosne napomene (već ugrađeno)
- Iznos se računa **na serveru** (`lib/proizvodi.js`) — nikad iz pregledača.
- Callback **prvo proverava potpis banke** i odbija lažne „plaćeno"; **idempotentan** je; **tvrda provera iznosa** (ne aktivira na neslaganje).
- `api/fiskalizuj.js` je **zaključan** iza `ADMIN_SECRET` (legacy/ručni).
- Pristup se otključava čitanjem `pretplate` po emailu (radi i ako KV-sync zakaže).

## Ako koristiš DRUGOG provajdera
Kod je trenutno vezan za **UPC (kartice)** i **eFiskalizacija.cloud (ESIR)**. Ako je tvoj provajder drugačiji, reci koji tačno (naziv + link na API dokumentaciju) pa prilagodim `lib/upc.js` / `lib/esir.js` i nazive polja.
