# Matematika za prijemni — FTN
### Kompletno gradivo (baza znanja za klon „Profesorica")

> Sve oblasti sa formulama, metodama, prepoznatljivim tehnikama profesorice i proverenim rešenim primerima. Ekavica.

**Sadržaj:**
1. Algebarski izrazi (stepeni, koreni, razlika kvadrata i kubova, polinomi, iracionalne, sistemi)
2. Kvadratna jednačina i nejednačina
3. Eksponencijalne jednačine i nejednačine
4. Logaritmi
5. Trigonometrija
6. Funkcije
7. Nizovi i matematička indukcija
8. Limesi (granične vrednosti)
9. Kombinatorika (faktorijel, binomni koeficijent / binomni obrazac)
10. Kompleksni brojevi
11. Vektori
12. Analitička geometrija
13. Planimetrija
14. Stereometrija
15. Integrali i izvodi
16. Proporcije i procenti
17. Pokrivenost zvaničnog FTN programa + izvori materijala

---

## 1. Algebarski izrazi

**Formule:**
- kvadrat binoma: (a ± b)² = a² ± 2ab + b²
- **razlika kvadrata: a² − b² = (a − b)(a + b)**
- **razlika kubova: a³ − b³ = (a − b)(a² + ab + b²)**; zbir kubova: a³ + b³ = (a + b)(a² − ab + b²)
- stepeni: aᵐ·aⁿ = aᵐ⁺ⁿ, aᵐ/aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ
- **√(a²) = |a|** → odredi znak (npr. proceni √2 ≈ 1,4 da vidiš da je 2 − 2√2 < 0 → izlazi sa minusom)
- koren proizvoda/količnika: √(ab) = √a·√b, √(a/b) = √a/√b

**Tehnike:**
- „ne množi svaki sa svakim — zaokruži levo i desno od minusa pa primeni formulu razlike kvadrata"
- „obavezno zagrada kad oduzimaš ceo izraz, pa okreni znakove svima unutra"
- sabiranje sličnih „komada" (3 komada √3 − 4 komada √3 = −1 komad √3)
- dva polinoma su jednaka ⟺ jednaki su koeficijenti uz iste stepene

**Racionalni izrazi i polinomi:**
- skraćivanje razlomaka tek posle faktorizacije (rastavi brojilac i imenilac, pa skrati)
- deljenje polinoma / Hornerova šema; **Bezuova teorema:** ostatak deljenja P(x) sa (x − a) jednak je P(a); a je nula ⟺ (x − a) deli P(x)
- uslov: imenilac ≠ 0 (oblast definisanosti)

**Iracionalne jednačine** (√ sa nepoznatom):
- izoluj koren pa kvadriraj; **obavezno proveri rešenja** (kvadriranje uvodi lažna rešenja) i vrati u polaznu jednačinu
- uslov: potkorena veličina ≥ 0

**Linearne jednačine i sistemi:**
- sistem 2×2: smena ili suprotni koeficijenti (sabiranje); proveri rešenje u obe jednačine
- „izrazi jednu nepoznatu pa ubaci u drugu"

---

## 2. Kvadratna jednačina i nejednačina

**Jednačina** ax² + bx + c = 0:
- diskriminanta **D = b² − 4ac**; rešenja x₁,₂ = (−b ± √D) / (2a)
- D > 0 dva realna, D = 0 jedno (dvostruko), D < 0 nema realnih
- **Vietove formule:** x₁ + x₂ = −b/a, x₁·x₂ = c/a

**Nejednačina** (npr. ax² + bx + c ≥ 0):
- nađi nule, postavi **tablicu znaka**; za a > 0 parabola „otvorena nagore" → pozitivna van nula, negativna između
- za „< 0" → rešenje između nula; za „> 0" → van nula

---

## 3. Eksponencijalne jednačine i nejednačine

