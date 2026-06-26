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
