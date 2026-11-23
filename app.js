/**
 * ALLIGATOR - Plataforma Educativa de Jhon Jairo Chávez
 * Design System: General Intelligence Company (Literary Paper Aesthetic)
 * Teléfono WhatsApp: +593996375490
 * 
 * Funcionalidades clave:
 * 1. Pantalla de inicio ultra limpia: Solo dos puertas principales (Cotizador y Portal Alumnos).
 * 2. Cotizador guiado por pasos (1 -> 2 -> 3) con validación visual clara y envío a WhatsApp.
 * 3. Portal de alumnos con lista dinámica que se recarga siempre que se sale del portal.
 * 4. Perfil interactivo con puntaje oficial de la prueba diagnóstica y feedback pedagógico.
 * 5. Placement Test con temporizador de 20 minutos que actualiza el puntaje del alumno al completarse.
 * 6. Lightbox para diapositivas de clase y visor de recursos descargables.
 */

// =============================================================================
// ESTADO GLOBAL Y CONFIGURACIÓN
// =============================================================================
const TEACHER_PHONE = '593996375490';
const TEACHER_NAME = 'Jhon Jairo Chávez';
const TOTAL_TEST_TIME = 20 * 60; // 20 minutos

const defaultStudentProfiles = {
  patricia: {
    id: 'patricia',
    name: 'Patricia V.',
    initials: 'PV',
    level: 'B1 Intermedio (Cambridge PET)',
    levelCode: 'B1',
    hours: '24 hrs',
    streak: '🔥 5 sem',
    isPetCandidate: true,
    hasSimulator: true,
    hasTopics: true,
    examInfo: {
      title: 'Examen Cambridge PET B1 (Preliminary)',
      dateLabel: 'Sábado, 12 de Diciembre, 2026',
      targetIso: '2026-12-12T09:00:00-05:00'
    },
    weeklySchedule: [
      { day: 'Lunes', short: 'L', time: '6:00 – 8:00 PM' },
      { day: 'Martes', short: 'M', time: '7:00 – 9:00 AM' },
      { day: 'Miércoles', short: 'X', time: '5:00 – 7:00 PM' },
      { day: 'Jueves', short: 'J', time: '7:00 – 9:00 PM' },
      { day: 'Viernes', short: 'V', time: '7:00 – 9:00 AM' }
    ],
    diagnostic: {
      score: '5 / 6',
      percent: '83.3%',
      levelTitle: 'Nivel Asignado: B1 Intermedio (Candidata PET B1)',
      grammar: '4 de 4 (100%)',
      grammarPct: '100%',
      reading: '1 de 2 (50%)',
      readingPct: '50%',
      feedback: 'Observación del Prof. Jhon Jairo: Excelente preparación para el examen oficial Cambridge PET B1 del 12 de diciembre. Sigue reforzando los 6 temas clave y practicando con el simulador.'
    },
    resources: [
      {
        title: 'Cambridge PET Practice Test (Oxford Complete Test 1)',
        type: 'PDF',
        cat: 'docs',
        size: '2.4 MB',
        desc: 'Examen modelo oficial completo de Reading y Writing con hojas de respuestas.'
      },
      {
        title: 'Guía de 6 Temas Clave B1: Comparatives, Conditionals & Passive',
        type: 'PDF',
        cat: 'docs',
        size: '1.8 MB',
        desc: 'Compendio detallado de reglas gramaticales y transformaciones para el examen.'
      },
      {
        title: 'Drill de Pronunciación: Verbos en Pasado (-ed /t/, /d/, /ɪd/)',
        type: 'MP3',
        cat: 'audio',
        size: '6.5 MB',
        desc: 'Entrenamiento auditivo con 60 verbos regulares clasificados por sonido.'
      },
      {
        title: 'Plantilla de Writing PET: Email a Josh y Story (100 palabras)',
        type: 'DOCX',
        cat: 'docs',
        size: '1.2 MB',
        desc: 'Estructuras modelo y conectores formales para obtener calificación Band 5.'
      }
    ]
  },
  camilo: {
    id: 'camilo',
    name: 'Camilo Rodríguez',
    initials: 'CR',
    level: 'B1 Intermedio (Cambridge PET)',
    levelCode: 'B1',
    hours: '18 hrs',
    streak: '🔥 4 sem',
    hasSimulator: false,
    hasTopics: false,
    examInfo: null,
    weeklySchedule: [
      { day: 'Martes', short: 'M', time: '6:30 – 8:00 PM' },
      { day: 'Jueves', short: 'J', time: '6:30 – 8:00 PM' }
    ],
    diagnostic: {
      score: '5 / 6',
      percent: '83.3%',
      levelTitle: 'Nivel Asignado: B1 Intermedio',
      grammar: '4 de 4 (100%)',
      grammarPct: '100%',
      reading: '1 de 2 (50%)',
      readingPct: '50%',
      feedback: 'Observación del Prof. Jhon Jairo: Excelente estructuración de oraciones compuestas. Próximo paso: ampliar léxico formal para entrevistas laborales.'
    },
    resources: [
      {
        title: 'Guía Cambridge PET: Phrasal Verbs & Collocations',
        type: 'PDF',
        cat: 'docs',
        size: '2.4 MB',
        desc: '80 verbos frasales explicados con ejemplos y ejercicios de examen.'
      },
      {
        title: 'Audio Podcast: Job Interviews & Professional Small Talk',
        type: 'MP3',
        cat: 'audio',
        size: '8.1 MB',
        desc: 'Simulación de 12 minutos de entrevista laboral en inglés británico.'
      },
      {
        title: 'Checklist de Speaking: Fluidez y Pronunciación B1',
        type: 'PDF',
        cat: 'docs',
        size: '1.2 MB',
        desc: 'Criterios de evaluación Cambridge y conectores de conversación.'
      }
    ]
  },
  sofia: {
    id: 'sofia',
    name: 'Sofía Mendoza',
    initials: 'SM',
    level: 'A2 Elemental (Speaking & Viajes)',
    levelCode: 'A2',
    hours: '12 hrs',
    streak: '🔥 2 sem',
    hasSimulator: false,
    hasTopics: false,
    examInfo: null,
    weeklySchedule: [
      { day: 'Lunes', short: 'L', time: '10:00 – 11:30 AM' },
      { day: 'Miércoles', short: 'X', time: '10:00 – 11:30 AM' }
    ],
    diagnostic: {
      score: '4 / 6',
      percent: '66.7%',
      levelTitle: 'Nivel Asignado: A2 Elemental',
      grammar: '3 de 4 (75%)',
      grammarPct: '75%',
      reading: '1 de 2 (50%)',
      readingPct: '50%',
      feedback: 'Observación del Prof. Jhon Jairo: Buen avance en presente simple. Reforzar el uso de preposiciones de lugar y verbos irregulares comunes.'
    },
    resources: [
      {
        title: 'Cheat Sheet: Past Simple vs Present Perfect con Ejemplos',
        type: 'PDF',
        cat: 'docs',
        size: '1.1 MB',
        desc: 'Reglas y palabras clave (since, for, already, yet, just).'
      },
      {
        title: 'Audio Listening: Airport Check-in & Hotel Booking',
        type: 'MP3',
        cat: 'audio',
        size: '5.6 MB',
        desc: 'Diálogos claros con transcripción completa para entrenar el oído.'
      },
      {
        title: 'Flashcards de Vocabulario: Viajes, Direcciones y Comida',
        type: 'PDF',
        cat: 'docs',
        size: '1.8 MB',
        desc: 'Tarjetas imprimibles de vocabulario situacional cotidiano.'
      }
    ]
  },
  mateo: {
    id: 'mateo',
    name: 'Mateo Salazar',
    initials: 'MS',
    level: 'B2+ Avanzado (Academic Writing & IELTS)',
    levelCode: 'B2+',
    hours: '26 hrs',
    streak: '🔥 6 sem',
    hasSimulator: false,
    hasTopics: false,
    examInfo: null,
    weeklySchedule: [
      { day: 'Sábado', short: 'S', time: '4:00 – 6:00 PM' }
    ],
    diagnostic: {
      score: '6 / 6',
      percent: '100%',
      levelTitle: 'Nivel Asignado: B2+ Avanzado',
      grammar: '4 de 4 (100%)',
      grammarPct: '100%',
      reading: '2 de 2 (100%)',
      readingPct: '100%',
      feedback: 'Observación del Prof. Jhon Jairo: Dominio impecable en gramática y estilo formal. Preparado para simulacros de banda 7.5+ en IELTS.'
    },
    resources: [
      {
        title: 'Guía Avanzada: Conectores Lógicos y Cohesión para Ensayos',
        type: 'PDF',
        cat: 'docs',
        size: '1.5 MB',
        desc: 'Transiciones formales para ensayos argumentativos universitarios.'
      },
      {
        title: 'Simulación Audio: IELTS Speaking Part 3 - Abstract Questions',
        type: 'MP3',
        cat: 'audio',
        size: '9.4 MB',
        desc: 'Preguntas analíticas y estrategias de respuesta para banda 7+.'
      },
      {
        title: 'Plantilla Editable Word/LaTeX para Ensayos Académicos APA',
        type: 'DOCX',
        cat: 'docs',
        size: '2.0 MB',
        desc: 'Formato preconfigurado según Normas APA 7.ª edición oficial.'
      }
    ]
  }
};

