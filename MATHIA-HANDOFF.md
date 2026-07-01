# MATHIA EDU — Kompletni radni dnevnik za nastavak

> **POSLEDNJE AŽURIRANO: 01.07.2026.**
> **Novo u ovoj sesiji:** (1) sistem za utiske (recenzije) — forma + admin + dinamički prikaz;
> (2) VELIKA PROMENA plaćanja: RaiAccept ne podržava pretplatu → prelazak na **UPC e-Commerce
> Connect** hostovanu platnu stranicu (model: jednokratna naplata po periodu). Detalji niže.

---

## OSNOVNI PODACI
- **Korisnik:** Marina Bulat, MATHIA EDU PR
- **PIB:** 115779761, Matični broj: 68628091
- **Adresa (sa ponude banke):** Srpskih Vladara 36A, Apatin
- **Sajt:** mathia.rs
- **Repo:** github.com/mathiatutor-glitch/mathia-sajt
- **Deploy:** Vercel, projekat **project-y23je** (auto-build)
- **Izvorni kod (uvek editovati ovde):** `/home/claude/delivery/mathia-sajt/`
  (napomena: fajl-sistem se resetuje između sesija — kod povući sa GitHub-a ili iz poslednjeg zip-a)
- **Finalni zip:** `/mnt/user-data/outputs/mathia-CEO-SAJT-final.zip`
- **Email za admin/testiranje:** mathia.tutor@gmail.com
- **Kontakt email (na ponudi/UPC):** marina.bulat@gmail.com

---

## SUPABASE
- **URL:** https://ibhirxltgeyecrjwymai.supabase.co
- **ANON KEY:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaGlyeGx0Z2V5ZWNyand5bWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MTYzMzgsImV4cCI6MjA5NzQ5MjMzOH0.nE3xYc5JuUpPETrGP8oEiFWlZnhhuYhxY-XFDBtARXk
- **Auth:** email OTP, Site URL = https://mathia.rs
- **Tabele:**
  - `mathia_profil` (user_id PK, ime, top_oblast, stil, vreme, drustvo, minuta, paket text, planer bool, predmeti TEXT[])
  - `mathia_napredak` (id, user_id, predmet, poslednja_tema, minuta_ukupno, serija, procenat, azurirano, unique(user_id,predmet))
  - `mathia_razgovori` (id UUID PK, user_id UUID, predmet TEXT, poruke JSONB, summary TEXT, azurirano)
  - `mathia_utisci` (id UUID PK, ime, razred, tekst, zvezdice int, saglasnost bool, **odobreno bool**, kreirano) ← KREIRANA U OVOJ SESIJI ✅
    - RLS: anon SME insert samo `odobreno=false AND saglasnost=true`; anon SME select samo `odobreno=true`.
    - SQL za kreiranje: `SUPABASE-utisci.sql`.

---

## VERCEL ENV VARS
Postojeće:
- `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `ANTHROPIC_API_KEY`, `ELEVENLABS_API_KEY`,
  `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`,
  `SESSION_SECRET`, `ADMIN_SECRET`
- `ESIR_API_URL` = https://staging.efiskalizacija.cloud
- `ESIR_API_KEY` = efisk_28_d0488ba92eef11ec52deb1218d3b0bc7e2c0a81e79767dce8c087462818ada2b
- `ESIR_API_SECRET` = 6dfaaca67855d56be1d2243cde8cf6277eeb38a60173c9a5464071076a4f1a8a
- `ADMIN_EMAILS` = mathia.tutor@gmail.com (neograničen pristup bez pretplate + pristup admin utisci ekranu)

NOVE (za UPC plaćanje — postaviti kad stignu test podaci):
- `UPC_MERCHANT_ID` = (test Merchant ID iz mejla banke)
- `UPC_TERMINAL_ID` = (test Terminal ID iz mejla banke)
- `UPC_GATEWAY_URL` = https://ecg.test.upc.ua/rbrs/pay   (produkcija: dobija se posle ugovora)
- `UPC_PRIVATE_KEY` = ceo sadržaj `mathia-private.pem` (TAJNA — samo Vercel)
- `UPC_SERVER_CERT` = ceo sadržaj `test-server.cert` (UPC-ov cert, iz `testni_fajlovi.zip`)

Zastarelo/uklonjeno: `RAIACCEPT_*` varijable iz starog plana više NE trebaju (RaiAccept se ne koristi
u onom obliku — vidi sekciju PLAĆANJE).

---

## STRUKTURA FAJLOVA (dodato u ovoj sesiji označeno ★)
```
koren repoa (GitHub) — sve iz G1–G4 se spljošti u koren:
  *.html (343+ strane)
  utisci-posalji.html   ★ forma za utiske (deca je popunjavaju)
  admin-utisci.html     ★ admin ekran za odobravanje utisaka (samo admin)
  widget.js, napredak.js, sw.js, manifest.webmanifest
  marina.jpg, avatar.jpg, logo.png, icon-*.png, og.png
  sitemap.xml, robots.txt
  SUPABASE-utisci.sql   ★ SQL za tabelu utisaka (pokrenuti u Supabase SQL editoru)

