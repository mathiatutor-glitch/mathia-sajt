// lib/supabase.js
// ──────────────────────────────────────────────────────────────────────────
// Pristup bazi (Supabase). Koristi SERVICE ključ (samo na serveru, NIKAD u
// pregledaču). Tabele su definisane u schema.sql.
//   SUPABASE_URL          — URL projekta
//   SUPABASE_SERVICE_KEY  — service_role ključ (tajni)
// ──────────────────────────────────────────────────────────────────────────
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;
export const db = (url && key) ? createClient(url, key) : null;

export function konfigurisan() { return Boolean(db); }

// Kreira porudžbinu pre plaćanja (status 'na_cekanju') i vraća njen ID.
export async function napraviPorudzbinu({ email, ime, iznos, stavke, tip }) {
  const { data, error } = await db.from('porudzbine')
    .insert({ kupac_email: email, kupac_ime: ime, iznos_rsd: iznos, stavke, tip, status: 'na_cekanju' })
    .select('id').single();
  if (error) throw error;
  return data.id;
}

export async function ucitajPorudzbinu(id) {
  const { data, error } = await db.from('porudzbine').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function oznaciPlaceno(orderId, raiacceptRef) {
  await db.from('porudzbine').update({ status: 'placeno', raiaccept_ref: raiacceptRef }).eq('id', orderId);
}

export async function sacuvajFiskalni(orderId, racun) {
  await db.from('fiskalni_racuni').insert({
    porudzbina_id: orderId, broj_racuna: racun.brojRacuna, qr: racun.qr, json: racun.sirovi,
  });
}

// Aktivira/produžava mesečnu pretplatu za 30 dana. Ako pretplata već postoji i
// nije istekla, produžava se na nju (kupac „nastavlja gde je stao").
export async function aktivirajPretplatu({ email, paket, predmeti }) {
  const sada = new Date();
  const { data: postojeca } = await db.from('pretplate')
    .select('*').eq('kupac_email', email).eq('paket', paket).maybeSingle();

  const osnova = (postojeca && new Date(postojeca.istice) > sada) ? new Date(postojeca.istice) : sada;
  const istice = new Date(osnova.getTime() + 30 * 24 * 60 * 60 * 1000);

  if (postojeca) {
    await db.from('pretplate').update({ predmeti, istice, status: 'aktivna', obavesten_o_isteku: false })
      .eq('id', postojeca.id);
  } else {
    await db.from('pretplate').insert({
      kupac_email: email, paket, predmeti, pocinje: sada, istice, status: 'aktivna', obavesten_o_isteku: false,
    });
  }
  return istice;
}

// Aktivne (status='aktivna', nije isteklo) pretplate za dati email.
// Vraća niz redova {predmeti, istice, status}; prazan niz ako nema ili baza nije konfigurisana.
// Izvor istine za pristup (isti kao gate.js na frontendu).
export async function aktivnePretplate(email) {
  if (!db || !email) return [];
  const { data, error } = await db.from('pretplate')
    .select('predmeti, istice, status')
    .ilike('kupac_email', String(email).trim())   // case-insensitive tačno poklapanje
    .eq('status', 'aktivna');
  if (error) return [];
  const sada = new Date();
  return (data || []).filter((r) => !r.istice || new Date(r.istice) > sada);
}

// Zabeleži napredak za jedno pitanje na klonu (server, service ključ). Best-effort.
// Puni mathia_napredak: +1 pitanje, +MIN_PO_PITANJU minuta, dnevni niz (serija),
// meki procenat (raste sa aktivnošću) i poslednju temu. Ne baca — pozivalac hvata.
const MIN_PO_PITANJU = parseInt(process.env.MIN_PO_PITANJU || "2", 10);
export async function beleziNapredak(userId, predmet, tema) {
  if (!db || !userId || !predmet) return;
  const now = new Date();
  const dan = (d) => d.toISOString().slice(0, 10);
  const danas = dan(now);
  let row = null;
  try {
    const r = await db.from('mathia_napredak').select('*')
      .eq('user_id', userId).eq('predmet', predmet).maybeSingle();
    row = r && r.data ? r.data : null;
  } catch (e) { return; }

  let minuta = MIN_PO_PITANJU, pitanja = 1, serija = 1;
  if (row) {
    minuta = (row.minuta_ukupno || 0) + MIN_PO_PITANJU;
    pitanja = (row.pitanja || 0) + 1;
    const last = row.azurirano ? dan(new Date(row.azurirano)) : null;
    if (last === danas) serija = row.serija || 1;                 // već aktivan danas
    else {
      const juce = dan(new Date(now.getTime() - 86400000));
      serija = (last === juce) ? (row.serija || 0) + 1 : 1;       // nastavak ili restart
    }
  }
  // meki procenat: raste sa brojem pitanja, staje na 95 (100 se dobija ručno/proverom)
  const procenat = Math.min(95, Math.round(pitanja * 4));

  const payload = {
    user_id: userId, predmet, minuta_ukupno: minuta, pitanja, serija,
    procenat: (row && row.procenat > procenat) ? row.procenat : procenat,
    azurirano: now.toISOString(),
  };
  if (tema) payload.poslednja_tema = String(tema).slice(0, 120);

  try { await db.from('mathia_napredak').upsert(payload, { onConflict: 'user_id,predmet' }); } catch (e) {}
}

// Poslednje teme koje je učenik radio (po predmetima) — da klon zna „gde smo stali".
// Vraća npr. [{predmet:'analiza1', tema:'granične vrednosti', kada:'2026-07-12'}, ...]
export async function poslednjeTeme(userId, limit = 4) {
  if (!db || !userId) return [];
  try {
    const r = await db.from('mathia_napredak')
      .select('predmet, poslednja_tema, azurirano')
      .eq('user_id', userId)
      .order('azurirano', { ascending: false })
      .limit(limit);
    if (!r || r.error || !Array.isArray(r.data)) return [];
    return r.data
      .filter(x => x && x.poslednja_tema)
      .map(x => ({ predmet: x.predmet, tema: String(x.poslednja_tema).slice(0, 100), kada: (x.azurirano || '').slice(0, 10) }));
  } catch (e) { return []; }
}

// Pretplate koje ističu u narednih `danaUnapred` dana, a kupac još nije obavešten.
export async function pretplateZaObavestenje(danaUnapred = 2) {
  const granica = new Date(Date.now() + danaUnapred * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await db.from('pretplate')
    .select('*').eq('status', 'aktivna').eq('obavesten_o_isteku', false).lte('istice', granica);
  if (error) throw error;
  return data || [];
}

export async function oznaciObavesten(id) {
  await db.from('pretplate').update({ obavesten_o_isteku: true }).eq('id', id);
}
