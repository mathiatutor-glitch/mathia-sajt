# FTN klon · 3 — Banka zadataka + probni test

> Sva rešenja su proverena. Ovo je **startni** materijal — proširi ga zadacima iz zvanične FTN zbirke i rešenih prijemnih (dokument 1).
> Oznake: `x^2` = stepen, `√` = koren.

---

## A. Banka — rešeni primeri po oblastima

### Kvadratne jednačine (oblast 7)
**Zadatak:** Reši `x^2 − 5x + 6 = 0`.
1. Diskriminanta: D = (−5)^2 − 4·1·6 = 25 − 24 = 1
2. x = (5 ± √1) / 2 = (5 ± 1)/2
3. **Rešenja: x = 3 i x = 2.**
*Provera (Vijet): zbir = 5 ✓, proizvod = 6 ✓.*

### Iracionalne jednačine (oblast 8)
**Zadatak:** Reši `√(x + 7) = x + 1`.
1. Uslov: x + 1 ≥ 0 → x ≥ −1.
2. Kvadriraj: x + 7 = (x + 1)^2 = x^2 + 2x + 1
3. x^2 + x − 6 = 0 → x = 2 ili x = −3
4. Odbaci x = −3 (ne zadovoljava x ≥ −1).
5. **Rešenje: x = 2.** *(Provera: √9 = 3 = 2+1 ✓)*

### Logaritamske jednačine (oblast 9)
**Zadatak:** Reši `log₂(x) + log₂(x − 2) = 3`.
1. Domen: x > 2.
2. log₂(x(x−2)) = 3 → x(x−2) = 2^3 = 8
3. x^2 − 2x − 8 = 0 → x = 4 ili x = −2
4. Odbaci x = −2 (van domena).
5. **Rešenje: x = 4.**

### Eksponencijalne jednačine (oblast 9)
**Zadatak:** Reši `2^(x+1) = 8^(x−1)`.
1. 8 = 2^3 → 8^(x−1) = 2^(3x−3)
2. Iste osnove: x + 1 = 3x − 3
3. 4 = 2x → **x = 2.**

### Sistemi (oblast 7)
**Zadatak:** Reši `x + y = 5`, `x^2 + y^2 = 13`.
1. (x+y)^2 = x^2 + y^2 + 2xy → 25 = 13 + 2xy → xy = 6
2. x i y su rešenja `t^2 − 5t + 6 = 0` → t = 2, 3
3. **Rešenja: (x, y) = (2, 3) i (3, 2).**

### Nizovi (oblast 11)
**Aritmetički:** a₁ = 3, d = 4. Tada a₁₀ = 3 + 9·4 = **39**, S₁₀ = 10/2·(3+39) = **210**.
**Geometrijski:** b₁ = 2, q = 3. Tada b₅ = 2·3^4 = **162**, S₅ = 2·(3^5 − 1)/(3 − 1) = **242**.

### Trigonometrija (oblast 10)
**Zadatak:** Reši `2 sin x − 1 = 0` na [0, 2π].
1. sin x = 1/2
2. **x = π/6 i x = 5π/6.** *(opšte: x = π/6 + 2kπ ili 5π/6 + 2kπ)*

### Planimetrija (oblast 13)
**Zadatak:** Romb ima dijagonale 6 i 8. Naći stranicu i površinu.
1. Stranica = √((6/2)^2 + (8/2)^2) = √(9 + 16) = **5**
2. Površina = (d₁·d₂)/2 = (6·8)/2 = **24**.

### Analitička geometrija (oblast 16)
**Zadatak:** Prava kroz A(1, 2) i B(3, 6).
1. Koeficijent pravca: k = (6 − 2)/(3 − 1) = 2
2. y − 2 = 2(x − 1) → **y = 2x.**

---

## B. Probni test (simulacija) — 11 zadataka × 6 bodova = 66

> Predlog vremena: 90 min. Klon zadaje, učenik rešava, pa klon pregleda i objasni greške.

1. Izračunaj `(2^(−1) + 3^(−1))^(−1)`.
2. Skrati izraz `(x^2 − 9) / (x^2 − x − 6)`.
3. Reši sistem `2x − y = 1`, `x + y = 5`.
4. Koliki je zbir rešenja jednačine `x^2 − 7x + 10 = 0`?
5. Reši `√(2x + 3) = x`.
6. Reši `3^(2x) = 81`.
7. Reši `log₂(x + 1) = 3`.
8. Aritmetički niz: a₁ = 5, a₅ = 21. Naći d i S₅.
9. Izračunaj `sin 30° + cos 60° + tan 45°`.
10. Površina jednakostraničnog trougla stranice 6.
11. Rastojanje tačaka A(1, 2) i B(4, 6).

### Rešenja (ključ)
1. (1/2 + 1/3)^(−1) = (5/6)^(−1) = **6/5**
2. (x−3)(x+3) / ((x−3)(x+2)) = **(x + 3)/(x + 2)** (x ≠ 3, x ≠ −2)
3. **x = 2, y = 3**
4. Vijet: zbir = **7** (rešenja su 2 i 5)
5. x^2 − 2x − 3 = 0 → x = 3 ili −1; uslov x ≥ 0 → **x = 3**
6. 3^(2x) = 3^4 → 2x = 4 → **x = 2**
7. x + 1 = 2^3 = 8 → **x = 7**
8. d = (21 − 5)/4 = **4**; S₅ = 5/2·(5 + 21) = **65**
9. 1/2 + 1/2 + 1 = **2**
10. (√3/4)·6^2 = **9√3**
11. √((4−1)^2 + (6−2)^2) = √(9 + 16) = **5**

---

## C. Kako ovo koristiti u klonu
- Ubaci banku i probni test u **znanje** klona (uz FTN zbirku), da ima proverene tačne odgovore.
- Neka klon u režimu „Probni test" zadaje slične zadatke, meri vreme i na kraju **objasni svaku grešku** + da sličan zadatak za uvežbavanje.
- Vremenom dodaj po 10–15 zadataka **po oblasti** (najlakše: iz rešenih prijemnih 2015–2025).
