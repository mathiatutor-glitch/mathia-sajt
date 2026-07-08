# Mathematics for the FTN Entrance Exam
### Complete syllabus (knowledge base for the "Zoi" tutor clone)

> Faculty of Technical Sciences (FTN), University of Novi Sad. All topics with formulas, methods, the tutor's signature techniques, and verified worked results. (Serbian original: `sr/01-gradivo-matematika.md`.)

**Contents:**
1. Algebraic expressions (powers, roots, difference of squares/cubes, polynomials, irrational equations, systems)
2. Quadratic equations and inequalities
3. Exponential equations and inequalities
4. Logarithms
5. Trigonometry
6. Functions
7. Sequences and mathematical induction
8. Limits
9. Combinatorics (factorial, binomial coefficient)
10. Complex numbers
11. Vectors
12. Analytic geometry
13. Planimetry
14. Solid geometry (stereometry)
15. Integrals and derivatives
16. Proportions and percentages
17. Coverage of the official FTN syllabus + source materials

---

## 1. Algebraic expressions
- binomial square: (a ± b)² = a² ± 2ab + b²
- **difference of squares: a² − b² = (a − b)(a + b)**
- **difference of cubes: a³ − b³ = (a − b)(a² + ab + b²)**; sum of cubes a³ + b³ = (a + b)(a² − ab + b²)
- powers: aᵐ·aⁿ = aᵐ⁺ⁿ, aᵐ/aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ
- **√(a²) = |a|** → determine the sign
- **Polynomials:** factor before cancelling; polynomial division / Horner's scheme; **Bézout:** remainder of P(x) ÷ (x − a) equals P(a); a is a root ⟺ (x − a) divides P(x)
- **Irrational equations:** isolate the root, square, **always check solutions** (squaring introduces false roots); condition: radicand ≥ 0
- **Linear systems:** substitution or elimination; verify in both equations

## 2. Quadratic equations and inequalities
- ax² + bx + c = 0; **discriminant D = b² − 4ac**; x₁,₂ = (−b ± √D)/(2a)
- **Vieta's formulas:** x₁ + x₂ = −b/a, x₁·x₂ = c/a
- inequalities: find roots, build a **sign table**; for a > 0 the parabola opens upward

## 3. Exponential equations and inequalities
- **reduce to the same base**, then equate exponents
- inequalities: **base > 1 keeps the sign; base ∈ (0,1) flips it**
- example: 3^(−3+6x) > 3² ⟹ x > 5/6

## 4. Logarithms
- log_a b = c ⟺ aᶜ = b
- **conditions:** base a > 0 and a ≠ 1, argument > 0
- log(xy)=log x+log y; log(x/y)=log x−log y; log(xⁿ)=n·log x; change of base
- inequalities: base > 1 keeps direction; base ∈ (0,1) flips it → split cases, take the union (always check the domain first)

## 5. Trigonometry
- π = 180°; standard angles 30/45/60/90/120/135/150°; unit-circle values follow the pattern √0…√4 all over 2
- **identity sin²x + cos²x = 1**; tan = sin/cos, cot = cos/sin
- sin/cos ∈ [−1,1] (bounded); tan/cot unbounded
- **reduction formulas** (parity, ±2π, ±π/2 → cofunction, ±π)
- **double angle:** sin2α = 2 sinα cosα; cos2α = cos²α − sin²α = 2cos²α − 1 = 1 − 2sin²α
- **power reduction:** cos²α = (1+cos2α)/2, sin²α = (1−cos2α)/2
- **solving equations — "same line / different line" rule** (k ∈ ℤ):
  - two solutions on the **same line** (typically tan, cot) → combine with **+ kπ**
  - two solutions on **different lines** (typically sin, cos) → each separately **+ 2kπ**
  - **cosine special case:** cos x = a → x = ±α + 2kπ
  - boundary sin = ±1, cos = ±1 → a single solution
- substitution t = sin x or cos x → **require t ∈ [−1,1]**
- given a linear relation between sin and cos + the quadrant → use sin²+cos²=1, choose signs by quadrant

## 6. Functions
- domain, codomain, range, zeros, sign, extrema
- linear function through two points; **parallel ⟺ equal slopes**

## 7. Sequences and mathematical induction
- **Arithmetic:** aₙ = a₁ + (n−1)d; Sₙ = (a₁ + aₙ)·n/2; a₂ = (a₁+a₃)/2
- **Geometric:** bₙ = b₁·qⁿ⁻¹; finite Sₙ = b₁(1−qⁿ)/(1−q); **infinite S∞ = b₁/(1−q) only for |q| < 1**; b₂² = b₁·b₃; **b₁ ≠ 0**
- techniques: divide two equations to cancel b₁; recognize difference of squares/cubes in q; even root → ±, choose by condition (increasing → q > 1)
- verified: q = 5, b₁ = 1/5 · q = 3, b₁ = 2, S₆ = 728 · q = 2, S₁₂ = 8190 · log+sequence x = 12
- **Mathematical induction:** three steps — base, hypothesis, inductive step; base = smallest allowed value (not necessarily 1); divisibility (product of two consecutive numbers divisible by 2, three by 6); also for inequalities