api/:
  chat.js, me.js, subscribe.js
  utisci-admin.js       ★ admin API za utiske (proverava isAdmin, koristi service key)
  raiaccept-callback.js  ← treba prepraviti u UPC NOTIFY handler (vidi PENDING)
  pay-start.js          ← TREBA NAPRAVITI (pravi potpisanu formu ka UPC-u) (vidi PENDING)

lib/:
  esir.js, sbauth.js, user.js, proizvodi.js, supabase.js, email.js, kv.js
  upc.js                ★ UPC integracija: potpis zahteva (RSA-SHA1), provera odgovora — TESTIRANO
  raiaccept.js          ← stara skica, zameniti/izbaciti u korist upc.js
```

---

## PAKETI (lib/proizvodi.js — jedini izvor istine za cene)
- **Basic:** 4.990 RSD, 1 predmet (MATHIA-BASIC)
- **Gold:** 6.990 RSD, 2 predmeta (MATHIA-GOLD) ← Najpopularnije
- **Diamond:** 9.990 RSD, 3 predmeta (MATHIA-DIAMOND)
- **Planer:** 1.990 RSD jednokratno (MATHIA-PLANER) + skripte/zbirke (SKR-*, ZBR-*)
- Poreska oznaka: `A` (paušalac, van PDV) — potvrditi tačnu slovnu oznaku u ESIR-u.
- **VAŽNO:** model je sad **jednokratna naplata po periodu (bez automatskog obnavljanja)** — vidi PLAĆANJE.

---

## UTISCI (RECENZIJE) — IMPLEMENTIRANO ✅ (ova sesija)
- **Forma:** `utisci-posalji.html` — ime (bez prezimena), razred/škola, zvezdice, tekst, checkbox saglasnosti.
  Upisuje u `mathia_utisci` sa `odobreno=false`. LINK ZA DECU: **mathia.rs/utisci-posalji.html**
- **Admin:** `admin-utisci.html` + `api/utisci-admin.js`. Admin se prijavi (Supabase OTP, mora biti u
  `ADMIN_EMAILS`), vidi „za pregled" i „na sajtu", odobrava/sklanja/briše jednim klikom.
  Server koristi `SUPABASE_SERVICE_KEY` (zaobilazi RLS) i proverava email admina pre svake akcije.
  LINK (samo za Marinu, ne deliti): **mathia.rs/admin-utisci.html**
- **Naslovna:** `index.html` (u G1) — sekcija UTISCI dinamički učita ODOBRENE utiske iz Supabase i
  zameni placeholder-e. Dodato dugme „Podelite i vi svoj utisak" → vodi na formu.
- **Puštanje:** (1) pokreni `SUPABASE-utisci.sql`, (2) upload: utisci-posalji.html, admin-utisci.html,
  index.html, api/utisci-admin.js.

---

## PLAĆANJE — VELIKA PROMENA: UPC e-Commerce Connect (umesto RaiAccept pretplate)

### Kontekst / odluka banke
- Komercijalna ponuda banke **prihvaćena i potpisana 01.07.2026** (0 din postavljanje; provizija ~2%
  domaće kartice, DinaCard 1,8%, inostrane do 3%; mesečna naknada 10 EUR ali gratis prvih 6 meseci i
  gratis iznad 50.000 din prometa; isplata T+1).
- Banka javila: **RaiAccept NE podržava model mesečne pretplate.** Umesto toga → integracija
  **UPC „e-Commerce Connect" hostovane platne stranice** (UPC = Ukrainian Processing Center, deo
  Raiffeisen grupe; procesor za RBRS).
- **Model postaje: jednokratna naplata po periodu** (kupac plati npr. mesec/3/6 unapred, pa sam
  obnovi kad istekne). NEMA automatskog skidanja s kartice. Prednost: kartica se unosi na UPC
  stranici, ne na našem sajtu → manji PCI/bezbednosni teret.

### Kako radi (tehnički)
- Naš server napravi POTPISANU formu → POST na `https://ecg.test.upc.ua/rbrs/pay` → kupac plati na
  UPC stranici → UPC vrati POTPISAN rezultat na naše stranice (SUCCESS/FAILURE) i na NOTIFY_URL.