let studentProfiles = JSON.parse(JSON.stringify(defaultStudentProfiles));
let selectedStudentKey = 'patricia';
let activeStudent = null;
let targetExamTimestamp = 0;
let wizardFiles = [];
let lastWizardQuote = null;
let remainingTestSeconds = TOTAL_TEST_TIME;
let testInterval = null;
let countdownInterval = null;
let toastTimer = null;

const testAnswersKey = {
  q1: 'B', q2: 'A', q3: 'C', q4: 'A', q5: 'B', q6: 'A'
};

// =============================================================================
// COMPENDIO DE LOS 6 TEMAS CLAVE VISTOS CON EL PROF. JHON JAIRO
// =============================================================================
const petGrammarTopics = [
  {
    id: 'comparatives',
    title: '1. Comparativos y Superlativos (Comparatives & Superlatives)',
    icon: '📊',
    summary: 'Estructuras para contrastar cualidades entre 2 elementos o destacar el grado extremo en un grupo.',
    usage: 'En el examen Cambridge PET B1, los comparativos son evaluados tanto en Reading Part 5 como en Writing Part 1 (Sentence Transformations con "as... as" y "more than").',
    rules: [
      '<strong>1 sílaba:</strong> Añade <em>-er / -est</em> (fast → faster → the fastest). Si termina en consonante-vocal-consonante, duplica la consonante (big → bigger → the biggest).',
      '<strong>2 sílabas terminadas en -y:</strong> Cambia a <em>-ier / -iest</em> (friendly → friendlier → the friendliest, easy → easier → the easiest).',
      '<strong>2 o más sílabas:</strong> Usa <em>more / most</em> (expensive → more expensive → the most expensive, difficult → more difficult).',
      '<strong>Irregulares clave:</strong> good → better → the best | bad → worse → the worst | far → further/farther → the furthest | little → less → the least.',
      '<strong>Estructura de igualdad:</strong> <em>as + adjetivo + as</em> ("Patricia is as dedicated as her tutor"). Negativa: <em>not as + adj + as</em> ("The cinema is not as cheap as the museum").',
      '<strong>Modificadores de grado:</strong> <em>much better, far more interesting, slightly taller, a bit slower</em>.'
    ],
    examples: [
      'Travelling by train is <strong>more comfortable than</strong> taking the bus.',
      'Mount Everest is <strong>the highest</strong> mountain in the world.',
      'I prefer classical music to rock → I like classical music <strong>more than</strong> rock.',
      'My laptop is <strong>not as fast as</strong> yours.'
    ],
    examTip: '💡 <strong>Tip PET Part 1:</strong> Cuando la oración original usa "prefer X to Y", la transformación casi siempre requiere "like X more than Y".'
  },
  {
    id: 'conditionals',
    title: '2. Condicionales (Zero, First, Second & Unless)',
    icon: '🔀',
    summary: 'Oraciones que expresan condiciones reales, probabilidades futuras e hipótesis imaginarias.',
    usage: 'Aparecen frecuentemente en Writing Part 1 y en las lecturas de Reading Part 3 y 4. Dominar "unless" (= if not) es vital.',
    rules: [
      '<strong>Zero Conditional (Hechos y verdades):</strong> <em>If/When + Present Simple, Present Simple</em>. Ejemplo: "If you heat ice, it melts."',
      '<strong>First Conditional (Futuro probable y real):</strong> <em>If + Present Simple, will/won\'t + Verbo base</em>. Ejemplo: "If Patricia studies every day, she will pass the Cambridge PET."',
      '<strong>Uso de "Unless" (= If not):</strong> Expresa "a menos que" o "si no". "Unless you practise, you won\'t learn" = "If you don\'t practise, you won\'t learn".',
      '<strong>Second Conditional (Hipotético o irreal en presente/futuro):</strong> <em>If + Past Simple, would/could + Verbo base</em>. Ejemplo: "If I had more free time, I would travel to Tasmania."',
      '<strong>Uso especial de "were":</strong> Con el verbo to be se recomienda usar <em>were</em> para todas las personas: "If I were you, I would take the mock exam."'
    ],
    examples: [
      'If it rains tomorrow, we <strong>will stay</strong> at home.',
      'You can’t enter the room <strong>unless</strong> you have a ticket.',
      'If I won the competition, I <strong>would buy</strong> a new laptop.',
      'Unless you leave now, you <strong>will miss</strong> the train.'
    ],
    examTip: '💡 <strong>Tip PET Part 1:</strong> Si la oración dice "You can only go if you are a student", la transformación equivalente suele ser "You can\'t go unless you are a student".'
  },
  {
    id: 'passive',
    title: '3. Voz Pasiva (Passive Voice)',
    icon: '🔄',
    summary: 'Estructura en la que el objeto de la acción pasa a ser el sujeto de la oración.',
    usage: 'Crucial para Writing Part 1 (transformar oraciones de activa a pasiva o viceversa) y textos formales en Reading.',
    rules: [
      '<strong>Fórmula universal:</strong> <em>Sujeto + Verbo TO BE (en el tiempo de la oración activa) + Verbo principal en Participio Pasado (V3) (+ by + Agente)</em>.',
      '<strong>Present Simple:</strong> <em>am / is / are + V3</em>. Ejemplo: "They speak English here" → "English is spoken here."',
      '<strong>Past Simple:</strong> <em>was / were + V3</em>. Ejemplo: "Oxford printed the test" → "The test was printed by Oxford."',
      '<strong>Present Perfect:</strong> <em>has / have been + V3</em>. Ejemplo: "Patricia has written the card" → "The card has been written by Patricia."',
      '<strong>Modales (can, must, should):</strong> <em>modal + be + V3</em>. Ejemplo: "Students must wear uniform" → "Uniform must be worn by students."'
    ],
    examples: [
      'A talented teacher taught my sister the violin → My sister <strong>was taught</strong> the violin by a talented teacher.',
      'The famous bridge <strong>was built</strong> in 1932.',
      'Over 2000 km of tracks <strong>are located</strong> in Tasmania.',
      'Cell phones <strong>must not be used</strong> during the exam.'
    ],
    examTip: '💡 <strong>Tip PET Part 1:</strong> Verifica siempre si el sujeto pasivo es singular o plural para elegir correctamente entre "was" y "were".'
  },
  {
    id: 'relative-clauses',
    title: '4. Relative Clauses (Oraciones de Relativo)',
    icon: '🔗',
    summary: 'Conectan ideas y añaden información sobre personas, cosas, lugares o posesiones.',
    usage: 'Fundamentales para enriquecer las oraciones en Writing Part 2 y 3, demostrando variedad sintáctica para calificar en Band 5.',
    rules: [
      '<strong>Who:</strong> Para personas ("The girl <em>who</em> is taking the PET exam is Patricia").',
      '<strong>Which:</strong> Para cosas, conceptos o animales ("The book <em>which</em> we use has practice tests").',
      '<strong>That:</strong> Puede sustituir a who o which únicamente en Defining Clauses ("The teacher <em>that</em> guides me").',
      '<strong>Where:</strong> Para lugares ("Tasmania is a place <em>where</em> people enjoy nature").',
      '<strong>Whose:</strong> Para indicar posesión ("The student <em>whose</em> essay scored highest").',
      '<strong>Defining vs Non-defining:</strong> Las defining dan información esencial y NO llevan comas. Las non-defining son información extra, SIEMPRE van entre comas y NUNCA usan <em>that</em> ("Cambridge PET, which is taken internationally, tests B1 English").'
    ],
    examples: [
      'The tutor <strong>who</strong> teaches me is Jhon Jairo.',
      'I lost the notes <strong>which</strong> I took yesterday.',
      'The island <strong>where</strong> we stayed had beautiful beaches.',
      'The student <strong>whose</strong> test is on December 12 is well prepared.'
    ],
    examTip: '💡 <strong>Tip PET Writing:</strong> En lugar de escribir dos oraciones cortas ("I have a friend. He lives in London."), únelas con relativo: "I have a friend who lives in London."'
  },
  {
    id: 'pronunciation-ed',
    title: '5. Pronunciación de Verbos en Pasado (-ed Endings)',
    icon: '🗣️',
    summary: 'Reglas para pronunciar con precisión los 3 sonidos del sufijo -ed: /t/, /d/ y /ɪd/.',
    usage: 'Clave para el Speaking Test de Cambridge PET. Pronunciar una sílaba extra donde no corresponde resta puntos de inteligibilidad.',
    rules: [
      '<strong>Sonido /t/ (Sordo):</strong> Cuando el verbo termina en consonante sorda (sin vibración en cuerdas vocales): <em>/p, k, f, s, ʃ (sh), tʃ (ch), θ/</em>. La "e" es muda. Ejemplos: helped /helpt/, cooked /kʊkt/, watched /wɒtʃt/, laughed /lɑːft/, practised /ˈpræktɪst/.',
      '<strong>Sonido /d/ (Sonoro):</strong> Cuando el verbo termina en consonante sonora (con vibración) o sonido vocálico: <em>/b, g, v, z, m, n, l, r, dʒ/ + vocales</em>. La "e" es muda. Ejemplos: played /pleɪd/, cleaned /kliːnd/, lived /lɪvd/, opened /ˈoʊpənd/, ordered /ˈɔːrdərd/.',
      '<strong>Sonido /ɪd/ (Agrega una sílaba extra):</strong> ÚNICAMENTE cuando la raíz del verbo termina en sonido <em>/t/ o /d/</em>. Ejemplos: wanted /ˈwɒn.tɪd/, needed /ˈniː.dɪd/, decided /dɪˈsaɪ.dɪd/, invited /ɪnˈvaɪ.tɪd/, visited /ˈvɪz.ɪ.tɪd/.'
    ],
    examples: [
      'I /wɒtʃt/ (watched) TV yesterday. [Sonido /t/]',
      'She /pleɪd/ (played) the violin. [Sonido /d/]',
      'He /dɪˈsaɪ.dɪd/ (decided) to travel to London. [Sonido /ɪd/ - 3 sílabas]'
    ],
    audioDrill: [
      { word: 'helped', sound: '/t/', type: 'voiceless' },
      { word: 'watched', sound: '/t/', type: 'voiceless' },
      { word: 'practised', sound: '/t/', type: 'voiceless' },
      { word: 'played', sound: '/d/', type: 'voiced' },
      { word: 'lived', sound: '/d/', type: 'voiced' },
      { word: 'cleaned', sound: '/d/', type: 'voiced' },
      { word: 'wanted', sound: '/ɪd/', type: 'extra-syllable' },
      { word: 'decided', sound: '/ɪd/', type: 'extra-syllable' },
      { word: 'invited', sound: '/ɪd/', type: 'extra-syllable' }
    ],
    examTip: '💡 <strong>Regla de oro de Jhon Jairo:</strong> Nunca pronuncies "ed" como una sílaba separada a menos que la última letra que escuches sea T o D.'
  },
  {
    id: 'connectors',
    title: '6. El Uso de Conectores en Inglés (Linking Words for PET B1)',
    icon: '🧩',
    summary: 'Palabras y frases de enlace para estructurar ideas con fluidez y coherencia lógica.',
    usage: 'Imprescindibles para obtener la máxima puntuación en el criterio de "Organisation" de Writing Part 2 y Part 3.',
    rules: [
      '<strong>Adición (Adding):</strong> <em>and, also, as well as, in addition, furthermore, what is more</em>. "Patricia studies grammar and she also practises listening."',
      '<strong>Contraste (Contrasting):</strong><br>• <em>but:</em> conecta ideas en la misma oración.<br>• <em>however:</em> al inicio de oración con coma obligatoria ("I studied hard. However, the questions were tricky.").<br>• <em>although / even though:</em> seguidos de Sujeto + Verbo ("Although it was cold, we swam in the lake").<br>• <em>despite / in spite of:</em> seguidos de sustantivo o gerundio ("Despite the cold weather, we went hiking").',
      '<strong>Causa y Razón (Giving reasons):</strong> <em>because, since, as, due to (+ sustantivo)</em>. "She passed because she prepared daily."',
      '<strong>Efecto y Resultado (Expressing results):</strong> <em>so, therefore, as a result</em>. "The tickets were expensive, so we didn\'t go."',
      '<strong>Secuenciadores temporales para historias:</strong> <em>first of all, at first, then, after that, suddenly, meanwhile, in the end, finally</em>. Cruciales para la historia de Writing Part 3.'
    ],
    examples: [
      '<strong>Although</strong> I was tired, I finished my English assignment.',
      'The weather was terrible. <strong>However</strong>, we had a fantastic weekend.',
      '<strong>In spite of</strong> the noise, she managed to concentrate on the reading test.',
      '<strong>Suddenly</strong>, I woke up in the middle of the night.'
    ],
    examTip: '💡 <strong>Tip PET Writing:</strong> En la carta a Josh (Part 2), usa conectores como "First of all, thank you for...", "I especially enjoyed... because...", "Also, would you like to stay with me?".'
  }
];

