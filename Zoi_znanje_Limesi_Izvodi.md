# ZOI — BAZA ZNANJA: Limesi, izvodi i izvod po definiciji

> Materijal za prijemni ispit (Fakultet tehničkih nauka), Matematičku analizu 1 i matematiku 4. razreda srednje škole.

---

## 0. PRAVILA ČITANJA I IZGOVORA (OBAVEZNO)

Ova pravila važe za **ceo Zoi**, ne samo za ovu lekciju — najbolje ih je staviti i u glavni sistemski prompt.

- **„FTN" se UVEK izgovara i čita kao „Fakultet tehničkih nauka".** Nikada se ne sriče kao slova („ef-te-en"). Kad god se u tekstu pojavi skraćenica FTN, pročitaj je kao pun naziv: *Fakultet tehničkih nauka*.
- U ovom dokumentu je zato svuda namerno napisan **pun naziv „Fakultet tehničkih nauka"** umesto skraćenice, da se izbegne pogrešno sricanje.
- Ako se ikada doda nova skraćenica koja se ne sme sricati, dopiši je u ovu listu po istom obrascu (skraćenica → kako se izgovara).

**Ako Zoi čita formule naglas**, čita ih rečima, ne kao simbole:
- `lim (x→2)` → „limes kada iks teži dvojci"
- `√` → „koren iz", `^2` → „na kvadrat", `^3` → „na treći"
- `Δx` → „delta iks", `→ 0` → „teži nuli"
- `f'(x)` → „eф prim od iks" (izvod funkcije)

---

## 1. PEDAGOŠKI STIL (kako Zoi vodi učenika)

- Topao, strpljiv, ohrabrujući ton. Ekavica. Greška je dobrodošla: *„baš je dobro što si pogrešila, da to vidimo."*
- Ne daje odmah gotovo rešenje — vodi korak po korak i postavlja kratko pitanje („šta dobiješ kad ubaciš broj?").
- **Uvek prvo ANALIZA**: ubaci graničnu vrednost i vidi koji neodređeni oblik dobijaš. *„Analiza ti je obavezna, uvek prvo to uradi."*
- Izvod uvek uradi i **napamet preko tablice — kao proveru** rezultata dobijenog po definiciji.
- Podstiče da učenik **odštampa tablicu izvoda/integrala i trigonometrijske identitete** i drži ih ispred sebe dok vežba.

---

## 2. LIMESI — sistem „tipova"

Profesorkin sistem numerisanja neodređenih oblika (skraćeno):
- **Tip 4** = oblik 0/0 sa **polinomima** → rešava se **Hornerovom šemom** (faktorizacija).
- **Tip 5** = oblik 0/0 sa **korenom** → rešava se **racionalizacijom**; posle racionalizacije se **svodi na tip 4**.
- **Poseban slučaj: broj/0** (samo imenilac je nula) → razdvoji na **levi i desni limes**; ako se razlikuju, **limes ne postoji**.

### Pravilo „broj/0"
Kad posle skraćivanja ostane broj podeljen nulom (npr. 15/0), rezultat je ±beskonačno, ali zavisi od strane:
- ako imenilac teži +0 → +beskonačno; ako teži −0 → −beskonačno.
- Ako su levi i desni različiti (jedan +∞, drugi −∞) → **limes ne postoji**.
- Poenta: *„beskonačno kao rezultat sme, ali dva različita rezultata ne smeju."*

### Primer 1 — kad samo imenilac ode u nulu (limes ne postoji)
lim (x→2) od (x^3 + 2x^2 − 5x − 6) / (x^3 − 3x^2 + 4) — oblik 0/0.

- Horner sa korenom 2: brojilac = (x − 2)(x + 1)(x + 3); imenilac = (x − 2)^2 (x + 1).
- Skrati (x − 2)(x + 1): ostaje lim (x→2) od (x + 3)/(x − 2) = 15/0 → sad je oblik **broj/0**, ne više 0/0.
- x→2+ : (+15)/(+0) = +beskonačno; x→2− : (+15)/(−0) = −beskonačno.
- Levi ≠ desni → **limes ne postoji.**

### Primer 2 — koren u brojiocu (tip 5 → racionalizacija)
lim (x→3) od (√(x + 6) − x) / (x − 3) — oblik 0/0.

- Racionališi brojilac (pomnoži i brojilac i imenilac konjugatom √(x + 6) + x):
  = lim (x→3) od ((x + 6) − x^2) / ((x − 3)(√(x + 6) + x)).
- Brojilac (x + 6 − x^2) = −(x^2 − x − 6) = −(x − 3)(x + 2). Skrati (x − 3):
  = lim (x→3) od −(x + 2) / (√(x + 6) + x) = −5 / (√9 + 3) = −5/6.

### Primer 3 — koren i u brojiocu i u imeniocu (racionališi oba)
lim (x→4) od (√(1 + 2x) − 3) / (√x − 2) — oblik 0/0.

- Racionališi i gore i dole (konjugat √(1 + 2x) + 3 gore, i √x + 2 dole):
  = lim (x→4) od ((1 + 2x − 9)(√x + 2)) / ((x − 4)(√(1 + 2x) + 3)).
- Brojilac (2x − 8) = 2(x − 4). Skrati (x − 4):
  = lim (x→4) od 2(√x + 2) / (√(1 + 2x) + 3) = 2(2 + 2) / (3 + 3) = 8/6 = 4/3.

**Ključno za tip 5:** ako je koren samo u brojiocu (ili samo u imeniocu) — racionališeš tu stranu; ako je koren i gore i dole — racionališeš obe. Posle racionalizacije, ako i dalje izlazi 0/0 sa polinomom, nastavi Hornerom (tip 4).

---

## 3. IZVODI — tablica i pravila

Osnovna tablica:
- (C)' = 0  (izvod konstante je nula)
- (x)' = 1
- (x^α)' = α · x^(α−1)  („stepen padne dole ispred, x se prepiše, stepen se umanji za 1")
  - primeri: (x^5)' = 5x^4 ; (x^7)' = 7x^6 ; (x^(−3))' = −3 x^(−4)

Pravila:
- **Konstanta se izbaci ispred:** (c · f)' = c · f'. Npr. (5x)' = 5 · (x)' = 5; ((2/5)x)' = 2/5.
- **Linearnost (zbir/razlika):** (f ± g)' = f' ± g'. *„Kad je plus-minus, smeš da razdvojiš — to je lepa osobina izvoda."*

---

## 4. IZVOD PO DEFINICIJI

Formula (mora se znati napamet):

f'(x) = lim (Δx→0) od ( f(x + Δx) − f(x) ) / Δx

**Metod smene („srce ♥"):** kad vidiš f(nečega), zameni to „nešto" svuda gde u funkciji stoji x. Tj. ako je f(♥), onda umesto svakog x pišeš ceo izraz ♥ (npr. x + Δx). *„Umesto iksa piši srce — šta god da je u zagradi, ide na mesto iksa."*

**Uvek paralelno uradi i napamet (preko tablice), kao proveru.**

### Primer A — (c·x)' po definiciji
f(x) = c·x, pa je f(x + Δx) = c(x + Δx) = cx + cΔx.
f'(x) = lim (Δx→0) od (cx + cΔx − cx) / Δx = lim (Δx→0) od (cΔx)/Δx = c.
Provera (tablica): (c·x)' = c · 1 = c. ✓

### Primer B — (5x)' po definiciji
f(x) = 5x, f(x + Δx) = 5x + 5Δx.
f'(x) = lim (Δx→0) od (5x + 5Δx − 5x)/Δx = lim (Δx→0) od (5Δx)/Δx = 5.
Provera: (5x)' = 5. ✓

### Primer C — (x^2)' po definiciji
f(x) = x^2, f(x + Δx) = (x + Δx)^2 = x^2 + 2xΔx + Δx^2.
f'(x) = lim (Δx→0) od (x^2 + 2xΔx + Δx^2 − x^2)/Δx
      = lim (Δx→0) od (2xΔx + Δx^2)/Δx
      = lim (Δx→0) od (2x + Δx) = 2x.
Provera: (x^2)' = 2x. ✓

### Primer D — (x^2 − x + 1)' po definiciji
f(x) = x^2 − x + 1, pa je f(x + Δx) = (x + Δx)^2 − (x + Δx) + 1.
f'(x) = lim (Δx→0) od ( [(x + Δx)^2 − (x + Δx) + 1] − [x^2 − x + 1] ) / Δx
      = lim (Δx→0) od (2xΔx + Δx^2 − Δx)/Δx
      = lim (Δx→0) od (2x + Δx − 1) = 2x − 1.
Provera (linearnost): (x^2)' − (x)' + (1)' = 2x − 1 + 0 = 2x − 1. ✓

---

## 5. ČESTE GREŠKE (da Zoi na njih upozori)
- Preskakanje analize (ne ubaci graničnu vrednost pre nego što „juri" postupak).
- Kod oblika broj/0 — zaborav da se razdvoji na levi i desni limes (pa pogrešno tvrdi da limes postoji).
- Kod racionalizacije — konjugovanje samo jedne strane kad koren postoji i gore i dole.
- Kod izvoda po definiciji — pogrešna smena f(x + Δx) (ne zameni se x svuda); zaborav da Δx u imeniocu mora da se skrati pre nego što se pusti Δx→0.
- Kod (c·x)' — pomešano sa (C)': konstanta koja **množi** x ostaje (izbaci se ispred), a konstanta **sama** ima izvod 0.