- **Potpis: RSA-SHA1.** Zahtev potpisujemo NAŠIM privatnim ključem; odgovor proveravamo UPC-ovim
  sertifikatom (`test-server.cert`).
- **Iznos u parama** (RSD×100). **Valuta 941.** **Uspeh = `TranCode` „000".**
- NOTIFY dolazi sa UPC IP: test `195.85.198.16`, produkcija `195.85.198.15`.
- Datafile (potpis ZAHTEVA): `MerchantId;TerminalId;PurchaseTime;OrderId[,Delay];Currency[,AltCur];Amount[,AltAmt];SD;`
- Datafile (potpis ODGOVORA): `MerchantId;TerminalId;PurchaseTime;OrderId,Delay;Xid;Currency[,AltCur];Amount[,AltAmt];SD;TranCode;ApprovalCode;`
- Sve ovo je IMPLEMENTIRANO i TESTIRANO u **`lib/upc.js`** (funkcije: `pripremiPlacanje`,
  `proveriOdgovor`, `uspesno`, `uPara`, `purchaseTime`, `datafileZahteva`, `datafileOdgovora`).

### Ključevi (generisani 01.07.2026)
- `mathia-private.pem` — privatni ključ (TAJNA, samo u Vercel `UPC_PRIVATE_KEY`).
- `mathia.crt` — sertifikat; preimenovati u `<MerchantID>.crt` i poslati na **ec@upc.ua** (cc pos@raiffeisenbank.rs).
- `test-server.cert` (od UPC-a, u `testni_fajlovi.zip`) → ide u `UPC_SERVER_CERT`.
- Uputstvo: `UPC-SETUP.md`.
- Test kartice: `Uputstva/Test card numbers.docx`.
- Tehnička podrška UPC: **ec@upc.ua** (engleski), cc pos@raiffeisenbank.rs.

### ŠTA JOŠ TREBA ZA PLAĆANJE (redosled)
1. **Marina:** pos�lati `<MerchantID>.crt` UPC-u; postaviti Vercel env (UPC_*); popuniti test Merchant/Terminal ID.
2. **Kod:** napraviti `api/pay-start.js` (koristi `upc.pripremiPlacanje` → vrati auto-submit formu ka gateway-u;
   OrderID = porudžbina; SD = sesija; opis = naziv paketa).
3. **Kod:** prepraviti `api/raiaccept-callback.js` u UPC NOTIFY handler:
   parsira POST polja → `upc.proveriOdgovor(polja)` → ako `upc.uspesno(polja)` → postojeći tok
   (ESIR račun preko `esir.izdajRacun` → `supabase` upis → aktivacija pretplate/pristupa → mejl).
   NAPOMENA: pri pisanju pogledati `lib/supabase.js` (porudžbine: `ucitajPorudzbinu`, `sacuvajFiskalni`,
   `oznaciPlaceno`, `aktivirajPretplatu`) i postojeći checkout gde se kreira porudžbina — da se OrderID
   i iznos slože. Callback treba da odgovori UPC-u sa `Response.action=approve/reverse`.
4. **SUCCESS_URL / FAILURE_URL** stranice (čitaju SD/OrderID/TranCode i prikažu ishod).
5. Registrovati SUCCESS/FAILURE URL-ove na UPC Merchant portalu (`https://ecg.test.upc.ua/rbrs/merchant/`).
6. Test uplata test karticom → potvrda UPC/banci → **potpis ugovorne dokumentacije** → PRODUKCIONI
   Merchant/Terminal ID + produkcioni gateway URL → zameniti env vrednosti.

---

## ESIR FISKALIZACIJA — IMPLEMENTIRANO ✅
- Provajder: efiskalizacija.cloud (staging), ESIR IB 1522. `lib/esir.js` napisan i testiran.
- HMAC-SHA256 potpis potvrđen. PDV 0% (paušalac). Test račun 30.06.2026 (2026-000001, Gold 6.990) ✅
- Sva 4 proizvoda uneta na efiskalizacija.cloud. ⚠️ Staging — pre prave naplate proveriti produkcioni URL.
- Sertifikat: uploadovati kroz web UI platforme (ne duplim klikom na .p12).

