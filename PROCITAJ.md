# HITNA POPRAVKA — naplata

**10 fajlova.** Postavi na GitHub u koren (Add file → Upload files → prevuci sve).
Ovi fajlovi su noviji od onih u `MATHIA-PREVOD-FINAL-*` — ako postavljaš oba, **ove postavi POSLE**.

## Šta je bilo pokvareno

**1. Strana sa cenama je vodila na pogrešan paket.**
`cenovnik.html` je linkovao `placanje.html?plan=basic`, a `placanje.html` čita `?paket`.
Rezultat: kupac klikne **Basic (4.990)** → dobije stranu **„Plaćanje · Gold — 6.990 RSD"**.
Isto i za Diamond. Samo Gold je slučajno radio, jer je gold podrazumevana vrednost.
Provereno uživo na www.mathia.rs pre popravke.

**2. Plaćanje karticom je bilo isključeno.**
`KARTICA_AKTIVNA = false` → dugme neaktivno, poruka „biće uskoro dostupno — za sada
koristi IPS QR ili uplatu na račun". Svaka prava uplata je išla na račun, a taj put
ne pravi porudžbinu ni pretplatu. Zato Danice nema u bazi iako je platila.

**3. Strana za plaćanje nikad nije pitala koje predmete kupac hoće.**
`placanje.html` šalje `predmeti: null` u `/api/checkout`. I da je kartica radila,
pretplata bi nastala prazna.

**4. Nalog nije prepoznavao pretplatu ako se mejl razlikuje u velikim/malim slovima.**
`nalog.html` je koristio `.eq()`, server `.ilike()`. `Danica@` ≠ `danica@`.

## Šta je popravljeno

| fajl | izmena |
|---|---|
| `cenovnik.html` | dugmad → `registracija.html?paket=basic\|gold\|diamond` |
| `placanje.html` | `KARTICA_AKTIVNA = true`; `getPaket()` prihvata i `?paket` i `?plan` |
| `registracija.html` | dodata opcija „uplatom na račun (IPS QR)", nosi `?paket=` |
| `nalog.html` | `.eq('kupac_email')` → `.ilike('kupac_email')` |
| 6 predmetnih strana | `placanje.html?paket=` → `registracija.html?paket=` |

Novi tok: **cenovnik → registracija (bira predmete) → kartica → pretplata se aktivira sama.**
`placanje.html` ostaje za uplatu na račun, sad sa tačnim paketom.

## ⚠ ODMAH POSLE UPLOADA — test karticom

Kartica je sad **uključena i prava**. Uradi probnu kupovinu svojom karticom:

1. `mathia.rs/cenovnik.html` → **Basic** → proveri da piše **Basic 4.990** (ne Gold)
2. Izaberi 1 predmet → Idi na plaćanje → plati pravom karticom
3. Proveri u Supabase:

```sql
select kupac_email, paket, predmeti, status, istice from pretplate
order by created_at desc limit 3;
select kupac_email, iznos_rsd, status, stavke->>'predmeti' from porudzbine
order by created_at desc limit 3;
select broj_racuna, created_at from fiskalni_racuni order by created_at desc limit 3;
```

Treba da vidiš: pretplatu sa **tvojim izabranim predmetom**, porudžbinu `placeno`,
i fiskalni račun sa PFR brojem.

**Ako nešto pukne:** u `placanje.html` vrati `KARTICA_AKTIVNA = false` i postavi ponovo —
kupci se vraćaju na uplatu na račun dok ne rešimo.

## Ostaje nerešeno

Uplata na račun i dalje **ne otključava nalog automatski** — nema veze između izvoda
i baze. Dok se to ne reši, svakog takvog kupca aktiviraš ručno
(`HITNO-aktiviraj-Danicu.sql` je šablon).
