import Link from 'next/link';
import { Container } from '@/components/primitives/Container';

export const metadata = {
  title: 'Shibbi — Presupuesto rápido',
  description: 'Cuéntanos qué mueble buscas en un mensaje y te respondemos en 24-48 h.'
};

export default function RapidoPage() {
  return (
    <Container>
      <section style={{ paddingTop: 96, paddingBottom: 96, maxWidth: 720 }}>
        <span className="eyebrow" style={{ display: 'inline-block', marginBottom: 16 }}>
          Rápido
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
          ¿Tienes claro lo que quieres?
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 32 }}>
          Cuéntanoslo en un mensaje, súbenos las fotos que quieras de inspiración y te
          respondemos en 24-48 horas. Sin formularios largos.
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
          Estamos terminando esta pantalla. Mientras tanto, puedes usar la versión guiada
          o escribirnos directamente.
        </div>

        <Link
          href="/guiado"
          style={{
            display: 'inline-block',
            padding: '12px 20px',
            border: '1px solid var(--text)',
            borderRadius: 4,
            fontWeight: 500
          }}
        >
          Ir al presupuesto guiado →
        </Link>
      </section>
    </Container>
  );
}
