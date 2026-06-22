// content/sistemi_signali.js — Sistemi i signali (Skripta).
// Izvor: folder „Signali i sistemi Zeljan Trpovski"; lit. Novak (FTN 2005),
// Dautovic, Poularikas & Seely. Oblik kao ma1.js/ma2.js. Srpski je kljuc za prevode.
// Pravila: navodnici „..." (U+201E/U+201D); TeX bez srpskih dijakritika u \text{}.
const r = String.raw;
const skripta = [
{ n:1, title:{sr:"Singularni signali"},
  lead:[{sr:"Singularni signali su idealizacije koje opisuju nagle promene. Najvazniji su Dirakov impuls"}," ",{m:"\\delta(t)"},", ",{sr:"Hevisajdov skok"}," ",{m:"u(t)"}," ",{sr:"i nagibni signal"}," ",{m:"r(t)"},". ",{sr:"Oni su medjusobno povezani izvodom i integralom."}],
  zapamti:[
    {label:{sr:"Dirakov impuls (definiciona osobina)"}, tex:"\\int_{-\\infty}^{\\infty}\\delta(t)\\,dt=1,\\qquad \\delta(t)=0\\ \\text{za}\\ t\\neq0"},
    {label:{sr:"Osobina odabiranja"}, tex:"\\int_{-\\infty}^{\\infty} f(t)\\,\\delta(t-t_0)\\,dt=f(t_0)"},
    {label:{sr:"Veza skoka i impulsa"}, tex:"u(t)=\\int_{-\\infty}^{t}\\delta(\\tau)\\,d\\tau,\\qquad \\frac{d\\,u(t)}{dt}=\\delta(t)"},
    {label:{sr:"Nagibni signal"}, tex:"r(t)=t\\,u(t)=\\int_{-\\infty}^{t} u(\\tau)\\,d\\tau"},
  ],
  primer:{ task:[{sr:"Izracunati"}," ",{m:"\\displaystyle\\int_{-\\infty}^{\\infty}(t^2+1)\\,\\delta(t-2)\\,dt"},"."],
    steps:[
      [{sr:"Po osobini odabiranja integral izdvaja vrednost funkcije u"}," ",{m:"t=2"},"."],
      [{m:"\\int_{-\\infty}^{\\infty}(t^2+1)\\,\\delta(t-2)\\,dt=(2^2+1)"},"."],
      [{m:"=5"},"."],
    ]} },

{ n:2, title:{sr:"Regularni signali i operacije nad njima"},
  lead:[{sr:"Regularni (obicni) signali opisuju se operacijama: pomeranje u vremenu, skaliranje i refleksija. Vazne klase su parni i neparni signali, te periodicni signali. Velicinu signala merimo energijom i snagom."}],
  zapamti:[
    {label:{sr:"Pomeranje i skaliranje"}, tex:"y(t)=x(a\\,t-b)\\quad(\\text{skaliranje}\\ a,\\ \\text{pomeranje}\\ b)"},
    {label:{sr:"Parni i neparni deo"}, tex:"x_p(t)=\\tfrac12\\big(x(t)+x(-t)\\big),\\quad x_n(t)=\\tfrac12\\big(x(t)-x(-t)\\big)"},
    {label:{sr:"Energija signala"}, tex:"E=\\int_{-\\infty}^{\\infty}|x(t)|^2\\,dt"},
    {label:{sr:"Snaga periodicnog signala"}, tex:"P=\\frac1T\\int_{0}^{T}|x(t)|^2\\,dt"},
  ],
  primer:{ task:[{sr:"Naci energiju signala"}," ",{m:"x(t)=e^{-t}u(t)"},"."],
    steps:[
      [{m:"E=\\displaystyle\\int_{0}^{\\infty}\\big(e^{-t}\\big)^2\\,dt=\\int_{0}^{\\infty}e^{-2t}\\,dt"},"."],
      [{m:"=\\Big[-\\tfrac12 e^{-2t}\\Big]_0^{\\infty}=\\tfrac12"},"."],
      [{sr:"Energija je konacna, pa je signal energetski."}],
    ]} },

{ n:3, title:{sr:"Konvolucija u kontinualnom vremenu"},
  lead:[{sr:"Konvolucija opisuje odziv linearnog vremenski nepromenljivog sistema na proizvoljan ulaz. Izlaz je konvolucija ulaza i impulsnog odziva."}],
  zapamti:[
    {label:{sr:"Definicija konvolucije"}, tex:"(x*h)(t)=\\int_{-\\infty}^{\\infty} x(\\tau)\\,h(t-\\tau)\\,d\\tau"},
    {label:{sr:"Komutativnost"}, tex:"x*h=h*x"},
    {label:{sr:"Neutral konvolucije"}, tex:"x(t)*\\delta(t)=x(t)"},
    {label:{sr:"Pomereni impuls"}, tex:"x(t)*\\delta(t-t_0)=x(t-t_0)"},
  ],
  primer:{ task:[{sr:"Naci"}," ",{m:"y(t)=u(t)*u(t)"},"."],
    steps:[
      [{m:"y(t)=\\displaystyle\\int_{-\\infty}^{\\infty}u(\\tau)\\,u(t-\\tau)\\,d\\tau"},"."],
      [{sr:"Podintegralna funkcija je"}," ",{m:"1"}," ",{sr:"za"}," ",{m:"0\\le\\tau\\le t"},", ",{sr:"inace nula."}],
      [{m:"y(t)=\\displaystyle\\int_{0}^{t}d\\tau=t\\,u(t)=r(t)"},"."],
    ]} },

{ n:4, title:{sr:"Bilateralna Laplasova transformacija i oblast konvergencije"},
  lead:[{sr:"Bilateralna Laplasova transformacija preslikava signal vremena u funkciju kompleksne promenljive"}," ",{m:"s=\\sigma+j\\omega"},". ",{sr:"Uz transformaciju uvek se navodi oblast konvergencije (OK), jer ona jednoznacno odredjuje signal."}],
  zapamti:[
    {label:{sr:"Bilateralna definicija"}, tex:"X(s)=\\int_{-\\infty}^{\\infty} x(t)\\,e^{-st}\\,dt"},
    {label:{sr:"Desni signal"}, tex:"e^{a t}u(t)\\ \\longleftrightarrow\\ \\frac{1}{s-a},\\quad \\operatorname{Re}\\{s\\}>a"},
    {label:{sr:"Levi signal"}, tex:"-e^{a t}u(-t)\\ \\longleftrightarrow\\ \\frac{1}{s-a},\\quad \\operatorname{Re}\\{s\\}<a"},
    {label:{sr:"Oblast konvergencije je traka"}, tex:"\\sigma_1<\\operatorname{Re}\\{s\\}<\\sigma_2"},
  ],
  primer:{ task:[{sr:"Naci transformaciju i OK za"}," ",{m:"x(t)=e^{-2t}u(t)"},"."],
    steps:[
      [{m:"X(s)=\\displaystyle\\int_{0}^{\\infty}e^{-2t}e^{-st}\\,dt=\\int_{0}^{\\infty}e^{-(s+2)t}\\,dt"},"."],
      [{sr:"Integral konvergira za"}," ",{m:"\\operatorname{Re}\\{s\\}>-2"},"."],
      [{m:"X(s)=\\dfrac{1}{s+2},\\quad \\operatorname{Re}\\{s\\}>-2"},"."],
    ]} },

{ n:5, title:{sr:"Unilateralna Laplasova transformacija i osobine"},
  lead:[{sr:"Unilateralna (jednostrana) Laplasova transformacija pogodna je za uzrocne signale i za resavanje jednacina sa pocetnim uslovima, jer u osobini izvoda eksplicitno ucestvuju pocetne vrednosti."}],
  zapamti:[
    {label:{sr:"Definicija"}, tex:"X(s)=\\int_{0^-}^{\\infty} x(t)\\,e^{-st}\\,dt"},
    {label:{sr:"Linearnost"}, tex:"a\\,x_1+b\\,x_2\\ \\longleftrightarrow\\ a\\,X_1(s)+b\\,X_2(s)"},
    {label:{sr:"Izvod"}, tex:"\\frac{d x}{dt}\\ \\longleftrightarrow\\ s\\,X(s)-x(0^-)"},
    {label:{sr:"Pomeranje u vremenu"}, tex:"x(t-t_0)u(t-t_0)\\ \\longleftrightarrow\\ e^{-s t_0}X(s)"},
  ],
  primer:{ task:[{sr:"Naci"}," ",{m:"\\mathcal{L}\\{\\sin(\\omega_0 t)\\,u(t)\\}"},"."],
    steps:[
      [{sr:"Iz Ojlerove formule i tablice"}," ",{m:"\\mathcal{L}\\{e^{at}\\}=\\tfrac{1}{s-a}"},"."],
      [{m:"\\sin(\\omega_0 t)=\\dfrac{e^{j\\omega_0 t}-e^{-j\\omega_0 t}}{2j}"},"."],
      [{m:"X(s)=\\dfrac{\\omega_0}{s^2+\\omega_0^2}"},"."],
    ]} },

{ n:6, title:{sr:"Inverzna Laplasova transformacija"},
  lead:[{sr:"Inverznu transformaciju racionalne funkcije nalazimo razlaganjem na parcijalne razlomke, pa svaki clan prepoznajemo iz tablice. Polovi odredjuju oblik vremenskog odziva."}],
  zapamti:[
    {label:{sr:"Prost realni pol"}, tex:"\\frac{1}{s-a}\\ \\longleftrightarrow\\ e^{a t}u(t)"},
    {label:{sr:"Visestruki pol"}, tex:"\\frac{1}{(s-a)^2}\\ \\longleftrightarrow\\ t\\,e^{a t}u(t)"},
    {label:{sr:"Konjugovano-kompleksni polovi"}, tex:"\\frac{\\omega_0}{(s+\\alpha)^2+\\omega_0^2}\\ \\longleftrightarrow\\ e^{-\\alpha t}\\sin(\\omega_0 t)u(t)"},
  ],
  primer:{ task:[{sr:"Naci original za"}," ",{m:"X(s)=\\dfrac{1}{(s+1)(s+2)}"},"."],
    steps:[
      [{sr:"Razlaganje na parcijalne razlomke"},": ",{m:"X(s)=\\dfrac{1}{s+1}-\\dfrac{1}{s+2}"},"."],
      [{sr:"Svaki clan iz tablice"},": ",{m:"x(t)=\\big(e^{-t}-e^{-2t}\\big)u(t)"},"."],
    ]} },

{ n:7, title:{sr:"Furijeova transformacija i osobine"},
  lead:[{sr:"Furijeova transformacija opisuje signal u frekvencijskom domenu. Postoji ako signal apsolutno integrabilan, i dobija se iz Laplasove zamenom"}," ",{m:"s=j\\omega"}," ",{sr:"kada OK obuhvata imaginarnu osu."}],
  zapamti:[
    {label:{sr:"Direktna transformacija"}, tex:"X(j\\omega)=\\int_{-\\infty}^{\\infty} x(t)\\,e^{-j\\omega t}\\,dt"},
    {label:{sr:"Inverzna transformacija"}, tex:"x(t)=\\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty} X(j\\omega)\\,e^{j\\omega t}\\,d\\omega"},
    {label:{sr:"Teorema o pomeranju"}, tex:"x(t-t_0)\\ \\longleftrightarrow\\ e^{-j\\omega t_0}X(j\\omega)"},
    {label:{sr:"Parsevalova teorema"}, tex:"\\int_{-\\infty}^{\\infty}|x(t)|^2\\,dt=\\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty}|X(j\\omega)|^2\\,d\\omega"},
  ],
  primer:{ task:[{sr:"Naci"}," ",{m:"X(j\\omega)"}," ",{sr:"za"}," ",{m:"x(t)=e^{-a t}u(t),\\ a>0"},"."],
    steps:[
      [{m:"X(j\\omega)=\\displaystyle\\int_{0}^{\\infty}e^{-a t}e^{-j\\omega t}\\,dt"},"."],
      [{m:"=\\Big[\\dfrac{-1}{a+j\\omega}e^{-(a+j\\omega)t}\\Big]_0^{\\infty}"},"."],
      [{m:"X(j\\omega)=\\dfrac{1}{a+j\\omega}"},"."],
    ]} },

{ n:8, title:{sr:"LVN sistemi: impulsni odziv i prenosna funkcija"},
  lead:[{sr:"Linearni vremenski nepromenljivi (LVN) sistemi potpuno su opisani impulsnim odzivom"}," ",{m:"h(t)"},". ",{sr:"Laplasova transformacija impulsnog odziva je prenosna funkcija"}," ",{m:"H(s)"},", ",{sr:"a njena vrednost na imaginarnoj osi je frekvencijski odziv."}],
  zapamti:[
    {label:{sr:"Ulaz-izlaz relacija"}, tex:"y(t)=x(t)*h(t)\\ \\longleftrightarrow\\ Y(s)=H(s)\\,X(s)"},
    {label:{sr:"Prenosna funkcija"}, tex:"H(s)=\\frac{Y(s)}{X(s)}=\\frac{b_m s^m+\\dots+b_0}{a_n s^n+\\dots+a_0}"},
    {label:{sr:"Frekvencijski odziv"}, tex:"H(j\\omega)=H(s)\\big|_{s=j\\omega}=|H(j\\omega)|\\,e^{\\,j\\varphi(\\omega)}"},
  ],
  primer:{ task:[{sr:"Sistem je opisan sa"}," ",{m:"y'(t)+3y(t)=x(t)"},". ",{sr:"Naci"}," ",{m:"H(s)"}," ",{sr:"i"}," ",{m:"h(t)"},"."],
    steps:[
      [{sr:"Transformacija (nulti pocetni uslovi)"},": ",{m:"sY+3Y=X"},"."],
      [{m:"H(s)=\\dfrac{Y}{X}=\\dfrac{1}{s+3}"},"."],
      [{m:"h(t)=e^{-3t}u(t)"},"."],
    ]} },

{ n:9, title:{sr:"Klasifikacija i povezivanje sistema"},
  lead:[{sr:"Sisteme klasifikujemo kao linearne ili nelinearne, vremenski nepromenljive ili promenljive, sa ili bez memorije, uzrocne i stabilne. Slozeni sistemi grade se rednim, paralelnim i povratnim povezivanjem."}],
  zapamti:[
    {label:{sr:"Redna veza"}, tex:"H(s)=H_1(s)\\,H_2(s)"},
    {label:{sr:"Paralelna veza"}, tex:"H(s)=H_1(s)+H_2(s)"},
    {label:{sr:"Povratna sprega"}, tex:"H(s)=\\frac{H_1(s)}{1+H_1(s)H_2(s)}"},
    {label:{sr:"Uslov uzrocnosti"}, tex:"h(t)=0\\ \\text{za}\\ t<0"},
  ],
  primer:{ task:[{sr:"Direktna grana"}," ",{m:"H_1=\\tfrac{1}{s}"},", ",{sr:"povratna"}," ",{m:"H_2=K"},". ",{sr:"Naci ekvivalentnu prenosnu funkciju."}],
    steps:[
      [{m:"H=\\dfrac{H_1}{1+H_1 H_2}=\\dfrac{1/s}{1+K/s}"},"."],
      [{m:"H=\\dfrac{1}{s+K}"},"."],
    ]} },

{ n:10, title:{sr:"Analiza u vremenskom domenu i stabilnost"},
  lead:[{sr:"U vremenskom domenu odziv nalazimo konvolucijom. Sistem je BIBO stabilan ako svaki ogranicen ulaz daje ogranicen izlaz; to je ekvivalentno apsolutnoj integrabilnosti impulsnog odziva, odnosno polovima u levoj poluravni."}],
  zapamti:[
    {label:{sr:"BIBO uslov (impulsni odziv)"}, tex:"\\int_{-\\infty}^{\\infty}|h(t)|\\,dt<\\infty"},
    {label:{sr:"Uslov preko polova"}, tex:"\\operatorname{Re}\\{p_k\\}<0\\ \\text{za sve polove}\\ p_k"},
    {label:{sr:"Granicna stabilnost"}, tex:"\\text{prosti polovi na osi}\\ \\operatorname{Re}\\{s\\}=0"},
  ],
  primer:{ task:[{sr:"Da li je sistem"}," ",{m:"H(s)=\\dfrac{1}{s^2+3s+2}"}," ",{sr:"stabilan?"}],
    steps:[
      [{sr:"Polovi"},": ",{m:"s^2+3s+2=(s+1)(s+2)=0"},"."],
      [{m:"p_1=-1,\\ p_2=-2"},"."],
      [{sr:"Oba pola su u levoj poluravni, pa je sistem stabilan."}],
    ]} },

{ n:11, title:{sr:"Analiza preko unilateralne Laplasove transformacije"},
  lead:[{sr:"Unilateralna Laplasova transformacija resava diferencijalne jednacine sistema uz pocetne uslove: jednacina postaje algebarska, resi se po"}," ",{m:"Y(s)"},", ",{sr:"pa se inverznom transformacijom dobija odziv."}],
  zapamti:[
    {label:{sr:"Izvod sa pocetnim uslovom"}, tex:"\\mathcal{L}\\{y'\\}=sY(s)-y(0^-)"},
    {label:{sr:"Drugi izvod"}, tex:"\\mathcal{L}\\{y''\\}=s^2Y(s)-s\\,y(0^-)-y'(0^-)"},
    {label:{sr:"Odziv sistema"}, tex:"Y(s)=\\underbrace{H(s)X(s)}_{\\text{prinudni}}+\\underbrace{Y_{pu}(s)}_{\\text{poc. uslovi}}"},
  ],
  primer:{ task:[{sr:"Resiti"}," ",{m:"y'+2y=0"},", ",{m:"y(0^-)=3"},"."],
    steps:[
      [{m:"sY-3+2Y=0\\ \\Rightarrow\\ (s+2)Y=3"},"."],
      [{m:"Y(s)=\\dfrac{3}{s+2}"},"."],
      [{m:"y(t)=3e^{-2t}u(t)"},"."],
    ]} },

{ n:12, title:{sr:"Analiza preko Furijeove transformacije"},
  lead:[{sr:"Furijeova analiza daje frekvencijski odziv sistema. Spektar izlaza je proizvod spektra ulaza i frekvencijskog odziva, pa amplitudska i fazna karakteristika opisuju kako sistem propusta pojedine ucestanosti."}],
  zapamti:[
    {label:{sr:"Spektar izlaza"}, tex:"Y(j\\omega)=H(j\\omega)\\,X(j\\omega)"},
    {label:{sr:"Amplitudska karakteristika"}, tex:"|H(j\\omega)|=\\sqrt{\\operatorname{Re}^2+\\operatorname{Im}^2}"},
    {label:{sr:"Fazna karakteristika"}, tex:"\\varphi(\\omega)=\\arg H(j\\omega)"},
  ],
  primer:{ task:[{sr:"Za"}," ",{m:"H(j\\omega)=\\dfrac{1}{1+j\\omega}"}," ",{sr:"naci amplitudu na"}," ",{m:"\\omega=1"},"."],
    steps:[
      [{m:"|H(j\\omega)|=\\dfrac{1}{\\sqrt{1+\\omega^2}}"},"."],
      [{m:"|H(j1)|=\\dfrac{1}{\\sqrt2}\\approx0{,}707"},"."],
      [{sr:"To je granica propusnog opsega (pad od"}," ",{m:"3\\,\\mathrm{dB}"},")."],
    ]} },

{ n:13, title:{sr:"Filtriranje: klasifikacija filtara"},
  lead:[{sr:"Filtar je sistem koji selektivno propusta ucestanosti. Po propusnom opsegu razlikujemo niskopropusni (NF), visokopropusni (VF), propusnik opsega (PO) i nepropusnik opsega (NO). Idealni filtri imaju pravougaonu amplitudsku karakteristiku, ali nisu ostvarivi."}],
  zapamti:[
    {label:{sr:"Idealni niskopropusni filtar"}, tex:"|H(j\\omega)|=\\begin{cases}1,&|\\omega|\\le\\omega_c\\\\[2pt]0,&|\\omega|>\\omega_c\\end{cases}"},
    {label:{sr:"Granicna ucestanost (3 dB)"}, tex:"|H(j\\omega_c)|=\\frac{1}{\\sqrt2}\\,|H|_{\\max}"},
    {label:{sr:"Pojacanje u decibelima"}, tex:"A(\\omega)=20\\log_{10}|H(j\\omega)|\\ [\\mathrm{dB}]"},
  ],
  primer:{ task:[{sr:"Odrediti granicnu ucestanost RC niskopropusnika"}," ",{m:"H(j\\omega)=\\dfrac{1}{1+j\\omega R C}"},"."],
    steps:[
      [{sr:"Granicna ucestanost je tamo gde imenilac ima moduo"}," ",{m:"\\sqrt2"},"."],
      [{m:"\\omega_c R C=1\\ \\Rightarrow\\ \\omega_c=\\dfrac{1}{RC}"},"."],
      [{m:"f_c=\\dfrac{1}{2\\pi R C}"},"."],
    ]} },

{ n:14, title:{sr:"Sinteza filtara: Batervort i Cebisev"},
  lead:[{sr:"Sinteza polazi od zadate amplitudske specifikacije i bira aproksimaciju. Batervortova aproksimacija je maksimalno ravna u propusnom opsegu, a Cebisevljeva dozvoljava talasanje radi strmijeg prelaza."}],
  zapamti:[
    {label:{sr:"Batervortova karakteristika"}, tex:"|H(j\\omega)|^2=\\frac{1}{1+\\left(\\dfrac{\\omega}{\\omega_c}\\right)^{2n}}"},
    {label:{sr:"Cebisevljeva karakteristika"}, tex:"|H(j\\omega)|^2=\\frac{1}{1+\\varepsilon^2 T_n^2\\!\\left(\\dfrac{\\omega}{\\omega_c}\\right)}"},
    {label:{sr:"Polovi Batervorta na kruznici"}, tex:"s_k=\\omega_c\\,e^{\\,j\\pi\\frac{2k+n+1}{2n}},\\quad k=0,\\dots,n-1"},
  ],
  primer:{ task:[{sr:"Koliko slabljenje ima Batervort"}," ",{m:"n=2"}," ",{sr:"na"}," ",{m:"\\omega=2\\omega_c"},"?"],
    steps:[
      [{m:"|H|^2=\\dfrac{1}{1+(2)^{4}}=\\dfrac{1}{17}"},"."],
      [{m:"A=10\\log_{10}17\\approx12{,}3\\,\\mathrm{dB}"},"."],
    ]} },

{ n:15, title:{sr:"Analogni filtri i njihova realizacija"},
  lead:[{sr:"Projektovana prenosna funkcija realizuje se pasivnim (RLC) ili aktivnim kolima. Aktivni filtri sa operacionim pojacavacem (npr. Salen-Ki) ne troše signal i lako se kaskadiraju. Realizacija drugog reda gradivni je blok visih redova."}],
  zapamti:[
    {label:{sr:"Sekcija drugog reda (NF)"}, tex:"H(s)=\\frac{\\omega_0^2}{s^2+\\dfrac{\\omega_0}{Q}s+\\omega_0^2}"},
    {label:{sr:"Sopstvena ucestanost i dobrota"}, tex:"\\omega_0=\\frac{1}{\\sqrt{R_1R_2C_1C_2}},\\qquad Q=\\frac{\\omega_0}{\\Delta\\omega}"},
    {label:{sr:"Kaskadiranje sekcija"}, tex:"H(s)=\\prod_{k} H_k(s)"},
  ],
  primer:{ task:[{sr:"Za sekciju drugog reda sa"}," ",{m:"\\omega_0=10^3\\,\\mathrm{rad/s}"}," ",{sr:"i"}," ",{m:"Q=0{,}707"}," ",{sr:"odrediti tip prigusenja."}],
    steps:[
      [{m:"Q=\\dfrac{1}{\\sqrt2}\\approx0{,}707"}," ",{sr:"odgovara Batervortovom (maksimalno ravnom) odzivu."}],
      [{sr:"Polovi su konjugovano-kompleksni sa uglom"}," ",{m:"45^\\circ"}," ",{sr:"u odnosu na realnu osu."}],
      [{sr:"Nema talasanja u propusnom opsegu; prelaz je gladak."}],
    ]} },
];
module.exports = { skripta };
