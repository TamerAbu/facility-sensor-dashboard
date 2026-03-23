import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { AppShell } from '@/components/layout/app-shell';

import './globals.css';

const notoSansHebrew = localFont({
  src: './fonts/NotoSansHebrew-Variable.ttf',
  variable: '--font-sans',
  display: 'swap',
});

const splineSansMono = localFont({
  src: './fonts/SplineSansMono-Variable.ttf',
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'agriQ — Facility Sensor Dashboard',
  description: 'Grain storage monitoring dashboard for warehouse operators',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSansHebrew.variable} ${splineSansMono.variable} h-full antialiased`}
      style={{ colorScheme: 'light' }}
    >
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
