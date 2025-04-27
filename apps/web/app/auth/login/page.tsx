'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/contexts/I18nContext';

// Animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

export default function LoginPage() {
  const { t } = useI18n();
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    if (token) router.push('/dashboard');
  }, [router]);

  if (!mounted) {
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const err = await login(email, password);
      if (err) setError(err);
      else router.push('/dashboard');
    } catch {
      setError('Error logging in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] px-4">
      <motion.div
        className="w-full max-w-md p-8 bg-[#1E0359]/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#8C0368]/20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Logo & Title */}
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-3xl font-extrabold text-[#A429A6]"
          >
            <LogIn className="w-7 h-7" />
            Legal Forge
          </Link>
          <h2 className="mt-4 text-xl font-semibold text-gray-200">
            {t('login.title')}
          </h2>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="mb-4 text-sm text-red-400 bg-red-900/30 px-4 py-2 rounded-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleLogin}
          className="space-y-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('login.email')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t('login.emailPlaceholder')}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#030526]/20 border border-transparent focus:border-[#8C0368] focus:ring-0 text-gray-200 placeholder-gray-500"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('login.password')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t('login.passwordPlaceholder')}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#030526]/20 border border-transparent focus:border-[#8C0368] focus:ring-0 text-gray-200 placeholder-gray-500"
              />
            </div>
          </motion.div>

          <motion.p
            className="text-end text-sm text-gray-400"
            variants={itemVariants}
          >
            {t('login.forgotPassword')}{' '}
            <Link
              href="/auth/forgot-password"
              className="text-[#A429A6] hover:underline"
            >
              {t('login.resetPassword')}
            </Link>
          </motion.p>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium bg-[#8C0368] hover:bg-[#A429A6] transition-transform disabled:opacity-50 disabled:cursor-not-allowed text-white"
            variants={itemVariants}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />{' '}
                {t('login.loggingIn')}
              </>
            ) : (
              t('login.submit')
            )}
          </motion.button>
        </motion.form>

        <motion.p
          className="mt-6 text-center text-sm text-gray-400"
          variants={itemVariants}
        >
          {t('login.noAccount')}{' '}
          <Link
            href="/auth/register"
            className="text-[#A429A6] hover:underline"
          >
            {t('login.signUp')}
          </Link>
        </motion.p>
      </motion.div>
    </main>
  );
}
