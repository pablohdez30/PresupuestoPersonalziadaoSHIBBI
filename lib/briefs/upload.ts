'use client';

import { createSupabaseClient } from '@/lib/supabase/client';

const BUCKET = 'inspiracion';

function safeExt(name: string): string {
  const m = name.toLowerCase().match(/\.([a-z0-9]{1,8})$/);
  return m ? m[1] : 'bin';
}

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return 'id-' + Math.random().toString(36).slice(2) + '-' + Date.now();
}

/**
 * Sube cada archivo a Supabase Storage en paralelo.
 * Devuelve las rutas dentro del bucket (no URLs).
 *
 * Estructura: <prefix>/<uuid>.<ext>
 * Si Supabase no está configurado (env vars vacías), lanza error.
 */
export async function uploadInspiracion(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('xxxxxxx')) {
    throw new Error('Supabase no está configurado todavía. Avisa al equipo.');
  }

  const supabase = createSupabaseClient();
  const prefix = uuid();

  const tasks = files.map(async (file) => {
    const path = `${prefix}/${uuid()}.${safeExt(file.name)}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, {
        contentType: file.type || 'application/octet-stream',
        cacheControl: '3600',
        upsert: false
      });
    if (error) {
      throw new Error(`Error subiendo "${file.name}": ${error.message}`);
    }
    return path;
  });

  return Promise.all(tasks);
}
