// ============================================================
//  lib/klon-znanje.js — mapa GRADIVA po predmetu za klona.
//  Daje kratak "scope" (spisak tema) koji se dodaje u sistemski prompt,
//  da klon zna ŠTA sve ulazi u predmet i vodi učenika kroz te teme.
//  Sadrži samo ČINJENIČNE teme/strukturu (ne prepisuje tuđe materijale).
//  Izvori: otvoreni repozitorijumi FTN Novi Sad (ACS, Katedra za matematiku).
// ============================================================

function norm(s) {
  return String(s || "").toLowerCase()
    .replace(/[čćĉ]/g, "c").replace(/[šŝ]/g, "s").replace(/[žŵ]/g, "z").replace(/đ/g, "dj")
    .replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

// Svaka stavka: ključne reči za prepoznavanje (m) + tekst gradiva (t).
const MAP = [
  { m: ["arhitektura racunara", "arhitektura", "asembler", "asembleru"], t:
"PREDMET: Arhitektura računara (rad u asembleru, x86/Linux; srodno i8086). " +
"TEORIJA — obavezno znati: " +
"(1) Brojni sistemi i kodiranje: binarni/oktalni/heksadecimalni sistem i konverzije; zapis celih brojeva (neoznačeni, znak-i-veličina, prvi i DRUGI komplement); zapis realnih brojeva u pokretnom zarezu; ASCII/znakovni kod. " +
"(2) Organizacija računara i procesora: registri, ALU, memorija, magistrale; model procesora (i8086/x86), zastavice (flags). " +
"(3) Asemblerski jezik: elementi jezika (konstante, direktive, labele, segmenti), adresni modovi; instrukcije — prenos podataka (MOV…), aritmetičke (ADD, SUB, MUL, DIV…), logičke (AND, OR, XOR, NOT), pomeranja i rotacije (SHL/SHR/ROL/ROR), poređenje i grananje (CMP, Jxx), petlje (LOOP). " +
"(4) Nizovi u asembleru; (5) stringovi i sistemski pozivi (Linux) / prekidi (interrupts); (6) potprogrami — poziv (CALL/RET), stek, prosleđivanje parametara, konvencije; (7) rukovanje bitima — maske, testiranje/postavljanje/brisanje bita, pakovanje; (8) konverzije interni↔znakovni zapis (broj↔string, unos/ispis brojeva). " +
"TIPOVI ZADATAKA (klon mora da ume da ih objasni i uradi korak po korak): konverzije brojeva između sistema i formata (npr. u drugi komplement, pokretni zarez); asemblerski program za obradu niza (suma, min/max, brojanje, pretraga); obrada stringa (dužina, kopiranje, poređenje, mala↔velika slova); bitske operacije (maskiranje, brojanje jedinica, pakovanje/raspakivanje); potprogram sa parametrima preko steka; konverzija broj↔znakovni zapis. " +
"PROVERE: kolokvijumi T1, T2, T3, T4; SOV; primeri ispita PI1, PI2. ALATI: Linux (Ubuntu), asembler, gedit sa asm-sintaksom, 32/64-bit. " +
"TON: objašnjavaj strpljivo, korak po korak, sa malim primerom koda i komentarima; proveri da učenik razume registre i zastavice pre složenijih zadataka." },

  { m: ["objektno", "oop"], t:
"PREDMET: Objektno orijentisano programiranje (C++/Java). Teme: osnove jezika i OOP; klase i objekti; enkapsulacija i modifikatori pristupa; konstruktori/destruktori; preklapanje metoda i operatora; nasleđivanje; polimorfizam i virtuelne funkcije; apstraktne klase/interfejsi; šabloni (templates/generici); izuzeci; kolekcije/STL; rad sa datotekama. Provere: kolokvijumi K1–K3." },

  { m: ["baze", "baza podataka", "sql", "organizacija podataka"], t:
"PREDMET: Baze podataka (spojeno). Osnove: pojam baze i DBMS; koncepcija (nivoi apstrakcije); modeli podataka; ER model; relacioni model; normalizacija (1NF–BCNF, funkcionalne zavisnosti). Fizička organizacija: eksterna memorija, datotečni sistem, metode pristupa, serijska/sekvencijalna, rasute (hash), indeks-sekvencijalna, indeksi i B-stablo. Napredno: relaciona algebra, SQL (DDL/DML, upiti, spajanja, agregacije, podupiti), integritet i okidači, transakcije (ACID), konkurentnost, oporavak; skladišta podataka." },

  { m: ["algebra", "linearna algebra", "analiticka geometrija"], t:
"PREDMET: Algebra. Deo 1: relacije; funkcije; Bulove algebre; grupoidi i grupe; prsteni i polja; konstrukcija konačnih polja; kompleksni brojevi; polinomi. Deo 2: matrice; determinante; sistemi linearnih jednačina; slobodni vektori; analitička geometrija u prostoru; vektorski prostori; linearne transformacije; karakteristični koreni i vektori. Provere: PO1/Z1, PO2/Z2 i OBAVEZAN usmeni (teoreme i dokazi)." },

  { m: ["analiza", "matematicka analiza", "izvod", "integral"], t:
"PREDMET: Matematička analiza 1. Teme redom: granični procesi (nizovi, limesi, neprekidnost); funkcije jedne i više promenljivih (izvodi, primene, ispitivanje toka funkcije, parcijalni izvodi); integralni račun (tablice, neodređeni i određeni integral, primene); diferencijalne jednačine (osnovni tipovi). Provere: kolokvijumi K1/K2 + teorija." },

  { m: ["diskretna", "kombinatorika", "teorija grafova", "grafovi"], t:
"PREDMET: Diskretna matematika. Deo 1: matematička logika (iskazi, predikati); skupovi, relacije i funkcije; algebarske strukture; deljivost i kongruencije (osnove teorije brojeva). Deo 2: kombinatorika (permutacije, kombinacije, binomni koeficijenti, uključenje-isključenje) i teorija grafova (grafovi, stabla, putevi, bojenje). Provere: kolokvijumi K1/K2." },

  { m: ["uvod u elektroniku", "elektronika", "pojacavac", "pojacavaci"], t:
"PREDMET: Uvod u elektroniku. Teme: uvod i istorijat elektronike; poluprovodnici; dioda i primene (ispravljači); tranzistor (BJT, FET) kao pojačavač i prekidač; pojačavači (osnovne konfiguracije i primena pojačavača); povratna sprega; osnovna analiza kola. Laboratorija/merenja: rad sa osciloskopom (SIGLENT), generatorom signala, izvorom jednosmernog napona; lemljenje. Provere: dva kolokvijuma ili ispit. Klon vodi kroz analizu kola i lab merenja korak po korak." },

  { m: ["termodinamika", "prenos toplote", "toplotna"], t:
"PREDMET: Termodinamika / Osnovi termodinamike. Teme: osnovni pojmovi (sistem, stanje, veličine stanja); prvi zakon termodinamike (unutrašnja energija, rad, toplota); idealni gas i procesi (izohorski, izobarski, izotermski, adijabatski); drugi zakon i entropija; kružni procesi (Karnoov), toplotne mašine; osnovi prenosa toplote (provođenje, konvekcija, zračenje). Klon vodi kroz p-V dijagrame i proračune procesa." },

  { m: ["osnovi elektrotehnike", "oet", "teorija elektricnih kola", "elektricna kola", "teorija kola"], t:
"PREDMET: Osnovi elektrotehnike / Teorija električnih kola. Teme: jednosmerne struje — Omov zakon, Kirhofovi zakoni (I i II), otpornici (redna/paralelna veza), analiza mreža (metod kontura i čvorova, Tevenen/Norton, superpozicija); električno polje — Kulonov zakon, jačina polja i potencijal, kondenzatori (kapacitivnost, energija); magnetsko polje — struja i magnetsko polje, elektromagnetna indukcija, kalemovi (induktivnost); naizmenične struje — sinusni signali, fazori, impedansa (R, L, C), RLC kola, snaga (aktivna/reaktivna), rezonansa; prelazni procesi u RC/RL kolima. Klon vodi kroz proračun kola korak po korak (fazori, kompleksni račun)." },

  { m: ["elektromagnetika", "elektromagnetna", "maksvel"], t:
"PREDMET: Elektromagnetika. Teme: elektrostatika (Kulonov zakon, polje i potencijal, Gausov zakon, provodnici i dielektrici, kapacitivnost); stacionarno strujno polje; magnetostatika (Bio-Savar, Amperov zakon, magnetsko polje struja, materijali); elektromagnetna indukcija (Faradej, Lencov zakon, samo/međuindukcija); Maksvelove jednačine; elektromagnetni talasi (prostiranje, polarizacija). Klon vodi kroz vektorske proračune polja i primenu zakona." },

  { m: ["mehanika fluida", "fluid", "strujne masine", "hidraulika"], t:
"PREDMET: Mehanika fluida (Osnovi mehanike fluida 1/2). Teme: osobine fluida; statika fluida (pritisak, sila na površine, potisak); kinematika strujanja; jednačina kontinuiteta; Bernulijeva jednačina i primene; dinamika viskoznog fluida, gubici u cevima; strujne mašine; sistemi za transport i distribuciju fluida. Klon vodi kroz proračune protoka, pritisaka i gubitaka korak po korak." },
];

export function scopeFor(sub) {
  const s = norm(sub);
  if (!s) return "";
  for (const e of MAP) {
    if (e.m.some(function (k) { return s.includes(norm(k)); })) return e.t;
  }
  return "";
}
