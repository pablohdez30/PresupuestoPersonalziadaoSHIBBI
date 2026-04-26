import type { Pregunta, TipoMueble } from './types';

const MESA: Pregunta[] = [
  {
    id: 'subtipo',
    tipo: 'select',
    label: '¿Qué tipo de mesa?',
    opciones: [
      { id: 'comedor',    label: 'De comedor' },
      { id: 'centro',     label: 'De centro / salón' },
      { id: 'auxiliar',   label: 'Auxiliar / lateral' },
      { id: 'escritorio', label: 'Escritorio' },
      { id: 'consola',    label: 'Consola / recibidor' },
      { id: 'cocina',     label: 'De cocina' },
      { id: 'exterior',   label: 'Para exterior' }
    ]
  },
  {
    id: 'forma',
    tipo: 'select',
    label: 'Forma del tablero',
    opciones: [
      { id: 'rectangular', label: 'Rectangular' },
      { id: 'cuadrada',    label: 'Cuadrada' },
      { id: 'redonda',     label: 'Redonda' },
      { id: 'ovalada',     label: 'Ovalada' },
      { id: 'organica',    label: 'Tabla viva (corteza)' }
    ]
  },
  { id: 'largo', tipo: 'numero', label: 'Largo aproximado', sufijo: 'cm', min: 30, max: 400 },
  { id: 'ancho', tipo: 'numero', label: 'Ancho aproximado', sufijo: 'cm', min: 30, max: 200 },
  { id: 'alto',  tipo: 'numero', label: 'Alto', sufijo: 'cm', min: 30, max: 120, opcional: true, ayuda: 'Si no lo sabes lo dejamos en estándar (75 cm comedor, 45 cm centro).' },
  {
    id: 'material_tablero',
    tipo: 'select',
    label: 'Material del tablero',
    opciones: [
      { id: 'roble',       label: 'Roble macizo' },
      { id: 'nogal',       label: 'Nogal' },
      { id: 'fresno',      label: 'Fresno' },
      { id: 'pino',        label: 'Pino' },
      { id: 'chapa',       label: 'Chapa sobre tablero' },
      { id: 'lacado',      label: 'Tablero lacado' },
      { id: 'otro',        label: 'Otro / no lo tengo claro' }
    ]
  },
  {
    id: 'patas',
    tipo: 'select',
    label: 'Tipo de patas',
    opciones: [
      { id: '4_madera',     label: '4 patas de madera' },
      { id: 'hairpin',      label: 'Hairpin (finas en horquilla)' },
      { id: 'pedestal',     label: 'Pedestal central' },
      { id: 'caballete',    label: 'Caballete' },
      { id: 'u_metal',      label: 'U metálica' },
      { id: 'x_metal',      label: 'X metálica' },
      { id: 'banco_corrido',label: 'Tipo banco corrido' },
      { id: 'no_se',        label: 'Decidlo vosotros' }
    ]
  },
  {
    id: 'acabado',
    tipo: 'select',
    label: 'Acabado',
    opciones: [
      { id: 'aceite',      label: 'Aceite natural' },
      { id: 'cera',        label: 'Cera' },
      { id: 'barniz_mate', label: 'Barniz mate' },
      { id: 'barniz_brillo', label: 'Barniz brillo' },
      { id: 'lacado',      label: 'Lacado en color' },
      { id: 'no_se',       label: 'Recomendadnos vosotros' }
    ]
  },
  {
    id: 'ninos_mascotas',
    tipo: 'select',
    label: '¿Hay niños pequeños o mascotas en casa?',
    ayuda: 'Cambia el acabado que recomendamos.',
    opciones: [
      { id: 'si', label: 'Sí' },
      { id: 'no', label: 'No' }
    ]
  }
];

const SILLA: Pregunta[] = [
  {
    id: 'subtipo',
    tipo: 'select',
    label: '¿Qué tipo?',
    opciones: [
      { id: 'silla',         label: 'Silla de comedor' },
      { id: 'butaca',        label: 'Butaca' },
      { id: 'taburete_bajo', label: 'Taburete bajo' },
      { id: 'taburete_alto', label: 'Taburete alto / barra' },
      { id: 'banco',         label: 'Banco corrido' },
      { id: 'banqueta',      label: 'Banqueta tapizada' }
    ]
  },
  { id: 'cantidad', tipo: 'numero', label: '¿Cuántas unidades?', min: 1, max: 20 },
  {
    id: 'estructura',
    tipo: 'select',
    label: 'Material de la estructura',
    opciones: [
      { id: 'madera_juego', label: 'Misma madera que la mesa' },
      { id: 'madera_otra',  label: 'Madera distinta' },
      { id: 'metal',        label: 'Metal' },
      { id: 'mixto',        label: 'Mixto madera+metal' },
      { id: 'no_se',        label: 'Recomendadnos' }
    ]
  },
  {
    id: 'asiento',
    tipo: 'select',
    label: 'Tipo de asiento',
    opciones: [
      { id: 'madera',         label: 'Madera vista' },
      { id: 'tapizado_tela',  label: 'Tapizado en tela' },
      { id: 'tapizado_piel',  label: 'Tapizado en piel' },
      { id: 'cannage',        label: 'Rejilla cannage' },
      { id: 'cuerda',         label: 'Cuerda' }
    ]
  },
  {
    id: 'respaldo',
    tipo: 'select',
    label: 'Respaldo',
    opciones: [
      { id: 'sin', label: 'Sin respaldo' },
      { id: 'bajo', label: 'Bajo' },
      { id: 'alto', label: 'Alto' }
    ]
  },
  {
    id: 'reposabrazos',
    tipo: 'select',
    label: 'Reposabrazos',
    opciones: [
      { id: 'si', label: 'Sí' },
      { id: 'no', label: 'No' }
    ]
  }
];

