/* NutritimCo · Datos del prototipo
   Catálogo de recomendaciones, fotografías con su crédito y datos de ejemplo.
   Todo el contenido es de muestra para un prototipo académico. */
window.NC = window.NC || {};

NC.CATS = {
  alimentacion: { name: "Alimentación", color: "#C2185B", tint: "#F3D3DF" },
  actividad: { name: "Actividad física", color: "#1E4B3A", tint: "#CFE0D4" },
  descanso: { name: "Descanso", color: "#3C4A7D", tint: "#D5D9EA" },
  bienestar: { name: "Bienestar", color: "#F2B705", tint: "#F8E7A8" },
};

/* Etiquetas de restricción que se usan en filtros y en el perfil */
NC.RESTR = {
  "sin-gluten": "Sin gluten",
  "sin-lactosa": "Sin lactosa",
  "bajo-sodio": "Bajo en sal (hipertensión)",
  "sin-azucar": "Sin azúcar añadida (diabetes)",
};

/* Objetivos del perfil y la categoría que priorizan */
NC.GOALS = {
  "comer-mejor": { label: "Comer mejor", cat: "alimentacion" },
  "dormir-mejor": { label: "Dormir mejor", cat: "descanso" },
  "moverme-mas": { label: "Moverme más", cat: "actividad" },
  "bajar-estres": { label: "Bajar el estrés", cat: "bienestar" },
};

/* Restricciones del perfil y la etiqueta que exigen en el catálogo */
NC.PROFILE_RESTR = {
  "sin-gluten": { label: "Sin gluten", tag: "sin-gluten" },
  "sin-lactosa": { label: "Sin lactosa", tag: "sin-lactosa" },
  hipertension: { label: "Hipertensión", tag: "bajo-sodio" },
  diabetes: { label: "Diabetes", tag: "sin-azucar" },
};

/* Fotografías reales. Cada una se verificó en su ficha de origen
   (autor y licencia). Unsplash: licencia Unsplash. Commons: la licencia indicada. */
