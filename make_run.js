const {build}=require('./make_landing_generic.js');
const OLDTT=["Merni sistem i rezolucija","Operacioni pojačavač","Integrator i diferencijator","Realni operacioni pojačavač","Komparator i Šmit-triger","Senzori i diode","Tranzistori","Oscilatori"];
const OLDTD=["Senzor → A/D, LSB.","Idealni OPA, zlatna pravila.","RC, granična frekvencija.","Ofset, izlazna struja, GBW.","Histerezis, pull-up.","TCR, termistor, dioda.","BJT, MOSFET, pojačavač.","Barkhausen, Vinov most."];
const SUF={sr:' — sigurno do <span class="gold-underline">položenog ispita</span>',en:' — confidently to a <span class="gold-underline">passed exam</span>',de:' — sicher zur <span class="gold-underline">bestandenen Prüfung</span>',fr:' — sereinement vers <span class="gold-underline">l\'examen réussi</span>',es:' — con seguridad hasta <span class="gold-underline">aprobar el examen</span>',it:' — con sicurezza all\'<span class="gold-underline">esame superato</span>',ru:' — уверенно до <span class="gold-underline">сданного экзамена</span>',pt:' — com confiança até ao <span class="gold-underline">exame aprovado</span>'};
const LL=['sr','en','de','fr','es','it','ru','pt'];
const H1=g=>{const o={};for(const L of LL)o[L]=g[L]+SUF[L];return o;};
function T(sr,en,de,fr,es,it,ru,pt){return {sr,en,de,fr,es,it,ru,pt};}

