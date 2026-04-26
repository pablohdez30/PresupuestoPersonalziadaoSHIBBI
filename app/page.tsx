import Link from 'next/link';
import { Container } from '@/components/primitives/Container';
import { IconBolt, IconList } from '@/components/icons/Icons';
import type { ComponentType, SVGProps } from 'react';

const OPCIONES: {
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  descripcion: string;
  cta: string;
}[] = [
  {
    href: '/rapido',
    Icon: IconBolt,
    label: 'Rápido',
    descripcion: 'Si ya tienes claro lo que buscas. Cuéntanoslo en un mensaje, súbenos fotos y te respondemos en 24-48 h.',
    cta: 'Empezar rápido'
  },
  {
    href: '/guiado',
    Icon: IconList,
    label: 'Guiado',
    descripcion: 'Si no sabes por dónde empezar. Te haremos las preguntas necesarias para entender tu mueble paso a paso.',
    cta: 'Empezar guiado'
  }
];

export default function HomePage() {
  return (
    <Container>
      <section style={{ paddingTop: 96, paddingBottom: 64 }}>
        <h1
          className="display"
          style={{
            fontSize: 'clamp(48px, 7vw, 88px)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            marginBottom: 32,
            textWrap: 'balance' as 'balance'
          }}
        >
          Pide tu mueble.
          <br />
          A tu manera.
        </h1>
        <p style={{ fontSize: 19, color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.5 }}>
          Cuéntanos qué tienes en mente. Te respondemos con propuesta personal en 24-48 horas.
          <br />
          Elige cómo prefieres hacerlo.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          paddingBottom: 96
        }}
      >
        {OPCIONES.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              padding: 32,
              border: '1px solid var(--border-soft)',
              borderRadius: 8,
              background: 'var(--surface)',
              transition: 'border-color 160ms ease, transform 160ms ease'
            }}
          >
            <o.Icon width={32} height={32} aria-hidden style={{ color: 'var(--text)' }} />
            <h2 className="display" style={{ fontSize: 28, letterSpacing: '-0.02em' }}>
              {o.label}
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{o.descripcion}</p>
            <span
              style={{
                marginTop: 'auto',
                paddingTop: 12,
                fontSize: 14,
                fontWeight: 500
              }}
            >
              {o.cta} →
            </span>
          </Link>
        ))}
      </section>
    </Container>
  );
}