NC.IMAGES = {
  mercado: {
    kind: "commons",
    file: "Market_in_Bogot%C3%A1.jpg",
    alt: "Puestos de frutas y verduras dentro de una plaza de mercado de Bogotá",
    caption: "Plaza de mercado en Bogotá",
    author: "Mussi Katz",
    page: "https://commons.wikimedia.org/wiki/File:Market_in_Bogot%C3%A1.jpg",
    license: "CC0 1.0 (dominio público)",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.es",
    source: "Wikimedia Commons",
  },
  ajiaco: {
    kind: "commons",
    file: "Ajiaco.jpg",
    alt: "Plato de ajiaco con mazorca, papa y pollo desmechado",
    caption: "Ajiaco",
    author: "Mauricio Giraldo",
    page: "https://commons.wikimedia.org/wiki/File:Ajiaco.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/deed.es",
    source: "Wikimedia Commons",
  },
  lulo: {
    kind: "commons",
    file: "Lulo.jpg",
    alt: "Dos lulos, uno de ellos partido por la mitad",
    caption: "Lulos, uno partido por la mitad",
    author: "Fibonacci",
    page: "https://commons.wikimedia.org/wiki/File:Lulo.jpg",
    license: "GNU Free Documentation License (GFDL)",
    licenseUrl: "https://www.gnu.org/licenses/fdl-1.3.html",
    source: "Wikimedia Commons",
  },
  arepas: {
    kind: "unsplash",
    id: "photo-1587603366933-aa6947174c65",
    alt: "Arepas asadas con queso sobre una bandeja oscura",
    caption: "Arepas",
    author: "Leila Issa",
    page: "https://unsplash.com/photos/white-and-brown-pastry-on-black-tray-4C_k18o_tnk",
  },
  caminata: {
    kind: "unsplash",
    id: "photo-1496326401264-e18327e7d724",
    alt: "Mujer caminando por un sendero de parque con montañas al fondo",
    caption: "Caminata en Palmer Park",
    author: "Alexander Ramsey",
    page: "https://unsplash.com/photos/woman-walking-along-pathway-during-daytime-f8nHGR0kOqA",
  },
  estiramiento: {
    kind: "unsplash",
    id: "photo-1701826510650-c505cf56e2bf",
    alt: "Mujer haciendo un estiramiento sobre un tapete",
    caption: "Estiramiento sobre tapete",
    author: "GMB Fitness",
    page: "https://unsplash.com/photos/a-woman-doing-a-yoga-pose-on-a-mat-VLpbB4YlNiw",
  },
  fuerza: {
    kind: "unsplash",
    id: "photo-1701826478825-8d975e7883f4",
    alt: "Hombre haciendo una sentadilla a una pierna en el piso de su casa",
    caption: "Sentadilla con el peso del cuerpo",
    author: "GMB Fitness",
    page: "https://unsplash.com/photos/a-man-sitting-on-the-floor-stretching-his-legs-9v1rPKsE4cU",
  },
  dormir: {
    kind: "unsplash",
    id: "photo-1686827986095-1982d3cf3dac",
    alt: "Mujer durmiendo tranquila bajo una cobija azul",
    caption: "Descanso nocturno",
    author: "Slaapwijsheid.nl",
    page: "https://unsplash.com/photos/a-woman-is-sleeping-in-a-bed-with-a-blue-comforter-cpmodOdIdKc",
  },
  habitacion: {
    kind: "unsplash",
    id: "photo-1742612246521-f313404fdd27",
    alt: "Habitación en penumbra con la cama destendida y luz suave en la ventana",
    caption: "Habitación tranquila y con poca luz",
    author: "Allen Y",
    page: "https://unsplash.com/photos/an-unmade-bed-in-a-dark-quiet-bedroom-Mb1cVr467w4",
  },
  siesta: {
    kind: "unsplash",
    id: "photo-1666934209818-cd6a6d08bd8d",
    alt: "Mujer recostada en la cama con antifaz para dormir",
    caption: "Pausa para descansar",
    author: "Dmitry Ganin",
    page: "https://unsplash.com/photos/a-woman-lying-in-a-bed-Z56eN0CGtyk",
  },
  respiracion: {
    kind: "unsplash",
    id: "photo-1532764587009-4d6bb8cf62cd",
    alt: "Mujer sentada al aire libre con los ojos cerrados, relajada",
    caption: "Respirar con calma",
    author: "Akson",
    page: "https://unsplash.com/photos/woman-closed-eye-sitting-outdoor-during-daytime-CNCL8wdRIQY",
  },
  diario: {
    kind: "unsplash",
    id: "photo-1726377240070-19b747fc9f19",
    alt: "Cuaderno de gratitud escrito a mano con un esfero",
    caption: "Diario de gratitud",
    author: "Mark Casey",
    page: "https://unsplash.com/photos/a-notebook-with-writing-and-a-camera-on-top-of-it-O7fUXu51S7w",
  },
  parque: {
    kind: "unsplash",
    id: "photo-1654677241761-6d49a05ebc29",
    alt: "Mujer sentada en una banca de madera en un parque con árboles",
    caption: "Pausa en el parque",
    author: "Dmitriy Frantsev",
    page: "https://unsplash.com/photos/a-woman-sitting-on-a-wooden-bench-in-a-park-v9syWPe4jYs",
  },
};
Object.values(NC.IMAGES).forEach(function (im) {
  if (im.kind === "unsplash") {
    im.source = "Unsplash";
    im.license = "Licencia Unsplash";
    im.licenseUrl = "https://unsplash.com/license";
  }
});

/* Fuentes de referencia generales para el contenido */
NC.SOURCES = {
  icbf: "Guías Alimentarias Basadas en Alimentos para la población colombiana (ICBF y FAO).",
  oms: "OMS (2020). Directrices de la OMS sobre actividad física y hábitos sedentarios.",
  sueno: "Recomendaciones generales de higiene del sueño.",
  bienestar: "Recomendaciones generales de manejo del estrés y autocuidado.",
};

