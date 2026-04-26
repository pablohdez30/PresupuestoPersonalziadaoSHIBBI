import { Resend } from 'resend';
import type { Brief } from './schema';
import {
  TIPOS,
  ESTILOS,
  ESTANCIAS,
  PLAZOS,
  PRESUPUESTOS,
  ENTREGAS,
  CANALES
} from '@/lib/guiado/comunes';
import { PREGUNTAS_POR_TIPO } from '@/lib/guiado/preguntas';

type SignedImagen = { path: string; url: string };

export async function sendBriefEmail({
  id,
  brief,
  imagenes,
  createdAt
}: {
  id: string;
  brief: Brief;
  imagenes: SignedImagen[];
  createdAt: string;
}): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.SHIBBI_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !to || apiKey.includes('xxxxxxx')) {
    return { sent: false, reason: 'Resend no configurado' };
  }

  const resend = new Resend(apiKey);

  const subject =
    brief.tipo_brief === 'rapido'
      ? `[Brief Rápido] ${brief.nombre}${brief.ciudad ? ` · ${brief.ciudad}` : ''}`
      : `[Brief Guiado] ${labelTipoMueble(brief.tipo_mueble)} · ${brief.nombre}`;

  const html = renderHtml({ id, brief, imagenes, createdAt });

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: brief.email,
    subject,
    html
  });

  if (error) {
    return { sent: false, reason: error.message };
  }
  return { sent: true };
}

// ----------------------------------------------------------
// Helpers de etiqueta
// ----------------------------------------------------------
function labelTipoMueble(id: string): string {
  return TIPOS.find((t) => t.id === id)?.label ?? id;
}
function labelFromList(list: { id: string; label: string }[], id: string | null | undefined) {
  if (!id) return '—';
  return list.find((x) => x.id === id)?.label ?? id;
}

// ----------------------------------------------------------
// HTML
// ----------------------------------------------------------
function renderHtml({
  id,
  brief,
  imagenes,
  createdAt
}: {
  id: string;
  brief: Brief;
  imagenes: SignedImagen[];
  createdAt: string;
}): string {
  const fecha = new Date(createdAt).toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid'
  });

  const cliente = `
    <h3>Cliente</h3>
    ${row('Nombre', brief.nombre)}
    ${row('Email', brief.email)}
    ${row('Teléfono', brief.telefono || '—')}
    ${row('Ciudad', [brief.ciudad, brief.cp].filter(Boolean).join(' · ') || '—')}
    ${row('Entrega', labelFromList(ENTREGAS, brief.entrega))}
    ${row('Canal preferido', labelFromList(CANALES, brief.canal_preferido))}
  `;

  let cuerpo = '';
  if (brief.tipo_brief === 'rapido') {
    cuerpo = `
      <h3>Mensaje del cliente</h3>
      <pre style="white-space:pre-wrap;font-family:inherit;background:#f6f5f1;padding:14px;border-radius:6px;">${escapeHtml(
        brief.mensaje
      )}</pre>
    `;
  } else {
    const preguntas = PREGUNTAS_POR_TIPO[brief.tipo_mueble];
    const detalles = preguntas
      .map((p) => {
        const v = brief.especifico[p.id];
        if (v === undefined || v === '' || v === null) return '';
        let mostrar: string = String(v);
        if (p.tipo === 'select') {
          mostrar = p.opciones.find((o) => o.id === v)?.label ?? mostrar;
        } else if (p.tipo === 'numero' && p.sufijo) {
          mostrar = `${v} ${p.sufijo}`;
        }
        return row(p.label, mostrar);
      })
      .join('');

    cuerpo = `
      <h3>Mueble</h3>
      ${row('Tipo', labelTipoMueble(brief.tipo_mueble))}
      ${detalles}

      <h3>Contexto</h3>
      ${row('Estilo', labelFromList(ESTILOS, brief.estilo))}
      ${row('Estancia', labelFromList(ESTANCIAS, brief.estancia))}
      ${row('Plazo', labelFromList(PLAZOS, brief.plazo))}
      ${row('Presupuesto orientativo', labelFromList(PRESUPUESTOS, brief.presupuesto))}
      ${
        brief.notas
          ? `<h3>Notas adicionales</h3><pre style="white-space:pre-wrap;font-family:inherit;background:#f6f5f1;padding:14px;border-radius:6px;">${escapeHtml(
              brief.notas
            )}</pre>`
          : ''
      }
    `;
  }

  const galeria =
    imagenes.length > 0
      ? `
        <h3>Imágenes de inspiración (${imagenes.length})</h3>
        <p style="font-size:12px;color:#6E6E73;">Los enlaces caducan en 30 días.</p>
        <div>
          ${imagenes
            .map(
              (img) => `
            <a href="${img.url}" target="_blank" rel="noopener" style="display:inline-block;margin:0 8px 8px 0;">
              <img src="${img.url}" alt="" width="120" height="120" style="object-fit:cover;border-radius:6px;border:1px solid #e3ddcc;display:block;" />
            </a>`
            )
            .join('')}
        </div>
      `
      : '';

  return `
  <!doctype html>
  <html lang="es"><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1D1D1F;line-height:1.5;background:#FAFAFA;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #E8E1D0;border-radius:8px;padding:32px;">
      <div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6E6E73;margin-bottom:8px;">
        Brief ${brief.tipo_brief === 'rapido' ? 'Rápido' : 'Guiado'} · ${fecha}
      </div>
      <h2 style="margin:0 0 16px;font-size:22px;font-weight:500;">
        ${brief.nombre}
      </h2>
      <div style="font-size:12px;color:#6E6E73;margin-bottom:24px;">
        ID interno: <code>${id}</code>
      </div>

      ${cliente}
      ${cuerpo}
      ${galeria}

      <hr style="border:none;border-top:1px solid #E8E1D0;margin:32px 0 16px;" />
      <div style="font-size:12px;color:#6E6E73;">
        Responde directamente a este correo y le llegará al cliente (${escapeHtml(
          brief.email
        )}).
      </div>
    </div>
  </body></html>`;
}

function row(k: string, v: string): string {
  return `
    <div style="display:flex;gap:16px;padding:6px 0;font-size:14px;border-bottom:1px solid #f0eadb;">
      <div style="flex:0 0 180px;color:#6E6E73;">${escapeHtml(k)}</div>
      <div style="flex:1;color:#1D1D1F;word-break:break-word;">${escapeHtml(v)}</div>
    </div>`;
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
