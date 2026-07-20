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
  <div style="background:#F3EEE4;padding:40px 16px;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:440px;margin:0 auto;background:#FDFBF7;border:1px solid #ECE2D3;border-radius:18px;padding:44px 40px;text-align:center">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:15px;letter-spacing:5px;color:#432C37;text-transform:uppercase">Mathia</div>
      ${sadrzaj}
      <div style="border-top:1px solid #ECE2D3;margin-top:34px;padding-top:18px;font-size:11px;letter-spacing:.5px;color:#B3A79E">uči s ljubavlju &nbsp;·&nbsp; mathia.rs</div>
    </div>
  </div>`;

const dugme = (href, tekst) =>
  `<a href="${href}" style="display:inline-block;background:#432C37;color:#F3E9DA;text-decoration:none;font-weight:600;font-size:14px;padding:14px 34px;border-radius:100px;letter-spacing:.3px">${tekst}</a>`;

const kvacica = `<div style="width:46px;height:46px;line-height:46px;border-radius:50%;border:1.5px solid #C6A05C;color:#9C7838;font-size:22px;margin:30px auto 22px">&#10003;</div>`;

// (1) Fiskalni račun posle uspešne uplate
export async function posaljiRacun({ to, racun, sta, pristupLink }) {
  const fisk = (racun && racun.brojRacuna)
    ? `Fiskalni račun &nbsp;${racun.brojRacuna}${racun.qr ? `<br><a href="${racun.qr}" style="color:#C6A05C;text-decoration:none">Provera računa</a>` : ''}`
    : `Fiskalni račun stiže posebnim mejlom.`;
  const html = okvir(`
    ${kvacica}
    <div style="font-family:Georgia,serif;font-size:24px;color:#3E2A34;line-height:1.25">Hvala na kupovini</div>
    <div style="color:#7A6B66;font-size:14px;margin:12px 0 28px;line-height:1.6">${sta} je aktivan. Kreni odmah — sve te čeka na nalogu.</div>
    ${dugme(pristupLink, 'Otvori nalog')}
    <div style="margin-top:30px;font-size:12px;color:#A99B92;line-height:1.8">${fisk}</div>
  `);
  await posalji({ to, subject: 'Mathia — potvrda i fiskalni račun', html });
}


const korak = (n, naslov, tekst) =>
  `<tr>
    <td style="width:34px;vertical-align:top;padding:7px 0">
      <div style="width:28px;height:28px;line-height:28px;border-radius:50%;border:1px solid #E7D2A2;color:#9C7838;font-family:Georgia,serif;font-weight:bold;text-align:center;font-size:13px">${n}</div>
    </td>
    <td style="vertical-align:top;padding:7px 0 7px 12px;text-align:left">
      <div style="font-size:14px;color:#3E2A34;font-weight:bold">${naslov}</div>
      <div style="font-size:12.5px;color:#A99B92;line-height:1.5">${tekst}</div>
    </td>
  </tr>`;

// (1b) Dobrodošlica — kako da počne (šalje se odmah posle računa)
export async function posaljiDobrodoslicu({ to, ime, paket, pristupLink }) {
  const zdravo = ime ? `Dobrodošla, ${ime}` : 'Dobrodošla';
  const pk = paket ? `${paket} paket je aktivan.` : 'Tvoj paket je aktivan.';
  const html = okvir(`
    <div style="font-family:Georgia,serif;font-size:24px;color:#3E2A34;line-height:1.25;margin-top:30px">${zdravo}</div>
    <div style="color:#7A6B66;font-size:14px;margin:12px 0 26px;line-height:1.6">${pk} Evo kako da iskoristiš najbolje iz nje.</div>
    <table style="margin:0 auto 28px;border-collapse:collapse">
      ${korak('1','Otvori predmet','Skripta, formule i zbirka — sve na jednom mestu.')}
      ${korak('2','Pitaj Profesoricu','Dostupna 0–24h. Pošalji zadatak ili sliku, vodi te korak po korak.')}
      ${korak('3','Prati napredak','Pamti gde si stala i vraća te tačno tamo.')}
    </table>
    ${dugme(pristupLink, 'Kreni sada')}
  `);
  await posalji({ to, subject: 'Mathia — kako da počneš', html });
}

// (2) Pretplata ističe/istekla — poziv da obnovi (nastavlja gde je stao)
export async function posaljiIstek({ to, paket, istice }) {
  const link = `${APP_URL}/prodavnica.html?obnovi=${encodeURIComponent(paket)}`;
  const html = okvir(`
    <div style="font-family:Georgia,serif;font-size:24px;color:#3E2A34;line-height:1.25;margin-top:30px">Pretplata uskoro ističe</div>
    <div style="color:#7A6B66;font-size:14px;margin:12px 0 28px;line-height:1.6">${paket} paket ističe ${new Date(istice).toLocaleDateString('sr-RS')}. Napredak ti je sačuvan — nastavljaš tačno gde si stala.</div>
    ${dugme(link, 'Obnovi pretplatu')}
  `);
  await posalji({ to, subject: 'Mathia — pretplata ističe', html });
}
