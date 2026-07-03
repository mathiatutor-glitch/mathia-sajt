# MATHIA — ŠTA DA RADIM (kad se vratim kući) ☕

> Radi ovim redosledom. Korak 1 je NAJVAŽNIJI — bez njega klon ne radi.

---

## 1) 💳 DOPUNI ANTHROPIC KREDIT (ovo pokreće klon!)
Klon je popravljen u kodu, ali AI nalog je bez novca. Zato „ne radi".
1. Idi na **console.anthropic.com** → uloguj se
2. **Billing** (Plans & Billing)
3. **Buy credits** — dodaj npr. $20–50
4. **UKLJUČI Auto-reload** (npr. „kad padne ispod $5 → dopuni $20") — da klon NIKAD više ne stane
- Podsetnik iz našeg razgovora: 1 poruka ≈ 1,5–3 centi. $20 ≈ ~1000 poruka. Po učeniku mesečno ~$3–6, a pretplata mu je €40–85. Marža je ogromna. Ne trošiš više time što uzmeš više — plaćaš samo potrošeno.

## 2) 📤 POSTAVI IZMENJENE FAJLOVE NA GITHUB
Iz `mathia-sajt-KOMPLET.zip`. Uploaduj u DVE grupe (da ne pukne „commit failed"):

**GRUPA A — HITNO (popravlja klon + materijale), samo 2 fajla:**
- `api/chat.js`  → u folder `api/`
- `gate.js`      → u koren

**GRUPA B — ostalo (20 strana + ranije popravke):**
- 18 predmet/skripta strana + `Merenja-NEV-Formule/Skripta` (prebačene na pravi sistem zaključavanja)
- ranije popravljeni: `index.html`, `predmeti.html`, `placanje.html`, `hvala.html`, `greska.html`, `predmet-elektricna-kola.html`, `predmet-prijemni-visa-ns.html`, `stil-info.css`, `placanje-logos.png`
- Uploaduj po 5–8 fajlova odjednom (ne sve zajedno).

## 3) ✅ TESTIRAJ (uloguj se kao mathia.tutor@gmail.com)
- **Klon:** otvori bilo koji predmet, pošalji pitanje → mora da odgovori (ne „uid", ne engleska greška).
- **Materijali:** otvori neku Skriptu/Formule → kao vlasnik vidiš pun sadržaj.
- **Utisci:** naslovna → sekcija „Šta kažu…" prikazuje Danicu/Dunju/Martu.

---

## ŠTA JE POPRAVLJENO OVE SEANSE (da znaš)
1. **Klon je pucao na svakom predmetu** — greška `uid is not defined` u `api/chat.js`. **Popravljeno.**
2. **Engleska greška u četu** kad ponestane kredita → sad lepa srpska poruka; pravi razlog ide u Vercel logove.
3. **Materijali za pretplaćene** — `gate.js` je gledao pogrešnu tabelu (`mathia_pretplata` umesto `pretplate`). **Popravljeno.**
4. **Dva sistema zaključavanja** — 20 strana koristilo „simulaciju" (`mathia-guard.js`) koja NE prepoznaje vlasnika. **Prebačene na pravi `gate.js`.** (Ostao samo `index.html`, tamo je ispravno.)
5. **CACHING** — klon sad kešira veliki sistemski prompt → **do 90% jeftiniji ponovljeni ulaz** (manji AI račun).
6. Ranije: pokvareni linkovi (TypeScript, moj-nalog, elektricna-kola), srpska greška „nagore→naviše", nezgrapna fraza, `placanje` na 7 jezika (bez „automatske obnove"), 6 duplikata-siročića obrisano, logotipi kartica.

## PROVERENO DETALJNO ✓
- Svih 25 JS fajlova: sintaksa čista
- Nema praznih strana, nema pokvarenih linkova
- Klon specifičan za svaku stranu (64 klona + 45 alias-a)
- Voice ugašen svuda
- Jezik: 7 stranih jezika ~181 prevod

---

## ⚠️ DVE NAPOMENE
- **Ako posle dopune kredita klon i dalje kaže „privremeno nedostupna":** javi mi — moguće je da treba da sklonim caching (mala verovatnoća, ali da znaš). U Vercel logovima piše pravi razlog.
- **`data-subject` na materijalima:** kad budeš imala prve prave pretplatnike, javi mi da zajedno proverimo da se izbor predmeta i zaključavanje 100% poklapaju (za vlasnika i probu sve radi već sad).

## OSTALO (kad stigneš, nije hitno)
- Sticky meni + strelica „← Nazad" na svim stranama (dogovoreno, sledeći korak).
- Materijali za `prijemni-visa-ns` (sekcija privremeno uklonjena).
- UPC test podaci od banke (čeka se) → onda Vercel env + sertifikat + test uplata.
