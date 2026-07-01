# UPC / RaiAccept — postavljanje (korak po korak)

## 1. Fajlovi koje si dobila
- **mathia-private.pem** — TVOJ privatni ključ. TAJNA. Ne šalji ga NIKOME (ni banci, ni UPC-u).
- **mathia.crt** — tvoj sertifikat (sadrži javni ključ). OVO se šalje UPC-u.
- **mathia.pub** — javni ključ zasebno (za svaki slučaj, ne mora nigde).

## 2. Šta poslati UPC-u (ec@upc.ua)
UPC očekuje fajl pod imenom `<MerchantID>.crt`.
- Pogledaj u mejlu banke svoj **test Merchant ID** (npr. 1755637).
- Preimenuj `mathia.crt` → `<taj-broj>.crt` (npr. `1755637.crt`).
- Pošalji taj `.crt` na **ec@upc.ua**, u cc **pos@raiffeisenbank.rs**.
- Sačekaj potvrdu da je sertifikat učitan.

## 3. Vercel env varijable (Settings → Environment Variables)
| Varijabla | Vrednost |
|---|---|
| `UPC_MERCHANT_ID` | tvoj test Merchant ID iz mejla |
| `UPC_TERMINAL_ID` | tvoj test Terminal ID iz mejla |
| `UPC_GATEWAY_URL` | `https://ecg.test.upc.ua/rbrs/pay` |
| `UPC_PRIVATE_KEY` | ceo sadržaj **mathia-private.pem** (sa -----BEGIN/END-----) |
| `UPC_SERVER_CERT` | ceo sadržaj **test-server.cert** (iz testni_fajlovi.zip) |

Napomena: privatni ključ i UPC sertifikat idu SAMO u Vercel env — nikad u kod ni na GitHub.

## 4. Test kartice
U arhivi `Uputstva` je fajl **Test card numbers.docx** — te brojeve koristiš za probne uplate na sandbox stranici.

## 5. Kada sve radi u testu
Banka/UPC potvrde uspešan test → potpisuješ ugovornu dokumentaciju → dobijaš PRODUKCIONE
Merchant/Terminal ID i produkcioni gateway URL → samo zameniš env vrednosti u Vercel-u.

---

## 6. Podešavanje URL-ova na UPC Merchant portalu
Uloguj se na **https://ecg.test.upc.ua/rbrs/merchant/** (korisničko ime/lozinka iz mejla banke)
i u podešavanjima terminala postavi:
- **SUCCESS_URL** = https://mathia.rs/hvala.html
- **FAILURE_URL** = https://mathia.rs/greska.html
- **NOTIFY_URL**  = https://mathia.rs/api/raiaccept-callback

(Ovi URL-ovi se NE šalju u formi — čitaju se sa portala. NOTIFY dolazi sa UPC IP:
test 195.85.198.16, produkcija 195.85.198.15.)

## 7. Fajlovi koje treba postaviti na GitHub (u ovoj sesiji napisano)
- `lib/upc.js`                 (novo — jezgro, potpis/provera)
- `api/pay-start.js`           (novo — pravi potpisanu formu ka UPC-u)
- `api/raiaccept-callback.js`  (izmenjeno — UPC NOTIFY handler)
- `api/checkout.js`            (izmenjeno — vodi na pay-start umesto na staru raiaccept skicu)

## 8. Još treba (sitnije, mogu se uraditi odvojeno)
- Napraviti **hvala.html** (uspešno plaćanje) i **greska.html** (neuspešno) — prazne ih još nema.
- Postaviti obavezne elemente sa sajta iz "E-commerce check liste" + logotipe kartica (Logo komplet).
- Test uplata test karticom (Test card numbers.docx) → javiti banci/UPC → potpis ugovora → produkcioni podaci.
