'use client';

import type { Canal } from '@/lib/guiado/types';
import { LineInput } from '@/components/primitives/LineInput';
import { RadioCircle } from '@/components/primitives/RadioCircle';
import { CANALES, ENTREGAS } from '@/lib/guiado/comunes';

export function DatosStep({
  nombre,
  email,
  telefono,
  ciudad,
  cp,
  entrega,
  canal,
  onChange,
  errors
}: {
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  cp: string;
  entrega: string;
  canal: Canal;
  onChange: (k: 'nombre' | 'email' | 'telefono' | 'ciudad' | 'cp' | 'entrega' | 'canal', v: string) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <h2
        className="display"
        style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em', marginBottom: 12 }}
      >
        Tus datos.
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
        Solo lo necesario para poder responderte.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <LineInput
          label="Nombre"
          value={nombre}
          onChange={(v) => onChange('nombre', v)}
          error={errors.nombre}
          size="md"
        />
        <LineInput
          label="Email"
          value={email}
          onChange={(v) => onChange('email', v)}
          type="email"
          inputMode="email"
          error={errors.email}
          size="md"
        />
        <LineInput
          label="Teléfono (opcional)"
          value={telefono}
          onChange={(v) => onChange('telefono', v)}
          type="tel"
          inputMode="tel"
          error={errors.telefono}
          size="md"
        />
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <LineInput
            label="Ciudad"
            value={ciudad}
            onChange={(v) => onChange('ciudad', v)}
            size="md"
          />
          <LineInput
            label="CP (opcional)"
            value={cp}
            onChange={(v) => onChange('cp', v)}
            inputMode="numeric"
            size="md"
          />
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Entrega</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ENTREGAS.map((e) => {
            const checked = entrega === e.id;
            return (
              <label
                key={e.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  border: `1px solid ${checked ? 'var(--text)' : 'var(--border-soft)'}`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 15
                }}
              >
                <input
                  type="radio"
                  name="entrega"
                  checked={checked}
                  onChange={() => onChange('entrega', e.id)}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                />
                <RadioCircle checked={checked} />
                <span>{e.label}</span>
              </label>
            );
          })}
        </div>
        {errors.entrega && (
          <div style={{ fontSize: 13, color: 'var(--error)', marginTop: 8 }}>{errors.entrega}</div>
        )}
      </div>

      <div style={{ marginTop: 40 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          ¿Por dónde prefieres que te respondamos?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CANALES.map((c) => {
            const checked = canal === c.id;
            return (
              <label
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  border: `1px solid ${checked ? 'var(--text)' : 'var(--border-soft)'}`,
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="canal"
                  value={c.id}
                  checked={checked}
                  onChange={() => onChange('canal', c.id)}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                />
                <RadioCircle checked={checked} />
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 500 }}>{c.label}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{c.hint}</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