/* Catálogo base. kind: receta | rutina | habito */
NC.SEED_RECS = [
  {
    id: "ajiaco-liviano",
    cat: "alimentacion",
    kind: "receta",
    status: "publicada",
    updated: "2026-11-06",
    title: "Ajiaco liviano con pollo",
    minutes: 45,
    diff: "Fácil",
    portions: "2 porciones",
    tags: ["sin-gluten", "sin-lactosa", "bajo-sodio"],
    img: "ajiaco",
    summary:
      "Una versión más ligera del plato tradicional, con menos grasa y más verdura. La crema queda aparte y es opcional.",
    blocks: [
      [
        "Ingredientes",
        [
          "1 pechuga de pollo sin piel",
          "6 papas criollas y 1 papa pastusa",
          "1 mazorca en trozos",
          "1 manojo de guascas",
          "Cebolla larga, ajo y cilantro",
          "½ aguacate para servir",
        ],
      ],
      [
        "Preparación",
        [
          "Cocina el pollo con la cebolla y el ajo en 1,2 litros de agua durante 20 minutos. Retíralo y desmenúzalo.",
          "Agrega las papas en trozos y la mazorca. Cocina 20 minutos más, hasta que la papa criolla espese el caldo.",
          "Devuelve el pollo y añade las guascas en los últimos 5 minutos.",
          "Sirve con aguacate y cilantro. Si usas crema o alcaparras, ponlas aparte.",
        ],
      ],
      [
        "Consejos",
        [
          "Las guascas dan el sabor característico; no las reemplaces.",
          "Si usas alcaparras, enjuágalas para bajar la sal.",
        ],
      ],
    ],
    quick:
      "Porción: 1 plato hondo. Nivel: fácil. Apto para: sin gluten y sin lactosa (sin crema).",
    source: "icbf",
  },
  {
    id: "jugo-lulo",
    cat: "alimentacion",
    kind: "receta",
    status: "publicada",
    updated: "2026-11-05",
    title: "Jugo de lulo sin azúcar añadida",
    minutes: 10,
    diff: "Fácil",
    portions: "2 vasos",
    tags: ["sin-gluten", "sin-lactosa", "bajo-sodio", "sin-azucar"],
    img: "lulo",
    summary:
      "El jugo de siempre, preparado en agua y sin azúcar. Fresco, ácido y listo en diez minutos.",
    blocks: [
      [
        "Ingredientes",
        [
          "3 lulos maduros",
          "500 ml de agua fría",
          "Hielo al gusto",
          "Hojas de hierbabuena (opcional)",
        ],
      ],
      [
        "Preparación",
        [
          "Lava los lulos, pártelos y saca la pulpa con una cuchara.",
          "Licúa la pulpa con el agua unos pocos segundos para no triturar las semillas.",
          "Cuela y sirve con hielo, sin agregar azúcar.",
        ],
      ],
      [
        "Consejos",
        [
          "Si lo sientes muy ácido, agrega un poco más de agua antes que endulzar.",
        ],
      ],
    ],
    quick:
      "Porción: 1 vaso. Nivel: fácil. Apto para: sin gluten, sin lactosa y sin azúcar añadida.",
    source: "icbf",
  },
  {
    id: "arepa-queso",
    cat: "alimentacion",
    kind: "receta",
    status: "publicada",
    updated: "2026-11-04",
    title: "Arepa de maíz asada con queso campesino",
    minutes: 15,
    diff: "Fácil",
    portions: "2 arepas",
    tags: ["sin-gluten"],
    img: "arepas",
    summary:
      "Arepa casera hecha con harina de maíz, asada sin aceite y acompañada con aguacate.",
    blocks: [
      [
        "Ingredientes",
        [
          "1 taza de harina de maíz precocida",
          "1 taza de agua tibia",
          "Una pizca de sal",
          "2 tajadas de queso campesino",
          "½ aguacate",
        ],
      ],
      [
        "Preparación",
        [
          "Mezcla la harina, el agua y la sal. Amasa 2 minutos y deja reposar 5.",
          "Forma dos arepas y ásalas en budare o sartén, 5 minutos por cada lado.",
          "Ábrelas, agrega el queso y acompaña con aguacate.",
        ],
      ],
      [
        "Consejos",
        [
          "Para una versión sin lactosa, cambia el queso por huevo o más aguacate.",
        ],
      ],
    ],
    quick: "Porción: 1 arepa. Nivel: fácil. Apto para: sin gluten.",
    source: "icbf",
  },
  {
    id: "caminata-30",
    cat: "actividad",
    kind: "rutina",
    status: "publicada",
    updated: "2026-11-04",
    title: "Caminata de 30 minutos",
    minutes: 30,
    diff: "Fácil",
    portions: "1 sesión",
    tags: [],
    img: "caminata",
    summary:
      "Treinta minutos a paso firme suman a los 150 minutos semanales de actividad moderada que la OMS recomienda para adultos.",
    blocks: [
      [
        "Pasos",
        [
          "Calienta 5 minutos a paso suave.",
          "Camina 20 minutos a un ritmo que te deje hablar, pero no cantar.",
          "Baja el ritmo durante los últimos 5 minutos.",
          "Toma agua al terminar.",
        ],
      ],
      [
        "Consejos",
        ["Usa zapatos cómodos y elige rutas planas si estás empezando."],
      ],
    ],
    quick: "Duración: 30 minutos. Nivel: fácil. Equipo: ninguno.",
    source: "oms",
  },
  {
    id: "estiramientos-trabajo",
    cat: "actividad",
    kind: "rutina",
    status: "publicada",
    updated: "2026-11-03",
    title: "Estiramientos después del trabajo",
    minutes: 10,
    diff: "Fácil",
    portions: "1 sesión",
    tags: [],
    img: "estiramiento",
    summary:
      "Diez minutos para soltar cuello, hombros y espalda después de muchas horas sentado.",
    blocks: [
      [
        "Pasos",
        [
          "Inclina la cabeza hacia cada hombro y sostén 20 segundos por lado.",
          "Haz 10 círculos lentos con los hombros hacia atrás.",
          "Entrelaza las manos detrás de la espalda y abre el pecho 20 segundos.",
          "Sentado, estira las piernas y lleva las manos hacia los pies 30 segundos.",
        ],
      ],
      ["Consejos", ["Estira sin rebotes y detente si sientes dolor."]],
    ],
    quick: "Duración: 10 minutos. Nivel: fácil. Equipo: un tapete o una silla.",
    source: "oms",
  },
  {
    id: "fuerza-casa",
    cat: "actividad",
    kind: "rutina",
    status: "publicada",
    updated: "2026-11-02",
    title: "Rutina de fuerza en casa sin equipos",
    minutes: 20,
    diff: "Media",
    portions: "3 rondas",
    tags: [],
    img: "fuerza",
    summary:
      "Un circuito corto con el peso del cuerpo. La OMS recomienda fortalecer los músculos al menos dos días por semana.",
    blocks: [
      [
        "Pasos",
        [
          "10 sentadillas.",
          "8 flexiones apoyadas en la pared o en las rodillas.",
          "12 puentes de glúteo.",
          "20 segundos de plancha.",
          "Descansa 1 minuto y repite hasta completar 3 rondas.",
        ],
      ],
      [
        "Consejos",
        [
          "Prioriza la técnica sobre la velocidad. Si estás empezando, haz solo 2 rondas.",
        ],
      ],
    ],
    quick: "Duración: 20 minutos. Nivel: medio. Equipo: ninguno.",
    source: "oms",
  },
  {
    id: "dormir-5-pasos",
    cat: "descanso",
    kind: "habito",
    status: "publicada",
    updated: "2026-11-05",
    title: "Rutina de 5 pasos para dormir mejor",
    minutes: 15,
    diff: "Fácil",
    portions: "Cada noche",
    tags: [],
    img: "dormir",
    summary:
      "Cinco pasos sencillos para que el cuerpo entienda que ya es hora de descansar.",
    blocks: [
      [
        "Pasos",
        [
          "Acuéstate y levántate a la misma hora, también el fin de semana.",
          "Baja las luces una hora antes de dormir.",
          "Date una ducha tibia o lee algo en papel.",
          "Deja la habitación oscura, fresca y en silencio.",
          "Anota en un papel lo pendiente para mañana.",
        ],
      ],
      ["Consejos", ["Evita el café y las bebidas con cafeína en la tarde."]],
    ],
    quick:
      "Duración: 15 minutos. Nivel: fácil. Mejor momento: antes de acostarte.",
    source: "sueno",
  },
  {
    id: "sin-pantallas",
    cat: "descanso",
    kind: "habito",
    status: "publicada",
    updated: "2026-11-03",
    title: "Una hora sin pantallas antes de dormir",
    minutes: 60,
    diff: "Media",
    portions: "Cada noche",
    tags: [],
    img: "habitacion",
    summary:
      "Guardar el celular una hora antes de acostarte ayuda a conciliar el sueño con más facilidad.",
    blocks: [
      [
        "Pasos",
        [
          "Programa una alarma de desconexión una hora antes de dormir.",
          "Deja el celular cargando fuera de la habitación.",
          "Cambia la pantalla por lectura en papel, música suave o una conversación.",
          "Activa el modo no molestar hasta la mañana.",
        ],
      ],
      ["Consejos", ["Empieza con 30 minutos y aumenta poco a poco."]],
    ],
    quick: "Duración: 60 minutos. Nivel: medio. Mejor momento: en la noche.",
    source: "sueno",
  },
  {
    id: "siesta-20",
    cat: "descanso",
    kind: "habito",
    status: "publicada",
    updated: "2026-11-02",
    title: "Siesta corta de 20 minutos",
    minutes: 20,
    diff: "Fácil",
    portions: "1 vez al día",
    tags: [],
    img: "siesta",
    summary:
      "Una siesta breve recupera energía sin afectar el sueño de la noche.",
    blocks: [
      [
        "Pasos",
        [
          "Elige un momento entre la 1 y las 3 de la tarde.",
          "Pon una alarma a los 20 minutos.",
          "Busca un lugar tranquilo y con poca luz.",
          "Al despertar, levántate y toma un vaso de agua.",
        ],
      ],
      ["Consejos", ["Si te cuesta dormir de noche, mejor evita la siesta."]],
    ],
    quick:
      "Duración: 20 minutos. Nivel: fácil. Mejor momento: después del almuerzo.",
    source: "sueno",
  },
  {
    id: "respiracion-478",
    cat: "bienestar",
    kind: "habito",
    status: "publicada",
    updated: "2026-11-04",
    title: "Respiración 4-7-8 para bajar el estrés",
    minutes: 5,
    diff: "Fácil",
    portions: "4 ciclos",
    tags: [],
    img: "respiracion",
    summary:
      "Una técnica de respiración pausada para calmarte en pocos minutos, donde estés.",
    blocks: [
      [
        "Pasos",
        [
          "Siéntate cómodo y suelta todo el aire.",
          "Inhala por la nariz mientras cuentas hasta 4.",
          "Sostén el aire mientras cuentas hasta 7.",
          "Exhala despacio por la boca mientras cuentas hasta 8.",
          "Repite 4 ciclos.",
        ],
      ],
      [
        "Consejos",
        ["Si te mareas, vuelve a respirar normal y descansa un momento."],
      ],
    ],
    quick: "Duración: 5 minutos. Nivel: fácil. Equipo: ninguno.",
    source: "bienestar",
  },
  {
    id: "diario-gratitud",
    cat: "bienestar",
    kind: "habito",
    status: "publicada",
    updated: "2026-11-01",
    title: "Diario de gratitud de 3 líneas",
    minutes: 10,
    diff: "Fácil",
    portions: "Cada noche",
    tags: [],
    img: "diario",
    summary:
      "Escribir tres cosas buenas del día entrena la atención en lo que sí salió bien.",
    blocks: [
      [
        "Pasos",
        [
          "Ten a mano un cuaderno solo para esto.",
          "Escribe tres cosas concretas que agradeces de hoy.",
          "Agrega una línea sobre por qué fue importante.",
        ],
      ],
      [
        "Consejos",
        [
          "Cosas pequeñas también cuentan: un buen café, una llamada o un rato de sol.",
        ],
      ],
    ],
    quick: "Duración: 10 minutos. Nivel: fácil. Equipo: cuaderno y esfero.",
    source: "bienestar",
  },
  {
    id: "pausa-aire-libre",
    cat: "bienestar",
    kind: "habito",
    status: "publicada",
    updated: "2026-10-31",
    title: "Pausa de 10 minutos al aire libre",
    minutes: 10,
    diff: "Fácil",
    portions: "1 vez al día",
    tags: [],
    img: "parque",
    summary:
      "Salir un momento, sin pantalla, para despejar la cabeza en medio del día.",
    blocks: [
      [
        "Pasos",
        [
          "Sal a un parque, un balcón o la puerta de tu casa.",
          "Nota tres cosas que ves, dos que oyes y una que hueles.",
          "Respira profundo tres veces antes de volver.",
        ],
      ],
      ["Consejos", ["Deja el celular en silencio durante esos minutos."]],
    ],
    quick: "Duración: 10 minutos. Nivel: fácil. Mejor momento: a media tarde.",
    source: "bienestar",
  },
  /* Contenidos que aún no están publicados (solo se ven en el panel del editor) */
  {
    id: "yoga-suave",
    cat: "actividad",
    kind: "rutina",
    status: "revision",
    updated: "2026-11-05",
    title: "Yoga suave para principiantes",
    minutes: 15,
    diff: "Fácil",
    portions: "1 sesión",
    tags: [],
    img: "estiramiento",
    summary:
      "Posturas sencillas para ganar movilidad sin exigir de más al cuerpo.",
    blocks: [
      [
        "Pasos",
        [
          "Postura de montaña, 1 minuto.",
          "Gato y vaca, 10 repeticiones.",
          "Postura del niño, 1 minuto.",
        ],
      ],
    ],
    quick: "Duración: 15 minutos. Nivel: fácil.",
    source: "oms",
    reviewer: "Profesional de la salud (dato de ejemplo)",
  },
  {
    id: "desayuno-avena",
    cat: "alimentacion",
    kind: "receta",
    status: "borrador",
    updated: "2026-11-04",
    title: "Desayuno de avena con banano",
    minutes: 10,
    diff: "Fácil",
    portions: "1 porción",
    tags: ["sin-azucar"],
    img: null,
    summary: "Avena cocida con banano y canela, sin azúcar añadida.",
    blocks: [
      [
        "Ingredientes",
        [
          "½ taza de avena",
          "1 taza de agua o bebida vegetal",
          "1 banano",
          "Canela",
        ],
      ],
    ],
    quick: "Porción: 1 taza. Nivel: fácil.",
    source: "icbf",
    reviewer: "",
  },
];

