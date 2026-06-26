// lib/esir.js
// ──────────────────────────────────────────────────────────────────────────
// Omotač oko ESIR-a (elektronski sistem za izdavanje računa) koji preko
// VPFR-a (virtuelni procesor) i BEZBEDNOSNOG ELEMENTA (fajl) potpisuje i
// registruje fiskalni račun kod Poreske uprave — automatski, na svaku uplatu.
//
// PRE NEGO ŠTO OVO PRORADI mora da postoji:
//   1) Bezbednosni element (fajl) — dobija se preko PEP → ePorezi → ESF
//   2) Izabran ESIR sa API-jem (eFiskalizacija.cloud / Octopos / Teron / BKC SOFT)
//
// ŠTA TREBA UBACITI (od izabranog ESIR provajdera):
//   ESIR_API_URL   — bazni URL ESIR API-ja
//   ESIR_API_KEY   — ključ/token za pozive
//   ESIR_PAC       — PAK/PIN bezbednosnog elementa (ako ga API traži)
//   ESIR_LOKACIJA  — oznaka poslovnog prostora (Daljinska trgovina) iz PGJO
// ──────────────────────────────────────────────────────────────────────────

const API_URL = process.env.ESIR_API_URL;
const API_KEY = process.env.ESIR_API_KEY;
const PAC = process.env.ESIR_PAC;
const LOKACIJA = process.env.ESIR_LOKACIJA;

export function konfigurisan() {
  return Boolean(API_URL && API_KEY);
}

// Izdaje fiskalni račun (Promet-Prodaja) za listu stavki plaćenih karticom.
// `detaljno` dolazi iz proizvodi.izracunajIznos(): [{sifra,naziv,cena,kolicina,oznaka,iznos}]
export async function izdajRacun({ detaljno, ukupno, email, ref }) {
  if (!konfigurisan()) {
    throw new Error('ESIR nije podešen — nedostaju ključevi u .env');
  }
  // TODO(ESIR): uskladi telo zahteva sa shemom izabranog ESIR-a / SUF-a.
  const racun = {
    invoiceType: 'Normal',      // običan račun
    transactionType: 'Sale',    // Promet-Prodaja
    paymentType: 'Card',        // plaćeno karticom (RaiAccept)
    locationId: LOKACIJA,
    referentDocumentNumber: ref,
    items: detaljno.map((s) => ({
      name: s.naziv,
      gtin: s.sifra,
      quantity: s.kolicina,
      unitPrice: s.cena,
      labels: [s.oznaka],       // poreska oznaka (van PDV-a za paušalca)
      totalAmount: s.iznos,
    })),
    buyer: email ? { email } : undefined,
  };

  const res = await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      ...(PAC ? { 'X-PAC': PAC } : {}),
    },
    body: JSON.stringify(racun),
  });
  if (!res.ok) throw new Error(`ESIR greška: ${res.status} ${await res.text()}`);
  const data = await res.json();
  // TODO(ESIR): mapiranje polja iz odgovora (brojevi/QR variraju po provajderu)
  return {
    brojRacuna: data.invoiceNumber,      // npr. PFR broj
    sdcVreme: data.sdcDateTime,
    qr: data.verificationUrl || data.qr, // link/QR za verifikaciju na PU
    sirovi: data,
  };
}

// Refundacija (za reklamacije/odustanak) — Promet-Refundacija.
export async function refundiraj({ brojOriginala, detaljno, email }) {
  if (!konfigurisan()) throw new Error('ESIR nije podešen');
  // TODO(ESIR): transactionType 'Refund' + referenca na originalni račun
  const res = await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({
      invoiceType: 'Normal',
      transactionType: 'Refund',
      paymentType: 'Card',
      referentDocumentNumber: brojOriginala,
      items: detaljno.map((s) => ({ name: s.naziv, quantity: s.kolicina, unitPrice: s.cena, labels: [s.oznaka], totalAmount: s.iznos })),
      buyer: email ? { email } : undefined,
    }),
  });
  if (!res.ok) throw new Error(`ESIR refundacija greška: ${res.status}`);
  return res.json();
}
