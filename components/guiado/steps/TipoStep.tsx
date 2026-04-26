'use client';

import type { ComponentType, SVGProps } from 'react';
import type { TipoMueble } from '@/lib/guiado/types';
import { TIPOS } from '@/lib/guiado/comunes';
import {
  IconMesa,
  IconSilla,
  IconEstanteria,
  IconEspejo,
  IconAparador,
  IconCabecero,
  IconOtro
} from '@/components/icons/Icons';

const ICONO: Record<TipoMueble, ComponentType<SVGProps<SVGSVGElement>>> = {
  mesa: IconMesa,
  silla: IconSilla,
  estanteria: IconEstanteria,
  espejo: IconEspejo,
  aparador: IconAparador,
  cabecero: IconCabecero,
  otro: IconOtro
};

export function TipoStep({
  value,
  onChange
}: {
  value: TipoMueble | null;
  onChange: (v: TipoMueble) => void;
}) {
  return (
    <div>
      <h2
        className="display"
        style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em', marginBottom: 12 }}
      >
        ¿Qué tipo de mueble tienes en mente?
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
        Elige el que más se acerque. Si no encaja en ninguno, marca "Otro".
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12
        }}
      >
        {TIPOS.map((t) => {
          const checked = value === t.id;
          const Icon = ICONO[t.id];
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 12,
                padding: 20,
                border: `1px solid ${checked ? 'var(--text)' : 'var(--border-soft)'}`,
                borderRadius: 8,
                background: checked ? 'var(--accent-bg)' : 'var(--surface)',
                textAlign: 'left',
                transition: 'border-color 150ms ease, background 150ms ease',
                minHeight: 130,
                color: 'var(--text)'
              }}
            >
              <Icon width={28} height={28} aria-hidden />
              <span style={{ fontSize: 16, fontWeight: 500 }}>{t.label}</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {t.descripcion}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
