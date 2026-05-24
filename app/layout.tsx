import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'MeteorPC — Marketplace Sparepart Laptop & Laptop Second', template: '%s | MeteorPC' },
  description: 'Marketplace khusus sparepart laptop & laptop second. Fee rendah 2%, Safe Trading escrow, seller terverifikasi.',
  keywords: ['sparepart laptop', 'laptop second', 'RAM', 'SSD', 'marketplace PC', 'MeteorPC'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        {children}
      </body>
    </html>
  );
}
