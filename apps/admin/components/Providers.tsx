'use client';

import React from 'react';
import {ThemeProvider} from '@/contexts/ThemeContext';
import {I18nProvider} from '@/contexts/I18nContext';

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <I18nProvider>
                {children}
            </I18nProvider>
        </ThemeProvider>
    );
}
