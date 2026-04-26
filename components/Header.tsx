import { Container } from '@/components/primitives/Container';

export function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'var(--header-bg)',
        backdropFilter: 'saturate(180%) blur(12px)',
        WebkitBackdropFilter: 'saturate(180%) blur(12px)',
        borderBottom: '1px solid var(--border-soft)',
        height: 64
      }}
    >
      <Container
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div className="display" style={{ fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em' }}>
          Shibbi
        </div>
        <div className="eyebrow hide-mobile">Presupuesto a medida</div>
      </Container>
    </header>
  );
}
