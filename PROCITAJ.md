# HITNA POPRAVKA — naplata, pristup, klonovi

**17 fajlova.** Postavi na GitHub: koren + folder `api/`.
Noviji su od `MATHIA-PREVOD-FINAL-*` — ako postavljaš oba, **ove postavi POSLE**.

---

## 1. Naplata je bila slomljena u lancu

**Strana sa cenama vodila na pogrešan paket.** `cenovnik.html` je slao `?plan=basic`,
a `placanje.html` čita `?paket`. Kupac klikne **Basic 4.990** → dobije **„Plaćanje · Gold — 6.990 RSD"**.
Isto i Diamond. Samo Gold je radio, jer je gold podrazumevana vrednost.
*Provereno uživo na sajtu pre popravke.*

**Kartica je bila isključena.** `KARTICA_AKTIVNA = false` → jedini put je bio IPS QR /
uplata na račun, a taj put ne pravi ni porudžbinu ni pretplatu. **Zato Danice nema u bazi.**

**Nikad se nije pitalo koje predmete kupac hoće.** `placanje.html` šalje `predmeti: null`.

**Nalog nije prepoznavao pretplatu** ako se mejl razlikuje u velikim/malim slovima
(`.eq()` umesto `.ilike()`).

## 2. Pretplatnici nisu mogli da uđu u ono što su platili

`gate.js` je tražio **tačan** ključ, a kupovina upisuje drugi oblik. Server (`api/chat.js`)
to već rešava kroz `ALIASES` mapu i deljenje po zarezu — `gate.js` nije imao ništa od toga.
**Devet strana je bilo zaključano za ljude koji su ih platili:**

| strana | tražila | kupovina daje |
|---|---|---|
| Verovatnoća (3) | `fax-verovatnoca` | `verovatnoca` |
| Prijemni (2) | `prijemni,prijemni-ftn` | `prijemni` |
| Srednja Matematika (2) | `sr-mat-1,…,sr-mat-4` | `sr-mat-1` |
| Trigonometrija (2) | `trigonometrija` | — (nije se moglo kupiti) |

`gate.js` sad koristi **istu ALIASES mapu** (povučena iz `api/chat.js`, jedan izvor istine)
i podržava liste sa zarezom. Provereno sa 11 testova: 8 strana otključano, sve zabrane i dalje drže.

Takođe: `marina.bulat@gmail.com` dodat u `OWNER_EMAILS` (ranije samo `mathia.tutor@gmail.com`).

## 3. Klonovi — srpski

Uputstvo za ekavicu je dobro i stiže do **svih 81 klona** (`SHARED` + klon + jezik).
Ijekavski oblici postoje samo kao negativni primeri. Tu nije bilo greške.

Ali sistemske poruke su **mešale persiranje i ti-oblik**:
„Da bismo započeli čas, **prijavite se**" vs. „Ovaj predmet nije u **tvom** paketu."
Persiranje je bilo na svih 8 jezika (`Sie`, `vous`, `usted`, `Lei`, `вы`, `você`).
**Svih 47 poruka prebačeno na topli „ti"**, portugalski na evropski `tu`.
`BUSY` poruka je postojala samo na 2 jezika — dopunjena na svih 8.

---

## Šta je promenjeno

| fajl | izmena |
|---|---|
| `cenovnik.html` | dugmad → `registracija.html?paket=…` |
| `placanje.html` | `KARTICA_AKTIVNA = true`; `getPaket()` prima `?paket` i `?plan` |
| `registracija.html` | dodata opcija „uplatom na račun (IPS QR)" sa tačnim paketom |
| `nalog.html` | `.eq` → `.ilike` (mejl) |
| `gate.js` | ALIASES + liste sa zarezom + `.ilike` + Marina kao vlasnik + paywall → registracija |
| `api/chat.js` | sve poruke na „ti", 8 jezika |
| `Trigonometrija-*` (2) | gate uklonjen — **besplatna izložbena strana** |
| `admin-pretplate.html` + `api/admin-pretplate.js` | **novo** — ručno aktiviranje |
| 6 predmetnih strana | linkovi → `registracija.html?paket=` |

---

## ⚠ ODMAH POSLE UPLOADA — dva testa

### A) Test karticom (kartica je sad PRAVA)

1. `mathia.rs/cenovnik.html` → **Basic** → mora da piše **Basic 4.990** (ne Gold)
2. Izaberi 1 predmet → plati svojom karticom
3. Provera:

```sql
select kupac_email, paket, predmeti, status, istice from pretplate order by created_at desc limit 3;
select kupac_email, iznos_rsd, status, stavke->>'predmeti' from porudzbine order by created_at desc limit 3;
select broj_racuna, created_at from fiskalni_racuni order by created_at desc limit 3;
```

Treba: pretplata **sa tvojim predmetom**, porudžbina `placeno`, fiskalni račun sa PFR brojem.

**Ako pukne:** vrati `KARTICA_AKTIVNA = false` u `placanje.html` i postavi ponovo (posao od minut).

### B) Admin strana

`mathia.rs/admin-pretplate.html` — prijavi se svojim admin nalogom.
Vidiš pretplate, porudžbine i **naloge bez pretplate** (tu je Danica).
Klik „Aktiviraj →" popuni mejl, izaberi paket + predmete → **Aktiviraj**.

**Uslov:** tvoj mejl mora biti u `ADMIN_EMAILS` na Vercelu. Ako nije, strana će ti to reći.

---

## Ostaje nerešeno

**Uplata na račun i dalje ne otključava nalog sama.** Nema veze između izvoda i baze.
Svakog takvog kupca aktiviraš kroz admin stranu. Ako želiš da se i to automatizuje,
treba integracija sa bankom (izvod) — to je zaseban posao.
