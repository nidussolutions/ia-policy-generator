import './globals.css';
import {Inter} from 'next/font/google';
import React from "react";
import Providers from '@/components/Providers';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'Admin Panel - Legal Forge',
    description: 'Admin panel for Legal Forge',
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>
            <Providers>
                {children}
            </Providers>
        </body>
        </html>
    );
}
