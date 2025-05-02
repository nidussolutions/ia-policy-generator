'use client';

import {Loader2, Lock, Mail, User} from 'lucide-react';
import React, {useState, useEffect} from 'react';
import {putWithAuth} from '@/lib/api';
import {motion, AnimatePresence} from 'framer-motion';
import {useI18n} from '@/contexts/I18nContext';
import {useRouter} from 'next/navigation';

type ProfileProps = {
    name: string;
    email: string;
    password: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    error: string;
    token: string;
};

const textVariants = {
    enter: (direction: number) => ({
        y: direction > 0 ? 20 : -20,
        opacity: 0
    }),
    center: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    exit: (direction: number) => ({
        y: direction < 0 ? 20 : -20,
        opacity: 0
    })
};

const formVariants = {
    hidden: {opacity: 0, scale: 0.95},
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            staggerChildren: 0.1
        }
    }
};

const inputGroupVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    }
};

export default function Profile({
                                    name,
                                    email,
                                    password,
                                    setName,
                                    setEmail,
                                    setPassword,
                                    setError,
                                    setLoading,
                                    loading,
                                    error,
                                    token,
                                }: ProfileProps) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const {t, language} = useI18n();
    const [textDirection, setTextDirection] = useState(0);

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        if (password && (password.length < 6 || !/[^A-Za-z0-9]/.test(password))) {
            setError(t('profile.errors.passwordRequirements'));
            setLoading(false);
            return;
        }

        try {
            const res = await putWithAuth(
                `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
                {name, email, password: password || undefined},
                token
            );
            if (!res.id) {
                setError(t('profile.errors.updateFailed'));
            }
            setSuccess(t('profile.success.updated'));
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(t('profile.errors.updateFailed'));
            localStorage.removeItem('token');
            router.push('/auth/login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="bg-light-card dark:bg-dark-card backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-light-border dark:border-dark-border"
        >
            <motion.form
                onSubmit={handleUpdate}
                className="space-y-6"
                variants={formVariants}
            >
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.p
                            key={`error-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg"
                        >
                            {error}
                        </motion.p>
                    )}
                    {success && (
                        <motion.p
                            key={`success-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="text-green-600 dark:text-green-300 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg"
                        >
                            {success}
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.div variants={inputGroupVariants}>
                    <AnimatePresence mode="wait">
                        <motion.label
                            key={`name-label-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"
                        >
                            {t('profile.fields.name')}
                        </motion.label>
                    </AnimatePresence>
                    <div className="relative">
            <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
              <User size={18}/>
            </span>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-light-background/20 dark:bg-dark-background/20 border border-transparent focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-0 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            aria-label={t('profile.fields.name')}
                        />
                    </div>
                </motion.div>

                <motion.div variants={inputGroupVariants}>
                    <AnimatePresence mode="wait">
                        <motion.label
                            key={`email-label-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"
                        >
                            {t('profile.fields.email')}
                        </motion.label>
                    </AnimatePresence>
                    <div className="relative">
            <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
              <Mail size={18}/>
            </span>
                        <input
                            type="email"
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-light-background/20 dark:bg-dark-background/20 border border-transparent focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-0 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label={t('profile.fields.email')}
                        />
                    </div>
                </motion.div>

                <motion.div variants={inputGroupVariants}>
                    <AnimatePresence mode="wait">
                        <motion.label
                            key={`password-label-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1"
                        >
                            {t('profile.fields.newPassword')}
                        </motion.label>
                    </AnimatePresence>
                    <div className="relative">
            <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
              <Lock size={18}/>
            </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full pl-10 pr-12 py-2 rounded-lg bg-light-background/20 dark:bg-dark-background/20 border border-transparent focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-0 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t('profile.placeholders.password')}
                            aria-label={t('profile.fields.newPassword')}
                        />
                        <AnimatePresence mode="wait">
                            <motion.button
                                key={`toggle-${language}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? t('profile.buttons.hide') : t('profile.buttons.show')}
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </motion.div>

                <motion.div className="flex justify-end" variants={inputGroupVariants}>
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        className="flex items-center gap-2 bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-light-background dark:text-dark-text-primary px-6 py-2 rounded-full shadow-lg transition-colors disabled:opacity-50"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={`submit-${language}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                            >
                                {t('profile.buttons.saveChanges')}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
}