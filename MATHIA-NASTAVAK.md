# MATHIA — HANDOFF ZA NOVI CHAT (nastavi tačno odavde)
Zalepi ovo u novi chat + priloži `mathia-sajt-KOMPLET.zip`.

## KO/GDE
- dr Marina Bulat (FTN NS), netehnička, uploaduje ručno preko GitHub weba.
- MATHIA EDU (mathia.rs) — AI „Profesorica" za matematiku/fiziku/elektrotehniku/programiranje.
- Repo github.com/mathiatutor-glitch/mathia-sajt → Vercel project-y23je → live mathia.rs.
- kontakt@mathia.rs · IG @mathia.ai · YT @mathiatutor · FB https://www.facebook.com/share/1EuZcccwXR/?mibextid=wwXIfr

## NAČIN RADA (bitno)
- NEMA git/backup — ako treba „vrati staro", rekonstruiši iz razgovora. Menjaj MALO, šalji fajl na potvrdu pre sledećeg koraka. Radi SEKCIJU PO SEKCIJU.
- Provera bez deploya: wkhtmltoimage instaliran. Ukloni <script>, ubaci `<style>.reveal{opacity:1!important;transform:none!important}.slogan{clip-path:none!important}</style>` pre </head>, `wkhtmltoimage --enable-local-file-access --disable-javascript --width 1280 /tmp/x.html out.png`, pa view. (view zna da zataji — proveravaj i balans tagova.)
- Posle izmene: `count('<div')==count('</div>')`, `node --check widget.js`, i18n JSON validan.
- Zip: `cd repo && rm -f out.zip && zip -r -q out.zip . -x "*.DS_Store" "*__MACOSX*" "*BACKUP*"`.

## DIZAJN (ceo sajt „u jednom duhu" = predmet-analiza1.html, referenca koju Marina obožava)
- Paleta: paper #FBF6EE, plum #402A34/#432C37, gold #C6A05C, golddk #9C7838, goldlt #E7D2A2, rose #CC8E86/#B5746C, muted #8B7681, champ #F7EAC9, blush #F6E7E0.
- Fontovi: Cormorant Garamond (serif/meni), Nunito (sans), Pinyon Script & Tangerine (krasnopis).
- PRAVILA: NIKAD ne lomi rečenicu u 2 reda (kratke rečenice + <br> + text-wrap:balance). Bolduj ključne reči. Svaka sekcija VIZUELNO DRUGAČIJA. Animacije + zlatni presijavajući elementi + hover. Suptilan reljefni grid (već u index body, ~52px, ~3%) bez boja. BEZ ponavljanja; samo JEDNOM „Započni besplatno". Ne stavljati na naslovnu ono što ima svoju stranu. Premium/damski/skupo.

## HEDER (pravilo; primenjeno na index/predmeti/prodavnica)
- Levo logo-pečat + „Mathia/s Marinom"; sredina serif linkovi centrirani (Početna·Predmeti·Prodavnica·Paketi·O meni·Moj nalog) sa zlatnim hover; desno jezik-pilula. Bez „Probaj besplatno", bez ⌂.
- KRHKO: skripte nalognav/navham/ICON zavise od klase `.nav-r` — NE preimenovati. L.home nosi labelu bez ⌂.
- PREOSTALO: isti heder + strelica „nazad na početnu" na o-marini.html i 41 predmet-*.html.

## KLON (widget.js, site-wide, ?v=9)
- Naslovna data-mode="site"; predmetne data-mode="fax-...". Boje usklađene (zlatne). Pozdrav kratak, 4 čipa. Menja jezik na `mathia:lang`.
- PRAVILO: opšti klon SAMO na naslovnoj; specijalizovani na predmetnim; UKLONITI klon sa o-marini/prodavnica/predmeti.

