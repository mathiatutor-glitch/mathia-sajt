# Zoi · MathIA (dvojezično SR/EN)

Zoi se ugrađuje u tvoje postojeće stranice kao dugme u uglu (chat). Govori **srpski i engleski** — ima dugme **SR/EN** u zaglavlju, a možeš zadati i početni jezik preko `data-lang`.

- početna strana → opšta pitanja: `data-mode="site"`
- strana za prijemni → zadaci + slika: `data-mode="ftn"`

## Fajlovi
- `widget.js` — widget (ubacuje se u stranice; Shadow DOM, ne kvari stil)
- `api/chat.js` — backend koji **čuva tajni ključ** i Zoine promptove (SR i EN)
- `index.html`, `prijemni.html` — primeri ugradnje
- `package.json`, `.gitignore`

> ⚠️ API ključ NIKAD ne ide u kod ni na GitHub — samo u Vercel kao tajna varijabla.

---

## Postavljanje
1. **GitHub:** New repository → Add file → Upload files → ubaci sve + folder `api` (sa `chat.js`). Commit.
2. **Vercel:** vercel.com (prijava preko GitHub-a) → Add New… → Project → izaberi repo → Import → Deploy.
3. **Tajni ključ:** Vercel → Settings → Environment Variables → Name `ANTHROPIC_API_KEY`, Value = ključ sa console.anthropic.com → Save → **Deployments → Redeploy**.
4. Otvori `/` i `/prijemni.html` na svom Vercel linku.

## Ugradnja u TVOJE stranice
Pred kraj `</body>`:
```html
<!-- početna -->
<script src="https://TVOJ.vercel.app/widget.js" data-mode="site" data-lang="sr"
        data-avatar="https://i.postimg.cc/qBXWmBQf/Chat-GPT-Image-6-jun-2026-11-58-24.png"
        data-api="https://TVOJ.vercel.app/api/chat"></script>
```
```html
<!-- prijemni -->
<script src="https://TVOJ.vercel.app/widget.js" data-mode="ftn" data-lang="sr"
        data-avatar="https://i.postimg.cc/qBXWmBQf/Chat-GPT-Image-6-jun-2026-11-58-24.png"
        data-api="https://TVOJ.vercel.app/api/chat"></script>
```
(`data-lang="en"` ako želiš da krene na engleskom; korisnik svakako može da prebaci SR/EN u zaglavlju.)

---

## „BAGUJE"? — brza dijagnostika
Otvori Zoi, pošalji poruku i **pogledaj šta piše u oblačiću** (sad ispisuje tačan razlog):

- **„Nedostaje ANTHROPIC_API_KEY…"** → nisi dodala ključ ili nije bilo Redeploy-a. Dodaj ga (korak 3) pa **Redeploy**.
- **Poruka o „credit/billing"** → nemaš sredstava na Anthropic nalogu. Idi na console.anthropic.com → Billing → dodaj sredstva.
- **HTTP 401 / authentication** → ključ je pogrešan/istekao. Napravi novi ključ i zameni ga u Vercel-u, pa Redeploy.
- Posle **svake** izmene fajlova ili varijabli → **Redeploy** (Vercel ne primeni odmah dok ne redeployuješ).

## Šta menjaš
- Tekst o sajtu / ponašanje → `api/chat.js` (`SITE_INFO`, `siteSystem`, `ftnSystem`) — SR i EN.
- Slika → `data-avatar`.
- Model/cena → `api/chat.js`, polje `model` (`claude-haiku-4-5-20251001` jeftinije, `claude-sonnet-4-6` kvalitetnije).

## Napomene
- AI se plaća po upotrebi (tvoj Anthropic nalog) — postavi limit dok testiraš.
- Glas/mikrofon zavise od uređaja (najbolje Chrome); za vrhunski glas kasnije premium TTS (ElevenLabs).
- MVP — pretplata/nalozi/baza su sledeći korak.
