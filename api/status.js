// api/status.js  →  GET /api/status?key=<OWNER_KEY>
// ──────────────────────────────────────────────────────────────────────────
// Vlasnički pregled: da li su sve integracije PODEŠENE (env postavljen).
// Vraća SAMO true/false — NIKAD vrednosti tajni. Zaključano vlasničkim ključem
// (OWNER_KEY, default MATHIA-MARINA-2026) ili ADMIN_SECRET-om.
// ──────────────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  const key = (req.query && req.query.key) || req.headers['x-owner-key'] || '';
  const OWNER = process.env.OWNER_KEY || 'MATHIA-MARINA-2026';
  const ADMIN = process.env.ADMIN_SECRET || '';
  if (String(key) !== String(OWNER) && !(ADMIN && String(key) === String(ADMIN))) {
    res.status(403).json({ error: 'Zabranjeno' });
    return;
  }
  const has = (n) => !!(process.env[n] && String(process.env[n]).trim());
  const upcUrl = process.env.UPC_GATEWAY_URL || 'https://ecg.test.upc.ua/rbrs/pay';
  const esirUrl = process.env.ESIR_API_URL || 'https://staging.efiskalizacija.cloud';

  res.status(200).json({
    ai: { anthropic: has('ANTHROPIC_API_KEY') },
    baza: { url: has('SUPABASE_URL'), service_key: has('SUPABASE_SERVICE_KEY'), anon_key: has('SUPABASE_ANON_KEY') },
    admin: { admin_emails: has('ADMIN_EMAILS'), admin_secret: has('ADMIN_SECRET'), app_url: has('APP_URL') },
    placanje_upc: {
      merchant_id: has('UPC_MERCHANT_ID'), terminal_id: has('UPC_TERMINAL_ID'),
      private_key: has('UPC_PRIVATE_KEY'), server_cert: has('UPC_SERVER_CERT'),
      gateway: upcUrl, produkcija: !/test\.upc\.ua/i.test(upcUrl),
    },
    fiskalizacija_esir: {
      api_key: has('ESIR_API_KEY'), api_secret: has('ESIR_API_SECRET'),
      webhook_secret: has('EFISK_WEBHOOK_SECRET'),
      url: esirUrl, produkcija: !/staging\./i.test(esirUrl),
    },
    mejl_resend: { api_key: has('EMAIL_API_KEY'), from: has('EMAIL_FROM') },
    sms_telefon: { infobip_key: has('INFOBIP_API_KEY'), infobip_sender: has('INFOBIP_SENDER'), session_secret: has('SESSION_SECRET') },
    kv_ratelimit: { configured: (has('KV_REST_API_URL') && has('KV_REST_API_TOKEN')) || (has('UPSTASH_REDIS_REST_URL') && has('UPSTASH_REDIS_REST_TOKEN')) },
    vreme: new Date().toISOString(),
  });
}
