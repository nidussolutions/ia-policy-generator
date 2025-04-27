'use client';

import { useCallback, useEffect, useState } from 'react';
import { en } from '../i18n/en';
import { pt } from '../i18n/pt';

export type Language = 'en' | 'pt';

const translations = {
  en,
  pt,
} as const;

export function useI18n() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'pt')) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      setLanguage(browserLang === 'pt' ? 'pt' : 'en');
    }
  }, []);

  const changeLanguage = useCallback((newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  }, []);

  type Path = string | string[];

  const t = useCallback(
    (path: Path): string => {
      const keys = Array.isArray(path) ? path : path.split('.');
      let current: any = translations[language];

      for (const key of keys) {
        if (current === undefined)
          return Array.isArray(path) ? path.join('.') : path;
        current = current[key];
      }

      return current || (Array.isArray(path) ? path.join('.') : path);
    },
    [language]
  );

  return {
    language,
    changeLanguage,
    t,
  };
}
