const fs=require('fs');
const sr=JSON.parse(fs.readFileSync('content/_sistemi_signali_strings.json','utf8'));
const map=require('./content/sistemi_signali.i18n.map.js');
const LANGS=['en','de','fr','es','it','ru','pt'];
const miss=[], arr=[];
for(const s of sr){
  const e=map[s];
  if(!e){ miss.push(s); arr.push({en:s,de:s,fr:s,es:s,it:s,ru:s,pt:s}); continue; }
  const o={}; for(const L of LANGS) o[L]=(e[L]!=null?e[L]:s);
  // provera da nijedan jezik ne fali
  for(const L of LANGS) if(e[L]==null) miss.push(s+' ['+L+']');
  arr.push(o);
}
const out='// AUTO-GENERISANO iz sistemi_signali.i18n.map.js — poravnato sa _sistemi_signali_strings.json\n'
  +'// Oblik: [{en,de,fr,es,it,ru,pt}, ...] paralelno sa strings.json (ugovor gen_*.js).\n'
  +'module.exports = '+JSON.stringify(arr,null,0)+';\n';
fs.writeFileSync('content/sistemi_signali.i18n.js', out);
console.log('i18n unosa:', arr.length, '| NEDOSTAJE:', miss.length);
if(miss.length) console.log('Primeri nedostajucih:', miss.slice(0,10));