// Cargar perfiles almacenados en localStorage preservando solo puntaje diagnóstico actualizado
function loadStoredStudentProfiles() {
  try {
    const saved = localStorage.getItem('alligator_student_profiles');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.keys(defaultStudentProfiles).forEach(k => {
        studentProfiles[k] = JSON.parse(JSON.stringify(defaultStudentProfiles[k]));
        if (parsed && parsed[k]) {
          if (parsed[k].diagnostic && typeof parsed[k].diagnostic === 'object' && parsed[k].diagnostic.score) {
            studentProfiles[k].diagnostic = parsed[k].diagnostic;
          }
          if (parsed[k].levelCode) {
            studentProfiles[k].levelCode = parsed[k].levelCode;
          }
        }
      });
    }
  } catch (err) {
    console.warn('Usando perfiles predeterminados:', err);
    studentProfiles = JSON.parse(JSON.stringify(defaultStudentProfiles));
  }
}

function saveStudentProfiles() {
  try {
    localStorage.setItem('alligator_student_profiles', JSON.stringify(studentProfiles));
  } catch (err) {
    console.error('Error al guardar perfiles:', err);
  }
}

// =============================================================================
// ENRUTADOR DE VISTAS (SPA)
// =============================================================================
function getAllViews() {
  return {
    'hub': document.getElementById('view-hub'),
    'academic': document.getElementById('view-academic'),
    'english': document.getElementById('view-english'),
    'video-demo': document.getElementById('view-video-demo'),
    'placement-test': document.getElementById('view-placement-test'),
    'teacher': document.getElementById('view-teacher'),
    'faq': document.getElementById('view-faq')
  };
}

function switchView(viewName, pushHash = true) {
  const views = getAllViews();
  if (!views[viewName]) {
    viewName = 'hub';
  }

  // Activar la vista seleccionada y ocultar las demás
  Object.keys(views).forEach(k => {
    if (views[k]) {
      views[k].classList.toggle('active', k === viewName);
    }
  });

  // Actualizar botones de navegación superior y drawers
  const navBtns = document.querySelectorAll('.nav-pill-btn, .nav-seg-item, .mobile-drawer-btn, .mobile-tab-item');
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target-view') === viewName);
  });

  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileNavToggle && mobileDrawer) {
    mobileNavToggle.classList.remove('open');
    mobileDrawer.classList.remove('open');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (pushHash) {
    window.location.hash = viewName;
  }

  // Comportamientos específicos por vista
  if (viewName === 'placement-test') {
    startPlacementTest();
  }

  // "Que cada vez que salga del portal de alumnos vuelva a cargar nuevamente los nombres"
  if (viewName === 'english') {
    if (!activeStudent) {
      showStudentPickerScreen();
    }
  } else {
    // Al salir de la sección de inglés, resetear el alumno activo para que la próxima entrada recargue la lista
    activeStudent = null;
  }
}

// =============================================================================
// PORTAL DE ESTUDIANTES: SELECCIÓN DINÁMICA & DASHBOARD INTERACTIVO
// =============================================================================
function renderStudentPickerList() {
  const container = document.getElementById('studentPickerList');
  if (!container) return;

  container.innerHTML = Object.keys(studentProfiles).map(key => {
    const s = studentProfiles[key];
    const isSelected = key === selectedStudentKey;
    const avatarBg = s.id === 'patricia' ? 'background-color:#003865;' : s.id === 'sofia' ? 'background-color:var(--color-cerulean);' : s.id === 'mateo' ? 'background-color:var(--color-amber);' : 'background-color:var(--color-alligator-green);';
    const examBadge = s.examInfo ? `<span class="badge badge-amber" style="font-size:0.7rem; padding:2px 8px; font-weight:700;">🎯 Examen 12 Dic</span>` : '';

    return `
      <div class="student-choice ${isSelected ? 'selected' : ''}" data-student-id="${s.id}" style="user-select:none; ${s.id === 'patricia' ? 'border-color:var(--color-alligator-green);' : ''}">
        <div style="display:flex; align-items:center; gap:14px;">
          <div class="student-avatar" style="${avatarBg}">
            ${s.initials}
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <h4 style="margin:0; font-size:1.08rem; color:var(--color-ink);">${s.name}</h4>
              ${examBadge}
            </div>
            <span style="font-size:0.83rem; color:var(--color-muted);">${s.level}</span>
          </div>
        </div>
        <button type="button" class="btn ${isSelected ? 'btn-alligator' : 'btn-outline'} btn-sm btn-open-student-action" data-student-id="${s.id}">
          ${isSelected ? 'Entrar ahora →' : 'Elegir'}
        </button>
      </div>
    `;
  }).join('');

  // Eventos de selección y acceso directo
  container.querySelectorAll('.student-choice').forEach(card => {
    card.addEventListener('click', (e) => {
      const studentId = card.getAttribute('data-student-id');
      selectedStudentKey = studentId;

      container.querySelectorAll('.student-choice').forEach(c => {
        c.classList.remove('selected');
        const b = c.querySelector('.btn-open-student-action');
        if (b) {
          b.className = 'btn btn-outline btn-sm btn-open-student-action';
          b.textContent = 'Elegir';
        }
      });

      card.classList.add('selected');
      const actionBtn = card.querySelector('.btn-open-student-action');
      if (actionBtn) {
        actionBtn.className = 'btn btn-alligator btn-sm btn-open-student-action';
        actionBtn.textContent = 'Entrar ahora →';
      }

      const mainEnterBtn = document.getElementById('btnEnterStudentPortal');
      if (mainEnterBtn && studentProfiles[studentId]) {
        mainEnterBtn.innerHTML = `<span>Entrar al Perfil de ${studentProfiles[studentId].name} →</span>`;
      }

      // Si se hizo clic en el botón de acción de la tarjeta, abrir directamente
      if (e.target.closest('.btn-open-student-action')) {
        loadStudentDashboard(studentId);
      }
    });
  });
}

