// Kompleksna analiza — Formule (iz ZAPAMTI). Oblik kao ma1_formule.js.
module.exports = { formule: [
 {
  "n": 1,
  "title": {
   "sr": "Kompleksni brojevi i kompleksna ravan",
   "en": "Complex numbers and the complex plane",
   "de": "Komplexe Zahlen und die komplexe Ebene",
   "fr": "Nombres complexes et plan complexe",
   "es": "Números complejos y el plano complejo",
   "it": "Numeri complessi e il piano complesso",
   "ru": "Комплексные числа и комплексная плоскость",
   "pt": "Números complexos e o plano complexo"
  },
  "formule": [
   {
    "label": {
     "sr": "Algebarski oblik i konjugat",
     "en": "Algebraic form and conjugate",
     "de": "Algebraische Form und Konjugierte",
     "fr": "Forme algébrique et conjugué",
     "es": "Forma algebraica y conjugado",
     "it": "Forma algebrica e coniugato",
     "ru": "Алгебраическая форма и сопряжённое",
     "pt": "Forma algébrica e conjugado"
    },
    "tex": "z=a+bi,\\qquad \\overline{z}=a-bi"
   },
   {
    "label": {
     "sr": "Moduo i argument",
     "en": "Modulus and argument",
     "de": "Betrag und Argument",
     "fr": "Module et argument",
     "es": "Módulo y argumento",
     "it": "Modulo e argomento",
     "ru": "Модуль и аргумент",
     "pt": "Módulo e argumento"
    },
    "tex": "|z|=\\sqrt{a^2+b^2},\\qquad \\tan\\varphi=\\frac{b}{a}"
   },
   {
    "label": {
     "sr": "Ojlerov oblik",
     "en": "Euler form",
     "de": "Euler-Form",
     "fr": "Forme d'Euler",
     "es": "Forma de Euler",
     "it": "Forma di Eulero",
     "ru": "Форма Эйлера",
     "pt": "Forma de Euler"
    },
    "tex": "z=r\\,e^{\\,i\\varphi}"
   },
   {
    "label": {
     "sr": "Moavrova formula",
     "en": "De Moivre's formula",
     "de": "Formel von de Moivre",
     "fr": "Formule de Moivre",
     "es": "Fórmula de De Moivre",
     "it": "Formula di De Moivre",
     "ru": "Формула Муавра",
     "pt": "Fórmula de De Moivre"
    },
    "tex": "z^n=r^n\\big(\\cos n\\varphi+i\\sin n\\varphi\\big)"
   }
  ]
 },
 {
  "n": 2,
  "title": {
   "sr": "Kompleksne funkcije i preslikavanja",
   "en": "Complex functions and mappings",
   "de": "Komplexe Funktionen und Abbildungen",
   "fr": "Fonctions complexes et transformations",
   "es": "Funciones complejas y aplicaciones",
   "it": "Funzioni complesse e trasformazioni",
   "ru": "Комплексные функции и отображения",
   "pt": "Funções complexas e aplicações"
  },
  "formule": [
   {
    "label": {
     "sr": "Razlaganje funkcije",
     "en": "Decomposition of a function",
     "de": "Zerlegung einer Funktion",
     "fr": "Décomposition d'une fonction",
     "es": "Descomposición de una función",
     "it": "Scomposizione di una funzione",
     "ru": "Разложение функции",
     "pt": "Decomposição de uma função"
    },
    "tex": "f(z)=u(x,y)+i\\,v(x,y)"
   },
   {
    "label": {
     "sr": "Kvadratno preslikavanje",
     "en": "Quadratic mapping",
     "de": "Quadratische Abbildung",
     "fr": "Transformation quadratique",
     "es": "Aplicación cuadrática",
     "it": "Trasformazione quadratica",
     "ru": "Квадратичное отображение",
     "pt": "Aplicação quadrática"
    },
    "tex": "w=z^2\\ \\Rightarrow\\ u=x^2-y^2,\\ \\ v=2xy"
   }
  ]
 },
 {
  "n": 3,
  "title": {
   "sr": "Granična vrednost i neprekidnost",
   "en": "Limit and continuity",
   "de": "Grenzwert und Stetigkeit",
   "fr": "Limite et continuité",
   "es": "Límite y continuidad",
   "it": "Limite e continuità",
   "ru": "Предел и непрерывность",
   "pt": "Limite e continuidade"
  },
  "formule": [
   {
    "label": {
     "sr": "Granična vrednost",
     "en": "Limit",
     "de": "Grenzwert",
     "fr": "Limite",
     "es": "Límite",
     "it": "Limite",
     "ru": "Предел",
     "pt": "Limite"
    },
    "tex": "\\lim_{z\\to z_0} f(z)=L"
   },
   {
    "label": {
     "sr": "Neprekidnost",
     "en": "Continuity",
     "de": "Stetigkeit",
     "fr": "Continuité",
     "es": "Continuidad",
     "it": "Continuità",
     "ru": "Непрерывность",
     "pt": "Continuidade"
    },
    "tex": "\\lim_{z\\to z_0} f(z)=f(z_0)"
   }
  ]
 },
 {
  "n": 4,
  "title": {
   "sr": "Izvod i analitičke funkcije",
   "en": "Derivative and analytic functions",
   "de": "Ableitung und analytische Funktionen",
   "fr": "Dérivée et fonctions analytiques",
   "es": "Derivada y funciones analíticas",
   "it": "Derivata e funzioni analitiche",
   "ru": "Производная и аналитические функции",
   "pt": "Derivada e funções analíticas"
  },
  "formule": [
   {
    "label": {
     "sr": "Definicija izvoda",
     "en": "Definition of the derivative",
     "de": "Definition der Ableitung",
     "fr": "Définition de la dérivée",
     "es": "Definición de la derivada",
     "it": "Definizione della derivata",
     "ru": "Определение производной",
     "pt": "Definição da derivada"
    },
    "tex": "f'(z)=\\lim_{\\Delta z\\to0}\\frac{f(z+\\Delta z)-f(z)}{\\Delta z}"
   },
   {
    "label": {
     "sr": "Koši–Rimanovi uslovi",
     "en": "Cauchy–Riemann conditions",
     "de": "Cauchy–Riemann-Bedingungen",
     "fr": "Conditions de Cauchy–Riemann",
     "es": "Condiciones de Cauchy–Riemann",
     "it": "Condizioni di Cauchy–Riemann",
     "ru": "Условия Коши–Римана",
     "pt": "Condições de Cauchy–Riemann"
    },
    "tex": "u_x=v_y,\\qquad u_y=-v_x"
   },
   {
    "label": {
     "sr": "Harmonijnost",
     "en": "Harmonicity",
     "de": "Harmonizität",
     "fr": "Harmonicité",
     "es": "Armonicidad",
     "it": "Armonicità",
     "ru": "Гармоничность",
     "pt": "Harmonicidade"
    },
    "tex": "u_{xx}+u_{yy}=0"
   }
  ]
 },
 {
  "n": 5,
  "title": {
   "sr": "Elementarne kompleksne funkcije",
   "en": "Elementary complex functions",
   "de": "Elementare komplexe Funktionen",
   "fr": "Fonctions complexes élémentaires",
   "es": "Funciones complejas elementales",
   "it": "Funzioni complesse elementari",
   "ru": "Элементарные комплексные функции",
   "pt": "Funções complexas elementares"
  },
  "formule": [
   {
    "label": {
     "sr": "Eksponencijalna funkcija",
     "en": "Exponential function",
     "de": "Exponentialfunktion",
     "fr": "Fonction exponentielle",
     "es": "Función exponencial",
     "it": "Funzione esponenziale",
     "ru": "Показательная функция",
     "pt": "Função exponencial"
    },
    "tex": "e^{z}=e^{x}(\\cos y+i\\sin y)"
   },
   {
    "label": {
     "sr": "Sinus preko eksponencijalne",
     "en": "Sine via the exponential",
     "de": "Sinus über die Exponentialfunktion",
     "fr": "Sinus via l'exponentielle",
     "es": "Seno mediante la exponencial",
     "it": "Seno tramite l'esponenziale",
     "ru": "Синус через экспоненту",
     "pt": "Seno através da exponencial"
    },
    "tex": "\\sin z=\\frac{e^{iz}-e^{-iz}}{2i}"
   },
   {
    "label": {
     "sr": "Kosinus preko eksponencijalne",
     "en": "Cosine via the exponential",
     "de": "Kosinus über die Exponentialfunktion",
     "fr": "Cosinus via l'exponentielle",
     "es": "Coseno mediante la exponencial",
     "it": "Coseno tramite l'esponenziale",
     "ru": "Косинус через экспоненту",
     "pt": "Cosseno através da exponencial"
    },
    "tex": "\\cos z=\\frac{e^{iz}+e^{-iz}}{2}"
   },
   {
    "label": {
     "sr": "Logaritam (višeznačan)",
     "en": "Logarithm (multivalued)",
     "de": "Logarithmus (mehrdeutig)",
     "fr": "Logarithme (multiforme)",
     "es": "Logaritmo (multivaluado)",
     "it": "Logaritmo (polidromo)",
     "ru": "Логарифм (многозначный)",
     "pt": "Logaritmo (multivalente)"
    },
    "tex": "\\ln z=\\ln|z|+i\\,(\\arg z+2k\\pi)"
   }
  ]
 },
 {
  "n": 6,
  "title": {
   "sr": "Kompleksni integral",
   "en": "Complex integral",
   "de": "Komplexes Integral",
   "fr": "Intégrale complexe",
   "es": "Integral compleja",
   "it": "Integrale complesso",
   "ru": "Комплексный интеграл",
   "pt": "Integral complexo"
  },
  "formule": [
   {
    "label": {
     "sr": "Definicija",
     "en": "Definition",
     "de": "Definition",
     "fr": "Définition",
     "es": "Definición",
     "it": "Definizione",
     "ru": "Определение",
     "pt": "Definição"
    },
    "tex": "\\int\\limits_C f(z)\\,dz=\\int_a^b f\\big(z(t)\\big)\\,z'(t)\\,dt"
   },
   {
    "label": {
     "sr": "ML ocena",
     "en": "ML estimate",
     "de": "ML-Abschätzung",
     "fr": "Estimation ML",
     "es": "Estimación ML",
     "it": "Stima ML",
     "ru": "Оценка ML",
     "pt": "Estimativa ML"
    },
    "tex": "\\left|\\int\\limits_C f(z)\\,dz\\right|\\le M\\cdot L"
   }
  ]
 },
 {
  "n": 7,
  "title": {
   "sr": "Košijeva integralna teorema i formule",
   "en": "Cauchy's integral theorem and formulas",
   "de": "Cauchyscher Integralsatz und Integralformeln",
   "fr": "Théorème intégral de Cauchy et formules",
   "es": "Teorema integral de Cauchy y fórmulas",
   "it": "Teorema integrale di Cauchy e formule",
   "ru": "Интегральная теорема Коши и формулы",
   "pt": "Teorema integral de Cauchy e fórmulas"
  },
  "formule": [
   {
    "label": {
     "sr": "Košijeva integralna teorema",
     "en": "Cauchy's integral theorem",
     "de": "Cauchyscher Integralsatz",
     "fr": "Théorème intégral de Cauchy",
     "es": "Teorema integral de Cauchy",
     "it": "Teorema integrale di Cauchy",
     "ru": "Интегральная теорема Коши",
     "pt": "Teorema integral de Cauchy"
    },
    "tex": "\\oint\\limits_C f(z)\\,dz=0"
   },
   {
    "label": {
     "sr": "Košijeva integralna formula",
     "en": "Cauchy's integral formula",
     "de": "Cauchysche Integralformel",
     "fr": "Formule intégrale de Cauchy",
     "es": "Fórmula integral de Cauchy",
     "it": "Formula integrale di Cauchy",
     "ru": "Интегральная формула Коши",
     "pt": "Fórmula integral de Cauchy"
    },
    "tex": "f(z_0)=\\frac{1}{2\\pi i}\\oint\\limits_C\\frac{f(z)}{z-z_0}\\,dz"
   },
   {
    "label": {
     "sr": "Formula za izvode",
     "en": "Formula for derivatives",
     "de": "Formel für die Ableitungen",
     "fr": "Formule pour les dérivées",
     "es": "Fórmula para las derivadas",
     "it": "Formula per le derivate",
     "ru": "Формула для производных",
     "pt": "Fórmula para as derivadas"
    },
    "tex": "f^{(n)}(z_0)=\\frac{n!}{2\\pi i}\\oint\\limits_C\\frac{f(z)}{(z-z_0)^{n+1}}\\,dz"
   }
  ]
 },
 {
  "n": 8,
  "title": {
   "sr": "Tejlorov i Loranov red",
   "en": "Taylor and Laurent series",
   "de": "Taylor- und Laurent-Reihe",
   "fr": "Séries de Taylor et de Laurent",
   "es": "Series de Taylor y de Laurent",
   "it": "Serie di Taylor e di Laurent",
   "ru": "Ряд Тейлора и Лорана",
   "pt": "Séries de Taylor e de Laurent"
  },
  "formule": [
   {
    "label": {
     "sr": "Tejlorov red",
     "en": "Taylor series",
     "de": "Taylor-Reihe",
     "fr": "Série de Taylor",
     "es": "Serie de Taylor",
     "it": "Serie di Taylor",
     "ru": "Ряд Тейлора",
     "pt": "Série de Taylor"
    },
    "tex": "f(z)=\\sum_{n=0}^{\\infty}\\frac{f^{(n)}(z_0)}{n!}\\,(z-z_0)^n"
   },
   {
    "label": {
     "sr": "Loranov red",
     "en": "Laurent series",
     "de": "Laurent-Reihe",
     "fr": "Série de Laurent",
     "es": "Serie de Laurent",
     "it": "Serie di Laurent",
     "ru": "Ряд Лорана",
     "pt": "Série de Laurent"
    },
    "tex": "f(z)=\\sum_{n=-\\infty}^{\\infty} c_n\\,(z-z_0)^n"
   },
   {
    "label": {
     "sr": "Koeficijent Loranovog reda",
     "en": "Laurent series coefficient",
     "de": "Koeffizient der Laurent-Reihe",
     "fr": "Coefficient de la série de Laurent",
     "es": "Coeficiente de la serie de Laurent",
     "it": "Coefficiente della serie di Laurent",
     "ru": "Коэффициент ряда Лорана",
     "pt": "Coeficiente da série de Laurent"
    },
    "tex": "c_n=\\frac{1}{2\\pi i}\\oint\\limits_C\\frac{f(z)}{(z-z_0)^{n+1}}\\,dz"
   }
  ]
 },
 {
  "n": 9,
  "title": {
   "sr": "Singulariteti i reziduumi",
   "en": "Singularities and residues",
   "de": "Singularitäten und Residuen",
   "fr": "Singularités et résidus",
   "es": "Singularidades y residuos",
   "it": "Singolarità e residui",
   "ru": "Особые точки и вычеты",
   "pt": "Singularidades e resíduos"
  },
  "formule": [
   {
    "label": {
     "sr": "Reziduum u prostom polu",
     "en": "Residue at a simple pole",
     "de": "Residuum an einem einfachen Pol",
     "fr": "Résidu en un pôle simple",
     "es": "Residuo en un polo simple",
     "it": "Residuo in un polo semplice",
     "ru": "Вычет в простом полюсе",
     "pt": "Resíduo num polo simples"
    },
    "tex": "\\operatorname{Res}_{z_0}f=\\lim_{z\\to z_0}(z-z_0)\\,f(z)"
   },
   {
    "label": {
     "sr": "Reziduum u polu reda m",
     "en": "Residue at a pole of order m",
     "de": "Residuum an einem Pol der Ordnung m",
     "fr": "Résidu en un pôle d'ordre m",
     "es": "Residuo en un polo de orden m",
     "it": "Residuo in un polo di ordine m",
     "ru": "Вычет в полюсе порядка m",
     "pt": "Resíduo num polo de ordem m"
    },
    "tex": "\\operatorname{Res}_{z_0}f=\\frac{1}{(m-1)!}\\lim_{z\\to z_0}\\frac{d^{\\,m-1}}{dz^{\\,m-1}}\\Big[(z-z_0)^m f\\Big]"
   },
   {
    "label": {
     "sr": "Teorema o reziduumima",
     "en": "Residue theorem",
     "de": "Residuensatz",
     "fr": "Théorème des résidus",
     "es": "Teorema de los residuos",
     "it": "Teorema dei residui",
     "ru": "Теорема о вычетах",
     "pt": "Teorema dos resíduos"
    },
    "tex": "\\oint\\limits_C f(z)\\,dz=2\\pi i\\sum\\operatorname{Res}f"
   }
  ]
 },
 {
  "n": 10,
  "title": {
   "sr": "Primena reziduuma na realne integrale",
   "en": "Application of residues to real integrals",
   "de": "Anwendung der Residuen auf reelle Integrale",
   "fr": "Application des résidus aux intégrales réelles",
   "es": "Aplicación de los residuos a integrales reales",
   "it": "Applicazione dei residui agli integrali reali",
   "ru": "Применение вычетов к действительным интегралам",
   "pt": "Aplicação dos resíduos a integrais reais"
  },
  "formule": [
   {
    "label": {
     "sr": "Trigonometrijski tip",
     "en": "Trigonometric type",
     "de": "Trigonometrischer Typ",
     "fr": "Type trigonométrique",
     "es": "Tipo trigonométrico",
     "it": "Tipo trigonometrico",
     "ru": "Тригонометрический тип",
     "pt": "Tipo trigonométrico"
    },
    "tex": "z=e^{i\\theta},\\qquad d\\theta=\\frac{dz}{i\\,z}"
   },
   {
    "label": {
     "sr": "Integral po realnoj osi",
     "en": "Integral over the real axis",
     "de": "Integral über die reelle Achse",
     "fr": "Intégrale sur l'axe réel",
     "es": "Integral sobre el eje real",
     "it": "Integrale sull'asse reale",
     "ru": "Интеграл по действительной оси",
     "pt": "Integral sobre o eixo real"
    },
    "tex": "\\int_{-\\infty}^{\\infty} f\\,dx=2\\pi i\\sum\\operatorname{Res}_{\\text{gornja poluravan}}"
   }
  ]
 },
 {
  "n": 11,
  "title": {
   "sr": "Konformna preslikavanja",
   "en": "Conformal mappings",
   "de": "Konforme Abbildungen",
   "fr": "Transformations conformes",
   "es": "Aplicaciones conformes",
   "it": "Trasformazioni conformi",
   "ru": "Конформные отображения",
   "pt": "Aplicações conformes"
  },
  "formule": [
   {
    "label": {
     "sr": "Uslov konformnosti",
     "en": "Conformality condition",
     "de": "Konformitätsbedingung",
     "fr": "Condition de conformité",
     "es": "Condición de conformidad",
     "it": "Condizione di conformità",
     "ru": "Условие конформности",
     "pt": "Condição de conformidade"
    },
    "tex": "f\\ \\text{analitička},\\ f'(z)\\neq0"
   },
   {
    "label": {
     "sr": "Mebijusova transformacija",
     "en": "Möbius transformation",
     "de": "Möbius-Transformation",
     "fr": "Transformation de Möbius",
     "es": "Transformación de Möbius",
     "it": "Trasformazione di Möbius",
     "ru": "Преобразование Мёбиуса",
     "pt": "Transformação de Möbius"
    },
    "tex": "w=\\frac{az+b}{cz+d},\\qquad ad-bc\\neq0"
   }
  ]
 }
] };
