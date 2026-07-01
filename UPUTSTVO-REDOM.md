# MATHIA — UPUTSTVO REDOM (za jutro) ☕

> Radi ovim redosledom, od vrha nadole. Svaki korak je nezavisan i ima „gotovo kad…".
> Ništa se ne može pokvariti — kartično plaćanje je isključeno prekidačem dok ga ti ne uključiš.

---

## ✅ ŠTA JE VEĆ URAĐENO I PROVERENO (ne moraš ništa)
- Utisci: forma, admin ekran, dinamički prikaz na naslovnoj, SQL.
- Plaćanje (UPC): `lib/upc.js` + `api/pay-start.js` + `api/checkout.js` + `api/raiaccept-callback.js` — napisano i **kripto-testirano** (potpis, provera, odbijanje falsifikata).
- Ispravljen bug: paket se sada tačno prepoznaje iz šifre (MATHIA-GOLD → gold).
- Status stranice `hvala.html` i `greska.html`.
- Logotipi kartica (Visa/Mastercard/Dina/Raiffeisen + 3-D Secure) i obavezno podnožje.
- Dugme „Plati karticom" povezano sa novim tokom (za sada isključeno prekidačem).
- Sintaksa svih 25 JS fajlova čista.

---

## 1) GITHUB — postavi kod
- Uploaduj sadržaj `mathia-sajt-KOMPLET.zip` na `github.com/mathiatutor-glitch/mathia-sajt`
  (ili samo izmenjeno: `index.html`, `placanje.html`, `hvala.html`, `greska.html`,
  `stil-info.css`, `logos/`, i `api/` + `lib/` fajlove).
- **NE stavljaj** na GitHub: `mathia-private.pem`, `mathia.crt`, ni bilo koji ključ.
- ✅ Gotovo kad: Vercel automatski uradi rebuild (vidiš „Ready" u Vercel dashboardu).

## 2) SUPABASE — napravi tabelu utisaka
- Supabase → SQL Editor → nalepi ceo `SUPABASE-utisci.sql` → **Run**.
- ✅ Gotovo kad: u Table Editoru vidiš tabelu `mathia_utisci`.

## 3) VERCEL — env varijable za plaćanje
Vercel → Settings → Environment Variables → dodaj:
| Varijabla | Vrednost |
|---|---|
| `UPC_MERCHANT_ID` | test Merchant ID iz mejla banke |
| `UPC_TERMINAL_ID` | test Terminal ID iz mejla banke |
| `UPC_GATEWAY_URL` | `https://ecg.test.upc.ua/rbrs/pay` |
| `UPC_PRIVATE_KEY` | ceo sadržaj `mathia-private.pem` |
| `UPC_SERVER_CERT` | ceo sadržaj `test-server.cert` (iz `testni_fajlovi.zip`) |
- ✅ Gotovo kad: sve 5 varijabli sačuvane i uradiš Redeploy.

## 4) UPC — sertifikat i URL-ovi
- Preimenuj `mathia.crt` → `<TvojMerchantID>.crt` i pošalji na **ec@upc.ua**, cc **pos@raiffeisenbank.rs**.
- Uloguj se na **https://ecg.test.upc.ua/rbrs/merchant/** i podesi:
  - SUCCESS_URL = `https://mathia.rs/hvala.html`
  - FAILURE_URL = `https://mathia.rs/greska.html`
  - NOTIFY_URL  = `https://mathia.rs/api/raiaccept-callback`
- ✅ Gotovo kad: UPC potvrdi da je sertifikat učitan.

## 5) UTISCI — pošalji link deci (može odmah, ne zavisi od plaćanja)
- Pošalji: **mathia.rs/utisci-posalji.html** (poruke koje sam pripremio ranije).
- Kad stignu utisci, odobri ih na: **mathia.rs/admin-utisci.html** (uloguj se kao mathia.tutor@gmail.com).
- ✅ Gotovo kad: odobren utisak se vidi na naslovnoj strani.

## 6) TEST UPLATA karticom (tek kad su 1–4 gotovi)
1. U `placanje.html` nađi liniju `const KARTICA_AKTIVNA = false;` → promeni u `true` → sačuvaj na GitHub.
2. Otvori `mathia.rs/placanje.html`, izaberi paket, upiši mejl, klikni „Plati karticom".
3. Na UPC stranici plati **test karticom** (brojevi su u `Test card numbers.docx`).
4. Proveri: vraća te na `hvala.html`, stigne fiskalni račun na mejl, pretplata aktivirana.
- Ako nešto zapne: `UPC-SETUP.md` ima detalje; tehnička podrška UPC: ec@upc.ua.
- ✅ Gotovo kad: test uplata prođe ceo lanac. Onda javiš banci/UPC-u → potpišeš ugovor → dobiješ PRODUKCIONE podatke → zameniš env vrednosti i `UPC_GATEWAY_URL`.

---

## 🔧 SITNICE ZA KASNIJE (ne blokiraju ništa)
- **Šifra delatnosti:** upisao sam `8559 — Ostalo obrazovanje` u podnožju i na stranicama. Proveri u APR-u i promeni ako je druga (`hvala.html`, `greska.html`, `index.html`).
- **Prevodi na `placanje.html`:** srpski tekst o „mesečnoj obnovi" sam ispravio; EN/DE/FR/ES/IT/RU/PT još imaju staru formulaciju „automatska obnova" — treba je uskladiti (reci mi pa sredim).
- **ESIR produkcija:** kad efiskalizacija.cloud potvrdi produkcioni URL, promeni `ESIR_API_URL` u Vercel-u.
- **Google recenzije:** samo ako radiš i časove uživo (tada Google Business Profile kao „service-area business").

---

## 📞 KORISNI KONTAKTI
- Banka (POS): pos@raiffeisenbank.rs
- UPC tehnička podrška: ec@upc.ua (engleski)
- UPC test portal: https://ecg.test.upc.ua/rbrs/merchant/