const VER={
 out:'predmet-verovatnoca.html', mode:'fax-verovatnoca', wave:'bell', glyphs:['P(A)','μ','σ'],
 title:'Verovatnoća i statistika',
 book:{skripta:'Verovatnoca-Skripta.html',formule:'Verovatnoca-Formule.html'},
 eyb:T('Fakultet · Verovatnoća','University · Probability','Universität · Wahrscheinlichkeit','Université · Probabilités','Universidad · Probabilidad','Università · Probabilità','Университет · Теория вероятностей','Universidade · Probabilidades'),
 gname:T('Verovatnoća i statistika','Probability and statistics','Wahrscheinlichkeit und Statistik','Probabilités et statistiques','Probabilidad y estadística','Probabilità e statistica','Теория вероятностей и статистика','Probabilidade e estatística'),
 _oldtt:OLDTT,_oldtd:OLDTD,
 tt:[
  T('Algebra događaja i aksiome','Event algebra and axioms','Ereignisalgebra und Axiome','Algèbre des événements et axiomes','Álgebra de sucesos y axiomas','Algebra degli eventi e assiomi','Алгебра событий и аксиомы','Álgebra de eventos e axiomas'),
  T('Uslovna verovatnoća','Conditional probability','Bedingte Wahrscheinlichkeit','Probabilité conditionnelle','Probabilidad condicional','Probabilità condizionata','Условная вероятность','Probabilidade condicional'),
  T('Totalna verovatnoća i Bajes','Total probability and Bayes','Totale Wahrscheinlichkeit und Bayes','Probabilité totale et Bayes','Probabilidad total y Bayes','Probabilità totale e Bayes','Полная вероятность и Байес','Probabilidade total e Bayes'),
  T('Slučajne promenljive','Random variables','Zufallsvariablen','Variables aléatoires','Variables aleatorias','Variabili aleatorie','Случайные величины','Variáveis aleatórias'),
  T('Diskretne raspodele','Discrete distributions','Diskrete Verteilungen','Lois discrètes','Distribuciones discretas','Distribuzioni discrete','Дискретные распределения','Distribuições discretas'),
  T('Neprekidne raspodele','Continuous distributions','Stetige Verteilungen','Lois continues','Distribuciones continuas','Distribuzioni continue','Непрерывные распределения','Distribuições contínuas'),
  T('Brojne karakteristike','Numerical characteristics','Kennzahlen','Caractéristiques numériques','Características numéricas','Caratteristiche numeriche','Числовые характеристики','Características numéricas'),
  T('Granične teoreme','Limit theorems','Grenzwertsätze','Théorèmes limites','Teoremas límite','Teoremi limite','Предельные теоремы','Teoremas limite'),
 ],
 td:[
  T('Kolmogorov, klasična, geometrijska.','Kolmogorov, classical, geometric.','Kolmogorow, klassisch, geometrisch.','Kolmogorov, classique, géométrique.','Kolmogórov, clásica, geométrica.','Kolmogorov, classica, geometrica.','Колмогоров, классическая, геометрическая.','Kolmogorov, clássica, geométrica.'),
  T('Pravilo množenja, nezavisnost.','Multiplication rule, independence.','Multiplikationsregel, Unabhängigkeit.','Règle du produit, indépendance.','Regla del producto, independencia.','Regola del prodotto, indipendenza.','Правило умножения, независимость.','Regra do produto, independência.'),
  T('Potpun sistem hipoteza.','Complete system of hypotheses.','Vollständiges Hypothesensystem.','Système complet d\'hypothèses.','Sistema completo de hipótesis.','Sistema completo di ipotesi.','Полная группа гипотез.','Sistema completo de hipóteses.'),
  T('Funkcija raspodele, gustina.','Distribution function, density.','Verteilungsfunktion, Dichte.','Fonction de répartition, densité.','Función de distribución, densidad.','Funzione di ripartizione, densità.','Функция распределения, плотность.','Função de distribuição, densidade.'),
  T('Binomna, Poasonova, geometrijska.','Binomial, Poisson, geometric.','Binomial, Poisson, geometrisch.','Binomiale, Poisson, géométrique.','Binomial, Poisson, geométrica.','Binomiale, Poisson, geometrica.','Биномиальное, Пуассона, геометрическое.','Binomial, Poisson, geométrica.'),
  T('Uniformna, eksponencijalna, normalna.','Uniform, exponential, normal.','Gleich-, Exponential-, Normalverteilung.','Uniforme, exponentielle, normale.','Uniforme, exponencial, normal.','Uniforme, esponenziale, normale.','Равномерное, экспоненциальное, нормальное.','Uniforme, exponencial, normal.'),
  T('Očekivanje, disperzija, korelacija.','Expectation, variance, correlation.','Erwartungswert, Varianz, Korrelation.','Espérance, variance, corrélation.','Esperanza, varianza, correlación.','Valore atteso, varianza, correlazione.','Математическое ожидание, дисперсия, корреляция.','Esperança, variância, correlação.'),
  T('Zakon velikih brojeva, CGT.','Law of large numbers, CLT.','Gesetz der großen Zahlen, ZGS.','Loi des grands nombres, TCL.','Ley de los grandes números, TCL.','Legge dei grandi numeri, TLC.','Закон больших чисел, ЦПТ.','Lei dos grandes números, TLC.'),
  T('Zakon velikih brojeva, CGT.','Law of large numbers, CLT.','Gesetz der großen Zahlen, ZGS.','Loi des grands nombres, TCL.','Ley de los grandes números, TCL.','Legge dei grandi numeri, TLC.','Закон больших чисел, ЦПТ.','Lei dos grandes números, TLC.'),
 ],
};
VER.h1=H1(VER.gname);
// ispravi td (imao sam 8; treci od pozadi je za tt6) -> popuni tacno
VER.td[6]=T('Očekivanje, disperzija, korelacija.','Expectation, variance, correlation.','Erwartungswert, Varianz, Korrelation.','Espérance, variance, corrélation.','Esperanza, varianza, correlación.','Valore atteso, varianza, correlazione.','Математическое ожидание, дисперсия, корреляция.','Esperança, variância, correlação.');
VER.td[7]=T('Zakon velikih brojeva, CGT.','Law of large numbers, CLT.','Gesetz der großen Zahlen, ZGS.','Loi des grands nombres, TCL.','Ley de los grandes números, TCL.','Legge dei grandi numeri, TLC.','Закон больших чисел, ЦПТ.','Lei dos grandes números, TLC.');