function showStudentPickerScreen() {
  activeStudent = null;
  targetExamTimestamp = 0;
  const dashScreen = document.getElementById('studentDashboardScreen');
  const loginScreen = document.getElementById('portalLoginScreen');

  if (dashScreen) {
    dashScreen.classList.remove('active');
    dashScreen.style.display = 'none';
  }
  if (loginScreen) {
    loginScreen.style.display = 'block';
    renderStudentPickerList();
  }
}

function loadStudentDashboard(studentId) {
  activeStudent = studentProfiles[studentId] || defaultStudentProfiles[studentId] || defaultStudentProfiles['patricia'];
  if (!activeStudent) return;

  // 1. Encabezado limpio (solo el nombre de la estudiante)
  const dashAvatar = document.getElementById('dashAvatar');
  const dashStudentName = document.getElementById('dashStudentName');
  const dashStudentMeta = document.getElementById('dashStudentMeta');

  if (dashAvatar) dashAvatar.textContent = activeStudent.initials;
  if (dashStudentName) dashStudentName.textContent = activeStudent.name;
  if (dashStudentMeta) dashStudentMeta.textContent = `${activeStudent.level} • Tutor: ${TEACHER_NAME}`;

  // 2. Fecha de prueba y cuenta regresiva (solo si el estudiante tiene examen asignado)
  const examCard = document.getElementById('examCountdownCard');
  const examDatePill = document.getElementById('examDatePill');
  const examTitleText = document.getElementById('examTitleText');

  if (activeStudent.examInfo && activeStudent.examInfo.targetIso) {
    targetExamTimestamp = new Date(activeStudent.examInfo.targetIso).getTime();
    if (examDatePill) examDatePill.textContent = `📅 Día de la Prueba: ${activeStudent.examInfo.dateLabel}`;
    if (examTitleText) examTitleText.textContent = activeStudent.examInfo.title;
    if (examCard) examCard.style.display = 'flex';
  } else {
    targetExamTimestamp = 0;
    if (examCard) examCard.style.display = 'none';
  }

  // 3. Botón aparte del Simulador
  const simCard = document.getElementById('simulatorActionCard');
  if (simCard) {
    simCard.style.display = activeStudent.hasSimulator ? 'flex' : 'none';
  }

  // 4. Horario semanal de clases (sin link de Google Meet)
  renderWeeklySchedule(activeStudent.weeklySchedule || []);

  // 5. Temas Clave (tarjetas limpias que abren el popup al hacer clic)
  const keyTopicsSection = document.getElementById('keyTopicsSection');
  if (activeStudent.hasTopics) {
    if (keyTopicsSection) keyTopicsSection.style.display = 'block';
    renderKeyTopicsCards();
  } else {
    if (keyTopicsSection) keyTopicsSection.style.display = 'none';
  }

  // 6. Métricas de stats
  const dashStatLevel = document.getElementById('dashStatLevel');
  const dashStatScore = document.getElementById('dashStatScore');
  const dashStatHours = document.getElementById('dashStatHours');
  const dashStatStreak = document.getElementById('dashStatStreak');

  const diag = activeStudent.diagnostic || defaultStudentProfiles.camilo.diagnostic;

  if (dashStatLevel) dashStatLevel.textContent = activeStudent.levelCode || 'B1';
  if (dashStatScore) dashStatScore.textContent = diag.score || '5 / 6';
  if (dashStatHours) dashStatHours.textContent = activeStudent.hours || '18 hrs';
  if (dashStatStreak) dashStatStreak.textContent = activeStudent.streak || '🔥 4 sem';

  // 7. Tarjeta de puntaje oficial de la prueba diagnóstica
  const dashScoreCircle = document.getElementById('dashScoreCircle');
  const dashLevelTitle = document.getElementById('dashLevelTitle');
  const dashGrammarScore = document.getElementById('dashGrammarScore');
  const dashGrammarBar = document.getElementById('dashGrammarBar');
  const dashReadingScore = document.getElementById('dashReadingScore');
  const dashReadingBar = document.getElementById('dashReadingBar');
  const dashTeacherFeedback = document.getElementById('dashTeacherFeedback');

  if (dashScoreCircle) {
    dashScoreCircle.innerHTML = `
      <span>${diag.score || '5/6'}</span>
      <span class="sub">${diag.percent || '83%'}</span>
    `;
  }
  if (dashLevelTitle) dashLevelTitle.textContent = diag.levelTitle || 'Nivel Asignado: B1';
  if (dashGrammarScore) dashGrammarScore.textContent = diag.grammar || '4 de 4 (100%)';
  if (dashGrammarBar) dashGrammarBar.style.width = diag.grammarPct || '100%';
  if (dashReadingScore) dashReadingScore.textContent = diag.reading || '1 de 2 (50%)';
  if (dashReadingBar) dashReadingBar.style.width = diag.readingPct || '50%';
  if (dashTeacherFeedback) dashTeacherFeedback.textContent = `"${diag.feedback || 'Evaluado por el tutor.'}"`;

  // 8. Recursos didácticos
  renderStudentResources('all');

  // Mostrar el Dashboard y ocultar la pantalla de selección
  const loginScreen = document.getElementById('portalLoginScreen');
  const dashScreen = document.getElementById('studentDashboardScreen');

  if (loginScreen) loginScreen.style.display = 'none';
  if (dashScreen) {
    dashScreen.style.display = 'block';
    dashScreen.classList.add('active');
  }

  updateCountdown();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderWeeklySchedule(scheduleList) {
  const grid = document.getElementById('dashScheduleGrid');
  if (!grid) return;

  if (!scheduleList || scheduleList.length === 0) {
    grid.innerHTML = `<div style="font-size:0.85rem; color:var(--color-muted);">Horario por coordinar con tu tutor.</div>`;
    return;
  }

  grid.innerHTML = scheduleList.map(slot => `
    <div class="schedule-day-item">
      <div class="schedule-day-name">${slot.day}</div>
      <div class="schedule-day-time">${slot.time}</div>
    </div>
  `).join('');
}

function renderStudentResources(catFilter = 'all') {
  const listContainer = document.getElementById('dashResourcesList');
  const slidesGrid = document.getElementById('slidesGridInteractive');

  if (slidesGrid) {
    slidesGrid.style.display = (catFilter === 'audio' || catFilter === 'docs') ? 'none' : 'grid';
  }

  if (!listContainer || !activeStudent) return;

  let filtered = activeStudent.resources || [];
  if (catFilter !== 'all') {
    filtered = filtered.filter(r => r.cat === catFilter);
  }

  if (filtered.length === 0) {
    listContainer.innerHTML = `<div style="font-size:0.85rem; color:var(--color-muted); padding:10px;">No hay recursos en esta categoría para este estudiante.</div>`;
    return;
  }

  listContainer.innerHTML = filtered.map(res => `
    <div class="file-tag">
      <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
        <span class="badge ${res.type === 'MP3' ? 'badge-amber' : 'badge-green'}" style="font-size:0.72rem;">${res.type}</span>
        <div style="overflow:hidden;">
          <div style="font-weight:600; font-size:0.88rem; color:var(--color-ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${res.title}
          </div>
          <div style="font-size:0.75rem; color:var(--color-muted);">
            ${res.desc} (${res.size})
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-outline btn-sm btn-download-resource" data-title="${res.title}">
        <span>Descargar</span>
      </button>
    </div>
  `).join('');

  listContainer.querySelectorAll('.btn-download-resource').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      showToast(`📥 Descargando: ${title}`);
    });
  });
}

