// render.js — REKONSTRUISAN iz ugovora gen_*.js (reset/setDict/skriptaTopic/
// formuleTopic/inject/injectFormule + REG/MISS/WARN). Server-side KaTeX validacija.
// Napomena: ovo je rekonstrukcija verna ulazno/izlaznom ugovoru pipeline-a,
// ne originalni engine. MISS/WARN/KaTeX prijave su iskrene (iz ovog koda).
const fs = require('fs');
const katex = require(require('path').join(__dirname, 'node_modules', 'katex'));

const LANGS = ['en', 'de', 'fr', 'es', 'it', 'ru', 'pt'];

let DICT = {};
const REG = {};            // sr -> true (prevedeni kljucevi koji su upotrebljeni)
const MISS = new Set();    // sr bez i18n unosa
const WARN = [];           // {tex, ch} — dijakritika unutar \text{}
const TEXERR = [];         // {tex, msg} — KaTeX parse greske

function reset() { DICT = {}; for (const k in REG) delete REG[k]; MISS.clear(); WARN.length = 0; TEXERR.length = 0; }
function setDict(d) { DICT = d || {}; }

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// dijakritika unutar \text{...} -> WARN (KaTeX \text ne podnosi non-ASCII bez paketa)
function checkText(tex) {
  const re = /\\text\{([^}]*)\}/g; let m;
  while ((m = re.exec(tex))) {
    const bad = m[1].match(/[^\x00-\x7F]/);
    if (bad) WARN.push({ tex, ch: bad[0] });
  }
}

function tex(t, display) {
  checkText(t);
  try {
    return katex.renderToString(t, { throwOnError: true, displayMode: !!display, output: 'html' });
  } catch (e) {
    TEXERR.push({ tex: t, msg: String(e.message || e).split('\n')[0] });
    // fallback: prikazi sirovo, ali zabelezi gresku
    return '<code class="texerr">' + esc(t) + '</code>';
  }
}

// prevod jednog sr-stringa -> visejezicni <span> blok
function mlText(sr) {
  const entry = DICT[sr];
  if (!entry) { MISS.add(sr); }
  else { REG[sr] = true; }
  let out = '<span class="t">';
  for (const L of LANGS) {
    const v = (entry && entry[L]) ? entry[L] : sr; // fallback na sr
    out += '<span class="L L-' + L + '">' + esc(v) + '</span>';
  }
  out += '</span>';
  return out;
}

// niz segmenata: {sr}|{m}|"literal"  -> inline HTML
function inline(seq) {
  let out = '';
  for (const seg of seq) {
    if (typeof seg === 'string') out += esc(seg);
    else if (seg.m != null) out += tex(seg.m, false);
    else if (seg.sr != null) out += mlText(seg.sr);
    else if (seg.tex != null) out += tex(seg.tex, false);
  }
  return out;
}

function skriptaTopic(t) {
  let h = '<section class="topic" id="t' + t.n + '">';
  h += '<h2><span class="num">' + t.n + '.</span> ' + mlText(t.title.sr) + '</h2>';
  if (t.lead) h += '<p class="lead">' + inline(t.lead) + '</p>';
  if (t.zapamti && t.zapamti.length) {
    h += '<div class="zapamti"><h3>' + mlText('Zapamti') + '</h3><ul>';
    for (const z of t.zapamti) {
      h += '<li><span class="zl">' + mlText(z.label.sr) + '</span>'
         + '<span class="zf">' + tex(z.tex, true) + '</span></li>';
    }
    h += '</ul></div>';
  }
  if (t.primer) {
    h += '<div class="primer"><h3>' + mlText('Primer') + '</h3>';
    h += '<p class="zad">' + inline(t.primer.task) + '</p>';
    h += '<ol class="koraci">';
    for (const st of t.primer.steps) h += '<li>' + inline(st) + '</li>';
    h += '</ol></div>';
  }
  h += '</section>';
  return h;
}

// formule model: { title:{sr}, intro?:[seg], grupe:[{label:{sr}, tex}] }
function formuleTopic(t) {
  let h = '<section class="ftopic" id="f' + t.n + '">';
  h += '<h2><span class="num">' + t.n + '.</span> ' + mlText(t.title.sr) + '</h2>';
  if (t.intro) h += '<p class="lead">' + inline(t.intro) + '</p>';
  h += '<ul class="flist">';
  for (const g of t.grupe) {
    h += '<li><span class="zl">' + mlText(g.label.sr) + '</span>'
       + '<span class="zf">' + tex(g.tex, true) + '</span></li>';
  }
  h += '</ul></section>';
  return h;
}

function inject(shell, out, topics) {
  let html = fs.readFileSync(shell, 'utf8').replace('<!--TOPICS-->', topics);
  fs.writeFileSync(out, html);
  return Buffer.byteLength(html);
}
const injectFormule = inject;

module.exports = {
  LANGS, reset, setDict, skriptaTopic, formuleTopic, inject, injectFormule,
  REG, MISS, WARN, TEXERR,
};
