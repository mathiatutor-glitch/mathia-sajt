const fs=require('fs');
const {skripta}=require('./content/sistemi_signali.js');
const {formule}=require('./content/sistemi_signali_formule.js');
const seen=new Set(), order=[];
const add=s=>{ if(s!=null && !seen.has(s)){ seen.add(s); order.push(s);} };
// UI kljucevi koje render koristi
add('Zapamti'); add('Primer');
const seq=arr=>{ for(const seg of arr){ if(seg&&typeof seg==='object'&&seg.sr!=null) add(seg.sr); } };
for(const t of skripta){
  add(t.title.sr);
  if(t.lead) seq(t.lead);
  if(t.zapamti) for(const z of t.zapamti) add(z.label.sr);
  if(t.primer){ seq(t.primer.task); for(const st of t.primer.steps) seq(st); }
}
for(const t of formule){ add(t.title.sr); if(t.intro) seq(t.intro); for(const g of t.grupe) add(g.label.sr); }
fs.writeFileSync('content/_sistemi_signali_strings.json', JSON.stringify(order,null,1));
console.log('UKUPNO jedinstvenih sr niski:', order.length);
