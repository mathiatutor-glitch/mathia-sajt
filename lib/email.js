// lib/email.js
// ──────────────────────────────────────────────────────────────────────────
// Slanje mejlova kupcu: (1) fiskalni račun posle uplate, (2) dobrodošlica,
// (3) obaveštenje da pretplata ističe. Slatki „Mathia" stil + svi jezici.
// Svaka funkcija prima opcioni `lang` (sr,en,de,fr,es,it,ru,pt); podrazumevano sr.
//   EMAIL_API_KEY  — ključ provajdera (Resend primer)
//   EMAIL_FROM     — npr. "Mathia <kontakt@mathia.rs>"
//   APP_URL        — bazni URL sajta
// ──────────────────────────────────────────────────────────────────────────
const API_KEY = process.env.EMAIL_API_KEY;
const FROM = process.env.EMAIL_FROM || 'Mathia <kontakt@mathia.rs>';
const APP_URL = process.env.APP_URL || 'https://www.mathia.rs';

export function konfigurisan() { return Boolean(API_KEY); }

async function posalji({ to, subject, html }) {
  if (!konfigurisan()) { console.warn('Email nije podešen — preskačem slanje:', subject); return; }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) throw new Error(`Email greška: ${res.status} ${await res.text()}`);
}

function lc(l){ l=(l||'sr').toLowerCase().slice(0,2); return TR[l]?l:'sr'; }

// ── Slatki okvir (malina/zlato/krem) — email-safe (inline, bez animacija) ──
const okvir = (sadrzaj, tagline) => `
  <div style="background:#EFE6F6;background:linear-gradient(180deg,#EFE6F6,#FBF3EC);padding:40px 16px;font-family:'Segoe UI',Arial,Helvetica,sans-serif">
    <div style="max-width:460px;margin:0 auto;background:#FCF9F3;border:1px solid #EBD9B3;border-radius:26px;padding:38px 36px;text-align:center;box-shadow:0 22px 55px rgba(120,70,80,.14)">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:23px;color:#432C37;letter-spacing:.02em">Math<span style="color:#C6A05C">ia</span></div>
      <div style="font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:#9C7838;margin-top:5px">&#10022; ${tagline} &#10022;</div>
      ${sadrzaj}
      <div style="border-top:1px solid #EBD9B3;margin-top:32px;padding-top:18px;font-size:11px;letter-spacing:.5px;color:#B3A79E">&#9829; &nbsp; mathia.rs</div>
    </div>
  </div>`;

const dugme = (href, tekst) =>
  `<a href="${href}" style="display:inline-block;background:#C6A05C;background:linear-gradient(160deg,#F0DCA8,#C6A05C);color:#3A2530;text-decoration:none;font-weight:700;font-size:15px;padding:15px 38px;border-radius:100px;letter-spacing:.2px">${tekst} &rarr;</a>`;

const kvacica = `<div style="width:54px;height:54px;line-height:54px;border-radius:50%;background:#F7E9CF;color:#9C7838;font-size:25px;margin:26px auto 20px">&#10003;</div>`;

const naslov = (t) => `<div style="font-family:Georgia,serif;font-size:24px;color:#3E2A34;line-height:1.25;margin-top:26px">${t}</div>`;
const tekst  = (t) => `<div style="color:#6B4A57;font-size:14px;margin:12px 0 26px;line-height:1.6">${t}</div>`;

const korak = (n, tt, dd) =>
  `<tr>
    <td style="width:34px;vertical-align:top;padding:7px 0">
      <div style="width:28px;height:28px;line-height:28px;border-radius:50%;background:#F7E9CF;color:#9C7838;font-family:Georgia,serif;font-weight:bold;text-align:center;font-size:13px">${n}</div>
    </td>
    <td style="vertical-align:top;padding:7px 0 7px 12px;text-align:left">
      <div style="font-size:14px;color:#3E2A34;font-weight:bold">${tt}</div>
      <div style="font-size:12.5px;color:#8a7480;line-height:1.5">${dd}</div>
    </td>
  </tr>`;

