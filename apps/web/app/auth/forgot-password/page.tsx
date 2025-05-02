'use client';

import React, {useState} from 'react';
import {useRecovery} from '@/hooks/useRecovery';
import {motion, AnimatePresence} from 'framer-motion';
import Link from 'next/link';
import {Mail, ArrowLeft, Loader2, CheckCircle} from 'lucide-react';
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

export default function ForgotPasswordPage() {
    const {t, language} = useI18n();
    const {handleForgot, loading, error, setError} = useRecovery();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return setError('Email is required');

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
        <main
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-background via-light-card to-light-background dark:from-dark-background dark:via-dark-card dark:to-dark-background p-4">
            <motion.div
                className="w-full max-w-md"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
            >
                <motion.div
                    className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-gray-800/20 rounded-2xl shadow-2xl overflow-hidden"
                    variants={itemVariants}
                >
                    <motion.div
                        className="text-center p-8 bg-gradient-to-b from-transparent to-white/5 dark:to-black/5"
                        variants={itemVariants}
                    >
                        <Link href="/auth/login">
                            <motion.div
                                className="inline-flex items-center gap-2 text-lg font-medium bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                                whileHover={{scale: 1.05, x: -5}}
                                whileTap={{scale: 0.95}}
                            >
                                <ArrowLeft className="w-5 h-5 text-light-accent-purple dark:text-dark-purple"/>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={`back-${language}`}
                                        initial={{opacity: 0, x: 10}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: -10}}
                                    >
                                        Back to Login
                                    </motion.span>
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                        <motion.h2
                            className="mt-6 text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary"
                            variants={itemVariants}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`title-${language}`}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                >
                                    Forgot your password?
                                </motion.span>
                            </AnimatePresence>
                        </motion.h2>
                        <motion.p
                            className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary"
                            variants={itemVariants}
                        >
                            Don't worry, we'll send you reset instructions.
                        </motion.p>
                    </motion.div>

                    <motion.div className="p-8 pt-2">
                        <AnimatePresence mode="wait">
                            {sent ? (
                                <motion.div
                                    initial={{opacity: 0, scale: 0.9}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.9}}
                                    className="text-center space-y-4"
                                >
                                    <motion.div
                                        initial={{scale: 0}}
                                        animate={{scale: 1}}
                                        transition={{type: 'spring', stiffness: 200, damping: 15}}
                                        className="flex justify-center"
                                    >
                                        <CheckCircle className="w-16 h-16 text-emerald-400"/>
                                    </motion.div>
                                    <h3 className="text-xl font-semibold text-emerald-400">
                                        Check your email
                                    </h3>
                                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                        We have sent a password reset link to your email address.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form onSubmit={handleSubmit} className="space-y-6">
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

                                    <motion.div variants={itemVariants}>
                                        <label
                                            className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                            Email address
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
                                                placeholder="Enter your email"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-800/10 focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200"
                                            />
                                        </motion.div>
                                    </motion.div>

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
                                                        Sending...
                                                    </>
                                                ) : (
                                                    'Send Reset Instructions'
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </motion.div>
        </main>
    );
}