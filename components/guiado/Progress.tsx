export function Progress({
  paso,
  total,
  titulo
}: {
  paso: number;
  total: number;
  titulo: string;
}) {
  const pct = Math.round((paso / total) * 100);
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 12
        }}
      >
        <span className="eyebrow">
          Paso {paso} de {total} · {titulo}
        </span>
        <span className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: 2,
          background: 'var(--border-soft)',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: 'var(--text)',
            transition: 'width 240ms ease'
          }}
        />
      </div>
    </div>
  );
}
