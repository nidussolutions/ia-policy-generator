import './globals.css';
import {Inter} from 'next/font/google';
import {I18nProvider} from '../contexts/I18nContext';
import {ThemeProvider} from '../components/ThemeContext';
import React from "react";
import Footer from "@/components/Footer";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({subsets: ['latin']});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>
        <ThemeProvider>
            <I18nProvider>
                {children}
                <Footer/>
            </I18nProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}