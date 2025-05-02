'use client';

import React, {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/useAuth';
import Link from 'next/link';
import {Mail, Lock, LogIn, Loader2} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {useRouter} from 'next/navigation';
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

export default function LoginPage() {
    const {t, language} = useI18n();
    const {login} = useAuth();
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

    if (!mounted) return null;

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
                                <LogIn className="w-7 h-7 text-light-accent-purple dark:text-dark-purple"/>
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
                                    {t('login.title')}
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

                        <motion.form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Input */}
                            <motion.div variants={itemVariants}>
                                <label
                                    className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                    {t('login.email')}
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
                                        placeholder={t('login.emailPlaceholder')}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-800/10 focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200"
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Password Input */}
                            <motion.div variants={itemVariants}>
                                <label
                                    className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                    {t('login.password')}
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
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder={t('login.passwordPlaceholder')}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-800/10 focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200"
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Forgot Password Link */}
                            <motion.div
                                className="text-right"
                                variants={itemVariants}
                            >
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-light-accent-purple dark:text-dark-accent-purple hover:underline"
                                >
                                    {t('login.forgotPassword')}
                                </Link>
                            </motion.div>

                            {/* Login Button */}
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
                                                {t('login.loggingIn')}
                                            </>
                                        ) : (
                                            t('login.submit')
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </motion.form>

                        {/* Sign Up Link */}
                        <motion.p
                            className="mt-8 text-center text-sm text-light-text-secondary dark:text-dark-text-secondary"
                            variants={itemVariants}
                        >
                            {t('login.noAccount')}{' '}
                            <Link
                                href="/auth/register"
                                className="text-light-accent-purple dark:text-dark-accent-purple hover:underline"
                            >
                                {t('login.signUp')}
                            </Link>
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </main>
    );
}