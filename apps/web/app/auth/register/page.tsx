'use client';

import React, {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/useAuth';
import Link from 'next/link';
import {Mail, Lock, User, UserPlus, Loader2, Eye, EyeOff} from 'lucide-react';
import {cpf, cnpj} from 'cpf-cnpj-validator';
import {motion, AnimatePresence} from 'framer-motion';
import {fetcher} from '@/lib/api';
import {useI18n} from '@/contexts/I18nContext';

const containerVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96],
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.5,
        },
    },
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
};

const buttonVariants = {
    hover: {
        scale: 1.02,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10,
        },
    },
    tap: {scale: 0.98},
};

const inputVariants = {
    focus: {
        scale: 1.02,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 15,
        },
    },
};

export default function RegisterPage() {
    const {t, language} = useI18n();
    const {register} = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [termsConsent, setTermsConsent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [companyIdError, setCompanyIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [termsConsentError, setTermsConsentError] = useState('');

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
    const formatCompanyId = (val: string) => {
        const digits = val.replace(/\D/g, '');
        // Format Brazilian documents (CPF/CNPJ)
        if (/^\d+$/.test(digits)) {
            if (digits.length <= 11) return cpf.format(digits);
            if (digits.length <= 14) return cnpj.format(digits);
        }
        // For other international IDs, preserve the original input
        return val;
    };
    const handleCompanyId = (val: string) => setCompanyId(formatCompanyId(val));

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

        // Validate company ID
        if (companyId.trim() === '') {
            setCompanyIdError('Company ID is required');
            ok = false;
        } else {
            const digits = companyId.replace(/\D/g, '');
            // For Brazilian documents, validate strictly
            if (/^\d+$/.test(digits)) {
                if (digits.length <= 11 && !cpf.isValid(digits)) {
                    setCompanyIdError('Invalid CPF');
                    ok = false;
                } else if (digits.length > 11 && digits.length <= 14 && !cnpj.isValid(digits)) {
                    setCompanyIdError('Invalid CNPJ');
                    ok = false;
                } else {
                    setCompanyIdError('');
                }
            } else if (companyId.length < 3) {
                setCompanyIdError('Company ID is too short');
                ok = false;
            } else {
                setCompanyIdError('');
            }
        }

        // Validate terms consent
        if (!termsConsent) {
            setTermsConsentError(t('register.termsConsentError'));
            ok = false;
        } else {
            setTermsConsentError('');
        }

        return ok;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');
        try {
            const err = await register(name, email, password, companyId, true);
            if (err) setError('Error creating account. Please try again.');
        } catch {
            setError('Error creating account. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <main
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-background via-light-card to-light-background dark:from-dark-background dark:via-dark-card dark:to-dark-background p-4">
            <motion.div
                className="w-full max-w-md"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
            >
                {/* Card Container */}
                <motion.div
                    className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-gray-800/20 rounded-2xl shadow-2xl overflow-hidden"
                    variants={itemVariants}
                >
                    {/* Logo & Title Section */}
                    <motion.div
                        className="text-center p-8 bg-gradient-to-b from-transparent to-white/5 dark:to-black/5"
                        variants={itemVariants}
                    >
                        <Link href="/" className="inline-block">
                            <motion.div
                                className="flex items-center justify-center gap-2 text-3xl font-extrabold bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                <UserPlus className="w-7 h-7"/>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={`logo-${language}`}
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -20}}
                                    >
                                        Legal Forge
                                    </motion.span>
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                        <motion.h2
                            className="mt-4 text-xl font-semibold text-light-text-primary dark:text-dark-text-primary"
                            variants={itemVariants}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`title-${language}`}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                >
                                    {t('register.title')}
                                </motion.span>
                            </AnimatePresence>
                        </motion.h2>
                    </motion.div>

                    {/* Form Section */}
                    <motion.div className="p-8 pt-2">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.form onSubmit={handleRegister} className="space-y-6">
                            {/* Name Input */}
                            <motion.div variants={itemVariants}>
                                <label
                                    className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                    {t('register.name')}
                                </label>
                                <motion.div
                                    className="relative"
                                    whileFocus="focus"
                                    variants={inputVariants}
                                >
                  <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
                    <User size={18}/>
                  </span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder={t('register.placeholderName')}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-800/10 focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200"
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Email Input */}
                            <motion.div variants={itemVariants}>
                                <label
                                    className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                    {t('register.email')}
                                </label>
                                <motion.div
                                    className="relative"
                                    whileFocus="focus"
                                    variants={inputVariants}
                                >
                  <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
                    <Mail size={18}/>
                  </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder={t('register.placeholderEmail')}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 dark:bg-black/5 border ${emailError ? 'border-red-400' : 'border-white/10 dark:border-gray-800/10'} focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200`}
                                    />
                                </motion.div>
                                {emailError && (
                                    <motion.p
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        className="mt-2 text-sm text-red-400"
                                    >
                                        {emailError}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Company ID Input */}
                            <motion.div variants={itemVariants}>
                                <label
                                    className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                    {t('register.cnpjCpf')}
                                </label>
                                <motion.div
                                    className="relative"
                                    whileFocus="focus"
                                    variants={inputVariants}
                                >
                  <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
                    <User size={18}/>
                  </span>
                                    <input
                                        type="text"
                                        value={companyId}
                                        onChange={(e) => handleCompanyId(e.target.value)}
                                        required
                                        placeholder={t('register.placeholderCnpjCpf')}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 dark:bg-black/5 border ${companyIdError ? 'border-red-400' : 'border-white/10 dark:border-gray-800/10'} focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200`}
                                    />
                                </motion.div>
                                {companyIdError && (
                                    <motion.p
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        className="mt-2 text-sm text-red-400"
                                    >
                                        {companyIdError}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Password Input */}
                            <motion.div variants={itemVariants}>
                                <label
                                    className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                    {t('register.password')}
                                </label>
                                <motion.div
                                    className="relative"
                                    whileFocus="focus"
                                    variants={inputVariants}
                                >
                  <span
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
                    <Lock size={18}/>
                  </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder={t('register.placeholderPassword')}
                                        className={`w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 dark:bg-black/5 border ${passwordError ? 'border-red-400' : 'border-white/10 dark:border-gray-800/10'} focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200`}
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.9}}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </motion.button>
                                </motion.div>
                                {passwordError && (
                                    <motion.p
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        className="mt-2 text-sm text-red-400"
                                    >
                                        {passwordError}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Terms Consent */}
                            <motion.div variants={itemVariants} className="flex items-start gap-3">
                                <motion.div
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    className="flex items-center h-5"
                                >
                                    <input
                                        id="terms-consent"
                                        type="checkbox"
                                        checked={termsConsent}
                                        onChange={(e) => setTermsConsent(e.target.checked)}
                                        className="w-4 h-4 rounded border-white/20 dark:border-gray-800/20 bg-white/5 dark:bg-black/5 focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-accent-purple dark:text-dark-accent-purple transition-colors"
                                    />
                                </motion.div>
                                <label
                                    htmlFor="terms-consent"
                                    className="text-sm text-light-text-secondary dark:text-dark-text-secondary"
                                >
                                    {t('register.termsConsent')}{' '}
                                    <Link
                                        href="/jur/termos-de-uso"
                                        target="_blank"
                                        className="text-light-accent-purple dark:text-dark-accent-purple hover:underline"
                                    >
                                        {t('footer.termsOfUse')}
                                    </Link>
                                </label>
                            </motion.div>
                            {termsConsentError && (
                                <motion.p
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    className="mt-2 text-sm text-red-400"
                                >
                                    {termsConsentError}
                                </motion.p>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-6 rounded-xl font-medium bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover text-white shadow-lg shadow-light-accent-purple/20 dark:shadow-dark-accent-purple/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={loading ? 'loading' : 'submit'}
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -20}}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin"/>
                                                {t('register.registering')}
                                            </>
                                        ) : (
                                            t('register.button')
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </motion.form>

                        {/* Login Link */}
                        <motion.p
                            className="mt-8 text-center text-sm text-light-text-secondary dark:text-dark-text-secondary"
                            variants={itemVariants}
                        >
                            {t('register.alreadyHaveAccount')}{' '}
                            <Link
                                href="/auth/login"
                                className="text-light-accent-purple dark:text-dark-accent-purple hover:underline"
                            >
                                {t('logIn')}
                            </Link>
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </main>
    );
}