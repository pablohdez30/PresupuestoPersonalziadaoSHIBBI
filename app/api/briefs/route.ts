import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { briefSchema, type Brief } from '@/lib/briefs/schema';
import { sendBriefEmail } from '@/lib/briefs/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SIGN_TTL_SEC = 60 * 60 * 24 * 30; // 30 días

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = briefSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const brief = parsed.data;

  const h = headers();
  const userAgent = h.get('user-agent');
  const fwd = h.get('x-forwarded-for');
  const ip = fwd ? fwd.split(',')[0].trim() : null;

  const supabase = createSupabaseAdmin();

  const insertRow = buildInsertRow(brief, { userAgent, ip });

  const { data: row, error: insertErr } = await supabase
    .from('briefs')
    .insert(insertRow)
    .select('id, created_at')
    .single();

  if (insertErr || !row) {
    console.error('[briefs] insert error', insertErr);
    return NextResponse.json(
      { error: 'No pudimos guardar tu consulta. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }

  // Signed URLs para que el equipo vea las imágenes desde el email
  let imagenes: { path: string; url: string }[] = [];
  if (brief.imagenes.length > 0) {
    const { data: signed, error: signErr } = await supabase.storage
      .from('inspiracion')
      .createSignedUrls(brief.imagenes, SIGN_TTL_SEC);

    if (signErr) {
      console.error('[briefs] signed urls error', signErr);
    } else if (signed) {
      imagenes = signed
        .filter((s) => s.signedUrl && s.path)
        .map((s) => ({ path: s.path as string, url: s.signedUrl as string }));
    }
  }

  // Email — si falla no rompemos la respuesta, ya está guardado
  try {
    const result = await sendBriefEmail({
      id: row.id,
      brief,
      imagenes,
      createdAt: row.created_at
    });
    if (!result.sent) {
      console.warn('[briefs] email no enviado:', result.reason);
    }
  } catch (e) {
    console.error('[briefs] email exception', e);
  }

  return NextResponse.json({ ok: true, id: row.id });
}

function buildInsertRow(
  brief: Brief,
  meta: { userAgent: string | null; ip: string | null }
) {
  const base = {
    tipo_brief: brief.tipo_brief,
    nombre: brief.nombre,
    email: brief.email,
    telefono: brief.telefono || null,
    ciudad: brief.ciudad || null,
    cp: brief.cp || null,
    entrega: brief.entrega || null,
    canal_preferido: brief.canal_preferido,
    imagenes: brief.imagenes,
    user_agent: meta.userAgent,
    ip: meta.ip
  };

  if (brief.tipo_brief === 'rapido') {
    return { ...base, mensaje: brief.mensaje };
  }

  return {
    ...base,
    tipo_mueble: brief.tipo_mueble,
    especifico: brief.especifico,
    estilo: brief.estilo || null,
    estancia: brief.estancia || null,
    plazo: brief.plazo || null,
    presupuesto: brief.presupuesto || null,
    notas: brief.notas || null
  };
}
