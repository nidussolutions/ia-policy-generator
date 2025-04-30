'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postWithAuth } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import { ToastContainer } from 'react-toastify';
import { notifyError } from '@/hooks/useToast';
import { motion } from 'framer-motion';
import { SiteType } from '@/types/SitesType';
import { useI18n } from '@/contexts/I18nContext';
import { useTheme } from '@/components/ThemeContext';

export default function NewSitePage() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [site, setSite] = useState<SiteType>({
    name: '',
    domain: '',
    language: '',
    legislation: '',
    observations: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/sites`,
        site,
        token
      );
      if (response.error) {
        notifyError(response.error);
      } else {
        router.push('/sites');
      }
    } catch (err) {
      console.error('Error while creating site:', err);
      notifyError('Unexpected error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSite((current) => ({ ...current, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary">
      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 space-y-8"
        >
          <ToastContainer />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => router.back()}
              className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">{t('sites.new.title')}</h1>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                label: t('sites.new.siteName'),
                name: 'name',
                placeholder: t('sites.new.placeholders.siteName'),
              },
              {
                label: t('sites.new.domain'),
                name: 'domain',
                placeholder: t('sites.new.placeholders.domain'),
              },
              {
                label: t('sites.new.language'),
                name: 'language',
                placeholder: t('sites.new.placeholders.language'),
              },
              {
                label: t('sites.new.legislation'),
                name: 'legislation',
                placeholder: t('sites.new.placeholders.legislation'),
              },
            ].map(({ label, name, placeholder }, idx) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  {label}
                </label>
                <input
                  name={name}
                  type="text"
                  placeholder={placeholder}
                  value={(site as any)[name]}
                  onChange={handleChange}
                  required
                  className="w-full bg-light-card dark:bg-dark-card/40 backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl px-3 py-2 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">{t('sites.new.notes')}</label>
              <textarea
                name="observations"
                placeholder={t('sites.new.placeholders.notes')}
                value={site.observations}
                onChange={handleChange}
                rows={4}
                className="w-full bg-light-card dark:bg-dark-card/40 backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl px-3 py-2 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-purple-hover dark:hover:bg-dark-purple-hover text-light-background dark:text-dark-background rounded-xl px-4 py-2 font-semibold transition disabled:opacity-50"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? t('sites.new.buttons.saving') : t('sites.new.buttons.create')}
            </motion.button>
          </form>
        </motion.div>
      </Layout>
    </main>
  );
}
