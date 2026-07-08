// ============================================================
//  lib/sms.js — slanje SMS-a preko Infobip-a
//  Environment Variables:
//    INFOBIP_BASE_URL  (npr. xxxxx.api.infobip.com — iz Infobip naloga)
//    INFOBIP_API_KEY   (API Key iz Infobip-a)
//    INFOBIP_SENDER    (ime/broj pošiljaoca; npr. "MathIA")
// ============================================================
export async function sendSms(toPhone, text) {
  const base = process.env.INFOBIP_BASE_URL || "";
  const apiKey = process.env.INFOBIP_API_KEY || "";
  const sender = process.env.INFOBIP_SENDER || "MathIA";
  if (!base || !apiKey) throw new Error("Infobip nije podešen: dodaj INFOBIP_BASE_URL i INFOBIP_API_KEY.");

  const url = (base.indexOf("http") === 0 ? base : "https://" + base).replace(/\/+$/, "") + "/sms/2/text/advanced";
  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "App " + apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      messages: [{ destinations: [{ to: String(toPhone).replace(/^\+/, "") }], from: sender, text }],
    }),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) {
    const msg = (d && d.requestError && d.requestError.serviceException && d.requestError.serviceException.text) || ("HTTP " + r.status);
    throw new Error("Infobip greška: " + msg);
  }
  return d;
}
