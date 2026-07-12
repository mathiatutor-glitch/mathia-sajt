-- =====================================================================
--  MATHIA — migracija ključeva predmeta posle spajanja
--  Stari (podeljeni) → novi (spojeni) u tabeli `pretplate` (kolona predmeti jsonb).
--  Pokreni JEDNOM u Supabase → SQL Editor → Run. Idempotentno je (može i više puta).
-- =====================================================================

with mapa(stari, novi) as (values
  ('elektricne-masine-1',   'elektricne-masine'),
  ('elektricne-masine-2',   'elektricne-masine'),
  ('elektricne-masine-3',   'elektricne-masine'),
  ('osnovi-elektrotehnike-1','osnovi-elektrotehnike'),
  ('osnovi-elektrotehnike-2','osnovi-elektrotehnike'),
  ('merenja-nev',           'elektricna-merenja'),
  ('fax-merenja',           'elektricna-merenja'),
  ('baze-podataka-1',       'fax-bazepodataka'),
  ('baze-podataka-2',       'fax-bazepodataka'),
  ('sql',                   'fax-bazepodataka'),
  ('prog-sql',              'fax-bazepodataka')
)
update pretplate p
set predmeti = sub.novi_predmeti
from (
  select p2.id,
         (select jsonb_agg(distinct v)
            from (
              select coalesce(m.novi, e.elem) as v
              from jsonb_array_elements_text(p2.predmeti) as e(elem)
              left join mapa m on m.stari = e.elem
            ) t
         ) as novi_predmeti
  from pretplate p2
  where p2.predmeti is not null
     and jsonb_typeof(p2.predmeti) = 'array'
) sub
where p.id = sub.id
  and p.predmeti is distinct from sub.novi_predmeti;

-- (Opciono) Napredak po predmetu — ako je već beležen sa starim ključem.
-- Ako korisnik ima i stari i novi red za isti predmet, prvo obriši stari da ne dođe do sudara PK (user_id,predmet).
delete from mathia_napredak a
using mathia_napredak b,
     (values ('elektricne-masine-1','elektricne-masine'),('elektricne-masine-2','elektricne-masine'),
             ('elektricne-masine-3','elektricne-masine'),('osnovi-elektrotehnike-1','osnovi-elektrotehnike'),
             ('osnovi-elektrotehnike-2','osnovi-elektrotehnike'),('merenja-nev','elektricna-merenja'),
             ('fax-merenja','elektricna-merenja'),('baze-podataka-1','fax-bazepodataka'),
             ('baze-podataka-2','fax-bazepodataka'),('sql','fax-bazepodataka'),('prog-sql','fax-bazepodataka')) m(stari,novi)
where a.predmet = m.stari and b.user_id = a.user_id and b.predmet = m.novi;

update mathia_napredak n
set predmet = m.novi
from (values ('elektricne-masine-1','elektricne-masine'),('elektricne-masine-2','elektricne-masine'),
             ('elektricne-masine-3','elektricne-masine'),('osnovi-elektrotehnike-1','osnovi-elektrotehnike'),
             ('osnovi-elektrotehnike-2','osnovi-elektrotehnike'),('merenja-nev','elektricna-merenja'),
             ('fax-merenja','elektricna-merenja'),('baze-podataka-1','fax-bazepodataka'),
             ('baze-podataka-2','fax-bazepodataka'),('sql','fax-bazepodataka'),('prog-sql','fax-bazepodataka')) m(stari,novi)
where n.predmet = m.stari;
