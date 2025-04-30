'use client';

import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useForm} from '@formspree/react';
import Link from 'next/link';
import {Menu, Moon, Sun, X} from "lucide-react";
import {LanguageSelector} from "@/components/LanguageSelector";
import {useI18n} from '@/contexts/I18nContext';
import {useTheme} from '@/components/ThemeContext';

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {type: 'spring', stiffness: 100, damping: 12},
    },
};

export default function ContactPage() {
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMS_KEY as string);
    const {t} = useI18n();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {theme, toggleTheme} = useTheme();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    if (state.succeeded) {
        return (
            <div
                className="min-h-screen bg-light-background dark:bg-dark-background py-16 px-4 text-light-text-primary dark:text-dark-text-primary">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="max-w-2xl mx-auto bg-light-card dark:bg-dark-card p-8 rounded-2xl backdrop-blur-md border border-light-border dark:border-dark-border shadow-lg"
                >
                    <h1 className="text-3xl font-bold mb-6 text-center text-light-text-primary dark:text-dark-text-primary">
                        {t('contact.success.title')}
                    </h1>
                    <p className="text-center text-light-text-secondary dark:text-dark-text-secondary">
                        {t('contact.success.message')}
                    </p>
                    <div className="flex justify-center">
                        <Link href="/">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                className="mt-6 px-6 py-2 bg-light-accent-purple dark:bg-dark-accent-purple text-light-background dark:text-dark-background rounded-full font-medium shadow-lg backdrop-blur-sm"
                                variants={itemVariants}
                            >
                                {t('contact.success.backToHome')}
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="bg-light-background dark:bg-dark-background">
            <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4 relative z-20">
                <div className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                    <Link href="/">Legal Forge</Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 text-light-text-secondary dark:text-dark-text-secondary">
                    <Link href="/#features" className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue">
                        {t('nav.features')}
                    </Link>
                    <Link href="/#pricing" className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue">
                        {t('nav.pricing')}
                    </Link>
                    <Link href="/#about" className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue">
                        {t('nav.aboutUs')}
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card"
                    >
                        {theme === 'dark' ? <Sun className="text-yellow-400"/> :
                            <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>}
                    </button>
                    <LanguageSelector/>
                    <Link href="/auth/login">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="px-6 py-2 bg-light-accent-purple dark:bg-dark-accent-purple text-white rounded-md"
                            variants={itemVariants}
                        >
                            {t('nav.getStarted')}
                        </motion.button>
                    </Link>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="px-6 py-2 border border-light-border dark:border-dark-border rounded-md text-light-text-primary dark:text-dark-text-primary"
                            variants={itemVariants}
                        >
                            {t('nav.talkExpert')}
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card"
                    >
                        {theme === 'dark' ? <Sun className="text-yellow-400"/> :
                            <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>}
                    </button>
                    <LanguageSelector/>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-light-text-primary dark:text-dark-text-primary"
                    >
                        {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-light-card/95 dark:bg-dark-card/95 p-4">
                        <nav
                            className="flex flex-col space-y-4 text-light-text-secondary dark:text-dark-text-secondary">
                            <Link
                                href="/#features"
                                className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.features')}
                            </Link>
                            <Link
                                href="/#pricing"
                                className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.pricing')}
                            </Link>
                            <Link
                                href="/#about"
                                className="hover:text-light-accent-blue dark:hover:text-dark-accent-blue"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.aboutUs')}
                            </Link>
                        </nav>
                        <div className="flex flex-col space-y-3 mt-4">
                            <Link href="/auth/login" className="w-full">
                                <motion.button
                                    className="w-full px-6 py-2 bg-light-accent-purple dark:bg-dark-accent-purple text-white rounded-md"
                                >
                                    {t('nav.getStarted')}
                                </motion.button>
                            </Link>
                            <Link href="/contact" className="w-full">
                                <motion.button
                                    className="w-full px-6 py-2 border border-light-border dark:border-dark-border rounded-md text-light-text-primary dark:text-dark-text-primary"
                                >
                                    {t('nav.talkExpert')}
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                )}
            </header>
            <div
                className="min-h-screen bg-light-background dark:bg-dark-background py-16 px-4 text-light-text-primary dark:text-dark-text-primary">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="max-w-2xl mx-auto bg-light-card dark:bg-dark-card p-8 rounded-2xl backdrop-blur-md border border-light-border dark:border-dark-border shadow-lg"
                >
                    <h1 className="text-3xl font-bold mb-6 text-center text-light-text-primary dark:text-dark-text-primary">
                        {t('contact.title')}
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                {t('contact.form.name')}
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue focus:border-light-accent-blue dark:focus:border-dark-accent-blue"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                {t('contact.form.phone')}
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue focus:border-light-accent-blue dark:focus:border-dark-accent-blue"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                {t('contact.form.subject')}
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue focus:border-light-accent-blue dark:focus:border-dark-accent-blue"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                {t('contact.form.message')}
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-2 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue focus:border-light-accent-blue dark:focus:border-dark-accent-blue"
                            ></textarea>
                        </div>
                        <motion.button
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                            type="submit"
                            className="w-full bg-light-accent-blue dark:bg-dark-accent-blue text-light-background dark:text-dark-background font-semibold py-2 rounded-lg transition shadow hover:shadow-md"
                        >
                            {t('contact.form.submit')}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
