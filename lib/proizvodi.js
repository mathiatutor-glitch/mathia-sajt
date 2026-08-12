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
// planKey = porodica plana za otključavanje (basic/gold/diamond) — isti za mesečni i godišnji.
// trajanjeDana = koliko dana traje pristup (mesečni podrazumevano 30; godišnji 365).
export const PAKETI = {
  basic:   { sifra: 'MATHIA-BASIC',   naziv: 'Basic',   cena: 4990, brojPredmeta: 1, planKey: 'basic',   trajanjeDana: 30,  oznaka: PORESKA_OZNAKA },
  gold:    { sifra: 'MATHIA-GOLD',    naziv: 'Gold',    cena: 6990, brojPredmeta: 2, planKey: 'gold',    trajanjeDana: 30,  oznaka: PORESKA_OZNAKA },
  diamond: { sifra: 'MATHIA-DIAMOND', naziv: 'Diamond', cena: 9990, brojPredmeta: 3, planKey: 'diamond', trajanjeDana: 30,  oznaka: PORESKA_OZNAKA },

  // Godišnji paketi (2 meseca gratis) — ista porodica plana, ali 365 dana pristupa.
  // Fiskalni artikli su ZASEBNI u eFiskalizaciji: MATHIA-BASIC-GOD / -GOLD-GOD / -DIAMOND-GOD.
  'basic-god':   { sifra: 'MATHIA-BASIC-GOD',   naziv: 'Basic (godišnje)',   cena: 49900, brojPredmeta: 1, planKey: 'basic',   trajanjeDana: 365, oznaka: PORESKA_OZNAKA },
  'gold-god':    { sifra: 'MATHIA-GOLD-GOD',    naziv: 'Gold (godišnje)',    cena: 69900, brojPredmeta: 2, planKey: 'gold',    trajanjeDana: 365, oznaka: PORESKA_OZNAKA },
  'diamond-god': { sifra: 'MATHIA-DIAMOND-GOD', naziv: 'Diamond (godišnje)', cena: 99900, brojPredmeta: 3, planKey: 'diamond', trajanjeDana: 365, oznaka: PORESKA_OZNAKA },
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
  // RAZDVOJENO od Planera — zasebni fiskalni artikal MATHIA-DOPUNA-2D (1.990).
  // Na fiskalnom računu piše "Dopuna — 2 dana (Profesorica)".
  'KLON-48':    { sifra: 'MATHIA-DOPUNA-2D', naziv: 'Dopuna — 2 dana (Profesorica)', cena: 1990, tip: 'klon48', trajanjeSati: 48, oznaka: PORESKA_OZNAKA },
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
    detaljno.push({ sifra: p.sifra, naziv: p.naziv, cena: p.cena, kolicina: kol, oznaka: p.oznaka, iznos: stavkaIznos, planKey: p.planKey || null, trajanjeDana: p.trajanjeDana || null, trajanjeSati: p.trajanjeSati || null });
  }
  return { ukupno, detaljno };
}
