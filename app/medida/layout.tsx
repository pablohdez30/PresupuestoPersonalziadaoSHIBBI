import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shibbi — A medida (Beta)',
  description: 'Configurador a medida en pruebas. Acceso interno.',
  robots: { index: false, follow: false }
};

export default function MedidaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
