# Ispravke — 39 strana + 3 fajla

`api/chat.js` u folder **api/**, sve ostalo u **koren**.
`mathia-dict.js` (3,9 MB) **postavi SAM** — on ti nikad nije prošao u grupi.

---

## ⚠ Prvo ovo: ono zbrkano ispod formula NIJE na tvom sajtu

Ono što si videla (`n→∞lim (1 + n1)n = ex→0lim xsin x…`) je **pregled fajla u Claude
aplikaciji**, koji ne učitava KaTeX stilove sa interneta. Bez njih MathML — koji je inače
nevidljiv, služi čitačima ekrana — ispliva kao tekst i sve se zgusne.

**Provereno uživo na `mathia.rs/Analiza-1-Formule.html`:**
- `katex.min.css` učitan ✓
- MathML skriven (visina 1px) ✓
- zbrkanog teksta nema ✓
- svih 12 formula uredno ✓

Uporedila sam i strukturu pre/posle mojih izmena: **identična** (12 katex, 12 mathml, 12 html).
Nisam je ja napravila, i nije stvarna.

**Kad proveravaš izgled — otvaraj sajt u pregledaču, ne pregled fajla.**

---

## Šta jeste popravljeno

### 1. `tg` umesto `tan` — 10 strana

Kod nas se piše **tg** i **ctg**, ne `tan`/`cot`. KaTeX nema `\tg` ugrađen, pa je urađeno
preko `\operatorname{tg}` — renderuje se uspravno, kako i treba za oznaku funkcije.

Pogođeno: Analiza 1, Prijemni, Prijemni matematika, Srednja matematika, Matematika 2,
Osnovi elektrotehnike 2, Električne mašine 2, Tematski zadaci, Materijali ET.

### 2. Puni nazivi umesto skraćenica

- „Lopital i Tejlor" → **„Lopitalovo pravilo i Tejlorova formula"**
- „Bajes i nezavisnost" → **„Bajesova formula i nezavisnost"**

Pripremila sam i mapu za ostale ako se pojave: Tales i Pitagora, Vijet, Kramer, Gaus,
Tejlor i Makloren.

### 3. Skraćenice u razlomcima (Matematika 2) — nisi ovo tražila, ali je isti problem

Stajalo je:
```
sin = nasuprot/hip      cos = naleg./hip      tan = nasuprot/naleg.
```
Skraćeno **i iskošeno kao promenljive**, jer nije bilo u `\text{}` — pa je `hip` izgledalo
kao proizvod h·i·p.

Sada: **naspramna kateta / hipotenuza**, **nalegla kateta / hipotenuza**, uspravno.

### 4. `widget.js` — skroler kod bloka sa kodom

`white-space: pre` znači „nikad ne prelamaj red" → vodoravna traka u uskom panelu.
Sada `pre-wrap` + uvučen nastavak reda. Trake nema.

### 5. `api/chat.js` — R klon

676 → **4.178 znakova**. Ceo `d/p/q/r` sistem na svakoj raspodeli, intervali poverenja,
svi testovi, ANOVA, regresija sa čitanjem `summary(lm)` red po red, dijagnostika, simulacija.
Sa naglaskom da **`pnorm` zamenjuje tablicu Φ**.
Plus spisak tipičnih grešaka i uputstvo da drži redove koda kratkim.

---

## Provereno

- **tagovi u balansu** na svih 39 izmenjenih strana
- **0 zaostalih** `\tan` / `\cot` na celom sajtu
- **0 skraćenica** u razlomcima
- matrice nisu dirane

## Ostaje

**Naplata** — čeka se sertifikat od UPC-a.
**Rečnik** — postavi sam, i dalje je star na sajtu.
