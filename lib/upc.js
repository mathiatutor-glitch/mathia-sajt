// ============================================================
//  lib/upc.js — UPC „e-Commerce Connect" gateway (Raiffeisen RBRS)
//  Model: hostovana platna stranica. Mi POST-ujemo potpisanu formu na
//  gateway, kupac unese karticu tamo, UPC vrati POTPISAN rezultat.
//
//  Potpis: RSA-SHA1 (isto kao openssl_verify u UPC-ovom notify.php primeru).
//   - ZAHTEV potpisujemo NAŠIM privatnim ključem (UPC_PRIVATE_KEY).
//   - ODGOVOR proveravamo UPC-ovim sertifikatom (UPC_SERVER_CERT).
//
//  Iznosi: u NAJMANJIM jedinicama (para) → RSD × 100.  Valuta RSD = 941.
//  Uspeh: TranCode === "000".
//
//  Env varijable (postaviti u Vercel):
//    UPC_MERCHANT_ID, UPC_TERMINAL_ID,
//    UPC_GATEWAY_URL   (default: https://ecg.test.upc.ua/rbrs/pay),
//    UPC_PRIVATE_KEY   (PEM sadržaj mathia-private.pem),
//    UPC_SERVER_CERT   (PEM sadržaj test-server.cert od UPC-a)
// ============================================================
import crypto from "crypto";

export const RSD = "941";                 // ISO numerička oznaka za dinar
export const VERSION = "1";               // verzija SG interfejsa (po primeru iz specifikacije)

const GATEWAY_URL = process.env.UPC_GATEWAY_URL || "https://ecg.test.upc.ua/rbrs/pay";
const MERCHANT_ID = process.env.UPC_MERCHANT_ID || "";
const TERMINAL_ID = process.env.UPC_TERMINAL_ID || "";
const PRIVATE_KEY = (process.env.UPC_PRIVATE_KEY || "").replace(/\\n/g, "\n");
const SERVER_CERT = (process.env.UPC_SERVER_CERT || "").replace(/\\n/g, "\n");

export function konfigurisan() {
  return !!(MERCHANT_ID && TERMINAL_ID && PRIVATE_KEY && SERVER_CERT);
}

// RSD (dinari, npr. 6990) → para kao string (npr. "699000")
export function uPara(iznosRsd) {
  return String(Math.round(Number(iznosRsd) * 100));
}

// PurchaseTime u formatu YYMMDDHHmmss (UTC; ako zona nije data, gateway koristi svoju)
export function purchaseTime(d) {
  d = d || new Date();
  const p = (n) => String(n).padStart(2, "0");
  return (
    p(d.getUTCFullYear() % 100) + p(d.getUTCMonth() + 1) + p(d.getUTCDate()) +
    p(d.getUTCHours()) + p(d.getUTCMinutes()) + p(d.getUTCSeconds())
  );
}

// ——— potpis ZAHTEVA (datafile string po specifikaciji) ———
// Redosled: MerchantId;TerminalId;PurchaseTime;OrderId[,Delay];Currency[,AltCurrency];Amount[,AltAmount];SD;
// Zarez se IZOSTAVLJA ispred nedostajućih opcionih polja (Delay, AltCurrency, AltAmount).
export function datafileZahteva({ merchantId, terminalId, purchaseTime, orderId, delay, currency, altCurrency, amount, altAmount, sd }) {
  const f4 = delay ? orderId + "," + delay : orderId;
  const f5 = altCurrency ? currency + "," + altCurrency : currency;
  const f6 = altAmount ? amount + "," + altAmount : amount;
  return [merchantId, terminalId, purchaseTime, f4, f5, f6, (sd || "")].join(";") + ";";
}

export function potpisi(dataStr, privateKeyPem) {
  const s = crypto.createSign("RSA-SHA1");
  s.update(dataStr, "utf8");
  return s.sign(privateKeyPem || PRIVATE_KEY, "base64");
}

// Napravi SVE POST parametre + gateway URL za formu ka platnoj stranici.
// stavka: { orderId, iznosRsd, opis, sd, locale }
export function pripremiPlacanje({ orderId, iznosRsd, opis, sd, locale }) {
  const pt = purchaseTime();
  const amount = uPara(iznosRsd);
  const data = datafileZahteva({
    merchantId: MERCHANT_ID, terminalId: TERMINAL_ID, purchaseTime: pt,
    orderId, currency: RSD, amount, sd
  });
  const signature = potpisi(data);
  const fields = {
    Version: VERSION,
    MerchantID: MERCHANT_ID,
    TerminalID: TERMINAL_ID,
    TotalAmount: amount,
    Currency: RSD,
    Language: (locale || "sr").slice(0, 2),
    OrderID: orderId,
    SD: sd || "",
    PurchaseTime: pt,
    PurchaseDesc: (opis || "").slice(0, 125),
    Signature: signature
  };
  return { gatewayUrl: GATEWAY_URL, fields };
}

// ——— provera ODGOVORA (from_gateway) ———
// Redosled tačno kao u UPC notify.php primeru:
//  bez AltTotalAmount: MID;TID;PT;OID,Delay;XID;Cur;Amt;SD;TranCode;ApprovalCode;
//  sa  AltTotalAmount: MID;TID;PT;OID,Delay;XID;Cur,AltCur;Amt,AltAmt;SD;TranCode;ApprovalCode;
export function datafileOdgovora(p) {
  const alt = p.AltTotalAmount;
  const cur = alt ? p.Currency + "," + p.AltCurrency : p.Currency;
  const amt = alt ? p.TotalAmount + "," + p.AltTotalAmount : p.TotalAmount;
  return [
    p.MerchantID, p.TerminalID, p.PurchaseTime,
    (p.OrderID + "," + (p.Delay == null ? "" : p.Delay)),
    p.XID, cur, amt, (p.SD || ""), p.TranCode, p.ApprovalCode
  ].join(";") + ";";
}

// Vrati true samo ako je potpis odgovora ispravan (UPC ga je stvarno poslao).
export function proveriOdgovor(params, serverCertPem) {
  try {
    const data = datafileOdgovora(params);
    const sig = Buffer.from(String(params.Signature || ""), "base64");
    const v = crypto.createVerify("RSA-SHA1");
    v.update(data, "utf8");
    return v.verify(serverCertPem || SERVER_CERT, sig);
  } catch (e) {
    return false;
  }
}

// Uspešna transakcija?
export function uspesno(params) {
  return String(params && params.TranCode) === "000";
}