// ── Prevodi (8 jezika) ──
const TR = {
  sr:{tag:'uči s ljubavlju',
    rSubj:'Mathia — potvrda i račun', rH:'Hvala na poverenju &#128156;', rB:(s)=>`${s} je aktivan. Kreni odmah — sve te čeka na nalogu.`, rBtn:'Otvori nalog', rFallback:'Fiskalni račun stiže posebnim mejlom.', rFisk:(b)=>`Fiskalni račun &nbsp;${b}`, rProvera:'Provera računa',
    wSubj:'Mathia — kako da počneš', wHi:(i)=>i?`Zdravo, ${i} &#128156;`:'Zdravo &#128156;', wB:(p)=>`${p} Evo kako da izvučeš najbolje iz nje.`, wPk:(p)=>p?`${p} paket je aktivan.`:'Tvoj paket je aktivan.', k1t:'Otvori predmet', k1d:'Skripta, formule i zbirka — sve na jednom mestu.', k2t:'Pitaj profesoricu', k2d:'Dostupna 0–24h. Pošalji zadatak ili sliku, vodi te korak po korak.', k3t:'Prati napredak', k3d:'Pamti gde si stao i vraća te tačno tamo.', wBtn:'Kreni sada',
    iSubj:'Mathia — pretplata ističe', iH:'Pretplata uskoro ističe', iB:(p,d)=>`${p} paket ističe ${d}. Napredak ti je sačuvan — nastavljaš tačno gde si stao.`, iBtn:'Obnovi pretplatu'},
  en:{tag:'learn with love',
    rSubj:'Mathia — confirmation and receipt', rH:'Thank you for your trust &#128156;', rB:(s)=>`${s} is active. Start right away — everything is waiting in your account.`, rBtn:'Open account', rFallback:'Your fiscal receipt arrives in a separate email.', rFisk:(b)=>`Fiscal receipt &nbsp;${b}`, rProvera:'Verify receipt',
    wSubj:'Mathia — how to start', wHi:(i)=>i?`Hi, ${i} &#128156;`:'Hi &#128156;', wB:(p)=>`${p} Here's how to get the most out of it.`, wPk:(p)=>p?`Your ${p} plan is active.`:'Your plan is active.', k1t:'Open a subject', k1d:'Notes, formulas and problem sets — all in one place.', k2t:'Ask your teacher', k2d:'Available 24/7. Send a problem or a photo, she guides you step by step.', k3t:'Track progress', k3d:'She remembers where you stopped and brings you right back.', wBtn:'Start now',
    iSubj:'Mathia — subscription ending', iH:'Your subscription is ending soon', iB:(p,d)=>`Your ${p} plan ends on ${d}. Your progress is saved — you continue exactly where you left off.`, iBtn:'Renew subscription'},
  de:{tag:'mit Liebe lernen',
    rSubj:'Mathia — Bestätigung und Beleg', rH:'Danke für dein Vertrauen &#128156;', rB:(s)=>`${s} ist aktiv. Leg gleich los — alles wartet in deinem Konto.`, rBtn:'Konto öffnen', rFallback:'Der Fiskalbeleg kommt in einer separaten E-Mail.', rFisk:(b)=>`Fiskalbeleg &nbsp;${b}`, rProvera:'Beleg prüfen',
    wSubj:'Mathia — so fängst du an', wHi:(i)=>i?`Hallo, ${i} &#128156;`:'Hallo &#128156;', wB:(p)=>`${p} So holst du das Beste heraus.`, wPk:(p)=>p?`Dein ${p}-Paket ist aktiv.`:'Dein Paket ist aktiv.', k1t:'Fach öffnen', k1d:'Skripte, Formeln und Aufgaben — alles an einem Ort.', k2t:'Frag deine Lehrerin', k2d:'Rund um die Uhr. Sende eine Aufgabe oder ein Foto, sie führt dich Schritt für Schritt.', k3t:'Fortschritt verfolgen', k3d:'Sie merkt sich, wo du aufgehört hast, und bringt dich genau dorthin zurück.', wBtn:'Jetzt starten',
    iSubj:'Mathia — Abo läuft ab', iH:'Dein Abo läuft bald ab', iB:(p,d)=>`Dein ${p}-Paket endet am ${d}. Dein Fortschritt ist gespeichert — du machst genau dort weiter.`, iBtn:'Abo verlängern'},
  fr:{tag:'apprendre avec amour',
    rSubj:'Mathia — confirmation et reçu', rH:'Merci de ta confiance &#128156;', rB:(s)=>`${s} est actif. Commence tout de suite — tout t'attend dans ton compte.`, rBtn:'Ouvrir le compte', rFallback:'Ton reçu fiscal arrive dans un e-mail séparé.', rFisk:(b)=>`Reçu fiscal &nbsp;${b}`, rProvera:'Vérifier le reçu',
    wSubj:'Mathia — comment commencer', wHi:(i)=>i?`Bonjour, ${i} &#128156;`:'Bonjour &#128156;', wB:(p)=>`${p} Voici comment en profiter au mieux.`, wPk:(p)=>p?`Ton offre ${p} est active.`:'Ton offre est active.', k1t:'Ouvre une matière', k1d:'Cours, formules et exercices — tout au même endroit.', k2t:'Pose une question à ta professeure', k2d:'Disponible 24h/24. Envoie un exercice ou une photo, elle te guide pas à pas.', k3t:'Suis ta progression', k3d:'Elle retient où tu t\'es arrêté et t\'y ramène exactement.', wBtn:'Commencer',
    iSubj:'Mathia — abonnement bientôt fini', iH:'Ton abonnement se termine bientôt', iB:(p,d)=>`Ton offre ${p} se termine le ${d}. Ta progression est sauvegardée — tu reprends exactement où tu étais.`, iBtn:'Renouveler'},
  es:{tag:'aprender con amor',
    rSubj:'Mathia — confirmación y recibo', rH:'Gracias por tu confianza &#128156;', rB:(s)=>`${s} está activo. Empieza ya — todo te espera en tu cuenta.`, rBtn:'Abrir cuenta', rFallback:'Tu recibo fiscal llega en un correo aparte.', rFisk:(b)=>`Recibo fiscal &nbsp;${b}`, rProvera:'Verificar recibo',
    wSubj:'Mathia — cómo empezar', wHi:(i)=>i?`Hola, ${i} &#128156;`:'Hola &#128156;', wB:(p)=>`${p} Así aprovechas lo mejor.`, wPk:(p)=>p?`Tu plan ${p} está activo.`:'Tu plan está activo.', k1t:'Abre una materia', k1d:'Apuntes, fórmulas y ejercicios — todo en un lugar.', k2t:'Pregunta a tu profesora', k2d:'Disponible 24/7. Envía un ejercicio o una foto, te guía paso a paso.', k3t:'Sigue tu progreso', k3d:'Recuerda dónde lo dejaste y te lleva justo allí.', wBtn:'Empezar ahora',
    iSubj:'Mathia — la suscripción termina', iH:'Tu suscripción termina pronto', iB:(p,d)=>`Tu plan ${p} termina el ${d}. Tu progreso está guardado — continúas justo donde lo dejaste.`, iBtn:'Renovar suscripción'},
  it:{tag:'imparare con amore',
    rSubj:'Mathia — conferma e ricevuta', rH:'Grazie per la fiducia &#128156;', rB:(s)=>`${s} è attivo. Inizia subito — tutto ti aspetta nel tuo account.`, rBtn:'Apri account', rFallback:'La ricevuta fiscale arriva in un\'email separata.', rFisk:(b)=>`Ricevuta fiscale &nbsp;${b}`, rProvera:'Verifica ricevuta',
    wSubj:'Mathia — come iniziare', wHi:(i)=>i?`Ciao, ${i} &#128156;`:'Ciao &#128156;', wB:(p)=>`${p} Ecco come sfruttarla al meglio.`, wPk:(p)=>p?`Il tuo piano ${p} è attivo.`:'Il tuo piano è attivo.', k1t:'Apri una materia', k1d:'Dispense, formule ed esercizi — tutto in un posto.', k2t:'Chiedi alla tua insegnante', k2d:'Disponibile 24/7. Invia un esercizio o una foto, ti guida passo passo.', k3t:'Segui i progressi', k3d:'Ricorda dove ti sei fermato e ti riporta lì.', wBtn:'Inizia ora',
    iSubj:'Mathia — abbonamento in scadenza', iH:'Il tuo abbonamento sta per scadere', iB:(p,d)=>`Il tuo piano ${p} scade il ${d}. I tuoi progressi sono salvati — riprendi esattamente da dove eri.`, iBtn:'Rinnova abbonamento'},
  ru:{tag:'учиться с любовью',
    rSubj:'Mathia — подтверждение и чек', rH:'Спасибо за доверие &#128156;', rB:(s)=>`${s} активен. Начинай сразу — всё ждёт в твоём аккаунте.`, rBtn:'Открыть аккаунт', rFallback:'Фискальный чек придёт отдельным письмом.', rFisk:(b)=>`Фискальный чек &nbsp;${b}`, rProvera:'Проверить чек',
    wSubj:'Mathia — как начать', wHi:(i)=>i?`Привет, ${i} &#128156;`:'Привет &#128156;', wB:(p)=>`${p} Вот как получить максимум.`, wPk:(p)=>p?`Твой пакет ${p} активен.`:'Твой пакет активен.', k1t:'Открой предмет', k1d:'Конспекты, формулы и задачи — всё в одном месте.', k2t:'Спроси преподавательницу', k2d:'Доступна круглосуточно. Пришли задачу или фото — она ведёт шаг за шагом.', k3t:'Следи за прогрессом', k3d:'Она помнит, где ты остановился, и возвращает точно туда.', wBtn:'Начать',
    iSubj:'Mathia — подписка заканчивается', iH:'Твоя подписка скоро закончится', iB:(p,d)=>`Твой пакет ${p} заканчивается ${d}. Прогресс сохранён — продолжишь ровно с того места.`, iBtn:'Продлить подписку'},
  pt:{tag:'aprender com amor',
    rSubj:'Mathia — confirmação e recibo', rH:'Obrigada pela confiança &#128156;', rB:(s)=>`${s} está ativo. Começa já — tudo te espera na tua conta.`, rBtn:'Abrir conta', rFallback:'O teu recibo fiscal chega num e-mail separado.', rFisk:(b)=>`Recibo fiscal &nbsp;${b}`, rProvera:'Verificar recibo',
    wSubj:'Mathia — como começar', wHi:(i)=>i?`Olá, ${i} &#128156;`:'Olá &#128156;', wB:(p)=>`${p} Eis como aproveitar ao máximo.`, wPk:(p)=>p?`O teu plano ${p} está ativo.`:'O teu plano está ativo.', k1t:'Abre uma disciplina', k1d:'Apontamentos, fórmulas e exercícios — tudo num só lugar.', k2t:'Pergunta à tua professora', k2d:'Disponível 24/7. Envia um exercício ou foto, ela guia-te passo a passo.', k3t:'Acompanha o progresso', k3d:'Lembra-se de onde paraste e leva-te de volta.', wBtn:'Começar agora',
    iSubj:'Mathia — subscrição a terminar', iH:'A tua subscrição termina em breve', iB:(p,d)=>`O teu plano ${p} termina a ${d}. O teu progresso está guardado — continuas exatamente onde estavas.`, iBtn:'Renovar subscrição'}
};

