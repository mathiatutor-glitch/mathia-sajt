// lib/email.js
// ──────────────────────────────────────────────────────────────────────────
// Slanje mejlova kupcu: (1) fiskalni račun posle uplate, (2) obaveštenje da
// pretplata ističe/istekla. Primer koristi Resend (https://resend.com), ali
// može i bilo koji SMTP — zameni `posalji()`.
//   EMAIL_API_KEY  — ključ provajdera
//   EMAIL_FROM     — npr. "Mathia <kontakt@mathia.rs>"
//   APP_URL        — bazni URL sajta (za linkove „nastavi/obnovi")
// ──────────────────────────────────────────────────────────────────────────
const API_KEY = process.env.EMAIL_API_KEY;
const FROM = process.env.EMAIL_FROM || 'Mathia <kontakt@mathia.rs>';
const APP_URL = process.env.APP_URL || 'https://www.mathia.rs';

export function konfigurisan() { return Boolean(API_KEY); }

async function posalji({ to, subject, html }) {
  if (!konfigurisan()) { console.warn('Email nije podešen — preskačem slanje:', subject); return; }
  // TODO(Email): ako koristiš drugi provajder, zameni ovaj poziv.
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) throw new Error(`Email greška: ${res.status} ${await res.text()}`);
}

const okvir = (sadrzaj) => `
  <div style="font-family:'Nunito',Arial,sans-serif;max-width:560px;margin:0 auto;color:#432C37;background:#FBF6EE;padding:28px 24px;border-radius:14px">
    <div style="font-family:'Cormorant Garamond',serif;font-size:26px;color:#9C7838">Mathia</div>
    ${sadrzaj}
    <p style="color:#a89a93;font-size:12px;margin-top:24px">uči s ljubavlju · mathia.rs</p>
  </div>`;

// (1) Fiskalni račun posle uspešne uplate
export async function posaljiRacun({ to, racun, sta, pristupLink }) {
  const html = okvir(`
    <h2 style="font-family:'Cormorant Garamond',serif">Hvala na kupovini 💛</h2>
    <p>Tvoja uplata je uspešno primljena i evidentirana.</p>
    <p><b>Stavka:</b> ${sta}<br><b>Fiskalni račun br.:</b> ${racun.brojRacuna}</p>
    ${racun.qr ? `<p><a href="${racun.qr}" style="color:#9C7838">Provera fiskalnog računa →</a></p>` : ''}
    <p><a href="${pristupLink}" style="display:inline-block;background:#C6A05C;color:#3a2330;text-decoration:none;padding:12px 22px;border-radius:100px;font-weight:700">Otvori pristup →</a></p>
  `);
  await posalji({ to, subject: 'Mathia — potvrda i fiskalni račun', html });
}

// (2) Pretplata ističe/istekla — poziv da obnovi (nastavlja gde je stao)
export async function posaljiIstek({ to, paket, istice }) {
  const link = `${APP_URL}/prodavnica.html?obnovi=${encodeURIComponent(paket)}`;
  const html = okvir(`
    <h2 style="font-family:'Cormorant Garamond',serif">Pretplata uskoro ističe</h2>
    <p>Tvoja <b>${paket}</b> pretplata ističe <b>${new Date(istice).toLocaleDateString('sr-RS')}</b>.</p>
    <p>Ako želiš da nastaviš tačno tamo gde si stao/la — ili da promeniš paket ili predmet — samo obnovi uplatu:</p>
    <p><a href="${link}" style="display:inline-block;background:#C6A05C;color:#3a2330;text-decoration:none;padding:12px 22px;border-radius:100px;font-weight:700">Obnovi pretplatu →</a></p>
    <p style="color:#6a5a62;font-size:13px">Napredak ti je sačuvan; ništa se ne gubi.</p>
  `);
  await posalji({ to, subject: 'Mathia — pretplata ističe', html });
}
