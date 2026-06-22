================================================================
MathIA — predmet „Sistemi i signali"  (build paket)
================================================================

STA JE OVO
----------
Kompletan build novog predmeta po istom toku kao raniji predmeti:
dve e-knjige (Skripta + Formule) na 7 jezika (EN·DE·FR·ES·IT·RU·PT),
landing stranica, i wiring snippeti za chat.js / predmeti.html /
nalog.html / index.html.

POSTEN STATUS RENDERA
---------------------
Originalni build-alat (render.js + shells) bio je zakljucan u velikim
zip-ovima koje nije bilo moguce provuci. Zato je render REKONSTRUISAN iz
ugovora generatora (gen_ma1*.js), modela sadrzaja (ma2.js) i oblika i18n
recnika (ma1_dict_snippet.js). Veran je ULAZNO/IZLAZNOM ugovoru pipeline-a,
ali NIJE bajt-identican originalnom engine-u. Provere su iskrene (iz ovog
koda): KaTeX 0.17.0 server-side renderuje svaku formulu sa throwOnError.

REZULTAT BUILDA (cisto):
  Skripta:  382.517 B · REG 130 · MISS 0 · WARN 0 · KaTeX greske 0 · 15 oblasti
  Formule:  116.350 B · REG  43 · MISS 0 · WARN 0 · KaTeX greske 0 ·  9 sekcija
  i18n:     141 niski × 7 jezika, 0 nedostaje.

PRE DEPLOY-a (preporuka)
------------------------
Kad dobijes pristup originalnom render.js/shells iz zip-a, ponovo generisi
knjige tim engine-om (sadrzaj/i18n/generatori ovde su vec u tacnom formatu) i
uporedi (diff) sa ovde isporucenim HTML-om. Sadrzaj je drop-in:
  content/sistemi_signali.js, content/sistemi_signali_formule.js,
  content/_sistemi_signali_strings.json, content/sistemi_signali.i18n.js

SADRZAJ PAKETA
--------------
  _final/Sistemi-Signali-Skripta.html   <- gotova e-knjiga (Skripta)
  _final/Sistemi-Signali-Formule.html   <- gotova e-knjiga (Formule)
  predmet-sistemi-signali.html          <- landing (data-mode="sistemi-signali")
  content/                              <- izvor (skripta, formule, strings, i18n, i18n.map)
  shells/                               <- multilingual shell-ovi (KaTeX CSS 0.17, prebacivac jezika)
  render.js                             <- rekonstruisani engine
  gen_sistemi_signali.js                <- generator Skripte
  gen_sistemi_signali_formule.js        <- generator Formula
  extract.js, build_i18n.js, make_shells.js  <- pomocni koraci
  wiring/01..04                         <- snippeti za chat.js, predmeti, nalog, index

PONOVNI BUILD (lokalno)
-----------------------
  npm i katex            # 0.17.x
  node extract.js        # -> content/_sistemi_signali_strings.json (141)
  node build_i18n.js     # -> content/sistemi_signali.i18n.js (141, 0 nedostaje)
  node make_shells.js    # -> shells/*.html
  node gen_sistemi_signali.js
  node gen_sistemi_signali_formule.js

WIRING CEKLISTA
---------------
  [ ] chat.js     — dodat kljuc „sistemi-signali" u CLONES (+ alias)   (wiring/01)
  [ ] predmeti.html — kartica -> predmet-sistemi-signali.html          (wiring/02)
  [ ] nalog.html  — unos kljuc->landing                                (wiring/03)
  [ ] index.html  — katalog unos (ako nije auto)                       (wiring/04)
  [ ] upload: Sistemi-Signali-Skripta.html, -Formule.html, predmet-sistemi-signali.html

================================================================
DOPUNA — landing na TVOM templejtu + „signal" ilustracija
================================================================
predmet-sistemi-signali.html je sада napravljen od TVOG templejta
(predmet-merenja-nev.html): ista paleta, fontovi, gold-foil animacije,
widget (data-mode="sistemi-signali", Marina) i gate.js (data-subject).
Sadrzaj je prebacen na „Sistemi i signali" na svih 7 jezika (data-i18n).

NOVO: u karticu predmeta (.subjcard) ubacena je animirana zlatna „signal"
ilustracija — sama se iscrtava (stroke-dashoffset), blago svetluca, a zlatna
tacka „sonda" klizi po signalu (SVG animateMotion). Postuje prefers-reduced-motion.

Da JE DOBIJE SVAKI PREDMET: vidi wiring/05_signal-ilustracija.snippet.txt
(CSS + SVG + JS u 3 koraka) i biblioteku gotovih putanja po predmetu:
signali, cista sinusoida, analiza (kriva), verovatnoca (Gausova kriva),
RC kola, linearna algebra (vektori).

================================================================
DOPUNA 2 — hero linija, e-knjige u stilu sajta, dodatni landinzi
================================================================
1) predmet-sistemi-signali.html: pored ilustracije u kartici, dodata je i
   tanka "signal" linija u HERO POZADINI (zlatna, sama se iscrtava, opacity .15,
   iza sadržaja). prefers-reduced-motion: prikaže se statična.

2) E-KNJIGE su sada u IZGLEDU SAJTA (1:1): paleta (paper/rose/plum/gold),
   fontovi Cormorant Garamond + Nunito + Pinyon + Tangerine, gold-foil traka,
   corner ornamenti, hero-math simboli i animirana zlatna "signal" masthead-linija.
   Cormorant nema ćirilicu pa naslovi imaju fallback na Source Serif 4 (ru ostaje čitljiv).
   Sadržaj/i18n/KaTeX nepromenjeni; build čist (MISS 0 · WARN 0 · 0 KaTeX grešaka).
   Novi shell generator: make_shells.js.

3) landings-extra/ — gotovi landinzi za još 2 predmeta iz biblioteke talasa,
   svaki sa svojom ilustracijom (talas + glifovi) i punim 7-jezičnim i18n:
     • predmet-verovatnoca.html     — Gausova kriva, P(A)/μ/σ, mode=fax-verovatnoca
     • predmet-elektricna-kola.html — RC kriva, V/I/Z,   mode=fax-kola
   Oblasti su preuzete iz tvog chat.js (CLONES). Generator: make_landing_generic.js + make_run.js.
   NAPOMENA: linkovi na e-knjige (Verovatnoca-*.html, Elektricna-Kola-*.html) su po
   KONVENCIJI imena — te knjige NISU građene; pre deploy-a uskladi nazive sa stvarnim fajlovima
   (ili reci da ih izgenerišem istim tokom kao za „Sistemi i signali").
