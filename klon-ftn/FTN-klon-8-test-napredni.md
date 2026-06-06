# FTN klon · 8 — Napredni set (20 zadataka, teži nivo)

> Za one koji su savladali osnove i ciljaju jače smerove (RA, elektrotehnika). Svi rezultati provereni (Python/sympy).

## Zadaci
1. Reši `x^4 − 5x^2 + 4 = 0`.
2. Reši `|2x − 3| = 5`.
3. Reši nejednačinu `(x − 1)/(x + 2) ≥ 0`.
4. Za koje `m` jednačina `x^2 − (m + 1)x + m = 0` ima dvostruko rešenje?
5. Reši `√(x + 5) − √x = 1`.
6. Reši `(log₂ x)^2 − 3 log₂ x + 2 = 0`.
7. Reši `2 sin²x − 3 cos x = 0` na `[0, 2π]`.
8. Reši `cos 2x = sin x` na `[0, 2π]`.
9. Zbir prvih n članova aritmetičkog niza je `Sₙ = 3n² + 2n`. Naći `a₁` i `d`.
10. Geometrijski niz: `a₂ = 6`, `a₅ = 48`. Naći `q` i `a₁`.
11. Koliko ima trocifrenih brojeva sa svim različitim ciframa?
12. Koeficijent uz `x³` u razvoju `(2 + x)^5`.
13. Reši `x^2 − 5|x| + 6 = 0`.
14. Trougao stranica `a = 7, b = 8, c = 9` — naći površinu.
15. Jednačina tangente na parabolu `y = x²` u tački `(1, 1)`.
16. Naći lokalne ekstreme funkcije `f(x) = x³ − 3x² + 4`.
17. Izračunaj `∫₁² (2x − 1) dx`.
18. Reši nejednačinu `2^x > 8`.
19. Reši `log x + log(x − 3) = 1` (logaritam osnove 10).
20. Naći kompleksan broj `z` ako je `z + 2z̄ = 6 − 3i` (z̄ je konjugat).

---

## Ključ (provereno)
1. **x = ±1, ±2** (smena t = x²)
2. **x = −1, x = 4**
3. **x < −2 ili x ≥ 1** (nula u 1, nije definisano u −2)
4. **m = 1** (D = 0 → (m − 1)² = 0)
5. **x = 4** (√9 − √4 = 1 ✓)
6. **x = 2, x = 4** (smena t = log₂ x → t = 1, 2)
7. **x = π/3, 5π/3** (2cos²x + 3cos x − 2 = 0 → cos x = 1/2)
8. **x = π/6, 5π/6, 3π/2** (2sin²x + sin x − 1 = 0)
9. **a₁ = 5, d = 6**
10. **q = 2, a₁ = 3** (q³ = 48/6 = 8)
11. **648** (9 · 9 · 8)
12. **40** (C(5,3) · 2²)
13. **x = ±2, ±3** (smena t = |x|)
14. **12√5** (Heronov obrazac, s = 12)
15. **y = 2x − 1** (y′ = 2x → k = 2)
16. **lok. maksimum (0, 4)** i **lok. minimum (2, 0)** (f′ = 3x² − 6x)
17. **2**
18. **x > 3**
19. **x = 5** (x² − 3x − 10 = 0, domen x > 3)
20. **z = 2 + 3i** (3a = 6, −b = −3)
