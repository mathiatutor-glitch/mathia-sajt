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
  { m: ["arhitektura racunara", "arhitektura", "asembler"], t:
"PREDMET: Arhitektura računara. Radi se u Linux/asembler (x86) okruženju. Teme redom: uvod u organizaciju računara; asemblersko programiranje; tipovi podataka; nizovi; stringovi i sistemski pozivi (Linux); potprogrami (stek, konvencije); rukovanje bitima (maske, pomeranja); konverzije interni↔znakovni zapis. Provere: kolokvijumi T1–T4, SOV, primeri ispita PI1/PI2. Alati: Ubuntu, gedit asm-sintaksa, 32/64-bit." },

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
];

export function scopeFor(sub) {
  const s = norm(sub);
  if (!s) return "";
  for (const e of MAP) {
    if (e.m.some(function (k) { return s.includes(norm(k)); })) return e.t;
  }
  return "";
}
