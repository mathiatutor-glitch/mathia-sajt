# ZOI — UPUTSTVO (korak po korak)

Ovaj paket ima SAMO dva fajla koja se bezbedno prebacuju:
- `widget.js`  → sama Zoi (sad sa „Lana" glasom)
- `api/chat.js` → „mozak" (backend sa ključem)

⚠️ Namerno NEMA `index.html` ni druge stranice — da NE pregazi tvoje prave strane (to se desilo prošli put).

============================================================
DEO 1 — Prebaci ova dva fajla na GitHub
============================================================
1. Otvori github.com → repo **mathia-sajt**.
2. Klikni **Add file → Upload files**.
3. Prevuci **widget.js** i ceo folder **api** (sa chat.js unutra).
4. Kad pita „replace existing files?" → DA, zameni (overwrite).
   (Bezbedno je — to nisu tvoje stranice, nego Zoi i backend.)
5. Dole klikni **Commit changes**.
6. Vercel sam objavi novu verziju za ~1 minut.

============================================================
DEO 2 — Vrati svoju PRAVU početnu stranu
============================================================
Moja demo strana je ranije zamenila tvoj pravi `index.html`.
Vrati original ovako:
- Ako si sajt pravila na **Glitch-u** → otvori projekat na glitch.com,
  uzmi svoj originalni `index.html` i njega postavi na GitHub
  (Add file → Upload files → index.html → Commit).
- ILI na GitHub-u: klikni `index.html` → **History** → otvori stariju
  (tvoju) verziju → kopiraj sadržaj → zameni trenutni → Commit.

(Ako ne ide — javi, napravićemo ti novu početnu.)

============================================================
DEO 3 — Dodaj Zoi na SVAKU stranicu
============================================================
Otvori `LINIJA-ZA-UBACIVANJE.txt` i tu liniju nalepi IZNAD `</body>`
u svaku .html stranu:
- obične strane → data-mode="site"
- strana za prijemni (tutor-ftn.html) → data-mode="ftn"

Posle svake izmene → Commit → sačekaj minut → na sajtu Cmd+Shift+R.

Gotovo — Zoi je na svakoj strani gde si dodala liniju. 🎉
