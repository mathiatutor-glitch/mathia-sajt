// MA1 i18n wiring — ubaci u build driver PRE renderovanja Skripte za Analizu 1,
// isto kao što se radi za algebru.
const fs = require('fs');
const ma1Sr  = JSON.parse(fs.readFileSync(__dirname + '/_ma1_strings.json', 'utf8'));
const ma1Tx  = require(__dirname + '/ma1.i18n.js');           // [{en,de,fr,es,it,ru,pt}, ...]
const ma1Dict = {};
for (let i = 0; i < ma1Sr.length; i++) ma1Dict[ma1Sr[i]] = ma1Tx[i];
render.setDict(ma1Dict);   // render = require('../build/render.js')
// ... zatim render.skriptaTopic(...) / inject(...) za MA1 kao i za algebru
module.exports = ma1Dict;
