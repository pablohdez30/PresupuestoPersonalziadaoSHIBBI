'use client';

import type { Pregunta } from '@/lib/guiado/types';
import { LineInput } from '@/components/primitives/LineInput';
import { RadioCircle } from '@/components/primitives/RadioCircle';

export function Field({
  pregunta,
  value,
  onChange,
  error
}: {
  pregunta: Pregunta;
  value: string | number | undefined;
  onChange: (v: string | number) => void;
  error?: string;
}) {
  if (pregunta.tipo === 'select') {
    return (
      <SelectGroup
        label={pregunta.label}
        ayuda={pregunta.ayuda}
        opciones={pregunta.opciones}
        value={String(value ?? '')}
        onChange={onChange}
        error={error}
      />
    );
  }

  if (pregunta.tipo === 'numero') {
    return (
      <LineInput
        label={pregunta.label + (pregunta.opcional ? ' (opcional)' : '')}
        value={value ?? ''}
        onChange={(v) => onChange(v === '' ? '' : Number(v))}
        type="number"
        inputMode="numeric"
        suffix={pregunta.sufijo}
        error={error}
        size="md"
      />
    );
  }

  if (pregunta.tipo === 'texto') {
    return (
      <div>
        <label className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>
          {pregunta.label}
        </label>
        <textarea
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder={pregunta.placeholder}
          rows={6}
          style={{
            width: '100%',
            padding: 16,
            border: `1px solid ${error ? 'var(--error)' : 'var(--border-soft)'}`,
            borderRadius: 6,
            fontFamily: 'inherit',
            fontSize: 16,
            lineHeight: 1.5,
            resize: 'vertical',
            background: 'var(--surface)',
            color: 'var(--text)'
          }}
        />
        {pregunta.ayuda && (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>{pregunta.ayuda}</p>
        )}
        {error && (
          <div style={{ fontSize: 13, color: 'var(--error)', marginTop: 8 }}>{error}</div>
        )}
      </div>
    );
  }

  return null;
}

function SelectGroup({
  label,
  ayuda,
  opciones,
  value,
  onChange,
  error
}: {
  label: string;
  ayuda?: string;
  opciones: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 12 }}>{label}</div>
      {ayuda && (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>{ayuda}</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {opciones.map((o) => {
          const checked = value === o.id;
          return (
            <label
              key={o.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                border: `1px solid ${checked ? 'var(--text)' : 'var(--border-soft)'}`,
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'border-color 150ms ease',
                fontSize: 15
              }}
            >
              <input
                type="radio"
                name={label}
                checked={checked}
                onChange={() => onChange(o.id)}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              <RadioCircle checked={checked} />
              <span>{o.label}</span>
            </label>
          );
        })}
      </div>
      {error && <div style={{ fontSize: 13, color: 'var(--error)', marginTop: 8 }}>{error}</div>}
    </div>
  );
}
