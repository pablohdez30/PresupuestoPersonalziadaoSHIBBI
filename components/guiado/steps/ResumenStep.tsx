'use client';

import type { GuiadoBrief } from '@/lib/guiado/types';
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

export function ResumenStep({
  brief,
  onJumpTo
}: {
  brief: GuiadoBrief;
  onJumpTo: (paso: number) => void;
}) {
  const tipoLabel = TIPOS.find((t) => t.id === brief.tipo)?.label ?? '—';
  const estiloLabel = ESTILOS.find((s) => s.id === brief.estilo)?.label ?? '—';
  const estanciaLabel = ESTANCIAS.find((e) => e.id === brief.estancia)?.label ?? '—';
  const plazoLabel = PLAZOS.find((p) => p.id === brief.plazo)?.label ?? '—';
  const presupuestoLabel = PRESUPUESTOS.find((p) => p.id === brief.presupuesto)?.label ?? '—';
  const entregaLabel = ENTREGAS.find((e) => e.id === brief.entrega)?.label ?? '—';
  const canalLabel = CANALES.find((c) => c.id === brief.canal)?.label ?? '—';

  const preguntasTipo = brief.tipo ? PREGUNTAS_POR_TIPO[brief.tipo] : [];

  return (
    <div>
      <h2
        className="display"
        style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em', marginBottom: 12 }}
      >
        Repasamos antes de enviar.
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
        Si algo no está bien, vuelve atrás con el botón de cada bloque.
      </p>

      <Bloque titulo="Mueble" onEdit={() => onJumpTo(1)}>
        <Linea k="Tipo" v={tipoLabel} />
        {preguntasTipo.map((p) => {
          const valor = brief.especifico[p.id];
          if (valor === undefined || valor === '' || valor === null) return null;
          let mostrar: string = String(valor);
          if (p.tipo === 'select') {
            mostrar = p.opciones.find((o) => o.id === valor)?.label ?? mostrar;
          } else if (p.tipo === 'numero' && p.sufijo) {
            mostrar = `${valor} ${p.sufijo}`;
          }
          return <Linea key={p.id} k={p.label} v={mostrar} />;
        })}
      </Bloque>

      <Bloque titulo="Contexto" onEdit={() => onJumpTo(3)}>
        <Linea k="Estilo" v={estiloLabel} />
        <Linea k="Estancia" v={estanciaLabel} />
        <Linea k="Plazo" v={plazoLabel} />
        <Linea k="Presupuesto" v={presupuestoLabel} />
      </Bloque>

      <Bloque titulo="Inspiración" onEdit={() => onJumpTo(4)}>
        <Linea
          k="Imágenes"
          v={brief.imagenes.length > 0 ? `${brief.imagenes.length} fotos subidas` : 'Sin imágenes'}
        />
        <Linea k="Notas" v={brief.notas || '—'} />
      </Bloque>

      <Bloque titulo="Tus datos" onEdit={() => onJumpTo(5)}>
        <Linea k="Nombre" v={brief.nombre} />
        <Linea k="Email" v={brief.email} />
        <Linea k="Teléfono" v={brief.telefono || '—'} />
        <Linea k="Ciudad" v={[brief.ciudad, brief.cp].filter(Boolean).join(' · ') || '—'} />
        <Linea k="Entrega" v={entregaLabel} />
        <Linea k="Respuesta" v={`Por ${canalLabel.toLowerCase()}`} />
      </Bloque>
    </div>
  );
}

function Bloque({
  titulo,
  onEdit,
  children
}: {
  titulo: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        border: '1px solid var(--border-soft)',
        borderRadius: 8,
        padding: 24,
        marginBottom: 16
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 16
        }}
      >
        <h3 className="eyebrow">{titulo}</h3>
        <button
          type="button"
          onClick={onEdit}
          style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            textDecoration: 'underline',
            background: 'none'
          }}
        >
          Editar
        </button>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </section>
  );
}

function Linea({ k, v }: { k: string; v: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(120px, 200px) 1fr',
        gap: 16,
        fontSize: 14,
        lineHeight: 1.5
      }}
    >
      <span style={{ color: 'var(--text-muted)' }}>{k}</span>
      <span style={{ color: 'var(--text)', wordBreak: 'break-word' }}>{v}</span>
    </div>
  );
}
