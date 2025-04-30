'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion';

const CookieConsent: React.FC = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('cookieConsent') === 'accepted';
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-light-card dark:bg-dark-card shadow-lg border-t border-light-border dark:border-dark-border"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-light-text-primary dark:text-dark-text-primary text-center md:text-left">
          <p className="text-sm md:text-base">{t('cookieConsent.message')}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-light-accent-purple dark:bg-[#8C0368] text-white rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            {t('cookieConsent.accept')}
          </button>
          <a
            href="jur/privacy-policy"
            className="px-4 py-2 border border-light-border dark:border-dark-border rounded-md text-sm font-medium hover:bg-light-background dark:hover:bg-dark-card transition"
          >
            {t('cookieConsent.learnMore')}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieConsent;