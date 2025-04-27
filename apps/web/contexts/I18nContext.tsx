'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../i18n/en';
import { pt } from '../i18n/pt';

export type Language = 'en' | 'pt';
type TranslationKeys = keyof typeof en;

const translations = {
  en,
  pt,
} as const;

interface I18nContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (path: string | string[]) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'pt')) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      const newLang = browserLang === 'pt' ? 'pt' : 'en';
      setLanguage(newLang);
      localStorage.setItem('language', newLang);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (path: string | string[]): string => {
    const keys = Array.isArray(path) ? path : path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current === undefined) return Array.isArray(path) ? path.join('.') : path;
      current = current[key];
    }
    
    return current || (Array.isArray(path) ? path.join('.') : path);
  };

  if (!isClient) {
    return null;
  }

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}