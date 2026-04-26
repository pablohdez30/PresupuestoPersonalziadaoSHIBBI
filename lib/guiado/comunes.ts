import type { TipoMueble } from './types';

export const TIPOS: { id: TipoMueble; icono: string; label: string; descripcion: string }[] = [
  { id: 'mesa',        icono: '🪑', label: 'Mesa',                descripcion: 'Comedor, centro, auxiliar, escritorio…' },
  { id: 'silla',       icono: '💺', label: 'Silla o banqueta',    descripcion: 'Sillas, butacas, taburetes, bancos.' },
  { id: 'estanteria',  icono: '🪜', label: 'Estantería',          descripcion: 'Pared, de pie, modular, vitrinas.' },
  { id: 'espejo',      icono: '🪞', label: 'Espejo',              descripcion: 'Pared, suelo, sobremesa, vestidor.' },
  { id: 'aparador',    icono: '🗄', label: 'Aparador o cómoda',   descripcion: 'Aparador, cómoda, mueble TV, bar.' },
  { id: 'cabecero',    icono: '🛏', label: 'Cabecero o cama',     descripcion: 'Cabecero, cama, canapé.' },
  { id: 'otro',        icono: '🎴', label: 'Otro',                descripcion: 'Cuéntanoslo en texto libre.' }
];

export const ESTILOS = [
  { id: 'rustico',       label: 'Rústico',       descripcion: 'Madera al natural, vetas vistas.' },
  { id: 'nordico',       label: 'Nórdico',       descripcion: 'Líneas limpias, maderas claras.' },
  { id: 'industrial',    label: 'Industrial',    descripcion: 'Madera + hierro negro.' },
  { id: 'clasico',       label: 'Clásico',       descripcion: 'Detallado, tradicional.' },
  { id: 'mediterraneo',  label: 'Mediterráneo',  descripcion: 'Tonos cálidos, materiales naturales.' },
  { id: 'contemporaneo', label: 'Contemporáneo', descripcion: 'Limpio, neutro, atemporal.' },
  { id: 'sin_idea',      label: 'No lo tengo claro', descripcion: 'Os contamos qué nos gusta y nos guiáis.' }
];

export const ESTANCIAS = [
  { id: 'salon',     label: 'Salón' },
  { id: 'comedor',   label: 'Comedor' },
  { id: 'cocina',    label: 'Cocina' },
  { id: 'dormitorio',label: 'Dormitorio' },
  { id: 'recibidor', label: 'Recibidor' },
  { id: 'despacho',  label: 'Despacho' },
  { id: 'terraza',   label: 'Terraza o exterior' },
  { id: 'otra',      label: 'Otra' }
];

export const PLAZOS = [
  { id: 'urgente',  label: 'Urgente',           descripcion: 'Lo necesito en menos de 1 mes.' },
  { id: '1_2_mes',  label: 'En 1-2 meses',      descripcion: 'Tengo cierto margen.' },
  { id: '2_3_mes',  label: 'En 2-3 meses',      descripcion: 'Sin presión.' },
  { id: 'sin_prisa',label: 'Sin prisa',         descripcion: 'Cuando esté, estará.' }
];

export const PRESUPUESTOS = [
  { id: '<500',      label: 'Menos de 500 €' },
  { id: '500-1000',  label: '500 – 1.000 €' },
  { id: '1000-2000', label: '1.000 – 2.000 €' },
  { id: '2000-4000', label: '2.000 – 4.000 €' },
  { id: '>4000',     label: 'Más de 4.000 €' },
  { id: 'no_se',     label: 'No tengo idea — orientadnos vosotros' }
];

export const ENTREGAS = [
  { id: 'recogida_taller',  label: 'Recoger en taller' },
  { id: 'envio_madrid',     label: 'Envío y montaje en Madrid' },
  { id: 'envio_fuera',      label: 'Envío fuera de Madrid (avisamos coste)' },
  { id: 'no_se',            label: 'Lo decidimos al hablar' }
];

export const CANALES = [
  { id: 'email' as const,    label: 'Email',    hint: 'Te respondemos por escrito.' },
  { id: 'whatsapp' as const, label: 'WhatsApp', hint: 'Te escribimos al móvil.' },
  { id: 'llamada' as const,  label: 'Llamada',  hint: 'Te llamamos cuando te venga bien.' }
];
