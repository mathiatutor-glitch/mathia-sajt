// content/sistemi_signali_formule.js — Sistemi i signali (Formule).
// Deli isti _strings.json i i18n kao skripta.
const r = String.raw;
const formule = [
{ n:1, title:{sr:"Singularni signali"},
  grupe:[
    {label:{sr:"Dirakov impuls (definiciona osobina)"}, tex:"\\int_{-\\infty}^{\\infty}\\delta(t)\\,dt=1"},
    {label:{sr:"Osobina odabiranja"}, tex:"\\int_{-\\infty}^{\\infty} f(t)\\,\\delta(t-t_0)\\,dt=f(t_0)"},
    {label:{sr:"Veza skoka i impulsa"}, tex:"\\frac{d\\,u(t)}{dt}=\\delta(t)"},
    {label:{sr:"Nagibni signal"}, tex:"r(t)=t\\,u(t)"},
  ]},
{ n:2, title:{sr:"Regularni signali i operacije nad njima"},
  grupe:[
    {label:{sr:"Parni i neparni deo"}, tex:"x_p=\\tfrac12(x(t)+x(-t)),\\quad x_n=\\tfrac12(x(t)-x(-t))"},
    {label:{sr:"Energija signala"}, tex:"E=\\int_{-\\infty}^{\\infty}|x(t)|^2\\,dt"},
    {label:{sr:"Snaga periodicnog signala"}, tex:"P=\\frac1T\\int_{0}^{T}|x(t)|^2\\,dt"},
  ]},
{ n:3, title:{sr:"Konvolucija u kontinualnom vremenu"},
  grupe:[
    {label:{sr:"Definicija konvolucije"}, tex:"(x*h)(t)=\\int_{-\\infty}^{\\infty} x(\\tau)h(t-\\tau)\\,d\\tau"},
    {label:{sr:"Neutral konvolucije"}, tex:"x(t)*\\delta(t)=x(t)"},
  ]},
{ n:4, title:{sr:"Laplasova transformacija"},
  grupe:[
    {label:{sr:"Bilateralna definicija"}, tex:"X(s)=\\int_{-\\infty}^{\\infty} x(t)e^{-st}\\,dt"},
    {label:{sr:"Definicija"}, tex:"X(s)=\\int_{0^-}^{\\infty} x(t)e^{-st}\\,dt"},
    {label:{sr:"Izvod"}, tex:"\\mathcal{L}\\{x'\\}=sX(s)-x(0^-)"},
    {label:{sr:"Pomeranje u vremenu"}, tex:"x(t-t_0)u(t-t_0)\\ \\longleftrightarrow\\ e^{-st_0}X(s)"},
  ]},
{ n:5, title:{sr:"Tablica Laplasovih parova"},
  grupe:[
    {label:{sr:"Skok"}, tex:"u(t)\\ \\longleftrightarrow\\ \\dfrac{1}{s}"},
    {label:{sr:"Eksponencijala"}, tex:"e^{-at}u(t)\\ \\longleftrightarrow\\ \\dfrac{1}{s+a}"},
    {label:{sr:"Sinus"}, tex:"\\sin(\\omega_0 t)u(t)\\ \\longleftrightarrow\\ \\dfrac{\\omega_0}{s^2+\\omega_0^2}"},
    {label:{sr:"Kosinus"}, tex:"\\cos(\\omega_0 t)u(t)\\ \\longleftrightarrow\\ \\dfrac{s}{s^2+\\omega_0^2}"},
    {label:{sr:"Prigusena sinusoida"}, tex:"e^{-\\alpha t}\\sin(\\omega_0 t)u(t)\\ \\longleftrightarrow\\ \\dfrac{\\omega_0}{(s+\\alpha)^2+\\omega_0^2}"},
  ]},
{ n:6, title:{sr:"Furijeova transformacija"},
  grupe:[
    {label:{sr:"Direktna transformacija"}, tex:"X(j\\omega)=\\int_{-\\infty}^{\\infty} x(t)e^{-j\\omega t}\\,dt"},
    {label:{sr:"Inverzna transformacija"}, tex:"x(t)=\\dfrac{1}{2\\pi}\\int_{-\\infty}^{\\infty} X(j\\omega)e^{j\\omega t}\\,d\\omega"},
    {label:{sr:"Teorema o pomeranju"}, tex:"x(t-t_0)\\ \\longleftrightarrow\\ e^{-j\\omega t_0}X(j\\omega)"},
    {label:{sr:"Parsevalova teorema"}, tex:"\\int|x(t)|^2dt=\\dfrac{1}{2\\pi}\\int|X(j\\omega)|^2d\\omega"},
  ]},
{ n:7, title:{sr:"LVN sistemi"},
  grupe:[
    {label:{sr:"Ulaz-izlaz relacija"}, tex:"Y(s)=H(s)X(s)"},
    {label:{sr:"Prenosna funkcija"}, tex:"H(s)=\\dfrac{Y(s)}{X(s)}"},
    {label:{sr:"Frekvencijski odziv"}, tex:"H(j\\omega)=H(s)\\big|_{s=j\\omega}"},
    {label:{sr:"Redna veza"}, tex:"H=H_1H_2"},
    {label:{sr:"Paralelna veza"}, tex:"H=H_1+H_2"},
    {label:{sr:"Povratna sprega"}, tex:"H=\\dfrac{H_1}{1+H_1H_2}"},
  ]},
{ n:8, title:{sr:"Stabilnost"},
  grupe:[
    {label:{sr:"BIBO uslov (impulsni odziv)"}, tex:"\\int_{-\\infty}^{\\infty}|h(t)|\\,dt<\\infty"},
    {label:{sr:"Uslov preko polova"}, tex:"\\operatorname{Re}\\{p_k\\}<0"},
  ]},
{ n:9, title:{sr:"Filtri"},
  grupe:[
    {label:{sr:"Pojacanje u decibelima"}, tex:"A(\\omega)=20\\log_{10}|H(j\\omega)|"},
    {label:{sr:"Batervortova karakteristika"}, tex:"|H(j\\omega)|^2=\\dfrac{1}{1+(\\omega/\\omega_c)^{2n}}"},
    {label:{sr:"Cebisevljeva karakteristika"}, tex:"|H(j\\omega)|^2=\\dfrac{1}{1+\\varepsilon^2 T_n^2(\\omega/\\omega_c)}"},
    {label:{sr:"Sekcija drugog reda (NF)"}, tex:"H(s)=\\dfrac{\\omega_0^2}{s^2+\\frac{\\omega_0}{Q}s+\\omega_0^2}"},
  ]},
];
module.exports = { formule };