function updateCountdown() {
  if (!targetExamTimestamp) return;

  const now = Date.now();
  let diff = targetExamTimestamp - now;
  if (diff <= 0) diff = 0;

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const examCdDays = document.getElementById('examCdDays');
  const examCdHours = document.getElementById('examCdHours');
  const examCdMins = document.getElementById('examCdMins');
  const examCdSecs = document.getElementById('examCdSecs');

  if (examCdDays) examCdDays.textContent = String(days).padStart(2, '0');
  if (examCdHours) examCdHours.textContent = String(hours).padStart(2, '0');
  if (examCdMins) examCdMins.textContent = String(minutes).padStart(2, '0');
  if (examCdSecs) examCdSecs.textContent = String(seconds).padStart(2, '0');
}

// =============================================================================
// MÓDULO TEMAS CLAVE (TARJETAS LIMPIAS -> POPUP INTERACTIVO AL HACER CLIC)
// =============================================================================
const topicCardLabels = {
  'comparatives': { name: 'Comparativos y Superlativos', sub: 'Reglas, irregulares y as... as' },
  'conditionals': { name: 'Condicionales', sub: 'Zero, First, Second y Unless' },
  'passive': { name: 'Voz Pasiva', sub: 'Presente, pasado y transformaciones' },
  'relative-clauses': { name: 'Relative Clauses', sub: 'Who, which, that, where, whose' },
  'pronunciation-ed': { name: 'Pronunciación en Pasado (-ed)', sub: 'Sonidos /t/, /d/ y /ɪd/ con audio' },
  'connectors': { name: 'Conectores en Inglés', sub: 'Adición, contraste, causa y secuencia' }
};

function renderKeyTopicsCards() {
  const grid = document.getElementById('keyTopicsGrid');
  if (!grid) return;

  grid.innerHTML = petGrammarTopics.map(topic => {
    const meta = topicCardLabels[topic.id] || { name: topic.title, sub: topic.summary };
    return `
      <button type="button" class="key-topic-card" onclick="openPetTopicsModal('${topic.id}')">
        <div class="key-topic-left">
          <div class="key-topic-icon">${topic.icon}</div>
          <div>
            <div class="key-topic-title">${meta.name}</div>
            <div class="key-topic-sub">${meta.sub}</div>
          </div>
        </div>
        <span class="key-topic-arrow">→</span>
      </button>
    `;
  }).join('');
}

let selectedPronunciationAccent = 'us'; // 'us' (American English) o 'uk' (British English)
let currentPronounceAudio = null;

function setPronunciationAccent(accent) {
  selectedPronunciationAccent = accent === 'uk' ? 'uk' : 'us';
  document.querySelectorAll('.accent-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-accent') === selectedPronunciationAccent);
  });
  const label = selectedPronunciationAccent === 'uk' ? '🇬🇧 British English (UK)' : '🇺🇸 American English (US)';
  showToast(`Acento activo: ${label}`);
}

