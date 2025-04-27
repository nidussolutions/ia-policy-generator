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
            ? 'bg-[#8C0368] text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => changeLanguage('pt')}
        className={`px-2 py-1 rounded ${
          language === 'pt'
            ? 'bg-[#8C0368] text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        PT
      </motion.button>
    </div>
  );
}
