import Link from 'next/link';
import { Container } from '@/components/primitives/Container';

export const metadata = {
  title: 'Shibbi — Presupuesto guiado',
  description: 'Te hacemos las preguntas necesarias para entender tu mueble, paso a paso.'
};

export default function GuiadoPage() {
  return (
    <Container>
      <section style={{ paddingTop: 96, paddingBottom: 96, maxWidth: 720 }}>
        <span className="eyebrow" style={{ display: 'inline-block', marginBottom: 16 }}>
          Guiado
        </span>
        <h1
          className="display"
          style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 24
          }}
        >
          Te ayudamos paso a paso.
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 32 }}>
          Te haremos las preguntas necesarias para entender qué mueble quieres, cómo lo
          imaginas y dónde irá. Al terminar, recibimos un brief completo y te respondemos
          con propuesta personal.
        </p>

        <div
          style={{
            padding: 24,
            border: '1px dashed var(--border)',
            borderRadius: 8,
            color: 'var(--text-muted)',
            fontSize: 14,
            marginBottom: 32
          }}
        >
          Estamos preparando el cuestionario. Pronto podrás empezar desde aquí.
        </div>

        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 20px',
            border: '1px solid var(--border)',
            borderRadius: 4,
            color: 'var(--text-muted)',
            fontWeight: 500
          }}
        >
          ← Volver al inicio
        </Link>
      </section>
    </Container>
  );
}