function buildGrammarTopicCardHtml(topic) {
  const rulesList = topic.rules.map(r => `<li>${r}</li>`).join('');
  const examplesList = topic.examples.map(ex => `<div class="grammar-example-pill">✓ ${ex}</div>`).join('');

  let audioDrillHtml = '';
  if (topic.audioDrill) {
    const usActive = selectedPronunciationAccent === 'us' ? 'active' : '';
    const ukActive = selectedPronunciationAccent === 'uk' ? 'active' : '';
    audioDrillHtml = `
      <div style="margin-top: 14px; background: #ffffff; padding: 14px; border-radius: var(--radius-sm); border: 1px dashed var(--color-alligator-green);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
          <div style="font-weight: 700; font-size: 0.85rem; color: var(--color-alligator-deep);">
            🔊 Laboratorio de Pronunciación en Inglés (Haz clic en cada verbo):
          </div>
          <div class="accent-selector-bar" role="group" aria-label="Accent selector">
            <button type="button" class="accent-pill-btn ${usActive}" data-accent="us" onclick="setPronunciationAccent('us')">🇺🇸 American (US)</button>
            <button type="button" class="accent-pill-btn ${ukActive}" data-accent="uk" onclick="setPronunciationAccent('uk')">🇬🇧 British (UK)</button>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${topic.audioDrill.map(item => `
            <button type="button" class="pronounce-btn" onclick="pronounceWord('${item.word}')">
              <span>🔊</span> <strong>${item.word}</strong> <span style="font-size:0.75rem; color:var(--color-muted);">[${item.sound}]</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="grammar-card" style="box-shadow: none; border-color: var(--color-mist);">
      <div class="grammar-card-header" style="cursor: default;">
        <h3><span>${topic.icon}</span> ${topic.title}</h3>
      </div>
      <p style="font-size: 0.88rem; color: var(--color-muted); margin-bottom: 8px;">${topic.summary}</p>
      <div class="grammar-rule-box">
        <div style="font-weight: 700; margin-bottom: 4px; color: var(--color-alligator-deep);">📘 Reglas y Estructura:</div>
        <ul style="padding-left: 1.25rem; font-size: 0.86rem; line-height: 1.6;">
          ${rulesList}
        </ul>
      </div>
      <div style="margin-top: 10px;">
        <div style="font-weight: 700; font-size: 0.84rem; color: var(--color-ink); margin-bottom: 4px;">✍️ Ejemplos Modelo:</div>
        <div style="display: flex; flex-wrap: wrap;">
          ${examplesList}
        </div>
      </div>
      ${audioDrillHtml}
      <div class="exam-tip-alert">${topic.examTip}</div>
    </div>
  `;
}

function renderTopicInModal(topicId) {
  const switcher = document.getElementById('topicModalSwitcher');
  const modalContainer = document.getElementById('modalGrammarTopicsList');
  const headerTitle = document.getElementById('modalTopicHeaderTitle');

  const selectedTopic = petGrammarTopics.find(t => t.id === topicId) || petGrammarTopics[0];
  if (!selectedTopic) return;

  const meta = topicCardLabels[selectedTopic.id] || { name: selectedTopic.title };
  if (headerTitle) {
    headerTitle.textContent = `${selectedTopic.icon} ${meta.name}`;
  }

  if (switcher) {
    switcher.innerHTML = petGrammarTopics.map(t => {
      const m = topicCardLabels[t.id] || { name: t.title };
      const activeCls = t.id === selectedTopic.id ? 'active' : '';
      return `<button type="button" class="topic-switch-pill ${activeCls}" onclick="renderTopicInModal('${t.id}')">${t.icon} ${m.name}</button>`;
    }).join('');
  }

  if (modalContainer) {
    modalContainer.innerHTML = buildGrammarTopicCardHtml(selectedTopic);
  }
}

function openPetTopicsModal(topicId = 'comparatives') {
  const modal = document.getElementById('petTopicsModal');
  if (modal) {
    renderTopicInModal(topicId);
    modal.classList.add('open');
  }
}

function closePetTopicsModal() {
  const modal = document.getElementById('petTopicsModal');
  if (modal) modal.classList.remove('open');
}

let selectedSimExamId = 'reading-1';

const simExamCatalog = {
  'reading-1': {
    label: 'Reading 1 (Cambridge Test 1)',
    duration: '45 minutos',
    skill: 'Reading Paper — 6 Partes (36 preguntas)',
    items: [
      '<strong>Part 1 (Q1–5):</strong> Signs and short texts (3-option multiple choice)',
      '<strong>Part 2 (Q6–10):</strong> Match 5 people to 8 texts (Short Art Courses)',
      '<strong>Part 3 (Q21–25):</strong> Long text &amp; multiple-choice questions (One to watch!)',
      '<strong>Part 4 (Q16–20):</strong> Gapped text — choose the correct sentence (A–H)',
      '<strong>Part 5 (Q26–35):</strong> Multiple-choice cloze (New Home – New School)',
      '<strong>Part 6 (Gaps 1–6):</strong> Open cloze — write one word in each gap'
    ]
  },
  'reading-2': {
    label: 'Reading 2 (Cambridge Test 2)',
    duration: '45 minutos',
    skill: 'Reading Paper — 6 Partes (36 preguntas)',
    items: [
      '<strong>Part 1 (Q1–5):</strong> Signs and short texts (3-option multiple choice)',
      '<strong>Part 2 (Q6–10):</strong> Match 5 people to 8 texts (Swimming Clubs)',
      '<strong>Part 3 (Q21–25):</strong> Long text &amp; multiple-choice questions (Cycling in the countryside)',
      '<strong>Part 4 (Q16–20):</strong> Gapped text — choose the correct sentence (A–H)',
      '<strong>Part 5 (Q26–35):</strong> Multiple-choice cloze (Making honey)',
      '<strong>Part 6 (Gaps 1–6):</strong> Open cloze — write one word in each gap'
    ]
  },
  'writing-1': {
    label: 'Writing 1 (Cambridge Test 1)',
    duration: '45 minutos',
    skill: 'Writing Paper — 3 Partes Independientes',
    items: [
      '<strong>Part 1 (Q1–5):</strong> Sentence transformations about the game Jotto (auto-calificable, máx. 3 palabras)',
      '<strong>Part 2 (Q6):</strong> Short email to Emma about birthday money and a music CD (35–45 palabras)',
      '<strong>Part 3 (Q7 o Q8):</strong> Letter about eating out vs home OR Story "How I met my best friend" (~100 palabras, envío a WhatsApp)'
    ]
  },
  'writing-2': {
    label: 'Writing 2 (Cambridge Test 2)',
    duration: '45 minutos',
    skill: 'Writing Paper — 3 Partes Independientes',
    items: [
      '<strong>Part 1 (Q1–5):</strong> Sentence transformations about going camping (auto-calificable, máx. 3 palabras)',
      '<strong>Part 2 (Q6):</strong> Short email to Alex about Saturday’s party (35–45 palabras)',
      '<strong>Part 3 (Q7 o Q8):</strong> Letter about school subjects OR Story "I was really excited when I opened the letter" (~100 palabras, envío a WhatsApp)'
    ]
  },
  'writing-3': {
    label: 'Writing 3 (Oxford Practice Test)',
    duration: '45 minutos',
    skill: 'Writing Paper — 3 Partes Independientes',
    items: [
      '<strong>Part 1 (Q1–5):</strong> Sentence transformations about music (auto-calificable, máx. 3 palabras)',
      '<strong>Part 2 (Q6):</strong> Short card to Josh about the weekend (35–45 palabras)',
      '<strong>Part 3 (Q7 o Q8):</strong> Letter about activities you enjoy OR Story "I woke up in the middle of the night" (~100 palabras, envío a WhatsApp)'
    ]
  },
  'listening-1': {
    label: 'Listening 1 (Cambridge Test 1)',
    duration: '35 minutos',
    skill: 'Listening Paper — 4 Partes (25 preguntas)',
    items: [
      '<strong>Part 1 (Q1–7):</strong> Seven short recordings with 3-option picture multiple choice',
      '<strong>Part 2 (Q8–13):</strong> Interview with singer Nick Parker (3-option multiple choice)',
      '<strong>Part 3 (Q14–19):</strong> Gap-fill notes: Saturday course',
      '<strong>Part 4 (Q20–25):</strong> True / False (YES / NO) conversation: Thomas &amp; Ruby sports day poster',
      '<em>Incluye reproductor y cargador de archivo de audio MP3.</em>'
    ]
  },
  'listening-2': {
    label: 'Listening 2 (Cambridge Test 2)',
    duration: '35 minutos',
    skill: 'Listening Paper — 4 Partes (25 preguntas)',
    items: [
      '<strong>Part 1 (Q1–7):</strong> Seven short recordings with 3-option picture multiple choice',
      '<strong>Part 2 (Q8–13):</strong> Six 3-option multiple choice questions',
      '<strong>Part 3 (Q14–19):</strong> Gap-fill notes: Griffon the Horse',
      '<strong>Part 4 (Q20–25):</strong> True / False (YES / NO) conversation: Jamie &amp; Miranda sharing a bedroom',
      '<em>Incluye reproductor y cargador de archivo de audio MP3.</em>'
    ]
  },
  'speaking-1': {
    label: 'Speaking 1 (Cambridge Test 1)',
    duration: '12 minutos',
    skill: 'Speaking Paper — 4 Partes con Imágenes y Fotografías Oficiales',
    items: [
      '<strong>Part 1 (2–3 min):</strong> Personal questions &amp; spelling surname',
      '<strong>Part 2 (2–3 min):</strong> Visual Diagram <strong>1A</strong> — Goodbye present for a tennis club friend',
      '<strong>Part 3 (3 min):</strong> Colour Photographs <strong>1B &amp; 1C</strong> — People enjoying music (1 minuto por foto)',
      '<strong>Part 4 (3 min):</strong> General discussion about music preferences'
    ]
  },
  'speaking-2': {
    label: 'Speaking 2 (Cambridge Test 2)',
    duration: '12 minutos',
    skill: 'Speaking Paper — 4 Partes con Imágenes y Fotografías Oficiales',
    items: [
      '<strong>Part 1 (2–3 min):</strong> Personal questions &amp; daily routine',
      '<strong>Part 2 (2–3 min):</strong> Visual Diagram <strong>2A</strong> — Two-week trip to England',
      '<strong>Part 3 (3 min):</strong> Colour Photographs <strong>2B &amp; 2C</strong> — People having a snack (1 minuto por foto)',
      '<strong>Part 4 (3 min):</strong> General discussion about favourite snacks and where to eat them'
    ]
  }
};

function selectSimExamInModal(examId) {
  selectedSimExamId = simExamCatalog[examId] ? examId : 'reading-1';
  const info = simExamCatalog[selectedSimExamId];

  document.querySelectorAll('[data-sim-exam]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-sim-exam') === selectedSimExamId);
  });

  const box = document.getElementById('simModalNoticeBox');
  if (box && info) {
    box.innerHTML = `
      <div style="font-weight: 700; font-size: 0.96rem; margin-bottom: 6px; color: #1e3a8a;">
        📌 Prueba Seleccionada: ${info.label}
      </div>
      <div style="margin-bottom: 8px;">
        ⏱️ <strong>Duración oficial:</strong> ${info.duration} &bull; 🌐 <strong>Idioma:</strong> 100% en inglés &bull; 🖥️ <strong>Modalidad:</strong> Pestaña nueva a página completa
      </div>
      <div style="font-weight: 700; margin-bottom: 4px;">📋 Qué vas a dar en esta prueba (${info.skill}):</div>
      <ul style="margin: 0 0 0 18px; padding: 0;">
        ${info.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
    `;
  }

  const btnText = document.getElementById('btnConfirmLaunchText');
  if (btnText && info) {
    btnText.textContent = `Confirmar e Iniciar ${info.label.split(' (')[0]} (Pestaña Nueva) ↗`;
  }
}

function openSimulatorConfirmModal(examId = 'reading-1') {
  const modal = document.getElementById('simulatorConfirmModal');
  if (modal) {
    selectSimExamInModal(examId);
    modal.classList.add('open');
  }
}

function closeSimulatorConfirmModal() {
  const modal = document.getElementById('simulatorConfirmModal');
  if (modal) modal.classList.remove('open');
}

function confirmAndLaunchSimulator() {
  closeSimulatorConfirmModal();
  window.open(`pet-simulator.html?exam=${encodeURIComponent(selectedSimExamId)}`, '_blank', 'noopener');
}

function speakWithStrictEnglishVoice(word, accent) {
  if (!('speechSynthesis' in window)) return;
  const targetLang = accent === 'uk' ? 'en-GB' : 'en-US';
  const voices = window.speechSynthesis.getVoices() || [];

  // Buscar EXCLUSIVAMENTE una voz nativa en inglés (nunca permitir voz en español)
  let englishVoice =
    voices.find(v => v.lang && v.lang.toLowerCase() === targetLang.toLowerCase() && /google|natural|aria|jenny|libby|sonia|ryan|guy/i.test(v.name)) ||
    voices.find(v => v.lang && v.lang.toLowerCase() === targetLang.toLowerCase()) ||
    voices.find(v => v.lang && v.lang.toLowerCase().startsWith(targetLang.toLowerCase().slice(0, 5))) ||
    voices.find(v => v.lang && v.lang.toLowerCase().startsWith('en'));

  if (!englishVoice) {
    showToast('⚠️ Tu navegador no tiene voces de inglés locales; usa la reproducción de audio.');
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.voice = englishVoice;
  utterance.lang = englishVoice.lang || targetLang;
  utterance.rate = 0.88;
  window.speechSynthesis.speak(utterance);
}

function pronounceWord(word) {
  const accent = selectedPronunciationAccent === 'uk' ? 'uk' : 'us';
  const accentLabel = accent === 'uk' ? '🇬🇧 UK' : '🇺🇸 US';
  const cleanWord = String(word || '').trim().toLowerCase();
  const audioSrc = `assets/audio/${accent}/${cleanWord}.mp3`;

  if (currentPronounceAudio) {
    try {
      currentPronounceAudio.pause();
      currentPronounceAudio.currentTime = 0;
    } catch (e) {}
  }

  const audio = new Audio(audioSrc);
  currentPronounceAudio = audio;

  audio.play().then(() => {
    showToast(`🔊 ${accentLabel}: "${word}"`);
  }).catch(() => {
    // Fallback estricto a voz en inglés (nunca español)
    speakWithStrictEnglishVoice(word, accent);
    showToast(`🔊 ${accentLabel}: "${word}"`);
  });
}

// =============================================================================
// COTIZADOR ACADÉMICO GUIADO POR PASOS (WIZARD 1 -> 2 -> 3)
// =============================================================================
function goToWizardStep(stepNumber) {
  const p1 = document.getElementById('wizardPane1');
  const p2 = document.getElementById('wizardPane2');
  const p3 = document.getElementById('wizardPane3');

  const n1 = document.getElementById('nodeStep1');
  const n2 = document.getElementById('nodeStep2');
  const n3 = document.getElementById('nodeStep3');

  [p1, p2, p3].forEach(p => p && p.classList.remove('active'));
  [n1, n2, n3].forEach(n => n && n.classList.remove('active', 'completed'));

  if (stepNumber === 1) {
    if (p1) p1.classList.add('active');
    if (n1) n1.classList.add('active');
  } else if (stepNumber === 2) {
    if (p2) p2.classList.add('active');
    if (n1) n1.classList.add('completed');
    if (n2) n2.classList.add('active');
  } else if (stepNumber === 3) {
    if (p3) p3.classList.add('active');
    if (n1) n1.classList.add('completed');
    if (n2) n2.classList.add('completed');
    if (n3) n3.classList.add('active');
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function renderWizardFiles() {
  const list = document.getElementById('wizardUploadedList');
  if (!list) return;

  list.innerHTML = '';
  wizardFiles.forEach((file, index) => {
    const item = document.createElement('div');
    item.className = 'file-tag';
    item.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:0.75rem; font-weight:700; color:var(--color-alligator-green);">📄 ADJUNTO</span>
        <div>
          <div style="font-weight:600; font-size:0.85rem; color:var(--color-ink);">${file.name}</div>
          <div style="color:var(--color-muted); font-size:0.75rem;">${formatBytes(file.size)}</div>
        </div>
      </div>
      <button type="button" class="btn-remove-file" data-index="${index}" style="background:none; border:none; color:#dc2626; cursor:pointer; font-weight:bold; font-size:1.1rem;">✕</button>
    `;
    list.appendChild(item);
  });

  list.querySelectorAll('.btn-remove-file').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      wizardFiles.splice(idx, 1);
      renderWizardFiles();
    });
  });
}

