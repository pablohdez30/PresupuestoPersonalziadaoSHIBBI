'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/primitives/Container';

type Tab = {
  href: string;
  label: string;
  tagline: string;
  icon: string;
  disabled?: boolean;
  beta?: boolean;
};

const TABS: Tab[] = [
  { href: '/rapido', label: 'Rápido',   tagline: 'Cuéntanoslo a tu manera',  icon: '⚡' },
  { href: '/guiado', label: 'Guiado',   tagline: 'Te ayudamos paso a paso',  icon: '📋' },
  { href: '/medida', label: 'A medida', tagline: 'Diseña tú mismo',          icon: '🎛', disabled: true, beta: true }
];

export function TabsMenu() {
  const pathname = usePathname() ?? '/';

  return (
    <nav
      aria-label="Tipo de presupuesto"
      style={{
        position: 'sticky',
        top: 64,
        zIndex: 35,
        background: 'rgba(250,250,250,0.92)',
        backdropFilter: 'saturate(180%) blur(12px)',
        WebkitBackdropFilter: 'saturate(180%) blur(12px)',
        borderBottom: '1px solid var(--border-soft)'
      }}
    >
      <Container style={{ padding: 0 }}>
        <ul
          className="tabs-scroll"
          style={{
            display: 'flex',
            gap: 0,
            margin: 0,
            padding: '0 var(--side-pad)',
            listStyle: 'none',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {TABS.map((tab) => {
            const active = pathname === tab.href || pathname.startsWith(tab.href + '/');
            return (
              <li key={tab.href} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                <TabItem tab={tab} active={active} />
              </li>
            );
          })}
        </ul>
      </Container>

      <style jsx>{`
        .tabs-scroll::-webkit-scrollbar { display: none; }
        .tabs-scroll { scrollbar-width: none; }
      `}</style>
    </nav>
  );
}

function TabItem({ tab, active }: { tab: Tab; active: boolean }) {
  const baseStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    gap: 2,
    padding: '14px 20px 12px',
    borderBottom: '2px solid transparent',
    transition: 'border-color 160ms ease, color 160ms ease',
    fontFamily: 'inherit',
    fontSize: 14,
    lineHeight: 1.2,
    whiteSpace: 'nowrap' as const
  };

  const labelRow = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span aria-hidden style={{ fontSize: 15 }}>{tab.icon}</span>
      <span style={{ fontWeight: 500 }}>{tab.label}</span>
      {tab.beta && (
        <span
          style={{
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            padding: '2px 6px',
            borderRadius: 4
          }}
        >
          Beta
        </span>
      )}
    </span>
  );

  const tagline = (
    <span
      style={{
        fontSize: 12,
        color: active ? 'var(--text-muted)' : 'transparent',
        height: 14,
        transition: 'color 160ms ease'
      }}
    >
      {tab.tagline}
    </span>
  );

  if (tab.disabled) {
    return (
      <span
        aria-disabled="true"
        title="En desarrollo — disponible pronto"
        style={{
          ...baseStyle,
          color: 'var(--text-muted)',
          opacity: 0.55,
          cursor: 'not-allowed'
        }}
      >
        {labelRow}
        {tagline}
      </span>
    );
  }

  return (
    <Link
      href={tab.href}
      style={{
        ...baseStyle,
        color: active ? 'var(--text)' : 'var(--text-muted)',
        borderBottomColor: active ? 'var(--text)' : 'transparent'
      }}
    >
      {labelRow}
      {tagline}
    </Link>
  );
}
