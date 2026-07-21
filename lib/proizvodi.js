// lib/proizvodi.js
// ──────────────────────────────────────────────────────────────────────────
// JEDINI IZVOR ISTINE ZA CENE. Nikada ne veruj ceni koju pošalje pregledač —
// klijent šalje samo ID i količinu, a iznos se RAČUNA OVDE, na serveru.
// Kad širiš prodavnicu, samo dodaješ stavke u PROIZVODI ili PAKETI.
// ──────────────────────────────────────────────────────────────────────────

// Poreska oznaka za fiskalni račun.
// Marina Bulat PR NIJE u sistemu PDV-a (paušalac), pa se koristi oznaka za
// promet bez PDV-a. Tačnu slovnu oznaku (npr. "A" = 0%/van PDV) i njen naziv
// poreske stope POTVRĐUJE Nikola kad podesi ESIR — zato je držimo na 1 mestu.
export const PORESKA_OZNAKA = 'A'; // TODO(Nikola): potvrdi oznaku u izabranom ESIR-u

// Mesečni paketi (pretplata, 30 dana, bez automatskog obnavljanja)
export const PAKETI = {
  basic:   { sifra: 'MATHIA-BASIC',   naziv: 'Basic',   cena: 4990, brojPredmeta: 1, oznaka: PORESKA_OZNAKA },
  gold:    { sifra: 'MATHIA-GOLD',    naziv: 'Gold',    cena: 6990, brojPredmeta: 2, oznaka: PORESKA_OZNAKA },
  diamond: { sifra: 'MATHIA-DIAMOND', naziv: 'Diamond', cena: 9990, brojPredmeta: 3, oznaka: PORESKA_OZNAKA },
};

// Pojedinačni artikli prodavnice (jednokratna kupovina).
// Ovde slobodno dodaješ nove artikle — checkout i prodavnica.html ih čitaju isto.
export const PROIZVODI = {
  'PLANER-2026':     { sifra: 'MATHIA-PLANER', naziv: 'Mathia Student Planner',        cena: 1990, tip: 'pdf', oznaka: PORESKA_OZNAKA },
  'PLANER-OSNOVNA':  { sifra: 'MATHIA-PLANER', naziv: 'Mathia Planer — Osnovna škola', cena: 1990, tip: 'pdf', oznaka: PORESKA_OZNAKA },
  'PLANER-SREDNJA':  { sifra: 'MATHIA-PLANER', naziv: 'Mathia Planer — Srednja škola', cena: 1990, tip: 'pdf', oznaka: PORESKA_OZNAKA },
  'PLANER-FAKULTET': { sifra: 'MATHIA-PLANER', naziv: 'Mathia Planer — Fakultet',      cena: 1990, tip: 'pdf', oznaka: PORESKA_OZNAKA },
  'SKR-MAT-1':  { sifra: 'SKR-MAT-1',  naziv: 'Skripta: Matematika za prijemni',     cena: 1490, tip: 'pdf', oznaka: PORESKA_OZNAKA },
  'SKR-FIZ-1':  { sifra: 'SKR-FIZ-1',  naziv: 'Skripta: Fizika — osnove',             cena: 1490, tip: 'pdf', oznaka: PORESKA_OZNAKA },
  'ZBR-NACRT':  { sifra: 'ZBR-NACRT',  naziv: 'Zbirka zadataka: Nacrtna geometrija',  cena: 1990, tip: 'pdf', oznaka: PORESKA_OZNAKA },
  // Dopuna: 48h SAMO razgovor s Profesoricom (klon) za jedan predmet.
  // Koristi ISTI fiskalni artikal kao Planer (šifra MATHIA-PLANER, ista cena i poreska oznaka)
  // → na fiskalnom računu piše "Planer" i NIŠTA se ne menja u eFiskalizaciji.
  'KLON-48':    { sifra: 'MATHIA-PLANER', naziv: 'Planer', cena: 1990, tip: 'klon48', trajanjeSati: 48, oznaka: PORESKA_OZNAKA },
  // ... dodaj još artikala ovde
};

// Pomoćne funkcije — koriste ih i checkout i fiskalizacija
export function nadjiStavku(id) {
  return PROIZVODI[id] || (PAKETI[id] ? { ...PAKETI[id], tip: 'paket', id } : null);
}

export function izracunajIznos(stavke) {
  // stavke = [{ id, kolicina }]
  let ukupno = 0;
  const detaljno = [];
  for (const s of stavke) {
    const p = nadjiStavku(s.id);
    if (!p) throw new Error(`Nepoznata stavka: ${s.id}`);
    const kol = Math.max(1, parseInt(s.kolicina || 1, 10));
    const stavkaIznos = p.cena * kol;
    ukupno += stavkaIznos;
    detaljno.push({ sifra: p.sifra, naziv: p.naziv, cena: p.cena, kolicina: kol, oznaka: p.oznaka, iznos: stavkaIznos });
  }
  return { ukupno, detaljno };
}