// (1) Fiskalni račun / potvrda posle uspešne uplate
export async function posaljiRacun({ to, racun, sta, pristupLink, lang }) {
  const t = TR[lc(lang)];
  const fisk = (racun && racun.brojRacuna)
    ? `${t.rFisk(racun.brojRacuna)}${racun.qr ? `<br><a href="${racun.qr}" style="color:#C6A05C;text-decoration:none">${t.rProvera}</a>` : ''}`
    : t.rFallback;
  const html = okvir(`
    ${kvacica}
    ${naslov(t.rH)}
    ${tekst(t.rB(sta || ''))}
    ${dugme(pristupLink, t.rBtn)}
    <div style="margin-top:28px;font-size:12px;color:#A99B92;line-height:1.8">${fisk}</div>
  `, t.tag);
  await posalji({ to, subject: t.rSubj, html });
}

// (1b) Dobrodošlica — kako da počne
export async function posaljiDobrodoslicu({ to, ime, paket, pristupLink, lang }) {
  const t = TR[lc(lang)];
  const html = okvir(`
    ${naslov(t.wHi(ime))}
    ${tekst(t.wB(t.wPk(paket)))}
    <table style="margin:0 auto 26px;border-collapse:collapse">
      ${korak('1', t.k1t, t.k1d)}
      ${korak('2', t.k2t, t.k2d)}
      ${korak('3', t.k3t, t.k3d)}
    </table>
    ${dugme(pristupLink, t.wBtn)}
  `, t.tag);
  await posalji({ to, subject: t.wSubj, html });
}

// (2) Pretplata ističe/istekla — poziv da obnovi
export async function posaljiIstek({ to, paket, istice, lang }) {
  const t = TR[lc(lang)];
  const loc = { sr:'sr-RS', en:'en-GB', de:'de-DE', fr:'fr-FR', es:'es-ES', it:'it-IT', ru:'ru-RU', pt:'pt-PT' }[lc(lang)];
  const link = `${APP_URL}/prodavnica.html?obnovi=${encodeURIComponent(paket)}`;
  const html = okvir(`
    ${naslov(t.iH)}
    ${tekst(t.iB(paket, new Date(istice).toLocaleDateString(loc)))}
    ${dugme(link, t.iBtn)}
  `, t.tag);
  await posalji({ to, subject: t.iSubj, html });
}