const KOLA={
 out:'predmet-elektricna-kola.html', mode:'fax-kola', wave:'rc', glyphs:['V','I','Z'],
 title:'Teorija električnih kola',
 book:{skripta:'Elektricna-Kola-Skripta.html',formule:'Elektricna-Kola-Formule.html'},
 eyb:T('Fakultet · Električna kola','University · Electric circuits','Universität · Elektrische Schaltungen','Université · Circuits électriques','Universidad · Circuitos eléctricos','Università · Circuiti elettrici','Университет · Электрические цепи','Universidade · Circuitos elétricos'),
 gname:T('Teorija električnih kola','Theory of electric circuits','Theorie elektrischer Schaltungen','Théorie des circuits électriques','Teoría de circuitos eléctricos','Teoria dei circuiti elettrici','Теория электрических цепей','Teoria de circuitos elétricos'),
 _oldtt:OLDTT,_oldtd:OLDTD,
 tt:[
  T('Kirhofovi zakoni','Kirchhoff\'s laws','Kirchhoffsche Gesetze','Lois de Kirchhoff','Leyes de Kirchhoff','Leggi di Kirchhoff','Законы Кирхгофа','Leis de Kirchhoff'),
  T('Metode analize','Analysis methods','Analyseverfahren','Méthodes d\'analyse','Métodos de análisis','Metodi di analisi','Методы анализа','Métodos de análise'),
  T('Tevenen i Norton','Thévenin and Norton','Thévenin und Norton','Thévenin et Norton','Thévenin y Norton','Thévenin e Norton','Тевенен и Нортон','Thévenin e Norton'),
  T('Superpozicija','Superposition','Überlagerung','Superposition','Superposición','Sovrapposizione','Суперпозиция','Sobreposição'),
  T('Prelazni procesi','Transients','Ausgleichsvorgänge','Régimes transitoires','Transitorios','Transitori','Переходные процессы','Transitórios'),
  T('Naizmenična struja','AC analysis','Wechselstrom','Courant alternatif','Corriente alterna','Corrente alternata','Переменный ток','Corrente alternada'),
  T('Rezonanca','Resonance','Resonanz','Résonance','Resonancia','Risonanza','Резонанс','Ressonância'),
  T('Snaga','Power','Leistung','Puissance','Potencia','Potenza','Мощность','Potência'),
 ],
 td:[
  T('Naponi i struje u kolu.','Voltages and currents.','Spannungen und Ströme.','Tensions et courants.','Tensiones y corrientes.','Tensioni e correnti.','Напряжения и токи.','Tensões e correntes.'),
  T('Čvorni naponi, konturne struje.','Node voltages, mesh currents.','Knotenspannungen, Maschenströme.','Tensions de nœuds, courants de mailles.','Tensiones de nodo, corrientes de malla.','Tensioni di nodo, correnti di maglia.','Узловые напряжения, контурные токи.','Tensões de nó, correntes de malha.'),
  T('Ekvivalentni izvori.','Equivalent sources.','Ersatzquellen.','Sources équivalentes.','Fuentes equivalentes.','Sorgenti equivalenti.','Эквивалентные источники.','Fontes equivalentes.'),
  T('Doprinosi izvora.','Source contributions.','Quellenbeiträge.','Contributions des sources.','Aportes de las fuentes.','Contributi delle sorgenti.','Вклады источников.','Contribuições das fontes.'),
  T('RC i RL kola.','RC and RL circuits.','RC- und RL-Schaltungen.','Circuits RC et RL.','Circuitos RC y RL.','Circuiti RC e RL.','RC- и RL-цепи.','Circuitos RC e RL.'),
  T('Fazori, impedansa.','Phasors, impedance.','Zeiger, Impedanz.','Phaseurs, impédance.','Fasores, impedancia.','Fasori, impedenza.','Векторы, импеданс.','Fasores, impedância.'),
  T('Serijska i paralelna.','Series and parallel.','Reihe und parallel.','Série et parallèle.','Serie y paralelo.','Serie e parallelo.','Последовательный и параллельный.','Série e paralelo.'),
  T('Aktivna, reaktivna, prividna.','Active, reactive, apparent.','Wirk-, Blind-, Scheinleistung.','Active, réactive, apparente.','Activa, reactiva, aparente.','Attiva, reattiva, apparente.','Активная, реактивная, полная.','Ativa, reativa, aparente.'),
 ],
};
KOLA.h1=H1(KOLA.gname);

build(VER); build(KOLA);
