'use client';

import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useForm} from '@formspree/react';
import Link from 'next/link';
import {useI18n} from '@/contexts/I18nContext';
import HeaderPublic from "@/components/HeaderPublic";
import {Send, CheckCircle, Home, Phone, Mail, MessageSquare} from 'lucide-react';

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
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {type: 'spring', stiffness: 100, damping: 12},
    },
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

export default function ContactPage() {
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMS_KEY as string);
    const {t} = useI18n();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    if (state.succeeded) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-light-background via-light-card to-light-background dark:from-dark-background dark:via-dark-card dark:to-dark-background py-16 px-4">
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.6}}
                    className="max-w-2xl mx-auto backdrop-blur-xl bg-white/10 dark:bg-black/10 p-8 rounded-2xl border border-white/20 dark:border-gray-800/20 shadow-2xl"
                >
                    <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{delay: 0.3, type: 'spring', stiffness: 200, damping: 15}}
                        className="flex justify-center mb-6"
                    >
                        <CheckCircle className="w-20 h-20 text-emerald-400"/>
                    </motion.div>
                    <motion.h1
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4}}
                        className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                    >
                        {t('contact.success.title')}
                    </motion.h1>
                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.5}}
                        className="text-center text-light-text-secondary dark:text-dark-text-secondary mb-8"
                    >
                        {t('contact.success.message')}
                    </motion.p>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.6}}
                        className="flex justify-center"
                    >
                        <Link href="/">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover text-white shadow-lg shadow-light-accent-purple/20 dark:shadow-dark-accent-purple/20 flex items-center gap-2"
                            >
                                <Home className="w-5 h-5"/>
                                {t('contact.success.backToHome')}
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <main
            className="bg-gradient-to-br from-light-background via-light-card to-light-background dark:from-dark-background dark:via-dark-card dark:to-dark-background">
            <HeaderPublic/>

            <div className="min-h-screen py-16 px-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-2xl mx-auto backdrop-blur-xl bg-white/10 dark:bg-black/10 p-8 rounded-2xl border border-white/20 dark:border-gray-800/20 shadow-2xl"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                    >
                        {t('contact.title')}
                    </motion.h1>

                    <motion.form onSubmit={handleSubmit} className="space-y-6" variants={containerVariants}>
                        {/* Name Input */}
                        <motion.div variants={itemVariants}>
                            <label
                                className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                {t('contact.form.name')}
                            </label>
                            <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
                  <Mail className="w-5 h-5"/>
                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-800/10 focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Phone Input */}
                        <motion.div variants={itemVariants}>
                            <label
                                className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                {t('contact.form.phone')}
                            </label>
                            <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
                  <Phone className="w-5 h-5"/>
                </span>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-800/10 focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Subject Input */}
                        <motion.div variants={itemVariants}>
                            <label
                                className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                {t('contact.form.subject')}
                            </label>
                            <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary">
                  <MessageSquare className="w-5 h-5"/>
                </span>
                                <input
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-800/10 focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Message Input */}
                        <motion.div variants={itemVariants}>
                            <label
                                className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                {t('contact.form.message')}
                            </label>
                            <motion.div whileFocus="focus" variants={inputVariants}>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-black/5 border border-white/10 dark:border-gray-800/10 focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:ring-1 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary/50 dark:placeholder-dark-text-secondary/50 transition-all duration-200"
                />
                            </motion.div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={state.submitting}
                            className="w-full py-3 px-6 rounded-xl font-medium bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover text-white shadow-lg shadow-light-accent-purple/20 dark:shadow-dark-accent-purple/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                            variants={itemVariants}
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={state.submitting ? 'submitting' : 'submit'}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    className="flex items-center gap-2"
                                >
                                    {state.submitting ? (
                                        <>
                                            <motion.div
                                                animate={{rotate: 360}}
                                                transition={{repeat: Infinity, duration: 1, ease: "linear"}}
                                            >
                                                <Send className="w-5 h-5"/>
                                            </motion.div>
                                            {t('contact.form.sending')}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5"/>
                                            {t('contact.form.submit')}
                                        </>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </motion.form>
                </motion.div>
            </div>
        </main>
    );
}