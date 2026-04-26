export type TipoMueble =
  | 'mesa'
  | 'silla'
  | 'estanteria'
  | 'espejo'
  | 'aparador'
  | 'cabecero'
  | 'otro';

export type Canal = 'email' | 'whatsapp' | 'llamada';

export type ImagenLocal = {
  id: string;
  file: File;
  preview: string;
};

export type GuiadoBrief = {
  // Paso 1
  tipo: TipoMueble | null;

  // Paso 2 — específico por tipo (claves variables)
  especifico: Record<string, string | number>;

  // Paso 3 — común
  estilo: string;
  estancia: string;
  plazo: string;
  presupuesto: string;

  // Paso 4
  imagenes: ImagenLocal[];
  notas: string;

  // Paso 5
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  cp: string;
  entrega: string;
  canal: Canal;
};

export const BRIEF_INICIAL: GuiadoBrief = {
  tipo: null,
  especifico: {},
  estilo: '',
  estancia: '',
  plazo: '',
  presupuesto: '',
  imagenes: [],
  notas: '',
  nombre: '',
  email: '',
  telefono: '',
  ciudad: '',
  cp: '',
  entrega: '',
  canal: 'email'
};

export type Pregunta =
  | { id: string; tipo: 'select'; label: string; ayuda?: string; opciones: { id: string; label: string }[] }
  | { id: string; tipo: 'numero'; label: string; ayuda?: string; sufijo?: string; min?: number; max?: number; opcional?: boolean }
  | { id: string; tipo: 'texto'; label: string; ayuda?: string; placeholder?: string; opcional?: boolean };
