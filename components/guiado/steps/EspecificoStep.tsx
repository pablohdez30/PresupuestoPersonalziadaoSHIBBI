'use client';

import type { TipoMueble } from '@/lib/guiado/types';
import { PREGUNTAS_POR_TIPO } from '@/lib/guiado/preguntas';
import { TIPOS } from '@/lib/guiado/comunes';
import { Field } from '../Field';

export function EspecificoStep({
  tipo,
  especifico,
  onChange,
  errors
}: {
  tipo: TipoMueble;
  especifico: Record<string, string | number>;
  onChange: (id: string, valor: string | number) => void;
  errors: Record<string, string>;
}) {
  const preguntas = PREGUNTAS_POR_TIPO[tipo];
  const tipoMeta = TIPOS.find((t) => t.id === tipo);

  return (
    <div>
      <h2
        className="display"
        style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em', marginBottom: 12 }}
      >
        Cuéntanos más sobre tu {tipoMeta?.label.toLowerCase()}.
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
        Si alguna no la tienes clara, déjala como "no lo sé / decididlo vosotros" cuando esté disponible.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {preguntas.map((p) => (
          <Field
            key={p.id}
            pregunta={p}
            value={especifico[p.id]}
            onChange={(v) => onChange(p.id, v)}
            error={errors[p.id]}
          />
        ))}
      </div>
    </div>
  );
}
