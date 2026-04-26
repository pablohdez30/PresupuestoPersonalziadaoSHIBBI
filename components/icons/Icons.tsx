import type { SVGProps } from 'react';

const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  width: 24,
  height: 24
};

type Props = SVGProps<SVGSVGElement>;

export function IconBolt(props: Props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M13 3 L5 13 h6 l-1 8 8-10 h-6 l1-8 z" />
    </svg>
  );
}

export function IconList(props: Props) {
  return (
    <svg {...baseProps} {...props}>
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
      <circle cx="5" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCheck(props: Props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 12 l5 5 l9 -10" />
    </svg>
  );
}

export function IconMesa(props: Props) {
  return (
    <svg {...baseProps} {...props}>
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="6" y1="10" x2="6" y2="20" />
      <line x1="18" y1="10" x2="18" y2="20" />
    </svg>
  );
}

export function IconSilla(props: Props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M7 4 L7 14 L18 14" />
      <line x1="7" y1="14" x2="7" y2="20" />
      <line x1="18" y1="14" x2="18" y2="20" />
    </svg>
  );
}

export function IconEstanteria(props: Props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="0.5" />
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="5" y1="15" x2="19" y2="15" />
    </svg>
  );
}

export function IconEspejo(props: Props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6 12 C6 6 8 3 12 3 C16 3 18 6 18 12 L18 21 L6 21 Z" />
    </svg>
  );
}

export function IconAparador(props: Props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="6" width="18" height="13" rx="0.5" />
      <line x1="12" y1="6" x2="12" y2="19" />
      <circle cx="10" cy="12.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="14" cy="12.5" r="0.6" fill="currentColor" stroke="none" />
      <line x1="6" y1="19" x2="6" y2="21" />
      <line x1="18" y1="19" x2="18" y2="21" />
    </svg>
  );
}

export function IconCabecero(props: Props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 14 L4 5 L20 5 L20 14" />
      <line x1="2" y1="14" x2="22" y2="14" />
      <line x1="3" y1="14" x2="3" y2="19" />
      <line x1="21" y1="14" x2="21" y2="19" />
      <line x1="3" y1="19" x2="21" y2="19" />
    </svg>
  );
}

export function IconOtro(props: Props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="6" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
