# Sve ispravke — 39 strana + 3 fajla

`api/chat.js` u folder **api/**, ostalo u **koren**.
`mathia-dict.js` (3,9 MB) **postavi SAM** — nikad ti nije prošao u grupi.

Ovaj folder zamenjuje `MATHIA-SVI-PREDMETI`, `MATHIA-KLON-R` i `MATHIA-ISPRAVKE`.

---

## `H_3` na dugmadima — našla sam

Dugmad za nastavak (`[[PITANJA]]`) su **goli tekst** — ne prolaze kroz obradu koja
u poruci pretvara `H_3` u H₃. Zato se LaTeX video sirov.

Rešeno na **dva mesta**, jer je model nedosledan:

1. **`widget.js`** — dugmad se čiste pre prikaza: indeksi i stepeni u Unicode (`H_3`→H₃,
   `x^2`→x²), grčka slova (`\alpha`→α), razlomci (`\frac{\sigma}{\sqrt{n}}`→σ/√(n)),
   `\binom{5}{2}`→C(5,2), `\mid`→`|`. Ono što piše na dugmetu je i ono što se pošalje.
   Testirano na 11 slučajeva, sve tačno.
2. **`api/chat.js`** — klonu je rečeno da u dugmadima **ne koristi LaTeX**, sa primerima.

> Zašto oba: testirala sam uživo i klon je ovog puta napisao čista dugmad
> („Reši ceo primer", „Nacrtaj stablo"). Ali na tvojoj slici je isti klon napisao `P(H_3|A)`.
> Nedosledan je — pa uputstvo smanjuje pojavu, a čišćenje u kodu hvata ostatak.

## Razmaci u četu — uzrok

Mehurić koristi `white-space: pre-wrap`, što znači da **model svojim prelomima reda
doslovno određuje razmak**. Dva prazna reda = rupa, jedan = zbijeno. Otud „negde premali,
negde previše".

Gore od toga: blok-formula ima svoj razmak iz CSS-a (`margin: .8em`), a u `pre-wrap`
dobijala je **još i prelome reda oko sebe** → dupla rupa.
Provereno uživo: klon stavlja **4 prazna reda oko formula** u tipičnom odgovoru.

Rešeno na oba kraja:
- **`widget.js`** — prelomi oko blok-formule se skidaju; razmak ostaje jedan, iz CSS-a
  (isto se već radilo za naslove)
- **`api/chat.js`** — klonu je zadata konvencija: tačno jedan prazan red između pasusa,
  nijedan unutar liste, nijedan oko formule i naslova, bez vodoravnih linija

## Ostalo u paketu

**`tg` umesto `tan`** — 10 strana. Kod nas se piše tg i ctg. Preko `\operatorname{tg}` da bude uspravno.

**Puni nazivi** — „Lopital i Tejlor" → **„Lopitalovo pravilo i Tejlorova formula"**,
„Bajes i nezavisnost" → „Bajesova formula i nezavisnost".

**Skraćenice u razlomcima (Matematika 2)** — nisi tražila, isti problem:
stajalo je `sin = nasuprot/hip`, iskošeno kao promenljive (`hip` je izgledalo kao h·i·p).
Sada **naspramna kateta / hipotenuza**, uspravno.

**Zbijene formule** — 33 strane, 238 blokova ponovo renderovano sa razmakom.

**Skroler kod bloka sa kodom** — `white-space: pre` → `pre-wrap` + uvučen nastavak reda.

**R klon** — 676 → 4.178 znakova. Ceo `d/p/q/r` sistem, testovi, ANOVA, regresija,
`pnorm` kao zamena za tablicu Φ, spisak tipičnih grešaka.

---

## Provereno

- tagovi u balansu na svih 39 strana
- 0 zaostalih `\tan` / `\cot`, 0 skraćenica u razlomcima
- 0 zbijenih formula na celom sajtu
- čišćenje dugmadi: 11/11 tačno

## Podsetnik

**Ono zbrkano ispod formula NIJE na tvom sajtu** — to je pregled fajla u Claude aplikaciji,
koji ne učitava KaTeX stilove. Provereno uživo: stilovi učitani, MathML skriven, sve uredno.
**Za proveru izgleda otvaraj sajt u pregledaču, ne pregled fajla.**

## Ostaje

**Naplata** — čeka se sertifikat od UPC-a.