- **svedi na istu osnovu** pa izjednači izložioce: aᶠ⁽ˣ⁾ = aᵍ⁽ˣ⁾ ⟹ f(x) = g(x)
- kod nejednačina: **osnova > 1 → znak se čuva**; **osnova ∈ (0,1) → znak se okreće**
- primer: 3^(−3+6x) > 3² (osnova 3 > 1) → −3 + 6x > 2 → x > 5/6

---

## 4. Logaritmi

- definicija: log_a b = c ⟺ aᶜ = b
- **uslovi (oblast definisanosti):** osnova **a > 0 i a ≠ 1**, argument **> 0**
- osobine: log(xy) = log x + log y; log(x/y) = log x − log y; log(xⁿ) = n·log x; promena osnove
- **recipročni log:** 1/log_b 5 = log₅ b
- kod log-nejednačina: osnova > 1 → smer se čuva; osnova ∈ (0,1) → smer se okreće → razdvoji slučajeve i uzmi uniju (uvek prvo oblast definisanosti)

---

## 5. Trigonometrija

### Uvod, krug, definicije
- ugao se meri od pozitivnog dela x-ose; suprotno od kazaljke = plus
- π = 180°; π/2 = 90°, π/3 = 60°, π/4 = 45°, π/6 = 30°, 2π/3 = 120°, 3π/4 = 135°, 5π/6 = 150°
- za nestandardan ugao → **proporcija** 180° : π = x° : (radijani)
- u pravouglom trouglu: sin = naspramna/hipotenuza, cos = nalegla/hipotenuza, tg = naspramna/nalegla, ctg = obrnuto
- mnemonik: „sinus i kosinus su **mali** → traže hipotenuzu; tangens i kotangens su **veliki** → ne treba im"
- **tg = sin/cos**, ctg = cos/sin
- **osnovni identitet: sin²x + cos²x = 1**
- vrednosti s kruga: obrazac **0, √1, √2, √3, √4 — sve /2**; sin/cos ∈ **[−1, 1]** (ograničeni), tg/ctg neograničeni (−∞, +∞)

