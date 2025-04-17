import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Legal Forge',
  description: 'Geração de termos e políticas com IA',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
