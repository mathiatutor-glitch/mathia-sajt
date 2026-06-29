/* sw.js — MATHIA EDU (network-first: online uvek sveže, offline rezerva iz keša) */
var C = "mathia-v1";
self.addEventListener("install", function (e) { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  try { if (new URL(req.url).origin !== location.origin) return; } catch (x) { return; }
  e.respondWith(
    fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(C).then(function (c) { c.put(req, copy); }).catch(function () {});
      return res;
    }).catch(function () { return caches.match(req); })
  );
});
