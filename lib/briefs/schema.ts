import { z } from 'zod';

// ----------------------------------------------------------
// Datos comunes a Rápido y Guiado
// ----------------------------------------------------------
const datosCliente = {
  nombre:          z.string().trim().min(1, 'Nombre requerido').max(120),
  email:           z.string().trim().email('Email inválido').max(200),
  telefono:        z.string().trim().max(50).optional().nullable(),
  ciudad:          z.string().trim().max(120).optional().nullable(),
  cp:              z.string().trim().max(20).optional().nullable(),
  entrega:         z.string().trim().max(50).optional().nullable(),
  canal_preferido: z.enum(['email', 'whatsapp', 'llamada']).default('email')
};

// Rutas de imágenes en el bucket (no URLs).
const imagenes = z.array(z.string().min(1).max(300)).max(10).default([]);

// ----------------------------------------------------------
// RÁPIDO
// ----------------------------------------------------------
export const rapidoBriefSchema = z.object({
  tipo_brief: z.literal('rapido'),
  ...datosCliente,
  mensaje: z.string().trim().min(10, 'Cuéntanos un poco más').max(5000),
  imagenes
});

// ----------------------------------------------------------
// GUIADO
// ----------------------------------------------------------
const TIPOS_MUEBLE = ['mesa', 'silla', 'estanteria', 'espejo', 'aparador', 'cabecero', 'otro'] as const;

export const guiadoBriefSchema = z.object({
  tipo_brief: z.literal('guiado'),
  ...datosCliente,
  tipo_mueble: z.enum(TIPOS_MUEBLE),
  especifico:  z.record(z.union([z.string(), z.number()])).default({}),
  estilo:      z.string().trim().max(50).optional().nullable(),
  estancia:    z.string().trim().max(50).optional().nullable(),
  plazo:       z.string().trim().max(50).optional().nullable(),
  presupuesto: z.string().trim().max(50).optional().nullable(),
  notas:       z.string().trim().max(2000).optional().nullable(),
  imagenes
});

// ----------------------------------------------------------
// Unión discriminada + validación cruzada
// ----------------------------------------------------------
export const briefSchema = z
  .discriminatedUnion('tipo_brief', [rapidoBriefSchema, guiadoBriefSchema])
  .superRefine((b, ctx) => {
    if (b.canal_preferido !== 'email' && !(b.telefono && b.telefono.length > 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Necesitamos teléfono si prefieres WhatsApp o llamada',
        path: ['telefono']
      });
    }
  });

export type RapidoBrief = z.infer<typeof rapidoBriefSchema>;
export type GuiadoBrief = z.infer<typeof guiadoBriefSchema>;
export type Brief = z.infer<typeof briefSchema>;
