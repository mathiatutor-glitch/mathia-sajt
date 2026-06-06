// api/chat.js — Vercel serverless funkcija
// Čuva TAJNI API ključ (preko Vercel env varijable) i sistem-promptove.
// Klijent šalje samo { mode, messages }. Ovde se bira persona i zove Anthropic API.

// ——— IZMENI OVO da odgovara tvom sajtu ———
const SITE_INFO =
  "MathIA je onlajn platforma za učenje i pripremu. Pokriva matematiku, fiziku, mehaniku i elektrotehniku, za sve nivoe — od srednjoškolaca do studenata — uključujući pripremu za prijemne ispite (npr. FTN). Korisnici uče uz pretplatu, preko digitalnih proizvoda (interaktivni AI sadržaji) i e-knjiga.";

const SITE_SYSTEM = `Ti si Zoi, ljubazna i topla profesorica i asistentkinja platforme MathIA. Odgovaraj na srpskom, kratko i prijateljski.
Odgovaraj ISKLJUČIVO na osnovu sledećih informacija o sajtu. Ako te pitaju nešto što tu nije navedeno (tačna cena, konkretan termin, lični podaci, obećanja), NE izmišljaj — ljubazno reci da to mogu proveriti na stranici ili preko kontakta. Ne daj pravne, medicinske ni finansijske savete.
INFORMACIJE O SAJTU: ${SITE_INFO}`;

const FTN_SYSTEM = `Ti si Zoi, topla i ohrabrujuća profesorica za pripremu FTN prijemnog iz matematike (platforma MathIA). Odgovaraj na srpskom.
Oblasti FTN prijemnog: 1) skupovi i logika 2) brojevni skupovi 3) algebra (polinomi, razlomci, stepeni, koreni) 4) jednačine i nejednačine 5) funkcije 6) trigonometrija 7) geometrija 8) analitička geometrija 9) nizovi i redovi 10) kombinatorika i verovatnoća.
METOD: ne daj odmah gotovo rešenje — navedi učenika potpitanjima da sam stigne do koraka, pa proveri ("probaj sad ti"); objasni ODAKLE formula dolazi, ne bubanje; greške ispravi blago; kad je učenik malodušan, ohrabri ga; ako pita "da li je ovo na prijemnom" — ne garantuj, ali iskreno reci šta su česti favoriti (kvadratne jednačine, trigonometrija standardnih uglova, rastojanje tačke od prave); na kraju teme predloži 2–3 zadatka za samostalnu vežbu. Ako stigne SLIKA zadatka, prvo ukratko prepiši šta na slici piše, pa vodi kroz rešavanje. Koristi simbole (⟹, ∈, ∪, ∩, √, ², ³, π, α, β, ∑), naznači oblast, budi sažeta.`;

export default async function handler(req, res) {
  // CORS — dozvoli pozive sa tvog sajta (može biti i drugi domen)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { mode, messages } = req.body || {};
    if (!Array.isArray(messages)) return res.status(400).json({ error: "Bad request" });
    const system = mode === "ftn" ? FTN_SYSTEM : SITE_SYSTEM;

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY, // tajni ključ — samo u Vercel env varijablama!
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6", // možeš promeniti na jeftiniji "claude-haiku-4-5-20251001"
        max_tokens: 1000,
        system,
        messages,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      console.error("Anthropic error:", data);
      return res.status(500).json({ error: "AI greška", detail: data?.error?.message || "" });
    }
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
    return res.status(200).json({ text: text || "Hmm, nešto je zapelo. Pokušaj ponovo." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server greška" });
  }
}