## 8. Limits
**Types:** (1) x→∞, ∞/∞ → factor highest power; (2) x→0, 0/0 → factor out x; (3) x→finite≠0, 0/0 → factor (difference of squares or **Horner's scheme**), cancel (x−a); (4) with roots → rationalize with the conjugate; (5) ∞−∞ → rationalize (√ → difference of squares; ∛ → difference of cubes).
- verified: −25, +∞, 0, 5/2, ∛… 1/3, 2/3 (x→1), 7 (x→−3), 16/7 (x→2)
- metaphor: exponential vs polynomial — "two runners"; number/∞ = 0

## 9. Combinatorics
- factorial n! ; **binomial coefficient C(n,k) = n!/(k!(n−k)!)**; cancel by expanding the larger factorial; symmetry C(n,k) = C(n,n−k); equations with binomial coefficients → keep only natural-number solutions

## 10. Complex numbers
- **Algebraic form:** i² = −1; z = x + yi; conjugate z̄; division by rationalizing with the conjugate; √(a+bi) via x²−y²=a, 2xy=b
- **Exponential form:** |z| = √(x²+y²); argument φ = arctan(y/x) (choose by quadrant); z = |z|·e^(i(φ+2kπ))
- example: 2 − 2i → 2√2·e^(i(−π/4 + 2kπ))

## 11. Vectors (3D)
- unit vector λ = AB/|AB|; magnitude |v| = √(x²+y²+z²)
- **dot product** a·b; **angle** cos∠ = (a·b)/(|a||b|)
- **cross product** a × b (Sarrus) → vector normal to both; **|a × b| = area of the parallelogram**
- **triple product** = volume of the parallelepiped

## 12. Analytic geometry
- line y = kx + n; **parallel k₁ = k₂; perpendicular k₁·k₂ = −1**
- **parabola** y² = 2px; tangency condition p = 2kn
- **line vs circle:** substitute into the circle → quadratic → discriminant: D < 0 no intersection, D = 0 tangent, D > 0 secant

## 13. Planimetry
- isosceles triangle; regular hexagon (shorter diagonal a√3, longer 2a); circle (circumference 2rπ, area r²π)
- **central and inscribed angle** (inscribed = ½ central); **Thales** (angle in a semicircle = 90°)
- circular sector/arc by proportion; cyclic quadrilateral α + γ = 180°; tangential a + c = b + d; **sin α = a/(2R)**

## 14. Solid geometry
- triangle height h = a√3/2; circumradius R = ⅔h, inradius r = ⅓h
- **prism** V = base·H; **cylinder** V = r²π·H, lateral 2rπH
- **cone** base r²π, **lateral rπs**, **s² = h² + r²**, V = ⅓·base·h
- **pyramid** base + lateral faces; V = ⅓·base·H; slant height h_b² = H² + (a√3/6)²
- **sphere** P = 4R²π, V = (4/3)R³π
- **metaphor:** surface = what you can touch; volume = how much water you can pour in (for composite solids the joined faces are inside → not counted in the surface)
- verified: big:small cylinder volume 4:1 · ΔV = 13π/3 · cone P = 3a²π/4, V = a³√3π/24 · double cone P = a²√3π, V = a³π/4 · pyramid P = (3√3/4)(1+√193)

## 15. Integrals and derivatives
- **Derivatives:** (xⁿ)′ = n·xⁿ⁻¹, (sin)′ = cos, (cos)′ = −sin, (eˣ)′ = eˣ, (ln x)′ = 1/x; product/quotient/chain rule; stationary points, monotonicity, extrema
- **Integrals:** ∫xⁿdx = xⁿ⁺¹/(n+1)+C, ∫(1/x)dx = ln|x|+C, ∫eˣdx = eˣ+C; substitution; integration by parts; definite integral = area; volume of revolution

## 16. Proportions and percentages
- proportion a : b = c : d ⟺ ad = bc; **extended ratio** (equalize the common term); percentage increase ×(100+p)/100

## 17. Coverage of the official FTN syllabus
The official FTN math syllabus has **18 areas (Group A — full)** and **13 areas (Group B — reduced)**. Group B has **no** planimetry, stereometry, analytic geometry, limits/derivatives or integrals. See `en/02-programs-and-levels.md`.

**Source materials that exist but are not reproduced here verbatim:** the official scanned FTN problem collection (~200 pp) and the official solved entrance exams 2012–2025 (links in `02-programs-and-levels`). This document is a base of methods + verified results + the tutor's tone, not a full solved problem collection.

---

*Signature pedagogy across all areas: write every step (the paper is graded, not you), slow down to avoid careless mistakes, use a proportion instead of memorizing a formula, look for the right triangle, always check conditions and solutions.*
