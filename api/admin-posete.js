// api/admin-posete.js — vraća statistiku poseta za admin tablu. Samostalno (bez lib zavisnosti).
const URL_    = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL   || "";
const TOKEN   = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const SB_URL  = process.env.SUPABASE_URL || "https://ibhirxltgeyecrjwymai.supabase.co";
const SB_KEY  = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || "";
const ADMINS  = String(process.env.ADMIN_EMAILS || "").toLowerCase().split(/[,\s]+/).filter(Boolean);
async function kv(args){
  if(!URL_ || !TOKEN) return null;
  try{ const r=await fetch(URL_,{method:"POST",headers:{Authorization:"Bearer "+TOKEN,"Content-Type":"application/json"},body:JSON.stringify(args)}); const d=await r.json().catch(()=>({})); return d&&d.result; }catch(e){ return null; }
}
async function emailFromToken(tok){
  if(!tok) return null;
  try{ const r=await fetch(SB_URL+"/auth/v1/user",{headers:{Authorization:"Bearer "+tok, apikey: SB_KEY}}); if(!r.ok) return null; const j=await r.json(); return j&&j.email ? String(j.email).toLowerCase() : null; }catch(e){ return null; }
}
export default async function handler(req, res){
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers","Authorization, Content-Type");
  if(req.method==="OPTIONS") return res.status(204).end();
  let tok=""; const h=req.headers && req.headers.authorization; if(h && /^Bearer /.test(h)) tok=h.slice(7);
  const email = await emailFromToken(tok);
  if(!email) return res.status(401).json({ ok:false, error:"not_authenticated" });
  if(ADMINS.length && ADMINS.indexOf(email) < 0) return res.status(403).json({ ok:false, error:"not_admin" });
  try{
    const total = parseInt(await kv(["GET","mathia:pv:total"]),10) || 0;
    const keys=[], labels=[]; const now=new Date();
    for(let i=13;i>=0;i--){ const dd=new Date(now.getTime()-i*86400000); const k=dd.toISOString().slice(0,10); keys.push("mathia:pv:day:"+k); labels.push(k); }
    let vals = await kv(["MGET"].concat(keys)); if(!Array.isArray(vals)) vals=[];
    const byDay = labels.map((d,ix)=>({ d, n: parseInt(vals[ix],10)||0 }));
    const dana14 = byDay.reduce((s,x)=>s+x.n,0);
    let zr = await kv(["ZREVRANGE","mathia:pv:pages","0","9","WITHSCORES"]); const topPages=[];
    if(Array.isArray(zr)){ for(let j=0;j<zr.length;j+=2){ topPages.push({ p: zr[j], n: parseInt(zr[j+1],10)||0 }); } }
    return res.status(200).json({ ok:true, posete:{ total, dana14, byDay, topPages } });
  }catch(e){ return res.status(200).json({ ok:true, posete:{ total:0, dana14:0, byDay:[], topPages:[] } }); }
}
