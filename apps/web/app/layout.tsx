import './globals.css';
import React, {ReactNode} from 'react';
import {Inter} from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'Legal Forge',
    description: 'Geração de termos e políticas com IA',
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
    },
};

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
        <body
            className={`${inter.className} bg-white text-black transition-colors duration-300 dark:bg-gray-950 dark:text-white mb-8`}
        >
        {children}
        <Footer/>
        </body>
        </html>
    );
}