function handleWizardFiles(files) {
  if (!files || files.length === 0) return;
  Array.from(files).forEach(file => {
    if (!wizardFiles.some(f => f.name === file.name)) {
      wizardFiles.push(file);
    }
  });
  renderWizardFiles();
}

// =============================================================================
// PLACEMENT TEST (PRUEBA DIAGNÓSTICA CON TEMPORIZADOR DE 20 MIN)
// =============================================================================
function startPlacementTest() {
  remainingTestSeconds = TOTAL_TEST_TIME;
  updateTestTimerUI();

  if (testInterval) clearInterval(testInterval);

  testInterval = setInterval(() => {
    remainingTestSeconds--;

    if (remainingTestSeconds <= 0) {
      clearInterval(testInterval);
      remainingTestSeconds = 0;
      updateTestTimerUI();
      alert('⏰ Los 20 minutos han finalizado. Evaluando tus respuestas...');
      submitPlacementTest();
      return;
    }

    updateTestTimerUI();
  }, 1000);

  document.querySelectorAll('#view-placement-test input[type="radio"]').forEach(r => r.checked = false);
  updateAnswerCounter();
}

function updateTestTimerUI() {
  const timerText = document.getElementById('testTimerText');
  const timerProgress = document.getElementById('testTimerProgress');

  const mins = Math.floor(remainingTestSeconds / 60);
  const secs = remainingTestSeconds % 60;

  if (timerText) {
    timerText.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  if (timerProgress) {
    const pct = (remainingTestSeconds / TOTAL_TEST_TIME) * 100;
    timerProgress.style.width = `${pct}%`;
  }
}

function updateAnswerCounter() {
  const answered = Object.keys(testAnswersKey).filter(q => {
    return document.querySelector(`input[name="${q}"]:checked`) !== null;
  }).length;

  const counter = document.getElementById('testQuestionsCounter');
  if (counter) {
    counter.innerHTML = `Respondidas: <strong>${answered} de 6</strong> preguntas`;
  }
}

function submitPlacementTest() {
  if (testInterval) clearInterval(testInterval);

  let grammarCorrect = 0;
  let readingCorrect = 0;

  ['q1', 'q2', 'q3', 'q4'].forEach(q => {
    const sel = document.querySelector(`input[name="${q}"]:checked`);
    if (sel && sel.value === testAnswersKey[q]) grammarCorrect++;
  });

  ['q5', 'q6'].forEach(q => {
    const sel = document.querySelector(`input[name="${q}"]:checked`);
    if (sel && sel.value === testAnswersKey[q]) readingCorrect++;
  });

  const totalCorrect = grammarCorrect + readingCorrect;
  const pct = Math.round((totalCorrect / 6) * 100);

  let levelCode = 'A2';
  let levelTitle = 'Nivel Asignado: A2 Elemental';
  let feedback = 'Observación del Prof. Jhon Jairo: Buen inicio. Recomendado trabajar estructuras gramaticales básicas y vocabulario.';

  if (totalCorrect >= 5) {
    levelCode = 'B2';
    levelTitle = 'Nivel Asignado: B2 Avanzado';
    feedback = 'Observación del Prof. Jhon Jairo: Excelente rendimiento. Dominio sólido de tiempos verbales complejos y comprensión analítica.';
  } else if (totalCorrect >= 3) {
    levelCode = 'B1';
    levelTitle = 'Nivel Asignado: B1 Intermedio';
    feedback = 'Observación del Prof. Jhon Jairo: Base gramatical adecuada. Recomendado reforzar lectura de inferencia y phrasal verbs.';
  }

  // Actualizar datos del estudiante
  const targetKey = activeStudent ? activeStudent.id : selectedStudentKey;
  if (studentProfiles[targetKey]) {
    studentProfiles[targetKey].diagnostic = {
      score: `${totalCorrect} / 6`,
      percent: `${pct}%`,
      levelTitle: levelTitle,
      grammar: `${grammarCorrect} de 4 (${Math.round((grammarCorrect/4)*100)}%)`,
      grammarPct: `${Math.round((grammarCorrect/4)*100)}%`,
      reading: `${readingCorrect} de 2 (${Math.round((readingCorrect/2)*100)}%)`,
      readingPct: `${Math.round((readingCorrect/2)*100)}%`,
      feedback: feedback
    };
    studentProfiles[targetKey].levelCode = levelCode;
    saveStudentProfiles();
  }

  alert(`🎉 ¡Evaluación diagnóstica completada!\n\nTu puntaje (${totalCorrect}/6 - ${pct}%) ha sido registrado y actualizado en tu perfil de estudiante.`);

  switchView('english');
  loadStudentDashboard(targetKey);
}

// =============================================================================
// TOAST NOTICES
// =============================================================================
function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// =============================================================================
// EXPOSICIÓN GLOBAL PARA PREVENIR ERRORES Y PERMITIR ACCESO DIRECTO
// =============================================================================
window.switchView = switchView;
window.loadStudentDashboard = loadStudentDashboard;
window.showStudentPickerScreen = showStudentPickerScreen;
window.goToWizardStep = goToWizardStep;
window.showToast = showToast;
window.startPlacementTest = startPlacementTest;
window.submitPlacementTest = submitPlacementTest;
window.renderKeyTopicsCards = renderKeyTopicsCards;
window.renderTopicInModal = renderTopicInModal;
window.setPronunciationAccent = setPronunciationAccent;
window.pronounceWord = pronounceWord;
window.openPetTopicsModal = openPetTopicsModal;
window.closePetTopicsModal = closePetTopicsModal;
window.openSimulatorConfirmModal = openSimulatorConfirmModal;
window.closeSimulatorConfirmModal = closeSimulatorConfirmModal;
window.selectSimExamInModal = selectSimExamInModal;
window.confirmAndLaunchSimulator = confirmAndLaunchSimulator;

// =============================================================================
// INICIALIZACIÓN COMPLETA DE EVENTOS
// =============================================================================
function initApp() {
  loadStoredStudentProfiles();

  // Fecha mínima del datepicker (hoy)
  const deadlineInput = document.getElementById('wizardDeadlineDate');
  if (deadlineInput) {
    deadlineInput.min = new Date().toISOString().split('T')[0];
  }

  // 1. Delegación global de clics para cualquier elemento con data-target-view
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-target-view]');
    if (trigger) {
      e.preventDefault();
      const targetView = trigger.getAttribute('data-target-view');
      if (targetView) {
        switchView(targetView);
      }
    }
  });

  // 2. Soporte para navegación con hash
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    const views = getAllViews();
    if (hash && views[hash]) {
      switchView(hash, false);
    }
  });

  // 3. Menú móvil (hamburguesa)
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileNavToggle && mobileDrawer) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
    });
  }

  // 4. Botones de paso del Cotizador Académico
  const btnNextToStep2 = document.getElementById('btnNextToStep2');
  const btnBackToStep1 = document.getElementById('btnBackToStep1');
  const btnNextToStep3 = document.getElementById('btnNextToStep3');
  const btnBackToStep2 = document.getElementById('btnBackToStep2');

  const step1Error = document.getElementById('wizardStep1Error');
  const step2Error = document.getElementById('wizardStep2Error');
  const step3Error = document.getElementById('wizardStep3Error');

  if (btnNextToStep2) {
    btnNextToStep2.addEventListener('click', () => {
      const name = document.getElementById('wizardStudentName').value.trim();
      const phone = document.getElementById('wizardStudentPhone').value.trim();

      if (!name || !phone) {
        if (step1Error) {
          step1Error.style.display = 'block';
          step1Error.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          alert('Por favor ingresa tu nombre y número de WhatsApp para avanzar al Paso 2.');
        }
        return;
      }

      if (step1Error) step1Error.style.display = 'none';
      goToWizardStep(2);
    });
  }

  if (btnBackToStep1) {
    btnBackToStep1.addEventListener('click', () => goToWizardStep(1));
  }

  if (btnNextToStep3) {
    btnNextToStep3.addEventListener('click', () => {
      const deadline = document.getElementById('wizardDeadlineDate').value;

      if (!deadline) {
        if (step2Error) {
          step2Error.style.display = 'block';
          step2Error.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          alert('Por favor selecciona la fecha límite de entrega para avanzar al Paso 3.');
        }
        return;
      }

      if (step2Error) step2Error.style.display = 'none';
      goToWizardStep(3);
    });
  }

  if (btnBackToStep2) {
    btnBackToStep2.addEventListener('click', () => goToWizardStep(2));
  }

  // 5. Drag & Drop y selector de archivos
  const dropzone = document.getElementById('dropzoneWizard');
  const fileInput = document.getElementById('wizardFileInput');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    ['dragenter', 'dragover'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      handleWizardFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
      handleWizardFiles(e.target.files);
    });
  }

  // 6. Envío del Formulario de Cotización
  const wizardForm = document.getElementById('academicWizardForm');
  const quoteModal = document.getElementById('quoteModal');
  const quoteSummaryDetails = document.getElementById('quoteSummaryDetails');

  if (wizardForm) {
    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('wizardStudentName').value.trim();
      const phone = document.getElementById('wizardStudentPhone').value.trim();
      const type = document.getElementById('wizardTaskType').value;
      const level = document.getElementById('wizardAcademicLevel').value;
      const deadline = document.getElementById('wizardDeadlineDate').value;
      const instructions = document.getElementById('wizardTaskInstructions').value.trim();

      if (!instructions) {
        if (step3Error) {
          step3Error.style.display = 'block';
          step3Error.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          alert('Por favor describe las consignas o instrucciones del trabajo.');
        }
        return;
      }

      if (step3Error) step3Error.style.display = 'none';

      lastWizardQuote = {
        name, phone, type, level, deadline, instructions,
        files: wizardFiles.map(f => f.name),
        timestamp: new Date().toISOString()
      };

      try {
        const stored = JSON.parse(localStorage.getItem('alligator_quotes') || '[]');
        stored.push(lastWizardQuote);
        localStorage.setItem('alligator_quotes', JSON.stringify(stored));
      } catch (err) {
        console.error(err);
      }

      if (quoteSummaryDetails) {
        quoteSummaryDetails.innerHTML = `
          <div>👤 <strong>Estudiante:</strong> ${name}</div>
          <div>📱 <strong>WhatsApp:</strong> ${phone}</div>
          <div>📌 <strong>Tipo de trabajo:</strong> ${type.toUpperCase()} (${level})</div>
          <div>📅 <strong>Fecha límite:</strong> ${deadline}</div>
          <div>📎 <strong>Archivos:</strong> ${wizardFiles.length > 0 ? wizardFiles.map(f => f.name).join(', ') : 'Ninguno adjunto'}</div>
        `;
      }

      if (quoteModal) quoteModal.classList.add('open');

      wizardForm.reset();
      wizardFiles = [];
      renderWizardFiles();
      goToWizardStep(1);
    });
  }

  const btnCloseQuoteModal = document.getElementById('btnCloseQuoteModal');
  if (btnCloseQuoteModal && quoteModal) {
    btnCloseQuoteModal.addEventListener('click', () => quoteModal.classList.remove('open'));
  }

  const btnOpenWhatsAppDirect = document.getElementById('btnOpenWhatsAppDirect');
  if (btnOpenWhatsAppDirect) {
    btnOpenWhatsAppDirect.addEventListener('click', () => {
      if (!lastWizardQuote) return;
      const msg = `Hola profesor Jhon Jairo Chávez, acabo de solicitar una cotización académica en Alligator:\n\n*Nombre:* ${lastWizardQuote.name}\n*Tipo:* ${lastWizardQuote.type}\n*Nivel:* ${lastWizardQuote.level}\n*Fecha de entrega:* ${lastWizardQuote.deadline}\n*Instrucciones:* ${lastWizardQuote.instructions.substring(0, 160)}...\n*Archivos:* ${lastWizardQuote.files.join(', ') || 'Pendiente por adjuntar'}\n\nQuedo a la espera de su cotización formal.`;
      window.open(`https://wa.me/${TEACHER_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
      if (quoteModal) quoteModal.classList.remove('open');
    });
  }

  // 7. Botones del Portal de Estudiantes
  const btnEnterStudentPortal = document.getElementById('btnEnterStudentPortal');
  if (btnEnterStudentPortal) {
    btnEnterStudentPortal.addEventListener('click', (e) => {
      e.preventDefault();
      loadStudentDashboard(selectedStudentKey);
    });
  }

  // Botón "Salir / Cambiar Alumno"
  const btnLogoutStudent = document.getElementById('btnLogoutStudent');
  if (btnLogoutStudent) {
    btnLogoutStudent.addEventListener('click', (e) => {
      e.preventDefault();
      showStudentPickerScreen();
    });
  }

  // Filtros de categoría de materiales
  const materialTabsBar = document.getElementById('materialTabsBar');
  if (materialTabsBar) {
    materialTabsBar.querySelectorAll('.material-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        materialTabsBar.querySelectorAll('.material-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        renderStudentResources(cat);
      });
    });
  }

  // Lightbox de Diapositivas
  const slideLightboxModal = document.getElementById('slideLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const btnCloseLightbox = document.getElementById('btnCloseLightbox');

  document.addEventListener('click', (e) => {
    const zoomBtn = e.target.closest('.btn-zoom-slide');
    if (zoomBtn && slideLightboxModal && lightboxImg) {
      const src = zoomBtn.getAttribute('data-img');
      const title = zoomBtn.getAttribute('data-title');
      lightboxImg.src = src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      slideLightboxModal.classList.add('open');
    }
  });

  if (btnCloseLightbox && slideLightboxModal) {
    btnCloseLightbox.addEventListener('click', () => {
      slideLightboxModal.classList.remove('open');
    });
  }

  // Cerrar modal de Temas Clave y Aviso del Simulador al hacer clic fuera del cuadro
  const petTopicsModalEl = document.getElementById('petTopicsModal');
  if (petTopicsModalEl) {
    petTopicsModalEl.addEventListener('click', (e) => {
      if (e.target === petTopicsModalEl) {
        closePetTopicsModal();
      }
    });
  }

  const simConfirmModalEl = document.getElementById('simulatorConfirmModal');
  if (simConfirmModalEl) {
    simConfirmModalEl.addEventListener('click', (e) => {
      if (e.target === simConfirmModalEl) {
        closeSimulatorConfirmModal();
      }
    });
  }

  // Radio buttons del Placement Test
  document.querySelectorAll('#view-placement-test input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => updateAnswerCounter());
  });

  const btnSubmitTest = document.getElementById('btnSubmitTest');
  if (btnSubmitTest) {
    btnSubmitTest.addEventListener('click', () => {
      const answered = Object.keys(testAnswersKey).filter(q => {
        return document.querySelector(`input[name="${q}"]:checked`) !== null;
      }).length;

      if (answered < 6) {
        if (!confirm(`Has respondido ${answered} de 6 preguntas. ¿Deseas enviar el examen para registrar tu puntaje actual?`)) {
          return;
        }
      }
      submitPlacementTest();
    });
  }

  const btnExitTest = document.getElementById('btnExitTest');
  if (btnExitTest) {
    btnExitTest.addEventListener('click', () => {
      if (confirm('¿Deseas salir del test?')) {
        if (testInterval) clearInterval(testInterval);
        switchView('english');
      }
    });
  }

  // 8. FAQ Accordion
  document.querySelectorAll('.faq-row, .faq-item').forEach(item => {
    const questionBtn = item.querySelector('.faq-q-btn, .faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-row, .faq-item').forEach(o => o.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // 9. Cerrar modales con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const petTopicsModal = document.getElementById('petTopicsModal');
      const simulatorConfirmModal = document.getElementById('simulatorConfirmModal');
      [quoteModal, slideLightboxModal, petTopicsModal, simulatorConfirmModal].forEach(m => {
        if (m) m.classList.remove('open');
      });
    }
  });

  // Iniciar timer de cuenta regresiva
  if (!countdownInterval) {
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  // Renderizar la lista de estudiantes
  renderStudentPickerList();

  // Activar la vista inicial basada en el hash de la URL o ir a hub
  const initialHash = window.location.hash.replace('#', '');
  const views = getAllViews();
  if (initialHash && views[initialHash]) {
    switchView(initialHash, false);
  } else {
    switchView('hub', false);
  }
}

// Ejecutar inmediatamente si el DOM ya está listo, o escuchar DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
