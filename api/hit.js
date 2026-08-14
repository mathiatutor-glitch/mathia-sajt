// api/hit.js — lagani brojač poseta u KV (Vercel KV / Upstash). Samostalan, bez auth.
// Poziva se sa svake strane (beacon iz mathia-delight.js): POST /api/hit?p=/predmeti.html
const URL_  = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL   || "";
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
async function kv(args){
  if(!URL_ || !TOKEN) return null;
  try{
    const r = await fetch(URL_, { method:"POST", headers:{ Authorization:"Bearer "+TOKEN, "Content-Type":"application/json" }, body: JSON.stringify(args) });
    const d = await r.json().catch(()=>({}));
    return d && d.result;
  }catch(e){ return null; }
}
export default async function handler(req, res){
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS");
  if(req.method==="OPTIONS") return res.status(204).end();
  try{
    let p = "/";
    try{ p = String((req.query && req.query.p) || "/").slice(0,120) || "/"; }catch(e){}
    const d = new Date().toISOString().slice(0,10);
    await kv(["INCR","mathia:pv:total"]);
    const n = await kv(["INCR","mathia:pv:day:"+d]);
    if(n === 1) await kv(["EXPIRE","mathia:pv:day:"+d,"3888000"]); // ~45 dana
    await kv(["ZINCRBY","mathia:pv:pages","1",p]);
  }catch(e){}
  res.setHeader("Cache-Control","no-store");
  return res.status(204).end();
}
