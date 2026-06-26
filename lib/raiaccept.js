// lib/raiaccept.js
// ──────────────────────────────────────────────────────────────────────────
// Omotač oko Raiffeisen RaiAccept naplate karticom.
// Banka rukuje karticama (Visa/Master/DinaCard + Google/Apple Pay) — mi nikada
// ne vidimo ni čuvamo broj kartice.
//
// ŠTA TREBA UBACITI (iz ugovora sa Rajfajzenom za RaiAccept):
//   RAIACCEPT_API_URL     — bazni URL njihovog API-ja
//   RAIACCEPT_MERCHANT_ID — ID prodavca (tvoj nalog)
//   RAIACCEPT_API_KEY     — ključ za pozive
//   RAIACCEPT_SECRET      — tajna za proveru potpisa callbacka
// Tačan oblik poziva (polja, potpis) uzmi iz RaiAccept integracione
// dokumentacije koju ti banka da — ispod su TODO mesta.
// ──────────────────────────────────────────────────────────────────────────
import crypto from 'node:crypto';

const API_URL = process.env.RAIACCEPT_API_URL;
const MERCHANT = process.env.RAIACCEPT_MERCHANT_ID;
const API_KEY = process.env.RAIACCEPT_API_KEY;
const SECRET = process.env.RAIACCEPT_SECRET;

export function konfigurisan() {
  return Boolean(API_URL && MERCHANT && API_KEY);
}

// Kreira sesiju plaćanja i vraća URL na koji preusmeravamo kupca.
export async function kreirajPlacanje({ orderId, iznosRsd, opis, returnUrl, callbackUrl, email }) {
  if (!konfigurisan()) {
    throw new Error('RaiAccept nije podešen — nedostaju ključevi u .env');
  }
  // TODO(RaiAccept): zameni telo i putanju prema njihovoj dokumentaciji.
  const res = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      merchantId: MERCHANT,
      orderId,
      amount: iznosRsd,        // RaiAccept obično traži iznos u dinarima ili parama — PROVERI
      currency: 'RSD',
      description: opis,
      customerEmail: email,
      successUrl: returnUrl,
      failUrl: returnUrl,
      callbackUrl,             // server-to-server obaveštenje o ishodu
    }),
  });
  if (!res.ok) throw new Error(`RaiAccept greška: ${res.status} ${await res.text()}`);
  const data = await res.json();
  // TODO(RaiAccept): vrati polje sa URL-om za plaćanje iz njihovog odgovora
  return { paymentUrl: data.paymentUrl || data.redirectUrl, ref: data.id };
}

// Proverava da callback zaista dolazi od RaiAccept-a (potpis), pa da niko ne
// može lažno da javi "plaćeno". Tačan algoritam potpisa je u njihovoj doc.
export function proveriPotpis(telo, potpisHeader) {
  if (!SECRET) return false;
  // TODO(RaiAccept): uskladi sa njihovim načinom potpisa (HMAC polja/redosled)
  const ocekivani = crypto
    .createHmac('sha256', SECRET)
    .update(typeof telo === 'string' ? telo : JSON.stringify(telo))
    .digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(ocekivani), Buffer.from(String(potpisHeader || '')));
  } catch {
    return false;
  }
}