const ESTANTERIA: Pregunta[] = [
  {
    id: 'tipo_estanteria',
    tipo: 'select',
    label: 'Tipo de estantería',
    opciones: [
      { id: 'pared',    label: 'De pared' },
      { id: 'pie',      label: 'De pie' },
      { id: 'modular',  label: 'Modular' },
      { id: 'vitrina',  label: 'Vitrina' },
      { id: 'cubo',     label: 'Tipo cubo' },
      { id: 'a_medida', label: 'A medida para un hueco' }
    ]
  },
  { id: 'alto',  tipo: 'numero', label: 'Alto del hueco / mueble',  sufijo: 'cm', min: 30, max: 350 },
  { id: 'ancho', tipo: 'numero', label: 'Ancho',                    sufijo: 'cm', min: 30, max: 400 },
  { id: 'fondo', tipo: 'numero', label: 'Fondo',                    sufijo: 'cm', min: 15, max: 80 },
  { id: 'baldas', tipo: 'numero', label: 'Nº de baldas (aproximado)', min: 1, max: 12, opcional: true, ayuda: 'Si no lo sabes lo decidimos juntos.' },
  {
    id: 'estructura',
    tipo: 'select',
    label: 'Estructura',
    opciones: [
      { id: 'toda_madera',  label: 'Toda de madera' },
      { id: 'madera_hierro',label: 'Madera + hierro (industrial)' },
      { id: 'solo_hierro',  label: 'Solo hierro' }
    ]
  },
  {
    id: 'anclaje',
    tipo: 'select',
    label: 'Anclaje',
    opciones: [
      { id: 'suelo',       label: 'Apoyada en el suelo' },
      { id: 'pared',       label: 'Anclada a la pared' },
      { id: 'suelo_pared', label: 'Suelo + pared' },
      { id: 'sin',         label: 'Sin anclar' }
    ]
  },
  {
    id: 'puertas',
    tipo: 'select',
    label: 'Puertas',
    opciones: [
      { id: 'sin',     label: 'Sin puertas' },
      { id: 'ciegas',  label: 'Sí, ciegas' },
      { id: 'cristal', label: 'Sí, con cristal' },
      { id: 'rejilla', label: 'Sí, con rejilla' }
    ]
  }
];

const ESPEJO: Pregunta[] = [
  {
    id: 'forma',
    tipo: 'select',
    label: 'Forma',
    opciones: [
      { id: 'rectangular', label: 'Rectangular' },
      { id: 'cuadrado',    label: 'Cuadrado' },
      { id: 'redondo',     label: 'Redondo' },
      { id: 'ovalado',     label: 'Ovalado' },
      { id: 'arco',        label: 'Arco' },
      { id: 'organico',    label: 'Orgánico / asimétrico' }
    ]
  },
  { id: 'alto',  tipo: 'numero', label: 'Alto',  sufijo: 'cm', min: 20, max: 250 },
  { id: 'ancho', tipo: 'numero', label: 'Ancho', sufijo: 'cm', min: 20, max: 200 },
  {
    id: 'marco',
    tipo: 'select',
    label: 'Marco',
    opciones: [
      { id: 'sin_marco', label: 'Sin marco' },
      { id: 'madera',    label: 'Madera' },
      { id: 'hierro',    label: 'Hierro' },
      { id: 'dorado',    label: 'Dorado / pan de oro' },
      { id: 'tallado',   label: 'Tallado / restaurado' }
    ]
  },
  {
    id: 'colocacion',
    tipo: 'select',
    label: '¿Dónde irá?',
    opciones: [
      { id: 'pared',     label: 'En pared' },
      { id: 'suelo',     label: 'Apoyado en el suelo (cuerpo entero)' },
      { id: 'sobremesa', label: 'Sobre mesa' }
    ]
  },
  {
    id: 'funcion',
    tipo: 'select',
    label: 'Uso principal',
    opciones: [
      { id: 'decorativo', label: 'Decorativo' },
      { id: 'vestidor',   label: 'Vestidor' },
      { id: 'bano',       label: 'Baño (anti-vaho)' },
      { id: 'recibidor',  label: 'Recibidor' }
    ]
  }
];

