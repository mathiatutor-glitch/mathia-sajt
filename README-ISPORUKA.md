# MATHIA EDU — kompletan sajt (ažurirano)

Ovaj paket sadrži CEO sajt sa svim novim i izmenjenim stranama.
Najlakše: izvuci zip i zameni fajlove u repo-u, push na GitHub, pa Ctrl+Shift+R.

## Novo u ovom paketu
- **6 novih predmeta** (predmet-strana na 8 jezika + Formule + Skripta + Zadaci), upisani u `predmeti.html`:
  Energetska elektronika 1 i 2 · Električne mašine 1, 2, 3 · Elektroenergetski pretvarači
- **„Zadaci" – cela inicijativa**: osnovna, srednja, tematski, programiranje, fakultet i sva elektrotehnika
- **Prodavnica** preuređena oko **Mathia Student Planera** (online uz nalog · pun živi demo · 1.990 RSD)
- **Mathia Student Planner** — `Mathia-Student-Planner.html`
- **Završni i18n**: „Probaj besplatno" i „Otvori skriptu" se sada prevode na svih 8 jezika; srpski proveren (ekavica)

## ⚙️ Backend — da nove stvari potpuno prorade
Strane rade odmah (sadržaj se vidi). Za AI-klona i naplatu na NOVIM stavkama dodati u backend:
1. `chat.js` (MODES): 6 novih „mozgova", mode = slug strane (vidi spisak dole) — da Profesorica na Formule/Skripta zna baš to gradivo.
2. Pretplata/gejtovanje (`gate.js` + lista predmeta): dodati 6 novih predmeta i **Planer (PLANER-2026)** sa modelom „online pristup uz nalog".
3. `lib/proizvodi.js`: dodati **PLANER-2026** (cena 1990 RSD); posle uspešne kupovine odobriti online pristup nalogu.

Slugovi novih predmeta:
`energetska-elektronika-1`, `energetska-elektronika-2`, `elektricne-masine-1`, `elektricne-masine-2`, `elektricne-masine-3`, `elektroenergetski-pretvaraci`

Uči s ljubavlju · mathia.rs
