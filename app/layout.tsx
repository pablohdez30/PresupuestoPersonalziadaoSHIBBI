import type { Metadata } from 'next';
import { Fraunces, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { TabsMenu } from '@/components/TabsMenu';
import { Container } from '@/components/primitives/Container';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-display',
  display: 'swap'
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap'
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Shibbi — Pide tu mueble a medida',
  description:
    'Cuéntanos qué mueble buscas. Te respondemos con propuesta personal en 24-48 h.',
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <Header />
        <TabsMenu />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-soft)',
        padding: '48px 0 96px',
        marginTop: 96,
        marginBottom: 80
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: 16
          }}
        >
          <div className="display" style={{ fontSize: 18 }}>Shibbi</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
            shibbishop.com · Taller en España
          </div>
        </div>
      </Container>
    </footer>
  );
}