const APARADOR: Pregunta[] = [
  {
    id: 'subtipo',
    tipo: 'select',
    label: 'Tipo',
    opciones: [
      { id: 'aparador',  label: 'Aparador bajo' },
      { id: 'comoda',    label: 'Cómoda dormitorio' },
      { id: 'buffet',    label: 'Buffet alto' },
      { id: 'mueble_tv', label: 'Mueble TV' },
      { id: 'mueble_bar',label: 'Mueble bar' },
      { id: 'consola',   label: 'Consola' }
    ]
  },
  { id: 'largo', tipo: 'numero', label: 'Largo', sufijo: 'cm', min: 40, max: 350 },
  { id: 'fondo', tipo: 'numero', label: 'Fondo', sufijo: 'cm', min: 25, max: 80 },
  { id: 'alto',  tipo: 'numero', label: 'Alto',  sufijo: 'cm', min: 40, max: 220 },
  { id: 'cajones', tipo: 'numero', label: 'Nº de cajones', min: 0, max: 20, opcional: true },
  { id: 'puertas', tipo: 'numero', label: 'Nº de puertas', min: 0, max: 8,  opcional: true },
  {
    id: 'tipo_puertas',
    tipo: 'select',
    label: 'Tipo de puertas',
    opciones: [
      { id: 'no_aplica', label: 'No lleva' },
      { id: 'ciegas',    label: 'Ciegas' },
      { id: 'cristal',   label: 'Cristal' },
      { id: 'rejilla',   label: 'Rejilla' },
      { id: 'panel',     label: 'Panel rebajado' }
    ]
  },
  {
    id: 'patas',
    tipo: 'select',
    label: 'Apoyo',
    opciones: [
      { id: 'al_suelo', label: 'Al suelo (sin patas)' },
      { id: 'con_patas',label: 'Con patas' }
    ]
  }
];

const CABECERO: Pregunta[] = [
  {
    id: 'medida_cama',
    tipo: 'select',
    label: 'Medida de la cama',
    opciones: [
      { id: '90',  label: '90 cm (individual)' },
      { id: '105', label: '105 cm' },
      { id: '135', label: '135 cm' },
      { id: '150', label: '150 cm' },
      { id: '160', label: '160 cm' },
      { id: '180', label: '180 cm' },
      { id: 'otra',label: 'Otra' }
    ]
  },
  {
    id: 'subtipo',
    tipo: 'select',
    label: '¿Qué necesitas exactamente?',
    opciones: [
      { id: 'solo_cabecero',     label: 'Solo cabecero' },
      { id: 'cabecero_somier',   label: 'Cabecero + somier' },
      { id: 'cama_nido',         label: 'Cama nido' },
      { id: 'canape',            label: 'Canapé' }
    ]
  },
  {
    id: 'material',
    tipo: 'select',
    label: 'Material',
    opciones: [
      { id: 'madera_maciza', label: 'Madera maciza' },
      { id: 'tapizado',      label: 'Tapizado' },
      { id: 'mixto',         label: 'Mixto' },
      { id: 'forja',         label: 'Forja / hierro' }
    ]
  },
  {
    id: 'altura',
    tipo: 'select',
    label: 'Altura del cabecero',
    opciones: [
      { id: 'bajo',  label: 'Bajo (60 cm aprox.)' },
      { id: 'medio', label: 'Medio (100 cm aprox.)' },
      { id: 'alto',  label: 'Alto (140+ cm)' }
    ]
  },
  {
    id: 'mesillas',
    tipo: 'select',
    label: 'Mesillas a juego',
    opciones: [
      { id: 'si',    label: 'Sí' },
      { id: 'no',    label: 'No' },
      { id: 'quiza', label: 'Quizás más adelante' }
    ]
  }
];

const OTRO: Pregunta[] = [
  {
    id: 'descripcion',
    tipo: 'texto',
    label: 'Descríbenos lo que tienes en mente',
    placeholder: 'Para qué lo usarás, dónde irá, medidas aproximadas, materiales que te gustan…',
    ayuda: 'Cuanto más concreto, mejor podremos presupuestarte. Las fotos las añades en el siguiente paso.'
  }
];

export const PREGUNTAS_POR_TIPO: Record<TipoMueble, Pregunta[]> = {
  mesa: MESA,
  silla: SILLA,
  estanteria: ESTANTERIA,
  espejo: ESPEJO,
  aparador: APARADOR,
  cabecero: CABECERO,
  otro: OTRO
};
