// Verovatnoća — Formule (iz ZAPAMTI). Oblik kao ma1_formule.js.
module.exports = { formule: [
 {
  "n": 1,
  "title": {
   "sr": "Algebra događaja i aksiome verovatnoće",
   "en": "Algebra of events and axioms of probability",
   "de": "Ereignisalgebra und Axiome der Wahrscheinlichkeit",
   "fr": "Algèbre des événements et axiomes des probabilités",
   "es": "Álgebra de sucesos y axiomas de la probabilidad",
   "it": "Algebra degli eventi e assiomi della probabilità",
   "ru": "Алгебра событий и аксиомы вероятности",
   "pt": "Álgebra de acontecimentos e axiomas da probabilidade"
  },
  "formule": [
   {
    "label": {
     "sr": "Klasična verovatnoća",
     "en": "Classical probability",
     "de": "Klassische Wahrscheinlichkeit",
     "fr": "Probabilité classique",
     "es": "Probabilidad clásica",
     "it": "Probabilità classica",
     "ru": "Классическая вероятность",
     "pt": "Probabilidade clássica"
    },
    "tex": "P(A)=\\frac{m}{n}=\\frac{\\text{broj povoljnih}}{\\text{broj mogućih}}"
   },
   {
    "label": {
     "sr": "Aksiome",
     "en": "Axioms",
     "de": "Axiome",
     "fr": "Axiomes",
     "es": "Axiomas",
     "it": "Assiomi",
     "ru": "Аксиомы",
     "pt": "Axiomas"
    },
    "tex": "0\\le P(A)\\le 1,\\qquad P(\\Omega)=1"
   },
   {
    "label": {
     "sr": "Verovatnoća unije",
     "en": "Probability of a union",
     "de": "Wahrscheinlichkeit der Vereinigung",
     "fr": "Probabilité d'une union",
     "es": "Probabilidad de la unión",
     "it": "Probabilità dell'unione",
     "ru": "Вероятность объединения",
     "pt": "Probabilidade da união"
    },
    "tex": "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)"
   },
   {
    "label": {
     "sr": "Suprotan događaj",
     "en": "Complementary event",
     "de": "Gegenereignis",
     "fr": "Événement contraire",
     "es": "Suceso complementario",
     "it": "Evento complementare",
     "ru": "Противоположное событие",
     "pt": "Acontecimento complementar"
    },
    "tex": "P(A^{c})=1-P(A)"
   }
  ]
 },
 {
  "n": 2,
  "title": {
   "sr": "Uslovna verovatnoća i nezavisnost",
   "en": "Conditional probability and independence",
   "de": "Bedingte Wahrscheinlichkeit und Unabhängigkeit",
   "fr": "Probabilité conditionnelle et indépendance",
   "es": "Probabilidad condicional e independencia",
   "it": "Probabilità condizionata e indipendenza",
   "ru": "Условная вероятность и независимость",
   "pt": "Probabilidade condicional e independência"
  },
  "formule": [
   {
    "label": {
     "sr": "Uslovna verovatnoća",
     "en": "Conditional probability",
     "de": "Bedingte Wahrscheinlichkeit",
     "fr": "Probabilité conditionnelle",
     "es": "Probabilidad condicional",
     "it": "Probabilità condizionata",
     "ru": "Условная вероятность",
     "pt": "Probabilidade condicional"
    },
    "tex": "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)},\\qquad P(B)>0"
   },
   {
    "label": {
     "sr": "Pravilo množenja",
     "en": "Multiplication rule",
     "de": "Multiplikationsregel",
     "fr": "Règle de multiplication",
     "es": "Regla del producto",
     "it": "Regola del prodotto",
     "ru": "Правило умножения",
     "pt": "Regra da multiplicação"
    },
    "tex": "P(A\\cap B)=P(A\\mid B)\\,P(B)"
   },
   {
    "label": {
     "sr": "Nezavisnost",
     "en": "Independence",
     "de": "Unabhängigkeit",
     "fr": "Indépendance",
     "es": "Independencia",
     "it": "Indipendenza",
     "ru": "Независимость",
     "pt": "Independência"
    },
    "tex": "P(A\\cap B)=P(A)\\,P(B)"
   }
  ]
 },
 {
  "n": 3,
  "title": {
   "sr": "Formula totalne verovatnoće i Bajesova formula",
   "en": "Total probability formula and Bayes' formula",
   "de": "Satz von der totalen Wahrscheinlichkeit und Formel von Bayes",
   "fr": "Formule des probabilités totales et formule de Bayes",
   "es": "Fórmula de la probabilidad total y fórmula de Bayes",
   "it": "Formula della probabilità totale e formula di Bayes",
   "ru": "Формула полной вероятности и формула Байеса",
   "pt": "Fórmula da probabilidade total e fórmula de Bayes"
  },
  "formule": [
   {
    "label": {
     "sr": "Formula totalne verovatnoće",
     "en": "Total probability formula",
     "de": "Satz von der totalen Wahrscheinlichkeit",
     "fr": "Formule des probabilités totales",
     "es": "Fórmula de la probabilidad total",
     "it": "Formula della probabilità totale",
     "ru": "Формула полной вероятности",
     "pt": "Fórmula da probabilidade total"
    },
    "tex": "P(A)=\\sum_{i} P(A\\mid H_i)\\,P(H_i)"
   },
   {
    "label": {
     "sr": "Bajesova formula",
     "en": "Bayes' formula",
     "de": "Formel von Bayes",
     "fr": "Formule de Bayes",
     "es": "Fórmula de Bayes",
     "it": "Formula di Bayes",
     "ru": "Формула Байеса",
     "pt": "Fórmula de Bayes"
    },
    "tex": "P(H_k\\mid A)=\\frac{P(A\\mid H_k)\\,P(H_k)}{\\sum_i P(A\\mid H_i)\\,P(H_i)}"
   }
  ]
 },
 {
  "n": 4,
  "title": {
   "sr": "Slučajne promenljive i funkcija raspodele",
   "en": "Random variables and the distribution function",
   "de": "Zufallsvariablen und Verteilungsfunktion",
   "fr": "Variables aléatoires et fonction de répartition",
   "es": "Variables aleatorias y función de distribución",
   "it": "Variabili aleatorie e funzione di ripartizione",
   "ru": "Случайные величины и функция распределения",
   "pt": "Variáveis aleatórias e função de distribuição"
  },
  "formule": [
   {
    "label": {
     "sr": "Funkcija raspodele",
     "en": "Distribution function",
     "de": "Verteilungsfunktion",
     "fr": "Fonction de répartition",
     "es": "Función de distribución",
     "it": "Funzione di ripartizione",
     "ru": "Функция распределения",
     "pt": "Função de distribuição"
    },
    "tex": "F(x)=P(X\\le x)"
   },
   {
    "label": {
     "sr": "Granice",
     "en": "Limits",
     "de": "Grenzwerte",
     "fr": "Limites",
     "es": "Límites",
     "it": "Limiti",
     "ru": "Пределы",
     "pt": "Limites"
    },
    "tex": "\\lim_{x\\to-\\infty}F(x)=0,\\qquad \\lim_{x\\to+\\infty}F(x)=1"
   },
   {
    "label": {
     "sr": "Verovatnoća intervala",
     "en": "Probability of an interval",
     "de": "Wahrscheinlichkeit eines Intervalls",
     "fr": "Probabilité d'un intervalle",
     "es": "Probabilidad de un intervalo",
     "it": "Probabilità di un intervallo",
     "ru": "Вероятность интервала",
     "pt": "Probabilidade de um intervalo"
    },
    "tex": "P(a<X\\le b)=F(b)-F(a)"
   }
  ]
 },
 {
  "n": 5,
  "title": {
   "sr": "Diskretne raspodele",
   "en": "Discrete distributions",
   "de": "Diskrete Verteilungen",
   "fr": "Lois discrètes",
   "es": "Distribuciones discretas",
   "it": "Distribuzioni discrete",
   "ru": "Дискретные распределения",
   "pt": "Distribuições discretas"
  },
  "formule": [
   {
    "label": {
     "sr": "Binomna raspodela",
     "en": "Binomial distribution",
     "de": "Binomialverteilung",
     "fr": "Loi binomiale",
     "es": "Distribución binomial",
     "it": "Distribuzione binomiale",
     "ru": "Биномиальное распределение",
     "pt": "Distribuição binomial"
    },
    "tex": "P(X=k)=\\binom{n}{k}p^{k}(1-p)^{\\,n-k}"
   },
   {
    "label": {
     "sr": "Poasonova raspodela",
     "en": "Poisson distribution",
     "de": "Poisson-Verteilung",
     "fr": "Loi de Poisson",
     "es": "Distribución de Poisson",
     "it": "Distribuzione di Poisson",
     "ru": "Распределение Пуассона",
     "pt": "Distribuição de Poisson"
    },
    "tex": "P(X=k)=\\frac{\\lambda^{k}e^{-\\lambda}}{k!}"
   },
   {
    "label": {
     "sr": "Geometrijska raspodela",
     "en": "Geometric distribution",
     "de": "Geometrische Verteilung",
     "fr": "Loi géométrique",
     "es": "Distribución geométrica",
     "it": "Distribuzione geometrica",
     "ru": "Геометрическое распределение",
     "pt": "Distribuição geométrica"
    },
    "tex": "P(X=k)=(1-p)^{\\,k-1}p"
   }
  ]
 },
 {
  "n": 6,
  "title": {
   "sr": "Neprekidne raspodele",
   "en": "Continuous distributions",
   "de": "Stetige Verteilungen",
   "fr": "Lois continues",
   "es": "Distribuciones continuas",
   "it": "Distribuzioni continue",
   "ru": "Непрерывные распределения",
   "pt": "Distribuições contínuas"
  },
  "formule": [
   {
    "label": {
     "sr": "Gustina i raspodela",
     "en": "Density and distribution",
     "de": "Dichte und Verteilung",
     "fr": "Densité et répartition",
     "es": "Densidad y distribución",
     "it": "Densità e ripartizione",
     "ru": "Плотность и распределение",
     "pt": "Densidade e distribuição"
    },
    "tex": "F(x)=\\int_{-\\infty}^{x} f(t)\\,dt,\\qquad \\int_{-\\infty}^{\\infty} f(t)\\,dt=1"
   },
   {
    "label": {
     "sr": "Eksponencijalna raspodela",
     "en": "Exponential distribution",
     "de": "Exponentialverteilung",
     "fr": "Loi exponentielle",
     "es": "Distribución exponencial",
     "it": "Distribuzione esponenziale",
     "ru": "Показательное распределение",
     "pt": "Distribuição exponencial"
    },
    "tex": "f(x)=\\lambda e^{-\\lambda x},\\qquad x\\ge0"
   },
   {
    "label": {
     "sr": "Normalna (Gausova) raspodela",
     "en": "Normal (Gaussian) distribution",
     "de": "Normalverteilung (Gauß)",
     "fr": "Loi normale (gaussienne)",
     "es": "Distribución normal (gaussiana)",
     "it": "Distribuzione normale (gaussiana)",
     "ru": "Нормальное (гауссово) распределение",
     "pt": "Distribuição normal (gaussiana)"
    },
    "tex": "f(x)=\\frac{1}{\\sigma\\sqrt{2\\pi}}\\,e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}"
   }
  ]
 },
 {
  "n": 7,
  "title": {
   "sr": "Brojne karakteristike",
   "en": "Numerical characteristics",
   "de": "Kenngrößen",
   "fr": "Caractéristiques numériques",
   "es": "Características numéricas",
   "it": "Caratteristiche numeriche",
   "ru": "Числовые характеристики",
   "pt": "Características numéricas"
  },
  "formule": [
   {
    "label": {
     "sr": "Očekivanje (diskretno)",
     "en": "Expected value (discrete)",
     "de": "Erwartungswert (diskret)",
     "fr": "Espérance (discrète)",
     "es": "Esperanza (discreta)",
     "it": "Valore atteso (discreto)",
     "ru": "Математическое ожидание (дискретное)",
     "pt": "Valor esperado (discreto)"
    },
    "tex": "E(X)=\\sum_i x_i\\,p_i"
   },
   {
    "label": {
     "sr": "Očekivanje (neprekidno)",
     "en": "Expected value (continuous)",
     "de": "Erwartungswert (stetig)",
     "fr": "Espérance (continue)",
     "es": "Esperanza (continua)",
     "it": "Valore atteso (continuo)",
     "ru": "Математическое ожидание (непрерывное)",
     "pt": "Valor esperado (contínuo)"
    },
    "tex": "E(X)=\\int_{-\\infty}^{\\infty} x\\,f(x)\\,dx"
   },
   {
    "label": {
     "sr": "Disperzija",
     "en": "Variance",
     "de": "Varianz",
     "fr": "Variance",
     "es": "Varianza",
     "it": "Varianza",
     "ru": "Дисперсия",
     "pt": "Variância"
    },
    "tex": "D(X)=E(X^2)-\\big(E(X)\\big)^2"
   },
   {
    "label": {
     "sr": "Standardna devijacija",
     "en": "Standard deviation",
     "de": "Standardabweichung",
     "fr": "Écart-type",
     "es": "Desviación estándar",
     "it": "Deviazione standard",
     "ru": "Среднеквадратичное отклонение",
     "pt": "Desvio padrão"
    },
    "tex": "\\sigma=\\sqrt{D(X)}"
   }
  ]
 },
 {
  "n": 8,
  "title": {
   "sr": "Granične teoreme",
   "en": "Limit theorems",
   "de": "Grenzwertsätze",
   "fr": "Théorèmes limites",
   "es": "Teoremas límite",
   "it": "Teoremi limite",
   "ru": "Предельные теоремы",
   "pt": "Teoremas limite"
  },
  "formule": [
   {
    "label": {
     "sr": "Čebišovljeva nejednakost",
     "en": "Chebyshev's inequality",
     "de": "Tschebyschow-Ungleichung",
     "fr": "Inégalité de Tchebychev",
     "es": "Desigualdad de Chebyshov",
     "it": "Disuguaglianza di Čebyšev",
     "ru": "Неравенство Чебышёва",
     "pt": "Desigualdade de Chebyshev"
    },
    "tex": "P\\big(|X-E(X)|\\ge\\varepsilon\\big)\\le\\frac{D(X)}{\\varepsilon^{2}}"
   },
   {
    "label": {
     "sr": "Zakon velikih brojeva",
     "en": "Law of large numbers",
     "de": "Gesetz der großen Zahlen",
     "fr": "Loi des grands nombres",
     "es": "Ley de los grandes números",
     "it": "Legge dei grandi numeri",
     "ru": "Закон больших чисел",
     "pt": "Lei dos grandes números"
    },
    "tex": "\\overline{X}_n=\\frac{1}{n}\\sum_{i=1}^{n}X_i\\ \\longrightarrow\\ E(X)"
   },
   {
    "label": {
     "sr": "Centralna granična teorema",
     "en": "Central limit theorem",
     "de": "Zentraler Grenzwertsatz",
     "fr": "Théorème central limite",
     "es": "Teorema central del límite",
     "it": "Teorema del limite centrale",
     "ru": "Центральная предельная теорема",
     "pt": "Teorema do limite central"
    },
    "tex": "\\frac{\\sum X_i-n\\mu}{\\sigma\\sqrt{n}}\\ \\longrightarrow\\ \\mathcal{N}(0,1)"
   }
  ]
 },
 {
  "n": 9,
  "title": {
   "sr": "Slučajni procesi i Markovljevi lanci",
   "en": "Stochastic processes and Markov chains",
   "de": "Stochastische Prozesse und Markow-Ketten",
   "fr": "Processus aléatoires et chaînes de Markov",
   "es": "Procesos estocásticos y cadenas de Markov",
   "it": "Processi stocastici e catene di Markov",
   "ru": "Случайные процессы и цепи Маркова",
   "pt": "Processos estocásticos e cadeias de Markov"
  },
  "formule": [
   {
    "label": {
     "sr": "Markovljevo svojstvo",
     "en": "Markov property",
     "de": "Markow-Eigenschaft",
     "fr": "Propriété de Markov",
     "es": "Propiedad de Markov",
     "it": "Proprietà di Markov",
     "ru": "Марковское свойство",
     "pt": "Propriedade de Markov"
    },
    "tex": "P(X_{n+1}=j\\mid X_n=i,\\dots)=P(X_{n+1}=j\\mid X_n=i)"
   },
   {
    "label": {
     "sr": "Matrica prelaza",
     "en": "Transition matrix",
     "de": "Übergangsmatrix",
     "fr": "Matrice de transition",
     "es": "Matriz de transición",
     "it": "Matrice di transizione",
     "ru": "Матрица переходов",
     "pt": "Matriz de transição"
    },
    "tex": "p_{ij}=P(X_{n+1}=j\\mid X_n=i),\\qquad \\sum_j p_{ij}=1"
   },
   {
    "label": {
     "sr": "Čapmen–Kolmogorovljeva jednačina",
     "en": "Chapman–Kolmogorov equation",
     "de": "Chapman–Kolmogorow-Gleichung",
     "fr": "Équation de Chapman–Kolmogorov",
     "es": "Ecuación de Chapman–Kolmogórov",
     "it": "Equazione di Chapman–Kolmogorov",
     "ru": "Уравнение Чепмена–Колмогорова",
     "pt": "Equação de Chapman–Kolmogorov"
    },
    "tex": "P^{(n)}=P^{\\,n}"
   }
  ]
 }
] };
