'use client';

import React, { useState } from 'react';
import { useRecovery } from '@/hooks/useRecovery';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

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

export default function ForgotPasswordPage() {
  const { handleForgot, loading, error, setError } = useRecovery();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!email) return alert('Email is required');

    try {
      await handleForgot(email);
      if (!error) {
        setSent(true);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to send recovery email');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--color-dark-deep-blue)] via-[var(--color-dark-purple-light)] to-[var(--color-dark-deep-blue)] px-4">
      <motion.div
        className="w-full max-w-md p-8 bg-[var(--color-dark-card)]/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-[var(--color-dark-purple)]/20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-3xl font-extrabold text-[var(--color-dark-purple)]"
          >
            <ArrowLeft className="w-6 h-6" />
            Back
          </Link>
          <h2 className="mt-4 text-xl font-semibold text-[var(--color-dark-text-primary)]">
            Forgot your password?
          </h2>
        </motion.div>

        {sent ? (
          <motion.div
            className="text-center text-emerald-400"
            variants={itemVariants}
          >
            Recovery email sent! Please check your inbox.
          </motion.div>
        ) : (
          <motion.form className="space-y-6" variants={containerVariants}>
            {error && (
              <motion.div
                className="mb-4 text-sm text-red-400 bg-[var(--color-dark-deep-blue)]/30 px-4 py-2 rounded-lg text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-[var(--color-dark-text-secondary)] mb-1">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-dark-text-secondary)]">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="youremail@example.com"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--color-dark-deep-blue)]/20 border border-transparent focus:border-[var(--color-dark-purple)] focus:ring-0 text-[var(--color-dark-text-primary)] placeholder-[var(--color-dark-text-secondary)]"
                />
              </div>
            </motion.div>

            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-full font-medium bg-[var(--color-dark-purple)] hover:bg-[var(--color-dark-purple-hover)] transition-transform disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-dark-text-primary)]"
              variants={itemVariants}
            >
              {loading ? 'Sending...' : 'Send Recovery Email'}
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </main>
  );
}
