// Matematička analiza 2 — Formule (iz ZAPAMTI blokova). Oblik kao ma1_formule.js.
module.exports = { formule: [
 {
  "n": 1,
  "title": {
   "sr": "Brojni redovi",
   "en": "Numerical series",
   "de": "Zahlenreihen",
   "fr": "Séries numériques",
   "es": "Series numéricas",
   "it": "Serie numeriche",
   "ru": "Числовые ряды",
   "pt": "Séries numéricas"
  },
  "formule": [
   {
    "label": {
     "sr": "Suma reda",
     "en": "Sum of a series",
     "de": "Summe einer Reihe",
     "fr": "Somme d'une série",
     "es": "Suma de una serie",
     "it": "Somma di una serie",
     "ru": "Сумма ряда",
     "pt": "Soma de uma série"
    },
    "tex": "\\sum_{n=1}^{\\infty} a_n=\\lim_{N\\to\\infty}\\sum_{n=1}^{N} a_n"
   },
   {
    "label": {
     "sr": "Potreban uslov konvergencije",
     "en": "Necessary condition for convergence",
     "de": "Notwendige Konvergenzbedingung",
     "fr": "Condition nécessaire de convergence",
     "es": "Condición necesaria de convergencia",
     "it": "Condizione necessaria di convergenza",
     "ru": "Необходимое условие сходимости",
     "pt": "Condição necessária de convergência"
    },
    "tex": "\\sum a_n\\ \\text{konvergira}\\ \\Rightarrow\\ a_n\\to0"
   },
   {
    "label": {
     "sr": "Geometrijski red",
     "en": "Geometric series",
     "de": "Geometrische Reihe",
     "fr": "Série géométrique",
     "es": "Serie geométrica",
     "it": "Serie geometrica",
     "ru": "Геометрический ряд",
     "pt": "Série geométrica"
    },
    "tex": "\\sum_{n=0}^{\\infty} q^{\\,n}=\\frac{1}{1-q},\\qquad |q|<1"
   },
   {
    "label": {
     "sr": "Dalamberov kriterijum (količnik)",
     "en": "d'Alembert criterion (ratio)",
     "de": "Quotientenkriterium (d'Alembert)",
     "fr": "Critère de d'Alembert (rapport)",
     "es": "Criterio de d'Alembert (cociente)",
     "it": "Criterio di d'Alembert (rapporto)",
     "ru": "Признак Даламбера (отношение)",
     "pt": "Critério de d'Alembert (razão)"
    },
    "tex": "\\lim_{n\\to\\infty}\\left|\\frac{a_{n+1}}{a_n}\\right|=L \\quad L<1\\ \\Rightarrow\\ \\text{konvergira}"
   },
   {
    "label": {
     "sr": "Košijev kriterijum (koren)",
     "en": "Cauchy criterion (root)",
     "de": "Wurzelkriterium (Cauchy)",
     "fr": "Critère de Cauchy (racine)",
     "es": "Criterio de Cauchy (raíz)",
     "it": "Criterio di Cauchy (radice)",
     "ru": "Признак Коши (корень)",
     "pt": "Critério de Cauchy (raiz)"
    },
    "tex": "\\lim_{n\\to\\infty}\\sqrt[n]{|a_n|}=L \\quad L<1\\ \\Rightarrow\\ \\text{konvergira}"
   }
  ]
 },
 {
  "n": 2,
  "title": {
   "sr": "Funkcionalni i stepeni redovi",
   "en": "Functional and power series",
   "de": "Funktionen- und Potenzreihen",
   "fr": "Séries de fonctions et séries entières",
   "es": "Series funcionales y de potencias",
   "it": "Serie di funzioni e di potenze",
   "ru": "Функциональные и степенные ряды",
   "pt": "Séries funcionais e de potências"
  },
  "formule": [
   {
    "label": {
     "sr": "Stepeni red",
     "en": "Power series",
     "de": "Potenzreihe",
     "fr": "Série entière",
     "es": "Serie de potencias",
     "it": "Serie di potenze",
     "ru": "Степенной ряд",
     "pt": "Série de potências"
    },
    "tex": "\\sum_{n=0}^{\\infty} a_n\\,(x-x_0)^n"
   },
   {
    "label": {
     "sr": "Poluprečnik konvergencije",
     "en": "Radius of convergence",
     "de": "Konvergenzradius",
     "fr": "Rayon de convergence",
     "es": "Radio de convergencia",
     "it": "Raggio di convergenza",
     "ru": "Радиус сходимости",
     "pt": "Raio de convergência"
    },
    "tex": "R=\\lim_{n\\to\\infty}\\left|\\frac{a_n}{a_{n+1}}\\right|"
   },
   {
    "label": {
     "sr": "Razvoj eksponencijalne funkcije",
     "en": "Expansion of the exponential function",
     "de": "Entwicklung der Exponentialfunktion",
     "fr": "Développement de la fonction exponentielle",
     "es": "Desarrollo de la función exponencial",
     "it": "Sviluppo della funzione esponenziale",
     "ru": "Разложение показательной функции",
     "pt": "Desenvolvimento da função exponencial"
    },
    "tex": "e^{x}=\\sum_{n=0}^{\\infty}\\frac{x^{n}}{n!}"
   },
   {
    "label": {
     "sr": "Razvoj sinusa",
     "en": "Expansion of sine",
     "de": "Entwicklung des Sinus",
     "fr": "Développement du sinus",
     "es": "Desarrollo del seno",
     "it": "Sviluppo del seno",
     "ru": "Разложение синуса",
     "pt": "Desenvolvimento do seno"
    },
    "tex": "\\sin x=\\sum_{n=0}^{\\infty}\\frac{(-1)^n x^{2n+1}}{(2n+1)!}"
   }
  ]
 },
 {
  "n": 3,
  "title": {
   "sr": "Krivolinijski integrali",
   "en": "Line integrals",
   "de": "Kurvenintegrale",
   "fr": "Intégrales curvilignes",
   "es": "Integrales de línea",
   "it": "Integrali curvilinei",
   "ru": "Криволинейные интегралы",
   "pt": "Integrais de linha"
  },
  "formule": [
   {
    "label": {
     "sr": "Integral I vrste (po dužini luka)",
     "en": "Integral of the first kind (arc length)",
     "de": "Integral erster Art (Bogenlänge)",
     "fr": "Intégrale de première espèce (longueur d'arc)",
     "es": "Integral de primera especie (longitud de arco)",
     "it": "Integrale di prima specie (lunghezza d'arco)",
     "ru": "Интеграл первого рода (по длине дуги)",
     "pt": "Integral de primeira espécie (comprimento de arco)"
    },
    "tex": "\\int\\limits_C f\\,ds= \\quad \\int_a^b f\\big(x(t),y(t)\\big)\\sqrt{x'^2+y'^2}\\,dt"
   },
   {
    "label": {
     "sr": "Integral II vrste (po koordinatama)",
     "en": "Integral of the second kind (coordinates)",
     "de": "Integral zweiter Art (Koordinaten)",
     "fr": "Intégrale de seconde espèce (coordonnées)",
     "es": "Integral de segunda especie (coordenadas)",
     "it": "Integrale di seconda specie (coordinate)",
     "ru": "Интеграл второго рода (по координатам)",
     "pt": "Integral de segunda espécie (coordenadas)"
    },
    "tex": "\\int\\limits_C P\\,dx+Q\\,dy= \\quad \\int_a^b\\big(P\\,x'+Q\\,y'\\big)\\,dt"
   },
   {
    "label": {
     "sr": "Nezavisnost od putanje",
     "en": "Path independence",
     "de": "Wegunabhängigkeit",
     "fr": "Indépendance du chemin",
     "es": "Independencia del camino",
     "it": "Indipendenza dal cammino",
     "ru": "Независимость от пути",
     "pt": "Independência do caminho"
    },
    "tex": "\\frac{\\partial P}{\\partial y}=\\frac{\\partial Q}{\\partial x}"
   }
  ]
 },
 {
  "n": 4,
  "title": {
   "sr": "Dvostruki integral",
   "en": "Double integral",
   "de": "Doppelintegral",
   "fr": "Intégrale double",
   "es": "Integral doble",
   "it": "Integrale doppio",
   "ru": "Двойной интеграл",
   "pt": "Integral duplo"
  },
  "formule": [
   {
    "label": {
     "sr": "Dvostruki integral",
     "en": "Double integral",
     "de": "Doppelintegral",
     "fr": "Intégrale double",
     "es": "Integral doble",
     "it": "Integrale doppio",
     "ru": "Двойной интеграл",
     "pt": "Integral duplo"
    },
    "tex": "\\iint\\limits_D f(x,y)\\,dA=\\int\\!\\!\\int f(x,y)\\,dy\\,dx"
   },
   {
    "label": {
     "sr": "Polarne koordinate",
     "en": "Polar coordinates",
     "de": "Polarkoordinaten",
     "fr": "Coordonnées polaires",
     "es": "Coordenadas polares",
     "it": "Coordinate polari",
     "ru": "Полярные координаты",
     "pt": "Coordenadas polares"
    },
    "tex": "x=r\\cos\\varphi,\\ \\ y=r\\sin\\varphi,\\ \\ dA=r\\,dr\\,d\\varphi"
   },
   {
    "label": {
     "sr": "Površina oblasti",
     "en": "Area of a region",
     "de": "Flächeninhalt eines Bereichs",
     "fr": "Aire d'un domaine",
     "es": "Área de una región",
     "it": "Area di un dominio",
     "ru": "Площадь области",
     "pt": "Área de uma região"
    },
    "tex": "P=\\iint\\limits_D dA"
   }
  ]
 },
 {
  "n": 5,
  "title": {
   "sr": "Trostruki integral",
   "en": "Triple integral",
   "de": "Dreifachintegral",
   "fr": "Intégrale triple",
   "es": "Integral triple",
   "it": "Integrale triplo",
   "ru": "Тройной интеграл",
   "pt": "Integral triplo"
  },
  "formule": [
   {
    "label": {
     "sr": "Trostruki integral",
     "en": "Triple integral",
     "de": "Dreifachintegral",
     "fr": "Intégrale triple",
     "es": "Integral triple",
     "it": "Integrale triplo",
     "ru": "Тройной интеграл",
     "pt": "Integral triplo"
    },
    "tex": "\\iiint\\limits_V f(x,y,z)\\,dV"
   },
   {
    "label": {
     "sr": "Cilindrične koordinate",
     "en": "Cylindrical coordinates",
     "de": "Zylinderkoordinaten",
     "fr": "Coordonnées cylindriques",
     "es": "Coordenadas cilíndricas",
     "it": "Coordinate cilindriche",
     "ru": "Цилиндрические координаты",
     "pt": "Coordenadas cilíndricas"
    },
    "tex": "x=r\\cos\\varphi,\\ \\ y=r\\sin\\varphi,\\ \\ z=z \\quad dV=r\\,dr\\,d\\varphi\\,dz"
   },
   {
    "label": {
     "sr": "Sferne koordinate",
     "en": "Spherical coordinates",
     "de": "Kugelkoordinaten",
     "fr": "Coordonnées sphériques",
     "es": "Coordenadas esféricas",
     "it": "Coordinate sferiche",
     "ru": "Сферические координаты",
     "pt": "Coordenadas esféricas"
    },
    "tex": "x=\\rho\\sin\\theta\\cos\\varphi \\quad y=\\rho\\sin\\theta\\sin\\varphi,\\quad z=\\rho\\cos\\theta \\quad dV=\\rho^2\\sin\\theta\\,d\\rho\\,d\\theta\\,d\\varphi"
   }
  ]
 },
 {
  "n": 6,
  "title": {
   "sr": "Površinski integrali",
   "en": "Surface integrals",
   "de": "Oberflächenintegrale",
   "fr": "Intégrales de surface",
   "es": "Integrales de superficie",
   "it": "Integrali di superficie",
   "ru": "Поверхностные интегралы",
   "pt": "Integrais de superfície"
  },
  "formule": [
   {
    "label": {
     "sr": "Integral I vrste",
     "en": "Integral of the first kind",
     "de": "Integral erster Art",
     "fr": "Intégrale de première espèce",
     "es": "Integral de primera especie",
     "it": "Integrale di prima specie",
     "ru": "Интеграл первого рода",
     "pt": "Integral de primeira espécie"
    },
    "tex": "\\iint\\limits_S f\\,dS"
   },
   {
    "label": {
     "sr": "Fluks (integral II vrste)",
     "en": "Flux (integral of the second kind)",
     "de": "Fluss (Integral zweiter Art)",
     "fr": "Flux (intégrale de seconde espèce)",
     "es": "Flujo (integral de segunda especie)",
     "it": "Flusso (integrale di seconda specie)",
     "ru": "Поток (интеграл второго рода)",
     "pt": "Fluxo (integral de segunda espécie)"
    },
    "tex": "\\iint\\limits_S \\vec F\\cdot\\vec n\\,dS"
   },
   {
    "label": {
     "sr": "Element površi (za z = g(x,y))",
     "en": "Surface element (for z = g(x,y))",
     "de": "Flächenelement (für z = g(x,y))",
     "fr": "Élément de surface (pour z = g(x,y))",
     "es": "Elemento de superficie (para z = g(x,y))",
     "it": "Elemento di superficie (per z = g(x,y))",
     "ru": "Элемент поверхности (для z = g(x,y))",
     "pt": "Elemento de superfície (para z = g(x,y))"
    },
    "tex": "dS=\\sqrt{1+g_x^{\\,2}+g_y^{\\,2}}\\,dx\\,dy"
   }
  ]
 },
 {
  "n": 7,
  "title": {
   "sr": "Integralne formule: Grin, Gaus, Stoks",
   "en": "Integral formulas: Green, Gauss, Stokes",
   "de": "Integralsätze: Green, Gauß, Stokes",
   "fr": "Formules intégrales : Green, Gauss, Stokes",
   "es": "Fórmulas integrales: Green, Gauss, Stokes",
   "it": "Formule integrali: Green, Gauss, Stokes",
   "ru": "Интегральные формулы: Грин, Гаусс, Стокс",
   "pt": "Fórmulas integrais: Green, Gauss, Stokes"
  },
  "formule": [
   {
    "label": {
     "sr": "Grinova formula",
     "en": "Green's formula",
     "de": "Greensche Formel",
     "fr": "Formule de Green",
     "es": "Fórmula de Green",
     "it": "Formula di Green",
     "ru": "Формула Грина",
     "pt": "Fórmula de Green"
    },
    "tex": "\\oint\\limits_C P\\,dx+Q\\,dy= \\quad \\iint\\limits_D\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)dA"
   },
   {
    "label": {
     "sr": "Gaus–Ostrogradskijeva formula",
     "en": "Gauss–Ostrogradsky formula",
     "de": "Gauß–Ostrogradski-Formel",
     "fr": "Formule de Gauss–Ostrogradski",
     "es": "Fórmula de Gauss–Ostrogradski",
     "it": "Formula di Gauss–Ostrogradskij",
     "ru": "Формула Гаусса–Остроградского",
     "pt": "Fórmula de Gauss–Ostrogradski"
    },
    "tex": "\\iint\\limits_S \\vec F\\cdot\\vec n\\,dS=\\iiint\\limits_V \\operatorname{div}\\vec F\\,dV"
   },
   {
    "label": {
     "sr": "Stoksova formula",
     "en": "Stokes' formula",
     "de": "Stokes-Formel",
     "fr": "Formule de Stokes",
     "es": "Fórmula de Stokes",
     "it": "Formula di Stokes",
     "ru": "Формула Стокса",
     "pt": "Fórmula de Stokes"
    },
    "tex": "\\oint\\limits_C \\vec F\\cdot d\\vec r=\\iint\\limits_S \\operatorname{rot}\\vec F\\cdot\\vec n\\,dS"
   }
  ]
 },
 {
  "n": 8,
  "title": {
   "sr": "Vektorska analiza",
   "en": "Vector analysis",
   "de": "Vektoranalysis",
   "fr": "Analyse vectorielle",
   "es": "Análisis vectorial",
   "it": "Analisi vettoriale",
   "ru": "Векторный анализ",
   "pt": "Análise vetorial"
  },
  "formule": [
   {
    "label": {
     "sr": "Gradijent",
     "en": "Gradient",
     "de": "Gradient",
     "fr": "Gradient",
     "es": "Gradiente",
     "it": "Gradiente",
     "ru": "Градиент",
     "pt": "Gradiente"
    },
    "tex": "\\operatorname{grad}f=\\nabla f=\\Big(\\tfrac{\\partial f}{\\partial x},\\tfrac{\\partial f}{\\partial y},\\tfrac{\\partial f}{\\partial z}\\Big)"
   },
   {
    "label": {
     "sr": "Divergencija",
     "en": "Divergence",
     "de": "Divergenz",
     "fr": "Divergence",
     "es": "Divergencia",
     "it": "Divergenza",
     "ru": "Дивергенция",
     "pt": "Divergência"
    },
    "tex": "\\operatorname{div}\\vec F=\\frac{\\partial P}{\\partial x}+\\frac{\\partial Q}{\\partial y}+\\frac{\\partial R}{\\partial z}"
   },
   {
    "label": {
     "sr": "Rotor",
     "en": "Curl",
     "de": "Rotation",
     "fr": "Rotationnel",
     "es": "Rotacional",
     "it": "Rotore",
     "ru": "Ротор",
     "pt": "Rotacional"
    },
    "tex": "\\operatorname{rot}\\vec F=\\nabla\\times\\vec F"
   },
   {
    "label": {
     "sr": "Potencijalno polje",
     "en": "Conservative (potential) field",
     "de": "Potentialfeld",
     "fr": "Champ de potentiel",
     "es": "Campo potencial",
     "it": "Campo potenziale",
     "ru": "Потенциальное поле",
     "pt": "Campo potencial"
    },
    "tex": "\\operatorname{rot}\\vec F=\\vec 0\\ \\Rightarrow\\ \\vec F=\\nabla\\varphi"
   }
  ]
 },
 {
  "n": 9,
  "title": {
   "sr": "Kompleksni brojevi i funkcije",
   "en": "Complex numbers and functions",
   "de": "Komplexe Zahlen und Funktionen",
   "fr": "Nombres et fonctions complexes",
   "es": "Números y funciones complejas",
   "it": "Numeri e funzioni complesse",
   "ru": "Комплексные числа и функции",
   "pt": "Números e funções complexas"
  },
  "formule": [
   {
    "label": {
     "sr": "Kompleksna funkcija",
     "en": "Complex function",
     "de": "Komplexe Funktion",
     "fr": "Fonction complexe",
     "es": "Función compleja",
     "it": "Funzione complessa",
     "ru": "Комплексная функция",
     "pt": "Função complexa"
    },
    "tex": "f(z)=u(x,y)+i\\,v(x,y)"
   },
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
     "sr": "Ojlerova formula",
     "en": "Euler's formula",
     "de": "Eulersche Formel",
     "fr": "Formule d'Euler",
     "es": "Fórmula de Euler",
     "it": "Formula di Eulero",
     "ru": "Формула Эйлера",
     "pt": "Fórmula de Euler"
    },
    "tex": "e^{\\,i y}=\\cos y+i\\sin y"
   }
  ]
 },
 {
  "n": 10,
  "title": {
   "sr": "Analitičke funkcije, Košijeva teorema i formule",
   "en": "Analytic functions, Cauchy's theorem and formulas",
   "de": "Analytische Funktionen, Cauchyscher Satz und Formeln",
   "fr": "Fonctions analytiques, théorème et formules de Cauchy",
   "es": "Funciones analíticas, teorema y fórmulas de Cauchy",
   "it": "Funzioni analitiche, teorema e formule di Cauchy",
   "ru": "Аналитические функции, теорема и формулы Коши",
   "pt": "Funções analíticas, teorema e fórmulas de Cauchy"
  },
  "formule": [
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
   }
  ]
 },
 {
  "n": 11,
  "title": {
   "sr": "Tejlorov i Loranov red, singulariteti, reziduumi",
   "en": "Taylor and Laurent series, singularities, residues",
   "de": "Taylor- und Laurent-Reihe, Singularitäten, Residuen",
   "fr": "Séries de Taylor et de Laurent, singularités, résidus",
   "es": "Series de Taylor y de Laurent, singularidades, residuos",
   "it": "Serie di Taylor e di Laurent, singolarità, residui",
   "ru": "Ряд Тейлора и Лорана, особые точки, вычеты",
   "pt": "Séries de Taylor e de Laurent, singularidades, resíduos"
  },
  "formule": [
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
     "sr": "Teorema o reziduumima",
     "en": "Residue theorem",
     "de": "Residuensatz",
     "fr": "Théorème des résidus",
     "es": "Teorema de los residuos",
     "it": "Teorema dei residui",
     "ru": "Теорема о вычетах",
     "pt": "Teorema dos resíduos"
    },
    "tex": "\\oint\\limits_C f(z)\\,dz=2\\pi i\\sum \\operatorname{Res} f"
   }
  ]
 },
 {
  "n": 12,
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
    "tex": "f\\ \\text{analitička},\\ f'(z)\\neq0\\ \\Rightarrow\\ \\text{čuva uglove}"
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
 },
 {
  "n": 13,
  "title": {
   "sr": "Furijeov red i transformacija",
   "en": "Fourier series and transform",
   "de": "Fourier-Reihe und -Transformation",
   "fr": "Série et transformée de Fourier",
   "es": "Serie y transformada de Fourier",
   "it": "Serie e trasformata di Fourier",
   "ru": "Ряд и преобразование Фурье",
   "pt": "Série e transformada de Fourier"
  },
  "formule": [
   {
    "label": {
     "sr": "Furijeov red",
     "en": "Fourier series",
     "de": "Fourier-Reihe",
     "fr": "Série de Fourier",
     "es": "Serie de Fourier",
     "it": "Serie di Fourier",
     "ru": "Ряд Фурье",
     "pt": "Série de Fourier"
    },
    "tex": "f(x)=\\frac{a_0}{2}+\\sum_{n=1}^{\\infty}\\big(a_n\\cos nx+b_n\\sin nx\\big)"
   },
   {
    "label": {
     "sr": "Koeficijent uz kosinus",
     "en": "Cosine coefficient",
     "de": "Kosinus-Koeffizient",
     "fr": "Coefficient du cosinus",
     "es": "Coeficiente del coseno",
     "it": "Coefficiente del coseno",
     "ru": "Коэффициент при косинусе",
     "pt": "Coeficiente do cosseno"
    },
    "tex": "a_n=\\frac{1}{\\pi}\\int_{-\\pi}^{\\pi} f(x)\\cos nx\\,dx"
   },
   {
    "label": {
     "sr": "Koeficijent uz sinus",
     "en": "Sine coefficient",
     "de": "Sinus-Koeffizient",
     "fr": "Coefficient du sinus",
     "es": "Coeficiente del seno",
     "it": "Coefficiente del seno",
     "ru": "Коэффициент при синусе",
     "pt": "Coeficiente do seno"
    },
    "tex": "b_n=\\frac{1}{\\pi}\\int_{-\\pi}^{\\pi} f(x)\\sin nx\\,dx"
   },
   {
    "label": {
     "sr": "Furijeova transformacija",
     "en": "Fourier transform",
     "de": "Fourier-Transformation",
     "fr": "Transformée de Fourier",
     "es": "Transformada de Fourier",
     "it": "Trasformata di Fourier",
     "ru": "Преобразование Фурье",
     "pt": "Transformada de Fourier"
    },
    "tex": "F(\\omega)=\\int_{-\\infty}^{\\infty} f(t)\\,e^{-i\\omega t}\\,dt"
   }
  ]
 },
 {
  "n": 14,
  "title": {
   "sr": "Laplasova transformacija",
   "en": "Laplace transform",
   "de": "Laplace-Transformation",
   "fr": "Transformée de Laplace",
   "es": "Transformada de Laplace",
   "it": "Trasformata di Laplace",
   "ru": "Преобразование Лапласа",
   "pt": "Transformada de Laplace"
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
    "tex": "\\mathcal{L}\\{f\\}(s)=\\int_0^{\\infty} f(t)\\,e^{-st}\\,dt"
   },
   {
    "label": {
     "sr": "Osnovne transformacije",
     "en": "Basic transforms",
     "de": "Grundtransformationen",
     "fr": "Transformées de base",
     "es": "Transformadas básicas",
     "it": "Trasformate fondamentali",
     "ru": "Основные преобразования",
     "pt": "Transformadas básicas"
    },
    "tex": "\\mathcal{L}\\{1\\}=\\frac1s,\\quad \\mathcal{L}\\{e^{at}\\}=\\frac{1}{s-a}"
   },
   {
    "label": {
     "sr": "Transformacija izvoda",
     "en": "Transform of a derivative",
     "de": "Transformation der Ableitung",
     "fr": "Transformée d'une dérivée",
     "es": "Transformada de la derivada",
     "it": "Trasformata della derivata",
     "ru": "Преобразование производной",
     "pt": "Transformada da derivada"
    },
    "tex": "\\mathcal{L}\\{f'\\}=s\\,F(s)-f(0)"
   }
  ]
 }
] };