### Redukcione formule (svođenje)
- **parnost:** cos(−x) = cos x (parna, „pojede minus"); sin, tg, ctg neparne → minus ispred
- **±2π:** nestaje (ista tačka), funkcija ostaje ista
- **±π/2:** π/2 nestaje, funkcija prelazi u **kofunkciju** (sin↔cos, tg↔ctg)
- **±π:** kod sin/cos funkcija ostaje, znak se menja; kod tg/ctg (period π) nestaje, funkcija ostaje

### Adicione i dvostruki ugao
- sin(α ± β) = sinα cosβ ± cosα sinβ; cos(α ± β) = cosα cosβ ∓ sinα sinβ
- sin 2α = 2 sinα cosα; **cos 2α = cos²α − sin²α = 2cos²α − 1 = 1 − 2sin²α**
- **snižavanje stepena:** cos²α = (1 + cos2α)/2, sin²α = (1 − cos2α)/2
- transformacija zbira u proizvod (sin ± sin, cos ± cos): traži koeficijent 1 i istu funkciju

### Jednačine i nejednačine
- osnovne: sin x = a (|a| ≤ 1) → x = … + 2kπ; tg x = a → + kπ
- **zapis rešenja — pravilo „isti pravac / različit pravac"** (k ∈ ℤ = broj krugova):
  - dva rešenja na **istom pravcu** (tipično **tg, ctg**) → spoji ih sa **+ kπ** (npr. tg x = −√3 → x = −π/3 + kπ)
  - dva rešenja na **različitim pravcima** (tipično **sin, cos**) → svako posebno **+ 2kπ** (npr. sin x = ½ → x = π/6 + 2kπ ili x = 5π/6 + 2kπ)
  - **specijalan slučaj cos** (simetrija oko x-ose): cos x = ½ → x = ±π/3 + 2kπ (znak ± spaja, ali ostaje + 2kπ)
  - **granični slučajevi** sin = ±1, cos = ±1 → samo jedno rešenje (npr. sin x = 1 → x = π/2 + 2kπ)
- smena t = sin x ili t = cos x → **obavezno uslov t ∈ [−1, 1]**; tg/ctg bez uslova
- **dato: linearna veza sin i cos + kvadrant** (npr. a·sin α = b·cos α): iz sin²α + cos²α = 1 nađeš obe vrednosti, **znak biraš po kvadrantu**; pa tg = sin/cos, ctg = 1/tg = cos/sin (paran koren → ±, biraš po kvadrantu)
- **nejednačine:** prvo nađi gde je funkcija jednaka granici → strogo (prazni kružići, obične zagrade), nestrogo (puni, uglaste); čitaj od manjeg ka većem uglu, pazi smer; tg/ctg → + kπ

**Primer (jednačina):** 2cos4x = … → svedeš na cos2x → 4cos²2x − 4cos2x − 3 = 0, smena t = cos2x → t = 3/2 (odbaci, > 1), t = −1/2 → cos2x = −1/2 → **x = ±π/3 + kπ**

---

## 6. Funkcije

- domen (oblast definisanosti), kodomen, skup vrednosti
- nule funkcije (presek sa x-osom), znak (iznad/ispod ose)
- stacionarne tačke i ekstremi
- linearna funkcija y = kx + n: kroz dve tačke y − y₁ = ((y₂−y₁)/(x₂−x₁))(x − x₁); **paralelne k₁ = k₂**

---

## 7. Nizovi i matematička indukcija

### Aritmetički niz
- diferencija d; **opšti član aₙ = a₁ + (n−1)d**
- **suma Sₙ = (a₁ + aₙ)·n/2**
- prebrojavanje članova: poslednji indeks − prvi + 1
- osobina: **a₂ = (a₁ + a₃)/2** (aritmetička sredina)
- ako je suma data kao polinom (Sₙ = 7n² + 5n) → uporedi koeficijente → d, a₁

### Geometrijski niz
- količnik q; **opšti član bₙ = b₁·qⁿ⁻¹**
- **konačna suma Sₙ = b₁(1 − qⁿ)/(1 − q)**
- **beskonačni red S∞ = b₁/(1 − q)**, samo za **|q| < 1**
- osobina: **b₂² = b₁·b₃** (geometrijska sredina)
- q > 1 rastući, 0 < q < 1 opadajući
- **caka: prvi član b₁ ≠ 0** (ako je b₁ = 0, svaki član je 0 — niz nema smisla)

### Tehnike i provereni primeri
- „znaš a₁ i d (ili b₁ i q) — znaš sve"; **podeli dve jednačine da skratiš b₁**
- prepoznaj razliku kvadrata/kubova po q; **paran koren → ±**, biraj po uslovu (rastući → q > 1)
- b₄ − b₂ = 24, b₂ + b₃ = 6 → **q = 5, b₁ = 1/5** (1/5, 1, 5, …)
- b₄ − b₁ = 52, b₁+b₂+b₃ = 26 → **q = 3, b₁ = 2**, S₆ = **728**
- prva 4 = 30, b₅..b₈ = 480 (rastući) → q⁴ = 16 → q = 2, S₁₂ = **8190**
- kombinovani aritm.-geom. (zad. 14): q = 2 → (4, 8, 16 / 7, 9, 11); q = 1/2 → (16, 8, 4 / 19, 9, −1)
- log + niz: odredi x da 1/log₃5, 1/log₆5, 1/log_x5 čine AP → **x = 12**

### Matematička indukcija
- **tri koraka, uvek tim redom: baza, hipoteza (pretpostavka), induktivni korak**
- baza: uzmi **najmanji dozvoljen broj** (ne mora biti 1)
- u induktivnom koraku „sredi izraz tako da liči na hipotezu" pa iskoristi pretpostavku
- **deljivost** (česti tip): proizvod dva uzastopna broja deljiv sa 2; tri uzastopna sa 6; zbir/razlika dva broja deljiva sa n → i rezultat deljiv sa n
- indukcija i za **nejednačine** (isti postupak: baza → pretpostavka → korak)

---

## 8. Limesi (granične vrednosti)

**Algoritam:** prvo „ubaci pa analiziraj"; prepoznaj neodređen oblik; pravilo: broj/∞ = 0, ∞^poz = ∞, ∞^neg = 0.

**Tipovi:**
1. **x → ∞, ∞/∞** → izvuci najveći stepen x (ili najveću osnovu kod eksponencijalnih: aⁿ → ∞ za |a|>1, → 0 za |a|<1)
2. **x → 0, 0/0** → izvuci x i skrati
3. **x → broj ≠ 0, 0/0** → faktorizacija (razlika kvadrata ili **Hornerova šema**), skrati (x − a)
4. **sa korenima, 0/0** → racionalizacija konjugatom
5. **∞ − ∞** → racionalizacija: √ → razlika kvadrata (a−b)(a+b); ∛ → razlika kubova (a−b)(a²+ab+b²)

**Hornerova šema:** napiši koeficijente po opadajućem stepenu (uključi nule); testiraj koren a; spusti prvi, množi sa a, dodaj sledećem; ako je poslednja ćelija 0 → a je koren → P(x) = (x−a)·Q(x); ponovi za višestruki koren.

**Korisno:** √(n²·…) = n√…; ∛(n⁶) = n²; paran stepen pod parnim korenom → pozitivno.

**Provereni rezultati:**
- (5^(n+2) − 3ⁿ)/((−4)^(n+1) − 5ⁿ) → **−25**
- (5ⁿ + (−2)ⁿ)/(3^(n+2) + 5) → **+∞**
- (2ⁿ + n⁵)/(5ⁿ − (3/2)^(n+1)) → **0**
- √(n²+4n+1) − √(n²−n) → **5/2**
- ∛(n³+n²) − ∛(n³−1) → **1/3**
- (x²−1)/(2x²−x−1), x→1 → **2/3**
- (x²−x−12)/(2x²+11x+15), x→−3 → **7**
- (x³+2x²−4x−8)/(x³−x²−x−2), x→2 → **16/7**

**Metafora:** eksponencijalna vs polinom — „dva trkača": oba u beskonačno, ali eksponencijalna prva stigne → broj/∞ = 0.

---

## 9. Kombinatorika

- **faktorijel** n! = 1·2·3·…·n; 0! = 1
- **binomni koeficijent** C(n, k) = n! / (k!·(n−k)!) — „gornji faktorijel / (donji × (gornji−donji) faktorijel)"
- skraćivanje: razvij veći faktorijel do nižeg pa skrati
- simetrija: C(n, k) = C(n, n−k)
- jednačine sa binomnim koeficijentom → kvadratna → zadrži samo rešenje iz skupa **prirodnih brojeva ℕ**

---

## 10. Kompleksni brojevi

### Algebarski oblik
- **i = √(−1)**; i² = −1, i³ = −i, i⁴ = 1 (ciklus)
- **z = x + yi**; Re(z) = x, Im(z) = y (koeficijent uz i, sa znakom)
- **konjugovano z̄**: isti realni deo, suprotan znak imaginarnog
- deljenje → **racionalizacija konjugatom imenioca**
- **drugi koren** √(a+bi): postaviš = x+yi, kvadriraš → sistem x²−y² = a, 2xy = b (x, y realni → dva rešenja)
- kvadratna sa kompleksnim koeficijentima → formula, √diskriminante preko x+yi

### Eksponencijalni oblik
- **modul |z| = √(x² + y²)** (rastojanje od koordinatnog početka)
- **argument φ = arctg(y/x)** → dva kandidata, biraj po kvadrantu; arctg(±∞) = ±π/2, arctg(0) = 0 ili π (po znaku Re)
- **z = |z|·e^(i(φ + 2kπ))**

**Primer:** 2 − 2i → |z| = 2√2, IV kvadrant → φ = −π/4 → **2√2·e^(i(−π/4 + 2kπ))**

---

## 11. Vektori (3D)

- zapis preko i, j, k; vektor položaja; jednakost vektora po komponentama
- **ort (jedinični vektor): λ = AB/|AB|** (vektor podeljen intenzitetom)
- intenzitet |v| = √(x² + y² + z²)
- **skalarni proizvod** a·b = aₓbₓ + a_yb_y + a_zb_z; **ugao: cos∠ = (a·b)/(|a||b|)**
- **vektorski proizvod a × b** (Sarus) → daje vektor normalan na oba; **|a × b| = površina paralelograma**
- **mešoviti proizvod** = zapremina paralelopipeda
- minus → plus pa okreni znakove (kod razlaganja)

---

## 12. Analitička geometrija

### Tačka i prava
- prava **y = kx + n**; **paralelne k₁ = k₂**; **normalne k₁·k₂ = −1**; ugao između pravih preko koeficijenata pravca

### Parabola
- **y² = 2px**; **uslov dodira (tangente) p = 2kn**
- tangenta i normala u tački: k_t·k_n = −1
- primer (M na y² = 16x, p = 8): tangenta **y = 2x + 2**, normala **y = −½x + 9/2**, površina trougla (tangenta, normala, x-osa) = **20**

### Odnos prave i kružnice
- ubaci pravu u jednačinu kružnice → kvadratna po x → **diskriminanta**: D < 0 ne seče, D = 0 dodiruje (tangenta), D > 0 seče (dve tačke)

---

## 13. Planimetrija

- **jednakokraki trougao:** visina na osnovicu deli je na pola → Pitagora za krak; P = ½·osnovica·visina; r_upisani = 2P/obim
- **pravilni šestougao:** P = 6·(a²√3/4); dijagonale **kraća = a√3, duža = 2a**; r = a√3/2, R = a
- **jednakostranični trougao + krugovi:** R = ⅔·h, r = ⅓·h (h = a√3/2)
- **krug:** obim 2rπ, površina r²π; tetiva, prečnik (= 2R), tangenta
- **centralni i periferijski ugao:** periferijski = ½ centralnog nad istom tetivom; **Talesova teorema:** ugao nad prečnikom = 90°
- **kružni isečak / luk (proporcija):** 360° : φ = P_kruga : P_isečka; 360° : φ = O : l
- **četvorougao:** zbir uglova = 360°; **tetivni** α + γ = 180°; **tangentni** a + c = b + d
- dokazi: hipotenuza pravouglog trougla = prečnik opisanog kruga; **sin α = a/(2R)** (proširena sinusna teorema)

---

## 14. Stereometrija

**Alati:** jednakostranični trougao h = a√3/2; R_opisani = ⅔h = a√3/3, r_upisani = ⅓h = a√3/6.

- **prizma:** V = baza·H; dijagonalni presek (pravougaonik)
- **valjak:** V = r²π·H; omotač = 2rπ·H
- **kupa:** baza r²π, **omotač = rπs** (s = izvodnica), **s² = h² + r²**, V = ⅓·baza·h; omotač = kružni isečak (360° : φ = s²π : omotač)
- **piramida:** baza + omotač (3 jednakokraka trougla, svaki ½·a·h_b); V = ⅓·baza·H; **bočna visina h_b² = H² + (a√3/6)²**
- **lopta:** P = 4R²π, V = (4/3)R³π

**Metafora (sastavljena tela):** **površina = ono što rukama možeš da opipaš spolja; zapremina = koliko vode možeš da nasuješ unutra.** (Kod dvostruke kupe spojene baze su unutra → ne računaju se u površinu.)

**Provereni rezultati:**
- valjak ⊃ prizma ⊃ valjak (ista H): odnos zapremina velikog i malog valjka = **4 : 1**
- lopta, R raste za 1: ΔV = **13π/3**
- rotacija jednakostraničnog trougla oko visine → kupa: P = 3a²π/4, V = a³√3π/24
- rotacija oko stranice → dvostruka kupa: P = a²√3π, V = a³π/4
- pravilna trostrana piramida (a = √3, V = 3): P = **(3√3/4)(1 + √193)**

---

## 15. Integrali i izvodi

**Izvodi:**
- definicija: nagib tangente; pravila: (xⁿ)′ = n·xⁿ⁻¹, (sin x)′ = cos x, (cos x)′ = −sin x, (eˣ)′ = eˣ, (ln x)′ = 1/x
- pravilo proizvoda (uv)′ = u′v + uv′, količnika, **složene funkcije (lančano pravilo)**
- primena: stacionarne tačke (f′ = 0), monotonost (znak f′), ekstremi

**Integrali:**
- neodređeni integral ∫f(x)dx = F(x) + C (F′ = f)
- osnovne: ∫xⁿdx = xⁿ⁺¹/(n+1) + C (n ≠ −1), ∫(1/x)dx = ln|x| + C, ∫eˣdx = eˣ + C
- metode: smena promenljive, parcijalna integracija ∫u dv = uv − ∫v du
- određeni integral: površina ispod krive; primena na površinu i zapreminu

---

## 16. Proporcije i procenti

- proporcija a : b = c : d ⟺ a·d = b·c
- **produženi odnos:** izjednači zajednički član (npr. tim1:tim2 = 3:2, tim2:tim3 = … → 6:4:5)
- procenat: deo = (procenat/100)·celina; uvećanje za p% → ×(100+p)/100

## 17. Pokrivenost zvaničnog FTN programa + izvori materijala

**Zvanične FTN oblasti** (i da li su pokrivene ovim dokumentom):

| Zvanična oblast | U dokumentu |
|---|---|
| Logičke operacije i funkcije (tautologije) | ⚠️ nije obrađeno (proveriti da li smer traži) |
| Brojevi, uklj. kompleksne | ✅ (gl. 10) |
| Proporcionalnost | ✅ (gl. 16) |
| Racionalni izrazi i polinomi | ✅ (gl. 1) |
| Linearne i kvadratne (jed./nejed./sistemi) | ✅ (gl. 1, 2) |
| Stepenovanje i korenovanje | ✅ (gl. 1) |
| Algebarske i iracionalne jed./nejed. | ✅ (gl. 1) |
| Logaritamska i eksponencijalna | ✅ (gl. 3, 4) |
| Trigonometrija | ✅ (gl. 5) |
| Nizovi i matematička indukcija | ✅ (gl. 7) |
| Kombinatorika i binomni obrazac | ✅ (gl. 9) |
| Planimetrija | ✅ (gl. 13) |
| Stereometrija | ✅ (gl. 14) |
| Vektori | ✅ (gl. 11) |
| Analitička geometrija u ravni | ✅ (gl. 12) |
| Granične vrednosti, izvod i integral | ✅ (gl. 8, 15) |

**Struktura prijemnog po smerovima (kratko):** matematika je jezgro za sve smerove; P3 ima i **modul logike**, P4/P5/P6 imaju **test sklonosti** za struku; P7 (Arhitektura) i P8 (Scenska arhitektura) nisu matematički ispiti.

**Izvori materijala — šta postoji a NIJE doslovno u ovom dokumentu:**
- **Skenirana zbirka za FTN prijemni (~200 strana)** — sirov tekst iz ranije sesije; pokriva sve oblasti, ali njena **rešenja su u fajlu, nisu prepisana ovde**. Za doslovna rešena rešenja treba je ponovo provući.
- **Zvanični rešeni prijemni FTN 2021–2025** — referenca za vežbu; nije izvučeno u ovaj dokument.
- Ovaj dokument je **baza metoda + proverenih rezultata + ton klona**, namenjen kao znanje klona; nije zamena za punu rešenu zbirku.

---

*Pedagoški „potpis" kroz sve oblasti: piši svaki korak (ocenjuje se papir), uspori da ne praviš grube greške, radi proporciju umesto da pamtiš formulu, prepoznaj pravougli trougao, „od manjeg ka većem", obavezno proveri uslove i rešenja.*
