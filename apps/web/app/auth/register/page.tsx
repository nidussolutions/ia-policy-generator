'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Mail, Lock, User, UserPlus, Loader2, Eye, EyeOff } from 'lucide-react';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { motion } from 'framer-motion';
import { fetcher } from '@/lib/api';
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

export default function RegisterPage() {
  const { t } = useI18n();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [cpfCnpjError, setCpfCnpjError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetcher(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/validatingExpiredToken`,
        token
      )
        .then((res) => res.valid && (window.location.href = '/dashboard'))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const validateEmail = (value: string) =>
    /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
  const validatePassword = (value: string) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(value);
  const formatCpfCnpj = (val: string) => {
    const digits = val.replace(/\D/g, '');
    return digits.length <= 11 ? cpf.format(digits) : cnpj.format(digits);
  };
  const handleCpfCnpj = (val: string) => setCpfCnpj(formatCpfCnpj(val));

  const validateForm = () => {
    let ok = true;
    if (!validateEmail(email)) {
      setEmailError('Invalid email');
      ok = false;
    } else setEmailError('');
    if (!validatePassword(password)) {
      setPasswordError('Pwd ≥6 chars, uppercase, number & symbol');
      ok = false;
    } else setPasswordError('');
    const digits = cpfCnpj.replace(/\D/g, '');
    if (
      (digits.length <= 11 && !cpf.isValid(digits)) ||
      (digits.length > 11 && !cnpj.isValid(digits))
    ) {
      setCpfCnpjError(digits.length <= 11 ? 'Invalid CPF' : 'Invalid CNPJ');
      ok = false;
    } else setCpfCnpjError('');
    return ok;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    try {
      const err = await register(name, email, password, cpfCnpj, true);
      if (err) setError('Error creating account. Please try again.');
    } catch {
      setError('Error creating account. Please try again.');
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
        {/* Header */}
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-3xl font-extrabold text-[#A429A6]"
          >
            <UserPlus className="w-7 h-7" /> Legal Forge
          </Link>
          <h2 className="mt-4 text-xl font-semibold text-gray-200">
            {t('register.title')}
          </h2>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            className="mb-4 text-sm text-red-400 bg-red-900/30 px-4 py-2 rounded-lg text-center"
            variants={itemVariants}
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleRegister}
          className="space-y-6"
          variants={containerVariants}
        >
          {/* Name */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('register.name')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={t('register.placeholderName')}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#030526]/20 border border-transparent focus:border-[#8C0368] focus:ring-0 text-gray-200 placeholder-gray-500"
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('register.email')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('register.placeholderEmail')}
                className={`w-full pl-10 pr-4 py-2 rounded-lg bg-[#030526]/20 border ${emailError ? 'border-red-500' : 'border-transparent'} focus:border-[#8C0368] focus:ring-0 text-gray-200 placeholder-gray-500`}
              />
            </div>
            {emailError && (
              <p className="mt-1 text-sm text-red-400">{emailError}</p>
            )}
          </motion.div>
          {/* CPF/CNPJ */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('register.cnpjCpf')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <input
                required
                type="text"
                value={cpfCnpj}
                onChange={(e) => handleCpfCnpj(e.target.value)}
                placeholder={t('register.placeholderCnpjCpf')}
                className={`w-full pl-10 pr-4 py-2 rounded-lg bg-[#030526]/20 border ${cpfCnpjError ? 'border-red-500' : 'border-transparent'} focus:border-[#8C0368] focus:ring-0 text-gray-200 placeholder-gray-500`}
              />
            </div>
            {cpfCnpjError && (
              <p className="mt-1 text-sm text-red-400">{cpfCnpjError}</p>
            )}
          </motion.div>
          {/* Password */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('placeholderPassword')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('register.placeholderPassword')}
                className={`w-full pl-10 pr-10 py-2 rounded-lg bg-[#030526]/20 border ${passwordError ? 'border-red-500' : 'border-transparent'} focus:border-[#8C0368] focus:ring-0 text-gray-200 placeholder-gray-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError && (
              <p className="mt-1 text-sm text-red-400">{passwordError}</p>
            )}
          </motion.div>
          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium bg-[#8C0368] hover:bg-[#A429A6] disabled:opacity-50 disabled:cursor-not-allowed text-white transition-transform"
            variants={itemVariants}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Registering...
              </>
            ) : (
              <p>{t('register.button')}</p>
            )}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p
          className="mt-6 text-center text-sm text-gray-400"
          variants={itemVariants}
        >
          {t('register.alreadyHaveAccount')}{' '}
          <Link href="/auth/login" className="text-[#A429A6] hover:underline">
            {t('logIn')}
          </Link>
        </motion.p>
      </motion.div>
    </main>
  );
}
