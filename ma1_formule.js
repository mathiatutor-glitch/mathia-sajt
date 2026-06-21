// Matematička analiza 1 — Formule (ključne formule iz ZAPAMTI blokova). Oblik kao algebra_formule.js.
module.exports = { formule: [
 {
  "n": 1,
  "title": {
   "sr": "Logika i skupovi",
   "en": "Logic and sets",
   "de": "Logik und Mengen",
   "fr": "Logique et ensembles",
   "es": "Lógica y conjuntos",
   "it": "Logica e insiemi",
   "ru": "Логика и множества",
   "pt": "Lógica e conjuntos"
  },
  "formule": [
   {
    "label": {
     "sr": "Logičke operacije",
     "en": "Logical operations",
     "de": "Logische Operationen",
     "fr": "Opérations logiques",
     "es": "Operaciones lógicas",
     "it": "Operazioni logiche",
     "ru": "Логические операции",
     "pt": "Operações lógicas"
    },
    "tex": "\\lnot,\\ \\land,\\ \\lor,\\ \\Rightarrow,\\ \\Leftrightarrow"
   },
   {
    "label": {
     "sr": "Implikacija preko disjunkcije",
     "en": "Implication via disjunction",
     "de": "Implikation über die Disjunktion",
     "fr": "Implication par la disjonction",
     "es": "Implicación mediante la disyunción",
     "it": "Implicazione tramite disgiunzione",
     "ru": "Импликация через дизъюнкцию",
     "pt": "Implicação via disjunção"
    },
    "tex": "p\\Rightarrow q\\ \\equiv\\ \\lnot p\\lor q"
   },
   {
    "label": {
     "sr": "De Morgan (konjunkcija)",
     "en": "De Morgan (conjunction)",
     "de": "De Morgan (Konjunktion)",
     "fr": "De Morgan (conjonction)",
     "es": "De Morgan (conjunción)",
     "it": "De Morgan (congiunzione)",
     "ru": "Де Морган (конъюнкция)",
     "pt": "De Morgan (conjunção)"
    },
    "tex": "\\lnot(p\\land q)=\\lnot p\\lor\\lnot q"
   },
   {
    "label": {
     "sr": "De Morgan (disjunkcija)",
     "en": "De Morgan (disjunction)",
     "de": "De Morgan (Disjunktion)",
     "fr": "De Morgan (disjonction)",
     "es": "De Morgan (disyunción)",
     "it": "De Morgan (disgiunzione)",
     "ru": "Де Морган (дизъюнкция)",
     "pt": "De Morgan (disjunção)"
    },
    "tex": "\\lnot(p\\lor q)=\\lnot p\\land\\lnot q"
   },
   {
    "label": {
     "sr": "Negacija kvantifikatora",
     "en": "Negation of a quantifier",
     "de": "Negation eines Quantors",
     "fr": "Négation d'un quantificateur",
     "es": "Negación de un cuantificador",
     "it": "Negazione di un quantificatore",
     "ru": "Отрицание квантора",
     "pt": "Negação de um quantificador"
    },
    "tex": "\\lnot\\big(\\forall x\\,P(x)\\big)=\\exists x\\,\\lnot P(x)"
   }
  ]
 },
 {
  "n": 2,
  "title": {
   "sr": "Relacije i funkcije",
   "en": "Relations and functions",
   "de": "Relationen und Funktionen",
   "fr": "Relations et fonctions",
   "es": "Relaciones y funciones",
   "it": "Relazioni e funzioni",
   "ru": "Отношения и функции",
   "pt": "Relações e funções"
  },
  "formule": [
   {
    "label": {
     "sr": "Parna funkcija",
     "en": "Even function",
     "de": "Gerade Funktion",
     "fr": "Fonction paire",
     "es": "Función par",
     "it": "Funzione pari",
     "ru": "Чётная функция",
     "pt": "Função par"
    },
    "tex": "f(-x)=f(x)"
   },
   {
    "label": {
     "sr": "Neparna funkcija",
     "en": "Odd function",
     "de": "Ungerade Funktion",
     "fr": "Fonction impaire",
     "es": "Función impar",
     "it": "Funzione dispari",
     "ru": "Нечётная функция",
     "pt": "Função ímpar"
    },
    "tex": "f(-x)=-f(x)"
   },
   {
    "label": {
     "sr": "Strogo rastuća",
     "en": "Strictly increasing",
     "de": "Streng monoton wachsend",
     "fr": "Strictement croissante",
     "es": "Estrictamente creciente",
     "it": "Strettamente crescente",
     "ru": "Строго возрастающая",
     "pt": "Estritamente crescente"
    },
    "tex": "x_1<x_2\\ \\Rightarrow\\ f(x_1)<f(x_2)"
   },
   {
    "label": {
     "sr": "Postojanje inverza",
     "en": "Existence of the inverse",
     "de": "Existenz der Umkehrfunktion",
     "fr": "Existence de la réciproque",
     "es": "Existencia de la inversa",
     "it": "Esistenza dell'inversa",
     "ru": "Существование обратной функции",
     "pt": "Existência da inversa"
    },
    "tex": "f\\ \\text{bijekcija}\\ \\Rightarrow\\ \\exists\\, f^{-1}"
   },
   {
    "label": {
     "sr": "Osobina inverza",
     "en": "Property of the inverse",
     "de": "Eigenschaft der Umkehrfunktion",
     "fr": "Propriété de la réciproque",
     "es": "Propiedad de la inversa",
     "it": "Proprietà dell'inversa",
     "ru": "Свойство обратной функции",
     "pt": "Propriedade da inversa"
    },
    "tex": "f\\big(f^{-1}(x)\\big)=x"
   }
  ]
 },
 {
  "n": 3,
  "title": {
   "sr": "Algebarske strukture i kardinalni brojevi",
   "en": "Algebraic structures and cardinal numbers",
   "de": "Algebraische Strukturen und Kardinalzahlen",
   "fr": "Structures algébriques et nombres cardinaux",
   "es": "Estructuras algebraicas y números cardinales",
   "it": "Strutture algebriche e numeri cardinali",
   "ru": "Алгебраические структуры и кардинальные числа",
   "pt": "Estruturas algébricas e números cardinais"
  },
  "formule": [
   {
    "label": {
     "sr": "Jednakobrojnost",
     "en": "Equinumerosity",
     "de": "Gleichmächtigkeit",
     "fr": "Équipotence",
     "es": "Equipotencia",
     "it": "Equipotenza",
     "ru": "Равномощность",
     "pt": "Equipotência"
    },
    "tex": "|A|=|B|\\ \\iff\\ \\exists\\ \\text{bijekcija}\\ A\\to B"
   },
   {
    "label": {
     "sr": "Prebrojivi skupovi",
     "en": "Countable sets",
     "de": "Abzählbare Mengen",
     "fr": "Ensembles dénombrables",
     "es": "Conjuntos numerables",
     "it": "Insiemi numerabili",
     "ru": "Счётные множества",
     "pt": "Conjuntos numeráveis"
    },
    "tex": "|\\mathbb{N}|=|\\mathbb{Z}|=|\\mathbb{Q}|"
   },
   {
    "label": {
     "sr": "Kontinuum je veći",
     "en": "The continuum is larger",
     "de": "Das Kontinuum ist größer",
     "fr": "Le continu est plus grand",
     "es": "El continuo es mayor",
     "it": "Il continuo è più grande",
     "ru": "Континуум больше",
     "pt": "O contínuo é maior"
    },
    "tex": "|\\mathbb{R}|>|\\mathbb{N}|"
   }
  ]
 },
 {
  "n": 4,
  "title": {
   "sr": "Nizovi",
   "en": "Sequences",
   "de": "Folgen",
   "fr": "Suites",
   "es": "Sucesiones",
   "it": "Successioni",
   "ru": "Последовательности",
   "pt": "Sucessões"
  },
  "formule": [
   {
    "label": {
     "sr": "Definicija granice niza",
     "en": "Definition of the limit of a sequence",
     "de": "Definition des Grenzwerts einer Folge",
     "fr": "Définition de la limite d'une suite",
     "es": "Definición del límite de una sucesión",
     "it": "Definizione del limite di una successione",
     "ru": "Определение предела последовательности",
     "pt": "Definição do limite de uma sucessão"
    },
    "tex": "\\lim_{n\\to\\infty}a_n=a\\ \\iff\\ \\forall\\varepsilon>0\\ \\exists n_0\\ \\forall n\\ge n_0:\\ |a_n-a|<\\varepsilon"
   },
   {
    "label": {
     "sr": "Aritmetički niz",
     "en": "Arithmetic sequence",
     "de": "Arithmetische Folge",
     "fr": "Suite arithmétique",
     "es": "Sucesión aritmética",
     "it": "Successione aritmetica",
     "ru": "Арифметическая прогрессия",
     "pt": "Progressão aritmética"
    },
    "tex": "a_n=a_1+(n-1)d"
   },
   {
    "label": {
     "sr": "Geometrijski niz",
     "en": "Geometric sequence",
     "de": "Geometrische Folge",
     "fr": "Suite géométrique",
     "es": "Sucesión geométrica",
     "it": "Successione geometrica",
     "ru": "Геометрическая прогрессия",
     "pt": "Progressão geométrica"
    },
    "tex": "a_n=a_1\\,q^{\\,n-1}"
   },
   {
    "label": {
     "sr": "Dovoljan uslov konvergencije",
     "en": "Sufficient condition for convergence",
     "de": "Hinreichende Konvergenzbedingung",
     "fr": "Condition suffisante de convergence",
     "es": "Condición suficiente de convergencia",
     "it": "Condizione sufficiente di convergenza",
     "ru": "Достаточное условие сходимости",
     "pt": "Condição suficiente de convergência"
    },
    "tex": "\\text{monoton i ogranicen}\\ \\Rightarrow\\ \\text{konvergira}"
   }
  ]
 },
 {
  "n": 5,
  "title": {
   "sr": "Realni brojevi",
   "en": "Real numbers",
   "de": "Reelle Zahlen",
   "fr": "Nombres réels",
   "es": "Números reales",
   "it": "Numeri reali",
   "ru": "Действительные числа",
   "pt": "Números reais"
  },
  "formule": [
   {
    "label": {
     "sr": "Aksioma supremuma",
     "en": "Supremum axiom",
     "de": "Supremumsaxiom",
     "fr": "Axiome de la borne supérieure",
     "es": "Axioma del supremo",
     "it": "Assioma dell'estremo superiore",
     "ru": "Аксиома супремума",
     "pt": "Axioma do supremo"
    },
    "tex": "A\\neq\\varnothing,\\ \\text{odozgo ogranicen}\\ \\Rightarrow\\ \\exists\\,\\sup A"
   },
   {
    "label": {
     "sr": "Apsolutna vrednost proizvoda",
     "en": "Absolute value of a product",
     "de": "Betrag eines Produkts",
     "fr": "Valeur absolue d'un produit",
     "es": "Valor absoluto de un producto",
     "it": "Valore assoluto di un prodotto",
     "ru": "Модуль произведения",
     "pt": "Valor absoluto de um produto"
    },
    "tex": "|xy|=|x|\\,|y|"
   },
   {
    "label": {
     "sr": "Nejednakost trougla",
     "en": "Triangle inequality",
     "de": "Dreiecksungleichung",
     "fr": "Inégalité triangulaire",
     "es": "Desigualdad triangular",
     "it": "Disuguaglianza triangolare",
     "ru": "Неравенство треугольника",
     "pt": "Desigualdade triangular"
    },
    "tex": "|x+y|\\le|x|+|y|"
   },
   {
    "label": {
     "sr": "Bernulijeva nejednakost",
     "en": "Bernoulli's inequality",
     "de": "Bernoulli-Ungleichung",
     "fr": "Inégalité de Bernoulli",
     "es": "Desigualdad de Bernoulli",
     "it": "Disuguaglianza di Bernoulli",
     "ru": "Неравенство Бернулли",
     "pt": "Desigualdade de Bernoulli"
    },
    "tex": "(1+x)^n\\ge 1+nx,\\quad x\\ge-1"
   }
  ]
 },
 {
  "n": 6,
  "title": {
   "sr": "Kompleksni brojevi",
   "en": "Complex numbers",
   "de": "Komplexe Zahlen",
   "fr": "Nombres complexes",
   "es": "Números complejos",
   "it": "Numeri complessi",
   "ru": "Комплексные числа",
   "pt": "Números complexos"
  },
  "formule": [
   {
    "label": {
     "sr": "Algebarski oblik",
     "en": "Algebraic form",
     "de": "Algebraische Form",
     "fr": "Forme algébrique",
     "es": "Forma algebraica",
     "it": "Forma algebrica",
     "ru": "Алгебраическая форма",
     "pt": "Forma algébrica"
    },
    "tex": "z=a+bi,\\qquad i^2=-1"
   },
   {
    "label": {
     "sr": "Moduo i konjugat",
     "en": "Modulus and conjugate",
     "de": "Betrag und Konjugierte",
     "fr": "Module et conjugué",
     "es": "Módulo y conjugado",
     "it": "Modulo e coniugato",
     "ru": "Модуль и сопряжённое",
     "pt": "Módulo e conjugado"
    },
    "tex": "|z|=\\sqrt{a^2+b^2},\\qquad \\overline{z}=a-bi"
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
    "tex": "e^{\\,i\\varphi}=\\cos\\varphi+i\\sin\\varphi"
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
    "tex": "\\big(\\cos\\varphi+i\\sin\\varphi\\big)^n=\\cos n\\varphi+i\\sin n\\varphi"
   }
  ]
 },
 {
  "n": 7,
  "title": {
   "sr": "Realne funkcije",
   "en": "Real functions",
   "de": "Reelle Funktionen",
   "fr": "Fonctions réelles",
   "es": "Funciones reales",
   "it": "Funzioni reali",
   "ru": "Действительные функции",
   "pt": "Funções reais"
  },
  "formule": [
   {
    "label": {
     "sr": "Funkcija jedne promenljive",
     "en": "Function of one variable",
     "de": "Funktion einer Variablen",
     "fr": "Fonction d'une variable",
     "es": "Función de una variable",
     "it": "Funzione di una variabile",
     "ru": "Функция одной переменной",
     "pt": "Função de uma variável"
    },
    "tex": "f:D\\to\\mathbb{R}"
   },
   {
    "label": {
     "sr": "Domen",
     "en": "Domain",
     "de": "Definitionsbereich",
     "fr": "Domaine",
     "es": "Dominio",
     "it": "Dominio",
     "ru": "Область определения",
     "pt": "Domínio"
    },
    "tex": "D_f=\\{\\,x:\\ f(x)\\ \\text{definisano}\\,\\}"
   },
   {
    "label": {
     "sr": "Funkcija više promenljivih",
     "en": "Function of several variables",
     "de": "Funktion mehrerer Variablen",
     "fr": "Fonction de plusieurs variables",
     "es": "Función de varias variables",
     "it": "Funzione di più variabili",
     "ru": "Функция нескольких переменных",
     "pt": "Função de várias variáveis"
    },
    "tex": "z=f(x,y)"
   },
   {
    "label": {
     "sr": "Vektorska funkcija",
     "en": "Vector function",
     "de": "Vektorfunktion",
     "fr": "Fonction vectorielle",
     "es": "Función vectorial",
     "it": "Funzione vettoriale",
     "ru": "Вектор-функция",
     "pt": "Função vetorial"
    },
    "tex": "\\vec r(t)=\\big(x(t),\\,y(t),\\,z(t)\\big)"
   }
  ]
 },
 {
  "n": 8,
  "title": {
   "sr": "Metrički prostori",
   "en": "Metric spaces",
   "de": "Metrische Räume",
   "fr": "Espaces métriques",
   "es": "Espacios métricos",
   "it": "Spazi metrici",
   "ru": "Метрические пространства",
   "pt": "Espaços métricos"
  },
  "formule": [
   {
    "label": {
     "sr": "Nenegativnost i simetrija",
     "en": "Nonnegativity and symmetry",
     "de": "Nichtnegativität und Symmetrie",
     "fr": "Positivité et symétrie",
     "es": "No negatividad y simetría",
     "it": "Non negatività e simmetria",
     "ru": "Неотрицательность и симметрия",
     "pt": "Não negatividade e simetria"
    },
    "tex": "d(x,y)\\ge0,\\quad d(x,y)=0\\iff x=y,\\quad d(x,y)=d(y,x)"
   },
   {
    "label": {
     "sr": "Nejednakost trougla",
     "en": "Triangle inequality",
     "de": "Dreiecksungleichung",
     "fr": "Inégalité triangulaire",
     "es": "Desigualdad triangular",
     "it": "Disuguaglianza triangolare",
     "ru": "Неравенство треугольника",
     "pt": "Desigualdade triangular"
    },
    "tex": "d(x,z)\\le d(x,y)+d(y,z)"
   },
   {
    "label": {
     "sr": "Euklidska metrika",
     "en": "Euclidean metric",
     "de": "Euklidische Metrik",
     "fr": "Métrique euclidienne",
     "es": "Métrica euclídea",
     "it": "Metrica euclidea",
     "ru": "Евклидова метрика",
     "pt": "Métrica euclidiana"
    },
    "tex": "d(x,y)=\\sqrt{\\textstyle\\sum_{i=1}^{n}(x_i-y_i)^2}"
   }
  ]
 },
 {
  "n": 9,
  "title": {
   "sr": "Konvergencija nizova",
   "en": "Convergence of sequences",
   "de": "Konvergenz von Folgen",
   "fr": "Convergence des suites",
   "es": "Convergencia de sucesiones",
   "it": "Convergenza delle successioni",
   "ru": "Сходимость последовательностей",
   "pt": "Convergência de sucessões"
  },
  "formule": [
   {
    "label": {
     "sr": "Broj e",
     "en": "The number e",
     "de": "Die Zahl e",
     "fr": "Le nombre e",
     "es": "El número e",
     "it": "Il numero e",
     "ru": "Число e",
     "pt": "O número e"
    },
    "tex": "e=\\lim_{n\\to\\infty}\\Big(1+\\tfrac1n\\Big)^{n}"
   },
   {
    "label": {
     "sr": "Bolcano–Vajerštras",
     "en": "Bolzano–Weierstrass",
     "de": "Bolzano–Weierstraß",
     "fr": "Bolzano–Weierstrass",
     "es": "Bolzano–Weierstrass",
     "it": "Bolzano–Weierstrass",
     "ru": "Больцано–Вейерштрасс",
     "pt": "Bolzano–Weierstrass"
    },
    "tex": "\\text{ogranicen niz}\\ \\Rightarrow\\ \\exists\\ \\text{konvergentan podniz}"
   },
   {
    "label": {
     "sr": "Košijev kriterijum",
     "en": "Cauchy criterion",
     "de": "Cauchy-Kriterium",
     "fr": "Critère de Cauchy",
     "es": "Criterio de Cauchy",
     "it": "Criterio di Cauchy",
     "ru": "Критерий Коши",
     "pt": "Critério de Cauchy"
    },
    "tex": "\\forall\\varepsilon>0\\ \\exists n_0\\ \\forall m,n\\ge n_0:\\ |a_n-a_m|<\\varepsilon"
   },
   {
    "label": {
     "sr": "Uopštena granica",
     "en": "Generalized limit",
     "de": "Verallgemeinerter Grenzwert",
     "fr": "Limite généralisée",
     "es": "Límite generalizado",
     "it": "Limite generalizzato",
     "ru": "Обобщённый предел",
     "pt": "Limite generalizado"
    },
    "tex": "\\lim\\big(1+\\tfrac{x}{n}\\big)^n=e^{x}"
   }
  ]
 },
 {
  "n": 10,
  "title": {
   "sr": "Granična vrednost funkcije",
   "en": "Limit of a function",
   "de": "Grenzwert einer Funktion",
   "fr": "Limite d'une fonction",
   "es": "Límite de una función",
   "it": "Limite di una funzione",
   "ru": "Предел функции",
   "pt": "Limite de uma função"
  },
  "formule": [
   {
    "label": {
     "sr": "Definicija (ε–δ)",
     "en": "Definition (ε–δ)",
     "de": "Definition (ε–δ)",
     "fr": "Définition (ε–δ)",
     "es": "Definición (ε–δ)",
     "it": "Definizione (ε–δ)",
     "ru": "Определение (ε–δ)",
     "pt": "Definição (ε–δ)"
    },
    "tex": "\\lim_{x\\to a}f(x)=L\\ \\iff\\ \\forall\\varepsilon>0\\ \\exists\\delta>0:\\ 0<|x-a|<\\delta\\Rightarrow|f(x)-L|<\\varepsilon"
   },
   {
    "label": {
     "sr": "Osnovna trigonometrijska granica",
     "en": "Fundamental trigonometric limit",
     "de": "Grundlegender trigonometrischer Grenzwert",
     "fr": "Limite trigonométrique fondamentale",
     "es": "Límite trigonométrico fundamental",
     "it": "Limite trigonometrico fondamentale",
     "ru": "Основной тригонометрический предел",
     "pt": "Limite trigonométrico fundamental"
    },
    "tex": "\\lim_{x\\to0}\\frac{\\sin x}{x}=1"
   },
   {
    "label": {
     "sr": "Granica ka broju e",
     "en": "Limit giving the number e",
     "de": "Grenzwert zur Zahl e",
     "fr": "Limite vers le nombre e",
     "es": "Límite hacia el número e",
     "it": "Limite verso il numero e",
     "ru": "Предел, дающий число e",
     "pt": "Limite para o número e"
    },
    "tex": "\\lim_{x\\to0}(1+x)^{1/x}=e"
   }
  ]
 },
 {
  "n": 11,
  "title": {
   "sr": "Neprekidnost funkcije",
   "en": "Continuity of a function",
   "de": "Stetigkeit einer Funktion",
   "fr": "Continuité d'une fonction",
   "es": "Continuidad de una función",
   "it": "Continuità di una funzione",
   "ru": "Непрерывность функции",
   "pt": "Continuidade de uma função"
  },
  "formule": [
   {
    "label": {
     "sr": "Definicija neprekidnosti",
     "en": "Definition of continuity",
     "de": "Definition der Stetigkeit",
     "fr": "Définition de la continuité",
     "es": "Definición de continuidad",
     "it": "Definizione di continuità",
     "ru": "Определение непрерывности",
     "pt": "Definição de continuidade"
    },
    "tex": "\\lim_{x\\to a}f(x)=f(a)"
   },
   {
    "label": {
     "sr": "Vajerštrasova teorema",
     "en": "Weierstrass theorem",
     "de": "Satz von Weierstraß",
     "fr": "Théorème de Weierstrass",
     "es": "Teorema de Weierstrass",
     "it": "Teorema di Weierstrass",
     "ru": "Теорема Вейерштрасса",
     "pt": "Teorema de Weierstrass"
    },
    "tex": "f\\ \\text{neprekidna na}\\ [a,b]\\ \\Rightarrow\\ \\text{dostize min i max}"
   },
   {
    "label": {
     "sr": "Bolcano–Košijeva teorema",
     "en": "Bolzano–Cauchy theorem",
     "de": "Satz von Bolzano–Cauchy",
     "fr": "Théorème de Bolzano–Cauchy",
     "es": "Teorema de Bolzano–Cauchy",
     "it": "Teorema di Bolzano–Cauchy",
     "ru": "Теорема Больцано–Коши",
     "pt": "Teorema de Bolzano–Cauchy"
    },
    "tex": "f(a)\\cdot f(b)<0\\ \\Rightarrow\\ \\exists c\\in(a,b):\\ f(c)=0"
   }
  ]
 },
 {
  "n": 12,
  "title": {
   "sr": "Izvod i diferencijal",
   "en": "Derivative and differential",
   "de": "Ableitung und Differential",
   "fr": "Dérivée et différentielle",
   "es": "Derivada y diferencial",
   "it": "Derivata e differenziale",
   "ru": "Производная и дифференциал",
   "pt": "Derivada e diferencial"
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
    "tex": "f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}"
   },
   {
    "label": {
     "sr": "Izvod proizvoda",
     "en": "Derivative of a product",
     "de": "Ableitung eines Produkts",
     "fr": "Dérivée d'un produit",
     "es": "Derivada de un producto",
     "it": "Derivata di un prodotto",
     "ru": "Производная произведения",
     "pt": "Derivada de um produto"
    },
    "tex": "(uv)'=u'v+uv'"
   },
   {
    "label": {
     "sr": "Izvod količnika",
     "en": "Derivative of a quotient",
     "de": "Ableitung eines Quotienten",
     "fr": "Dérivée d'un quotient",
     "es": "Derivada de un cociente",
     "it": "Derivata di un quoziente",
     "ru": "Производная частного",
     "pt": "Derivada de um quociente"
    },
    "tex": "\\left(\\frac{u}{v}\\right)'=\\frac{u'v-uv'}{v^2}"
   },
   {
    "label": {
     "sr": "Pravilo lanca",
     "en": "Chain rule",
     "de": "Kettenregel",
     "fr": "Règle de dérivation en chaîne",
     "es": "Regla de la cadena",
     "it": "Regola della catena",
     "ru": "Цепное правило",
     "pt": "Regra da cadeia"
    },
    "tex": "\\big(f(g(x))\\big)'=f'\\!\\big(g(x)\\big)\\cdot g'(x)"
   },
   {
    "label": {
     "sr": "Diferencijal",
     "en": "Differential",
     "de": "Differential",
     "fr": "Différentielle",
     "es": "Diferencial",
     "it": "Differenziale",
     "ru": "Дифференциал",
     "pt": "Diferencial"
    },
    "tex": "dy=f'(x)\\,dx"
   }
  ]
 },
 {
  "n": 13,
  "title": {
   "sr": "Teoreme srednje vrednosti, Lopital i Tejlor",
   "en": "Mean value theorems, L'Hôpital and Taylor",
   "de": "Mittelwertsätze, L'Hospital und Taylor",
   "fr": "Théorèmes des accroissements finis, L'Hôpital et Taylor",
   "es": "Teoremas del valor medio, L'Hôpital y Taylor",
   "it": "Teoremi del valor medio, L'Hôpital e Taylor",
   "ru": "Теоремы о среднем, Лопиталь и Тейлор",
   "pt": "Teoremas do valor médio, L'Hôpital e Taylor"
  },
  "formule": [
   {
    "label": {
     "sr": "Lagranžova teorema",
     "en": "Lagrange's theorem",
     "de": "Satz von Lagrange",
     "fr": "Théorème de Lagrange",
     "es": "Teorema de Lagrange",
     "it": "Teorema di Lagrange",
     "ru": "Теорема Лагранжа",
     "pt": "Teorema de Lagrange"
    },
    "tex": "f'(c)=\\frac{f(b)-f(a)}{b-a}"
   },
   {
    "label": {
     "sr": "Rolova teorema",
     "en": "Rolle's theorem",
     "de": "Satz von Rolle",
     "fr": "Théorème de Rolle",
     "es": "Teorema de Rolle",
     "it": "Teorema di Rolle",
     "ru": "Теорема Ролля",
     "pt": "Teorema de Rolle"
    },
    "tex": "f(a)=f(b)\\ \\Rightarrow\\ \\exists c:\\ f'(c)=0"
   },
   {
    "label": {
     "sr": "Lopitalovo pravilo",
     "en": "L'Hôpital's rule",
     "de": "Regel von L'Hospital",
     "fr": "Règle de L'Hôpital",
     "es": "Regla de L'Hôpital",
     "it": "Regola di L'Hôpital",
     "ru": "Правило Лопиталя",
     "pt": "Regra de L'Hôpital"
    },
    "tex": "\\lim\\frac{f(x)}{g(x)}=\\lim\\frac{f'(x)}{g'(x)}"
   },
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
    "tex": "f(x)\\approx\\sum_{n=0}^{N}\\frac{f^{(n)}(a)}{n!}\\,(x-a)^n"
   }
  ]
 },
 {
  "n": 14,
  "title": {
   "sr": "Ispitivanje funkcije",
   "en": "Curve sketching",
   "de": "Kurvendiskussion",
   "fr": "Étude de fonction",
   "es": "Estudio de la función",
   "it": "Studio di funzione",
   "ru": "Исследование функции",
   "pt": "Estudo da função"
  },
  "formule": [
   {
    "label": {
     "sr": "Stacionarne tačke",
     "en": "Stationary points",
     "de": "Stationäre Punkte",
     "fr": "Points stationnaires",
     "es": "Puntos estacionarios",
     "it": "Punti stazionari",
     "ru": "Стационарные точки",
     "pt": "Pontos estacionários"
    },
    "tex": "f'(x)=0"
   },
   {
    "label": {
     "sr": "Lokalni minimum",
     "en": "Local minimum",
     "de": "Lokales Minimum",
     "fr": "Minimum local",
     "es": "Mínimo local",
     "it": "Minimo locale",
     "ru": "Локальный минимум",
     "pt": "Mínimo local"
    },
    "tex": "f'(x_0)=0,\\quad f''(x_0)>0"
   },
   {
    "label": {
     "sr": "Lokalni maksimum",
     "en": "Local maximum",
     "de": "Lokales Maximum",
     "fr": "Maximum local",
     "es": "Máximo local",
     "it": "Massimo locale",
     "ru": "Локальный максимум",
     "pt": "Máximo local"
    },
    "tex": "f'(x_0)=0,\\quad f''(x_0)<0"
   },
   {
    "label": {
     "sr": "Kosa asimptota",
     "en": "Oblique asymptote",
     "de": "Schräge Asymptote",
     "fr": "Asymptote oblique",
     "es": "Asíntota oblicua",
     "it": "Asintoto obliquo",
     "ru": "Наклонная асимптота",
     "pt": "Assíntota oblíqua"
    },
    "tex": "y=kx+n,\\quad k=\\lim_{x\\to\\infty}\\frac{f(x)}{x},\\ \\ n=\\lim_{x\\to\\infty}\\big(f(x)-kx\\big)"
   }
  ]
 },
 {
  "n": 15,
  "title": {
   "sr": "Parcijalni izvodi i ekstremi funkcija više promenljivih",
   "en": "Partial derivatives and extrema of functions of several variables",
   "de": "Partielle Ableitungen und Extrema von Funktionen mehrerer Variablen",
   "fr": "Dérivées partielles et extrema des fonctions de plusieurs variables",
   "es": "Derivadas parciales y extremos de funciones de varias variables",
   "it": "Derivate parziali ed estremi di funzioni di più variabili",
   "ru": "Частные производные и экстремумы функций нескольких переменных",
   "pt": "Derivadas parciais e extremos de funções de várias variáveis"
  },
  "formule": [
   {
    "label": {
     "sr": "Totalni diferencijal",
     "en": "Total differential",
     "de": "Totales Differential",
     "fr": "Différentielle totale",
     "es": "Diferencial total",
     "it": "Differenziale totale",
     "ru": "Полный дифференциал",
     "pt": "Diferencial total"
    },
    "tex": "df=\\frac{\\partial f}{\\partial x}\\,dx+\\frac{\\partial f}{\\partial y}\\,dy"
   },
   {
    "label": {
     "sr": "Stacionarna tačka",
     "en": "Stationary point",
     "de": "Stationärer Punkt",
     "fr": "Point stationnaire",
     "es": "Punto estacionario",
     "it": "Punto stazionario",
     "ru": "Стационарная точка",
     "pt": "Ponto estacionário"
    },
    "tex": "\\frac{\\partial f}{\\partial x}=0,\\qquad \\frac{\\partial f}{\\partial y}=0"
   },
   {
    "label": {
     "sr": "Hesijan (uslov ekstrema)",
     "en": "Hessian (condition for an extremum)",
     "de": "Hesse-Matrix (Extremumbedingung)",
     "fr": "Hessienne (condition d'extremum)",
     "es": "Hessiano (condición de extremo)",
     "it": "Hessiana (condizione di estremo)",
     "ru": "Гессиан (условие экстремума)",
     "pt": "Hessiano (condição de extremo)"
    },
    "tex": "D=f_{xx}\\,f_{yy}-\\big(f_{xy}\\big)^2"
   },
   {
    "label": {
     "sr": "Lagranžovi množioci",
     "en": "Lagrange multipliers",
     "de": "Lagrange-Multiplikatoren",
     "fr": "Multiplicateurs de Lagrange",
     "es": "Multiplicadores de Lagrange",
     "it": "Moltiplicatori di Lagrange",
     "ru": "Множители Лагранжа",
     "pt": "Multiplicadores de Lagrange"
    },
    "tex": "\\nabla f=\\lambda\\,\\nabla g"
   }
  ]
 },
 {
  "n": 16,
  "title": {
   "sr": "Neodređeni integral",
   "en": "Indefinite integral",
   "de": "Unbestimmtes Integral",
   "fr": "Intégrale indéfinie",
   "es": "Integral indefinida",
   "it": "Integrale indefinito",
   "ru": "Неопределённый интеграл",
   "pt": "Integral indefinido"
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
    "tex": "\\int f(x)\\,dx=F(x)+C,\\qquad F'(x)=f(x)"
   },
   {
    "label": {
     "sr": "Stepena funkcija",
     "en": "Power function",
     "de": "Potenzfunktion",
     "fr": "Fonction puissance",
     "es": "Función potencia",
     "it": "Funzione potenza",
     "ru": "Степенная функция",
     "pt": "Função potência"
    },
    "tex": "\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C,\\quad n\\neq-1"
   },
   {
    "label": {
     "sr": "Smena promenljive",
     "en": "Substitution",
     "de": "Substitution",
     "fr": "Changement de variable",
     "es": "Cambio de variable",
     "it": "Sostituzione",
     "ru": "Замена переменной",
     "pt": "Substituição"
    },
    "tex": "\\int f\\big(g(x)\\big)g'(x)\\,dx=\\int f(t)\\,dt"
   },
   {
    "label": {
     "sr": "Parcijalna integracija",
     "en": "Integration by parts",
     "de": "Partielle Integration",
     "fr": "Intégration par parties",
     "es": "Integración por partes",
     "it": "Integrazione per parti",
     "ru": "Интегрирование по частям",
     "pt": "Integração por partes"
    },
    "tex": "\\int u\\,dv=uv-\\int v\\,du"
   }
  ]
 },
 {
  "n": 17,
  "title": {
   "sr": "Određeni integral i primene",
   "en": "Definite integral and applications",
   "de": "Bestimmtes Integral und Anwendungen",
   "fr": "Intégrale définie et applications",
   "es": "Integral definida y aplicaciones",
   "it": "Integrale definito e applicazioni",
   "ru": "Определённый интеграл и приложения",
   "pt": "Integral definido e aplicações"
  },
  "formule": [
   {
    "label": {
     "sr": "Njutn–Lajbnicova formula",
     "en": "Newton–Leibniz formula",
     "de": "Newton–Leibniz-Formel",
     "fr": "Formule de Newton–Leibniz",
     "es": "Fórmula de Newton–Leibniz",
     "it": "Formula di Newton–Leibniz",
     "ru": "Формула Ньютона–Лейбница",
     "pt": "Fórmula de Newton–Leibniz"
    },
    "tex": "\\int_a^b f(x)\\,dx=F(b)-F(a)"
   },
   {
    "label": {
     "sr": "Površina ispod krive",
     "en": "Area under a curve",
     "de": "Fläche unter einer Kurve",
     "fr": "Aire sous une courbe",
     "es": "Área bajo una curva",
     "it": "Area sotto una curva",
     "ru": "Площадь под кривой",
     "pt": "Área sob uma curva"
    },
    "tex": "P=\\int_a^b f(x)\\,dx"
   },
   {
    "label": {
     "sr": "Zapremina obrtnog tela",
     "en": "Volume of a solid of revolution",
     "de": "Volumen eines Rotationskörpers",
     "fr": "Volume d'un solide de révolution",
     "es": "Volumen de un sólido de revolución",
     "it": "Volume di un solido di rotazione",
     "ru": "Объём тела вращения",
     "pt": "Volume de um sólido de revolução"
    },
    "tex": "V=\\pi\\int_a^b \\big(f(x)\\big)^2\\,dx"
   },
   {
    "label": {
     "sr": "Dužina luka",
     "en": "Arc length",
     "de": "Bogenlänge",
     "fr": "Longueur d'arc",
     "es": "Longitud de arco",
     "it": "Lunghezza d'arco",
     "ru": "Длина дуги",
     "pt": "Comprimento de arco"
    },
    "tex": "L=\\int_a^b \\sqrt{1+\\big(f'(x)\\big)^2}\\,dx"
   }
  ]
 },
 {
  "n": 18,
  "title": {
   "sr": "Nesvojstveni integral",
   "en": "Improper integral",
   "de": "Uneigentliches Integral",
   "fr": "Intégrale impropre",
   "es": "Integral impropia",
   "it": "Integrale improprio",
   "ru": "Несобственный интеграл",
   "pt": "Integral impróprio"
  },
  "formule": [
   {
    "label": {
     "sr": "Definicija (beskonačan interval)",
     "en": "Definition (infinite interval)",
     "de": "Definition (unendliches Intervall)",
     "fr": "Définition (intervalle infini)",
     "es": "Definición (intervalo infinito)",
     "it": "Definizione (intervallo infinito)",
     "ru": "Определение (бесконечный интервал)",
     "pt": "Definição (intervalo infinito)"
    },
    "tex": "\\int_a^{\\infty} f(x)\\,dx=\\lim_{b\\to\\infty}\\int_a^{b} f(x)\\,dx"
   },
   {
    "label": {
     "sr": "Uslov konvergencije",
     "en": "Convergence condition",
     "de": "Konvergenzbedingung",
     "fr": "Condition de convergence",
     "es": "Condición de convergencia",
     "it": "Condizione di convergenza",
     "ru": "Условие сходимости",
     "pt": "Condição de convergência"
    },
    "tex": "\\text{konvergira}\\ \\iff\\ \\text{granica postoji i konacna je}"
   },
   {
    "label": {
     "sr": "Kriterijum za stepen",
     "en": "Criterion for the power",
     "de": "Kriterium für die Potenz",
     "fr": "Critère pour la puissance",
     "es": "Criterio para la potencia",
     "it": "Criterio per la potenza",
     "ru": "Признак для степени",
     "pt": "Critério para a potência"
    },
    "tex": "\\int_1^{\\infty}\\frac{dx}{x^{p}}\\ \\text{konvergira}\\ \\iff\\ p>1"
   }
  ]
 },
 {
  "n": 19,
  "title": {
   "sr": "Obične diferencijalne jednačine",
   "en": "Ordinary differential equations",
   "de": "Gewöhnliche Differentialgleichungen",
   "fr": "Équations différentielles ordinaires",
   "es": "Ecuaciones diferenciales ordinarias",
   "it": "Equazioni differenziali ordinarie",
   "ru": "Обыкновенные дифференциальные уравнения",
   "pt": "Equações diferenciais ordinárias"
  },
  "formule": [
   {
    "label": {
     "sr": "Razdvajanje promenljivih",
     "en": "Separation of variables",
     "de": "Trennung der Variablen",
     "fr": "Séparation des variables",
     "es": "Separación de variables",
     "it": "Separazione delle variabili",
     "ru": "Разделение переменных",
     "pt": "Separação de variáveis"
    },
    "tex": "\\frac{dy}{dx}=f(x)\\,g(y)\\ \\Rightarrow\\ \\int\\frac{dy}{g(y)}=\\int f(x)\\,dx"
   },
   {
    "label": {
     "sr": "Linearna prvog reda",
     "en": "First-order linear",
     "de": "Linear erster Ordnung",
     "fr": "Linéaire du premier ordre",
     "es": "Lineal de primer orden",
     "it": "Lineare del primo ordine",
     "ru": "Линейное первого порядка",
     "pt": "Linear de primeira ordem"
    },
    "tex": "y'+p(x)\\,y=q(x)"
   },
   {
    "label": {
     "sr": "Karakteristična jednačina",
     "en": "Characteristic equation",
     "de": "Charakteristische Gleichung",
     "fr": "Équation caractéristique",
     "es": "Ecuación característica",
     "it": "Equazione caratteristica",
     "ru": "Характеристическое уравнение",
     "pt": "Equação característica"
    },
    "tex": "a\\,y''+b\\,y'+c\\,y=0\\ \\to\\ a r^2+b r+c=0"
   },
   {
    "label": {
     "sr": "Opšte rešenje (realni koreni)",
     "en": "General solution (real roots)",
     "de": "Allgemeine Lösung (reelle Wurzeln)",
     "fr": "Solution générale (racines réelles)",
     "es": "Solución general (raíces reales)",
     "it": "Soluzione generale (radici reali)",
     "ru": "Общее решение (действительные корни)",
     "pt": "Solução geral (raízes reais)"
    },
    "tex": "y=C_1 e^{r_1 x}+C_2 e^{r_2 x}"
   }
  ]
 }
] };