## NASLOVNA (index.html) — URAĐENO OVE SESIJE
Heder nov; hero („Uči sa Marinom" presijava+ispisuje, nov topao uvod, potpis desno, „15 min na poklon", dugmad niže, uklonjena kruna, uklonjen red formula, suptilna pozadina+grid); tab „Mathia"; prijemni baner jači; roditeljski deo moćan (+„aha"); moja misija (linija 132px, 3 boksa novi+zlatne ikonice+hover); planer u red + REŠENO treperenje (BPS.sr=S.sr); Kako radi = vremenska osa; Za tebe đače (prednost bold + 6 horizontalnih bedževa); persona (bez duplih oblačića, levi „boom", podnaslov „Uvek dostupna"); utisci = horizontalni auto-slajder (#tgrid skript na dnu); citat (ne lomi, „Zato sam i stvorila Mathiu" bold, „Marina" desno).

## NASLOVNA — PREOSTALO (redom, po Marininom spisku)
1. Persona „Pamti/vodi": pasus vizuelno bolji (rečenica ispod rečenice); panel „Prošli put smo…" razmaći + simboli/animacije (wow); panel napredak rečenice bolje.
2. „Jedna profesorica. Jedno ime od poverenja.": ne prekidaj rečenice; IZBACI „dr Marina Bulat"; marketinški jak.
3. Utisci: NE obično skrolovanje — originalnije/moderno (npr. jedan veliki citat koji se smenjuje). „Ocena 5,0" oblak doteraj (bez lomljenja, „proveri ↗"). „Podelite i vi svoj utisak" premesti/simpatičnije.
4. „Sve na jednom mestu / Predmeti i testovi": sad je veliki direktorijum i ponavlja predmeti.html — skrati u TEASER + dugme ka predmeti.html (uključi „testovi uz paket" ukratko). „wow".
5. Paketi: rečenica u red; luksuzniji ramovi. NE dirati cene/upOpen (BASIC 4.990 / GOLD 6.990 / DIAMOND 9.990 RSD/mes; upOpen('Basic',4990,'basic') itd.).
6. O meni (na naslovnoj): ne ponavljati (ima o-marini.html) — nešto drugačije/efektno (slika + „doktor/predavač" ukratko + „Saznaj više").
7. Ponavljanje CTA: dole opet „Započni besplatno"+„Upoznaj Marinu" — svesti na jedno.
8. CEO DONJI DEO (od „Pretvorimo vreme…" do dna) = POTPUNO NOV, luksuzan footer: „Uči s ljubavlju" veće + ISPISIVANJE; IZBACI potpis; kontakt+autorska prava+napomena+copyright uredno U FOOTER (ne razbacano); payment logoi + 3-D Secure zadržati. „Da vrišti od luksuza."
9. Kad se složi: RESPONSIVE telefon/tablet/računar (svaki breakpoint).

## TEHNIČKO (čuvati)
- Paketi: upOpen(name,price,id) → modal #upscrim/#upplan (mathia-guard.js). NE menjati.
- i18n naslovna = JS nizovi po selektoru/indeksu (M=[{s,i,t}]) + baneri BT/BS/BC, BPT/BPS/BPC, T/S/C. Predmetne = data-i18n + I18N + apply().
- Jezici: sr,en,de,fr,es,it,ru,pt (8).

## SITE-WIDE AUDIT (Marina traži da se PROVERI SVE i prijave problemi — napravi report)
1. Meni jednak na svim stranama + „nazad na početnu"? (samo index/predmeti/prodavnica sređeni).
2. Klonovi na pravim mestima (opšti/specijalizovani; uklonjen sa o-marini/prodavnica/predmeti)? Menjaju li jezik odmah?
3. Prevodi: sve na 8 jezika i JEZIČKI ispravni (ne mašinski)? Nema zaostalog srpskog? (naslovna M-niz nekompletan — dopuniti.)
4. Linkovi vode na prave strane? (proveri sve href.)
5. Društvene mreže rade (FB/IG/YT/Email)?
6. Predmetne strane (41 × predmet-*.html): postoji li SVAKA i urađena PO UZORU na predmet-analiza1 (klon, put učenja, materijali, napredak, finale, footer)? Sada je KOMPLETNA samo Analiza 1.
7. Ima li svaka predmetna: skripta + zbirka + formule (priručnik), linkovani, na svim jezicima?
8. Postoji li „peek/preview" skripti/zbirki za nepretplaćene (gate.js/previewLock)? (PENDING.)
9. Prijavi SVE probleme (slomljeni linkovi, nedostajuće strane/prevodi, klon na pogrešnom mestu…).

## POSLE NASLOVNE
predmeti/prodavnica/o-marini (heder gotov; klon ukloniti; stilski doterati) → svaka predmetna strana jedna po jedna po Analizi 1 → pun prevod + povezivanje klonova svuda → provera svih linkova/skripti/zadataka.

## PRVI KORAK U NOVOM CHATU (predlog)
Footer (od „Pretvorimo vreme…" do dna) potpuno nov/luksuzan — Marini najkritičniji. Uradi → renderuj → pošalji na potvrdu. Pa „Predmeti i testovi" teaser → paketi (ramovi) → utisci (novo) → persona/jedna-profesorica → responsive → audit+prevodi.
