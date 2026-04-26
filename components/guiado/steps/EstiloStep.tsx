'use client';

import { ESTILOS, ESTANCIAS, PLAZOS, PRESUPUESTOS } from '@/lib/guiado/comunes';
import { RadioCircle } from '@/components/primitives/RadioCircle';

export function EstiloStep({
  estilo,
  estancia,
  plazo,
  presupuesto,
  onChange,
  errors
}: {
  estilo: string;
  estancia: string;
  plazo: string;
  presupuesto: string;
  onChange: (k: 'estilo' | 'estancia' | 'plazo' | 'presupuesto', v: string) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <h2
        className="display"
        style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em', marginBottom: 12 }}
      >
        Estilo, estancia y plazo.
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
        Para entender el contexto del mueble.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <CardGroup
          label="¿Qué estilo te gusta?"
          opciones={ESTILOS}
          value={estilo}
          onChange={(v) => onChange('estilo', v)}
          error={errors.estilo}
        />
        <CardGroup
          label="¿En qué estancia irá?"
          opciones={ESTANCIAS}
          value={estancia}
          onChange={(v) => onChange('estancia', v)}
          error={errors.estancia}
          compact
        />
        <CardGroup
          label="Plazo deseado"
          opciones={PLAZOS}
          value={plazo}
          onChange={(v) => onChange('plazo', v)}
          error={errors.plazo}
        />
        <CardGroup
          label="Presupuesto orientativo"
          opciones={PRESUPUESTOS}
          value={presupuesto}
          onChange={(v) => onChange('presupuesto', v)}
          error={errors.presupuesto}
          compact
        />
      </div>
    </div>
  );
}

function CardGroup({
  label,
  opciones,
  value,
  onChange,
  error,
  compact
}: {
  label: string;
  opciones: { id: string; label: string; descripcion?: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  compact?: boolean;
}) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 12 }}>{label}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: compact
            ? 'repeat(auto-fill, minmax(180px, 1fr))'
            : 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 8
        }}
      >
        {opciones.map((o) => {
          const checked = value === o.id;
          return (
            <label
              key={o.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 14px',
                border: `1px solid ${checked ? 'var(--text)' : 'var(--border-soft)'}`,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'border-color 150ms ease',
                fontSize: 14
              }}
            >
              <input
                type="radio"
                name={label}
                checked={checked}
                onChange={() => onChange(o.id)}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              <span style={{ marginTop: 1 }}><RadioCircle checked={checked} /></span>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 500 }}>{o.label}</span>
                {o.descripcion && (
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {o.descripcion}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {error && <div style={{ fontSize: 13, color: 'var(--error)', marginTop: 8 }}>{error}</div>}
    </div>
  );
}