---

## MEMORIJA RAZGOVORA — IMPLEMENTIRANO ✅ (Opcija C)
- `widget.js`: `memLoad()`, `memSave()`, `initMemory()` — profil, poslednja tema, niz dana, poslednjih 20 poruka.
- Personalizovani pozdrav; klon oslovljava korisnika imenom. Server (`api/chat.js`) prima userName/userPredmeti.

## LOGIN FLOW ✅ (nalog.html, u G3)
- Email OTP (Supabase). Novi korisnik → pita ime → čuva → redirect. `?next=` mora počinjati sa `/`.

## ADMIN BYPASS ✅
- `ADMIN_EMAILS=mathia.tutor@gmail.com` → zaobiđeni svi limiti; isto koristi i admin ekran za utiske.

## BIRANJE PREDMETA PO PAKETU ✅
- nalog.html modal; limit Basic=1/Gold=2/Diamond=3; čuva u `mathia_profil.predmeti`; chat.js proverava pristup.

## JEZIK / NASLOVNA / KOMPATIBILNOST / GLAS (TTS) / PREDMETNE STRANE ✅
- Vi-forma svuda, ekavica, „Zdravo!" umesto „Ćao!". TTS isključen. 181/181 predmetnih strana ima ispravan klon.
- iOS/Android fiksevi (viewport, safe-area, 100dvh, -webkit-).

## KLONOVI — 113 predmeta ✅
- 67 klonova (CLONES) + 46 alias-a (ALIASES) u `api/chat.js`.

---

## ŠTA JOŠ ČEKA / PENDING (ažurirano)

### 1. PLAĆANJE — završiti kod (vidi sekciju PLAĆANJE, koraci 2–6)
- `api/pay-start.js` (novo) + prepraviti `api/raiaccept-callback.js` u UPC NOTIFY handler + SUCCESS/FAILURE stranice.
- Zavisi od: Marina pošalje `.crt` UPC-u i postavi Vercel env; test Merchant/Terminal ID.

### 2. Obavezni elementi na sajtu (uslov banke pre produkcije)
- Iz `Uputstva`: „E-commerce check lista", „Prilog 1. Uputstvo za Internet prodajno mesto", „Logo komplet"
  (Raiffeisen, Visa, Mastercard, Dina logotipi). Postaviti jasne cene u RSD, uslove korišćenja, politiku
  reklamacija/povraćaja, kontakt i podatke firme, i logotipe kartica. Može se raditi ODMAH (ne zavisi od ključeva).

### 3. ESIR produkcija
- Proveriti produkcioni URL kod efiskalizacija.cloud; promeniti `ESIR_API_URL` kad potvrde.

### 4. Utisci — sadržaj
- Sistem gotov; ostaje da stignu pravi utisci dece (link poslat) i da Marina odobri prve.

### 5. Google recenzije (opciono)
- Zavisi da li ima časova UŽIVO → onda Google Business Profile kao „service-area business" (sakrivena adresa).
  Ako je sve onlajn → preskočiti, držati se utisaka na sajtu. Ne nuditi nagradu za recenziju.

---

## KRITIČNE NAPOMENE ZA KOD
### api/chat.js
- `SHARED` je backtick template-literal: svaki `\` → `\\`; nikad `${` bez escapinga. Posle izmene: `node --check api/chat.js`.
### widget.js
- Inline u HTML stranama; `v=9` cache busting (povećati kad treba). `sbToken()` čita `sb-*-auth-token` iz localStorage.
### lib/upc.js
- Env ključevi sa `\n` se normalizuju. Potpis RSA-SHA1. Posle izmene testirati round-trip (potpis+provera).
### Pakovanje
- Editovati u `/home/claude/delivery/mathia-sajt/`; zip u outputs; GitHub: G1–G4 + koren + lib/ u koren, api/ posebno; Vercel auto-rebuild.

---

## PROMPT ZA CLAUDE U NOVOM ČETU
```
Nastavak rada na MATHIA EDU platformi (mathia.rs).
Izvorni kod je u zipu: mathia-CEO-SAJT-final.zip (raspakuj u /home/claude/delivery/mathia-sajt/)
Detaljan handoff: MATHIA-HANDOFF.md — pročitaj pre nego što nastaviš.
Trenutni fokus: završiti UPC plaćanje (api/pay-start.js + prepraviti raiaccept-callback.js).
```
