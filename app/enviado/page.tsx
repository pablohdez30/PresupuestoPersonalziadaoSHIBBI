import Link from 'next/link';
import { Container } from '@/components/primitives/Container';

export const metadata = {
  title: 'Shibbi — Consulta recibida',
  description: 'Hemos recibido tu consulta. Te responderemos en 24-48 horas.'
};

export default function EnviadoPage({
  searchParams
}: {
  searchParams: { tipo?: string };
}) {
  const tipo = searchParams.tipo;

  return (
    <Container>
      <section
        style={{
          paddingTop: 120,
          paddingBottom: 120,
          maxWidth: 640,
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        <div
          aria-hidden
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--accent-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            fontSize: 28
          }}
        >
          ✓
        </div>

        <span className="eyebrow" style={{ display: 'inline-block', marginBottom: 16 }}>
          {tipo === 'rapido' ? 'Presupuesto rápido' : tipo === 'guiado' ? 'Presupuesto guiado' : 'Consulta'} · Recibida
        </span>

        <h1
          className="display"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 24
          }}
        >
          Gracias. Estamos en ello.
        </h1>

        <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 16 }}>
          Hemos recibido tu consulta. Te respondemos en <strong style={{ color: 'var(--text)' }}>24-48 horas</strong> con
          una propuesta personal.
        </p>

        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 48 }}>
          Si necesitas decirnos algo más, escríbenos a{' '}
          <a href="mailto:shibbishop@gmail.com" style={{ textDecoration: 'underline' }}>
            shibbishop@gmail.com
          </a>
          .
        </p>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '14px 24px',
            border: '1px solid var(--text)',
            borderRadius: 4,
            fontWeight: 500
          }}
        >
          Volver al inicio
        </Link>
      </section>
    </Container>
  );
}
