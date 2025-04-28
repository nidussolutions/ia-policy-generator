'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { I18nProvider } from '../contexts/I18nContext';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>{children}</I18nProvider>
        <GoogleAnalytics gaId="G-P99YBJN20E" />
      </body>
    </html>
  );
}