/* Usuarios de prueba. El prototipo no guarda contraseñas. */
NC.SEED_USERS = [
  {
    email: "laura@correo.com",
    name: "Laura Gómez",
    role: "usuario",
    profile: {
      age: "34",
      sex: "Prefiero no decirlo",
      height: "",
      weight: "",
      activity: "moderado",
      goals: ["dormir-mejor"],
      restr: ["sin-lactosa"],
      done: true,
    },
    consents: {
      cuenta: true,
      salud: true,
      recordatorios: true,
      estadisticas: false,
    },
    privacy: { soloYo: true, personalizar: true },
    favs: [
      ["ajiaco-liviano", 3],
      ["caminata-30", 2],
      ["dormir-5-pasos", 1],
    ],
    habitsSeed: [
      ["caminata-30", "favoritos", [0, 1, 2, 3, 4]],
      ["dormir-5-pasos", "favoritos", [0, 1, 2, 3]],
      ["jugo-lulo", "favoritos", [1, 2, 3]],
      ["respiracion-478", "favoritos", [1, 2]],
    ],
    dismissed: [],
    tune: [],
    reminder: true,
  },
  {
    email: "editor@nutritimco.example",
    name: "Equipo editorial",
    role: "editor",
    profile: { done: false },
    consents: {
      cuenta: true,
      salud: false,
      recordatorios: false,
      estadisticas: false,
    },
    privacy: { soloYo: true, personalizar: false },
    favs: [],
    habitsSeed: [],
    dismissed: [],
    tune: [],
    reminder: false,
  },
];
