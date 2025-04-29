'use client';

import { motion } from 'framer-motion';
import { useI18n } from '../contexts/I18nContext';

export function LanguageSelector() {
  const { language, changeLanguage } = useI18n();

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded ${
          language === 'en'
            ? 'bg-light-accent-purple dark:bg-dark-accent-purple text-light-background dark:text-dark-background'
            : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
        }`}
      >
        EN
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => changeLanguage('pt')}
        className={`px-2 py-1 rounded ${
          language === 'pt'
            ? 'bg-light-accent-purple dark:bg-dark-accent-purple text-light-background dark:text-dark-background'
            : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
        }`}
      >
        PT
      </motion.button>
    </div>
  );
}
