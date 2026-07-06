# Mathia — Specifikacija za `widget.js` i `/api/chat`
### Specijalizovani predmetni klon „Profesorica"

Ovaj dokument opisuje šta treba dograditi na **`widget.js`** (klijent) i **`/api/chat`** (server), kako bi klon radio tačno onako kako Mathia zahteva. Front-end (sajt) je već pripremljen: klon se učitava sa ispravnim atributima, a sav ostali sadržaj (prevodi, nalog, preview) je gotov.

---

## 1. Šta front-end već šalje (ne menjati)

Svaka strana učitava klon dinamički, sa ovim atributima:

| Atribut | Značenje | Primer |
|---|---|---|
| `data-mode` | Identitet/specijalizacija klona | `site`, `fax-analiza1`, `os-mat-5`, `prog-python` |
| `data-subj` / `data-sub` | Naziv predmeta | `Matematička analiza 1` |
| `data-lang` | **Izabrani jezik korisnika** (već dinamički: čita se iz `localStorage['mathia_lang']`) | `sr`, `en`, `de`, `fr`, `es`, `it`, `ru`, `pt` |
| `data-hi` | Pozdrav na izabranom jeziku (već lokalizovan) | … |
| `data-api` | Adresa API-ja | `/api/chat` |

**Zahtev za `/api/chat`:** u svaki poziv proslediti `mode`, `lang`, `subject` i (ako je ulogovan) `userId`. Server na osnovu `lang` **mora da odgovara isključivo na tom jeziku**, a na osnovu `mode`/`subject` da koristi znanje baš tog predmeta.

---

## 2. Jezik (obavezno)

- Klon **odgovara isključivo na jeziku iz `data-lang`** — bez mešanja jezika, uključujući formule, objašnjenja i predloge zadataka.
- Ako korisnik piše na drugom jeziku, klon i dalje poštuje `data-lang` (jezik sajta), osim ako korisnik izričito ne zatraži promenu.
- Pozdrav (`data-hi`) je već lokalizovan za svih 8 jezika.

---

## 3. Ton i pedagogija (sistemski prompt na serveru)

Klon je **akademski, nežan, strpljiv, pedagoški** i usmeren ka korisniku. Pravila za sistemski prompt po `mode`:

- **Bez kolokvijalizama** — ovo je obrazovna platforma; stručan ali topao ton.
- Objašnjava **korak po korak**, i uvek **zašto**, ne samo **šta**.
- **Formule pisati precizno** (LaTeX / MathJax; klijent renderuje).
- Kad je korisno, **skicira dijagram / grafik** (vidi §6).
- Posle svake obrađene lekcije ili rešenog zadatka: **pita da li korisnik želi još jedan sličan ili teži zadatak**, i **sam predlaže sličan** da proveri razumevanje.
- Proverava razumevanje dodatnim pitanjima („Da li ti je jasno odakle sledi ovaj korak?").

---

## 4. Ulaz: tekst + glasovni unos + slika

- **Tekst** — standardno.
- **Glasovni unos (diktiranje pitanja):** korisnik diktira pitanje glasom → prepis u tekst (Web Speech API na klijentu ili STT na serveru). **Nema glasovnog izlaza** — klon nikad ne priča naglas, samo piše.
- **Upload slike** (zadatak / projekat / korisnikovo rešenje):
  - Klijent šalje sliku na `/api/chat` (multimodalni model).
  - Server **pročita zadatak sa slike**, razume ga, i u četu napiše **kompletno, postupno, akademski jasno rešenje** (sa tačnim formulama; dijagram ako treba).

---

## 5. Provera korisnikovog rešenja (kad pošalje svoje rešenje)

Ako korisnik uploaduje **svoje rešenje** i ono nije tačno, klon treba da:
1. **Pronađe 1–3 ključne greške** (ne nabraja sve sitnice — fokus na suštinske).
2. **Mirno i pedagoški objasni zašto** je došlo do greške.
3. **Vodi korisnika korak po korak do tačnog rešenja** — cilj nije samo tačan odgovor, već da korisnik zaista savlada gradivo.
4. Na kraju ponudi **sličan zadatak** za proveru.

---

## 6. Dijagrami / grafici

- Kada zadatak traži skicu (funkcija, kolo, geometrija), klon generiše dijagram.
- Predlog: server vraća **SVG** ili **opis za crtanje** (npr. Chart/JSXGraph/TikZ→SVG), klijent renderuje u četu.

---

## 7. Kvizovi i testovi (generisanje)

- Klon na zahtev **sastavi sličan ili teži test/kontrolni** iz date oblasti.
- **Kvizovi sa ponuđenim odgovorima** (multiple-choice): server vraća strukturisan JSON, klijent prikaže kao interaktivni kviz sa proverom.

Predlog formata odgovora (kada je kviz):
```json
{ "type":"quiz",
  "questions":[
    {"q":"...", "options":["A","B","C","D"], "answer":1, "explain":"..."}
  ] }
```

---

## 8. Napredak i pamćenje (po pretplatniku)

- Klon **pamti sve** za ulogovanog korisnika (istorija, savladane teme) — vezano za `userId` (telefon/nalog).
- Prati **napredak po predmetu** (procenat pređenog, savladane teme, vreme, niz dana) i to **vraća sajtu** da se prikaže na `profil.html` (kartice predmeta + bedževi već postoje na front-endu; treba samo pravi izvor podataka).
- Pozdravlja korisnika **imenom** i pita: da li je vežbao, treba li pomoć, želi li da se nešto ponovi, ide li dalje.

**Predlog:** endpoint `GET /api/progress?userId=…` → `{ subjectId: {pct, topics, timeMin, streak}, badges:[…] }`, koji `profil.html` čita umesto podrazumevanih nula.

---

## 9. Pristup (pretplata / preview)

- **Preview (15 min):** posetilac vidi sajt i **isečke** skripti/zbirki/formula (front-end već radi preko `preview-mathia.js`) i može da proba klon.
- Po isteku 15 min taj broj telefona **ne može ponovo da se uloguje** → potrebna pretplata. *(Ova logika je serverska — vezati za telefon/nalog.)*
- **Pretplatnik:** pun pristup materijalima **izabranih predmeta** (po paketu Basic 1 / Gold 2 / Diamond 3) i klonu 24/7. Sadržaj je **samo za pregled, nikad za preuzimanje** (jedino planer se preuzima).

---

## 10. Predlog API ugovora (`POST /api/chat`)

**Telo zahteva:**
```json
{
  "mode": "fax-analiza1",
  "lang": "de",
  "subject": "Matematička analiza 1",
  "userId": "…ili null (preview)…",
  "message": "tekst pitanja",
  "image": "…base64 (opciono)…",
  "history": [ {"role":"user","content":"…"}, {"role":"assistant","content":"…"} ]
}
```

**Telo odgovora:**
```json
{
  "text": "postupno objašnjenje (na jeziku 'lang', formule u LaTeX-u)",
  "diagram": "…SVG ili null…",
  "quiz": "…JSON kviz ili null…",
  "progress": { "topic":"granične vrednosti", "delta": 5 }
}
```

---

## Sažetak zadataka za programera
1. `/api/chat`: poštovati `lang` (odgovor isključivo na tom jeziku) i `mode/subject` (znanje predmeta).
2. Sistemski prompt po pravilima iz §3 (akademski, bez kolokvijalizama, korak-po-korak, predlaže sličan zadatak).
3. Multimodalno: čitanje slike zadatka i **korisnikovog rešenja** (§4–5).
4. Dijagrami (§6), kvizovi/testovi (§7).
5. Pamćenje i napredak po `userId` + `GET /api/progress` za `profil.html` (§8).
6. Serverska logika preview/pretplate vezana za telefon/nalog (§9).

*Front-end je spreman i čeka ove endpoint-e — kartice predmeta, bedževi i profil se automatski „pune" kada `/api/progress` vrati prave podatke.*
