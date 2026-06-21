// Standalone generator za MA1 (Skripta). Pokreni iz build/ direktorijuma: node gen_ma1.js
const path=require('path'), fs=require('fs');
const render=require('./render.js');
const root=path.join(__dirname,'..');
const { skripta }=require(path.join(root,'content/ma1.js'));
const sr=JSON.parse(fs.readFileSync(path.join(root,'content/_ma1_strings.json'),'utf8'));
const tx=require(path.join(root,'content/ma1.i18n.js'));
const DICT={}; for(let i=0;i<sr.length;i++) DICT[sr[i]]=tx[i];
render.reset(); render.setDict(DICT);
const topics=skripta.map(t=>render.skriptaTopic(t)).join('\n');
const shell=path.join(root,'shells/Matematicka-Analiza-1-Skripta.html');
const out=path.join(root,'_final/Matematicka-Analiza-1-Skripta.html');
const len=render.inject(shell,out,topics);
console.log('OUT bytes:',len,'| REG(prevedenih kljuceva):',Object.keys(render.REG).length,'| MISS:',render.MISS.size,'| WARN(dijakritika u TeX):',render.WARN.length);
if(render.MISS.size){ console.log('MISS primeri:',[...render.MISS].slice(0,8)); }
