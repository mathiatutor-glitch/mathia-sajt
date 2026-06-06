/* widget.js — ugradi Zoi u bilo koju stranicu jednom linijom:
   <script src="https://TVOJ-PROJEKAT.vercel.app/widget.js"
           data-mode="site"  (ili "ftn")
           data-avatar="https://i.postimg.cc/.../slika.png"
           data-api="https://TVOJ-PROJEKAT.vercel.app/api/chat"></script>
   Koristi Shadow DOM, pa ne kvari stil tvoje postojeće stranice. */
(function () {
  var script = document.currentScript;
  var MODE = (script && script.getAttribute("data-mode")) || "site";
  var AVATAR = (script && script.getAttribute("data-avatar")) || "https://i.postimg.cc/qBXWmBQf/Chat-GPT-Image-6-jun-2026-11-58-24.png";
  var API = (script && script.getAttribute("data-api")) || "/api/chat";

  var greetings = {
    site: "Ćao, ja sam Zoi! 😊 Pitaj me bilo šta o platformi — predmeti, kako funkcioniše, priprema za prijemni.",
    ftn: "Zdravo! Ja sam Zoi, podrška za FTN prijemni. 📐 Napiši zadatak ili pošalji 📷 sliku, pa idemo korak po korak."
  };
  var quick = {
    site: [["Koje predmete pokrivate?", "Koje predmete pokrivate?"], ["Kako funkcioniše?", "Kako funkcioniše platforma?"], ["Priprema za prijemni?", "Šta je priprema za prijemni?"]],
    ftn: [["Napiši zadatak", "__fill:Imam zadatak: "], ["📷 Slika", "__file"], ["Objasni pojam", "Objasni mi jedan pojam za FTN prijemni."]]
  };

  var state = { open: false, messages: [{ role: "assistant", content: greetings[MODE] }], attachment: null, voiceOn: true, loading: false, listening: false };

  // host + shadow
  var host = document.createElement("div");
  host.id = "zoi-widget-host";
  document.body.appendChild(host);
  var root = host.attachShadow({ mode: "open" });

  var css = `
    :host,*{box-sizing:border-box}
    .launcher{position:fixed;right:18px;bottom:18px;width:62px;height:62px;border-radius:50%;border:none;cursor:pointer;
      box-shadow:0 8px 24px rgba(0,0,0,.22);overflow:hidden;padding:0;background:#C75B39;z-index:2147483000}
    .launcher img{width:100%;height:100%;object-fit:cover}
    .panel{position:fixed;right:18px;bottom:90px;width:360px;max-width:calc(100vw - 28px);height:560px;max-height:calc(100vh - 120px);
      background:#FBF6EE;border:1px solid #E7DDCD;border-radius:18px;box-shadow:0 16px 48px rgba(0,0,0,.25);
      display:none;flex-direction:column;overflow:hidden;z-index:2147483000;font-family:'Nunito',system-ui,sans-serif;color:#2C2620}
    .panel.open{display:flex}
    .hd{background:#FFFDF9;border-bottom:1px solid #E7DDCD;padding:12px 14px;display:flex;align-items:center;justify-content:space-between}
    .hl{display:flex;align-items:center;gap:10px}
    .av{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #F0E0D6}
    .av.sm{width:26px;height:26px;border-width:1px}
    .nm{font-size:17px;font-weight:800;line-height:1.1}
    .su{font-size:11.5px;color:#6B6256;font-weight:700}
    .hb{border:1px solid #E7DDCD;background:#FBF6EE;border-radius:10px;padding:6px 9px;font-size:14px;cursor:pointer;color:#2C2620}
    .hb.on{background:#F0E0D6}
    .body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
    .m{display:flex;align-items:flex-end;gap:7px}
    .m.u{justify-content:flex-end}
    .bub{max-width:82%;padding:10px 13px;border-radius:15px;font-size:14.5px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word}
    .bub.bot{background:#FFFDF9;border:1px solid #E7DDCD;border-bottom-left-radius:4px}
    .bub.me{background:#C75B39;color:#fff;border-bottom-right-radius:4px}
    .bub img{display:block;max-width:100%;border-radius:9px;margin-bottom:7px}
    .dots span{width:6px;height:6px;border-radius:50%;background:#C75B39;display:inline-block;margin-right:4px;animation:bl 1.2s infinite}
    @keyframes bl{0%,80%,100%{opacity:.25}40%{opacity:1}}
    .chips{display:flex;gap:7px;padding:0 14px 8px;flex-wrap:wrap}
    .chip{border:1px solid #E7DDCD;background:#FFFDF9;border-radius:999px;padding:6px 11px;font-size:12.5px;font-weight:700;cursor:pointer;color:#2C2620;font-family:inherit}
    .pv{padding:0 14px 6px;display:flex;align-items:center;gap:8px}
    .pv img{width:40px;height:40px;border-radius:7px;object-fit:cover;border:1px solid #E7DDCD}
    .pv .rm{border:none;background:none;color:#C75B39;font-weight:800;cursor:pointer;font-size:12.5px}
    .ir{background:#FFFDF9;border-top:1px solid #E7DDCD;padding:10px 12px;display:flex;gap:7px;align-items:flex-end}
    .ib{border:1px solid #E7DDCD;background:#FBF6EE;border-radius:12px;padding:9px 11px;font-size:15px;cursor:pointer;color:#2C2620}
    .ib.listening{background:#C75B39;color:#fff}
    textarea{flex:1;resize:none;max-height:110px;border:1px solid #E7DDCD;border-radius:12px;padding:10px 12px;font-family:inherit;font-size:14.5px;color:#2C2620;background:#FBF6EE}
    .snd{background:#C75B39;color:#fff;border:none;border-radius:12px;padding:10px 14px;font-size:14.5px;font-weight:800;cursor:pointer;font-family:inherit}
    .snd:disabled{background:#E7DDCD;cursor:default}
    ::placeholder{color:#A99E8E}
    @media(max-width:420px){.panel{right:8px;left:8px;width:auto;bottom:84px}}
  `;

  root.innerHTML =
    '<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">' +
    "<style>" + css + "</style>" +
    '<button class="launcher" id="lz"><img src="' + AVATAR + '" alt="Zoi"></button>' +
    '<div class="panel" id="pz">' +
      '<div class="hd"><div class="hl"><img class="av" src="' + AVATAR + '"><div><div class="nm">Zoi</div><div class="su">profesorica</div></div></div>' +
        '<div style="display:flex;gap:6px"><button class="hb on" id="vz">🔊</button><button class="hb" id="cz">✕</button></div></div>' +
      '<div class="body" id="bz"></div>' +
      '<div class="chips" id="qz"></div>' +
      '<div class="pv" id="pvz" style="display:none"></div>' +
      '<div class="ir">' +
        '<input type="file" accept="image/*" id="fz" style="display:none">' +
        '<button class="ib" id="az" style="display:none" title="Slika zadatka">📎</button>' +
        '<button class="ib" id="mz" style="display:none" title="Govori">🎤</button>' +
        '<textarea id="tz" rows="1" placeholder="Napiši pitanje..."></textarea>' +
        '<button class="snd" id="sz" disabled>Pošalji</button>' +
      "</div>" +
    "</div>";

  var $ = function (id) { return root.getElementById(id); };
  var body = $("bz"), chips = $("qz"), tz = $("tz"), sz = $("sz"), pvz = $("pvz");

  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

  function render() {
    body.innerHTML = "";
    state.messages.forEach(function (m) {
      var w = document.createElement("div"); w.className = "m " + (m.role === "user" ? "u" : "");
      if (m.role !== "user") { var a = document.createElement("img"); a.className = "av sm"; a.src = AVATAR; w.appendChild(a); }
      var b = document.createElement("div"); b.className = "bub " + (m.role === "user" ? "me" : "bot");
      var html = ""; if (m.image) html += '<img src="' + m.image.dataUrl + '">'; html += esc(m.content || "");
      b.innerHTML = html; w.appendChild(b); body.appendChild(w);
    });
    if (state.loading) {
      var w2 = document.createElement("div"); w2.className = "m";
      var a2 = document.createElement("img"); a2.className = "av sm"; a2.src = AVATAR; w2.appendChild(a2);
      var b2 = document.createElement("div"); b2.className = "bub bot";
      b2.innerHTML = '<span class="dots"><span></span><span style="animation-delay:.2s"></span><span style="animation-delay:.4s"></span></span>';
      w2.appendChild(b2); body.appendChild(w2);
    }
    body.scrollTop = body.scrollHeight;
  }
  function renderChips() {
    chips.innerHTML = "";
    quick[MODE].forEach(function (q) {
      var c = document.createElement("button"); c.className = "chip"; c.textContent = q[0];
      c.onclick = function () { var v = q[1]; if (v === "__file") $("fz").click(); else if (v.indexOf("__fill:") === 0) { tz.value = v.slice(7); tz.focus(); upd(); } else send(v); };
      chips.appendChild(c);
    });
  }

  function speak(t) {
    if (!state.voiceOn || !window.speechSynthesis) return;
    try {
      speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t);
      var vs = speechSynthesis.getVoices(); var fem = /(female|žensk|Zira|Helena|Sabina|Marica|Maja|Lana|Ana|Lucia|Petra)/i;
      var v = vs.find(function (x) { return /^sr/i.test(x.lang) && fem.test(x.name); }) || vs.find(function (x) { return /^hr|^bs/i.test(x.lang) && fem.test(x.name); }) || vs.find(function (x) { return /^sr/i.test(x.lang); }) || vs.find(function (x) { return /^hr|^bs/i.test(x.lang); }) || vs.find(function (x) { return fem.test(x.name); });
      if (v) u.voice = v; u.lang = (v && v.lang) || "sr-RS"; u.rate = 0.94; u.pitch = 1.15; speechSynthesis.speak(u);
    } catch (e) {}
  }
  if ("speechSynthesis" in window) speechSynthesis.getVoices();

  function upd() { sz.disabled = state.loading || (!tz.value.trim() && !state.attachment); }

  async function send(forced) {
    var content = (forced !== undefined ? forced : tz.value).trim();
    if ((!content && !state.attachment) || state.loading) return;
    state.messages.push({ role: "user", content: content || "Pomozi mi sa ovim zadatkom sa slike.", image: state.attachment });
    tz.value = ""; state.attachment = null; pvz.style.display = "none"; state.loading = true; upd(); render();
    try {
      var apiMessages = state.messages.map(function (m) {
        return m.image
          ? { role: m.role, content: [{ type: "text", text: m.content || "Pomozi mi sa ovim zadatkom sa slike." }, { type: "image", source: { type: "base64", media_type: m.image.mediaType, data: m.image.base64 } }] }
          : { role: m.role, content: m.content };
      });
      var res = await fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mode: MODE, messages: apiMessages }) });
      var data = await res.json();
      var reply = data.text || "Hmm, nešto je zapelo. Pokušaj ponovo.";
      state.messages.push({ role: "assistant", content: reply }); speak(reply);
    } catch (e) { state.messages.push({ role: "assistant", content: "Veza je zapela. Pokušaj ponovo." }); }
    finally { state.loading = false; upd(); render(); }
  }

  // events
  $("lz").onclick = function () { state.open = !state.open; $("pz").classList.toggle("open", state.open); };
  $("cz").onclick = function () { state.open = false; $("pz").classList.remove("open"); };
  $("vz").onclick = function () { state.voiceOn = !state.voiceOn; if (!state.voiceOn && window.speechSynthesis) speechSynthesis.cancel(); $("vz").classList.toggle("on", state.voiceOn); $("vz").textContent = state.voiceOn ? "🔊" : "🔇"; };
  $("az").onclick = function () { $("fz").click(); };
  $("fz").onchange = function (e) {
    var f = e.target.files && e.target.files[0]; if (!f) return;
    var r = new FileReader(); r.onload = function () {
      var d = r.result; state.attachment = { dataUrl: d, base64: String(d).split(",")[1], mediaType: f.type || "image/jpeg" };
      pvz.style.display = "flex"; pvz.innerHTML = '<img src="' + d + '"><span style="font-size:12.5px;color:#6B6256;font-weight:700;flex:1">Slika spremna</span><button class="rm">Ukloni</button>';
      pvz.querySelector(".rm").onclick = function () { state.attachment = null; pvz.style.display = "none"; upd(); }; upd();
    }; r.readAsDataURL(f); e.target.value = "";
  };
  tz.addEventListener("input", upd);
  tz.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } });
  sz.onclick = function () { send(); };

  var SR = window.SpeechRecognition || window.webkitSpeechRecognition, recog = null;
  if (SR) {
    $("mz").style.display = "block";
    $("mz").onclick = function () {
      if (state.listening) { recog && recog.stop(); return; }
      recog = new SR(); recog.lang = "sr-RS"; recog.interimResults = false;
      recog.onresult = function (e) { tz.value = (tz.value ? tz.value + " " : "") + e.results[0][0].transcript; upd(); };
      recog.onend = function () { state.listening = false; $("mz").classList.remove("listening"); };
      recog.onerror = function () { state.listening = false; $("mz").classList.remove("listening"); };
      state.listening = true; $("mz").classList.add("listening"); recog.start();
    };
  }

  if (MODE === "ftn") { $("az").style.display = "block"; tz.placeholder = "Napiši zadatak ili pošalji sliku..."; }
  renderChips(); render();
})();
