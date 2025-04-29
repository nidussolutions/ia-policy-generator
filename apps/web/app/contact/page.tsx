'use client';

import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useForm} from '@formspree/react';
import Link from 'next/link';
import {useTheme} from '../../components/ThemeContext';

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
    const [form, setForm] = useState({
        name: '',
        phone: '',
        subject: '',
        message: '',
    });
    const { theme } = useTheme();

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
                        Mensagem Enviada!
                    </h1>
                    <p className="text-center text-light-text-secondary dark:text-dark-text-secondary">
                        Obrigado por entrar em contato! Responderemos em breve.
                    </p>
                    <div className="flex justify-center">
                        <Link href="/">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                className="mt-6 px-6 py-2 bg-light-accent-purple dark:bg-dark-accent-purple text-light-background dark:text-dark-background rounded-full font-medium shadow-lg backdrop-blur-sm"
                                variants={itemVariants}
                            >
                                Voltar para o Início
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="bg-light-background dark:bg-dark-background">
            <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4">
                <div className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                    <Link href="/">Legal Forge</Link>
                </div>
                <nav className="hidden md:flex space-x-8 text-light-text-secondary dark:text-dark-text-secondary">
                    <Link href="/#features" className="hover:text-light-text-primary dark:hover:text-dark-text-primary transition">
                        Features
                    </Link>
                    <Link href="/#pricing" className="hover:text-light-text-primary dark:hover:text-dark-text-primary transition">
                        Pricing
                    </Link>
                    <Link href="/#about" className="hover:text-light-text-primary dark:hover:text-dark-text-primary transition">
                        About Us
                    </Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link href="/auth/login">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="px-6 py-2 bg-light-accent-purple dark:bg-dark-accent-purple text-light-background dark:text-dark-background rounded-full font-medium shadow-lg backdrop-blur-sm"
                            variants={itemVariants}
                        >
                            Get Started
                        </motion.button>
                    </Link>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="px-6 py-2 border border-light-border dark:border-dark-border rounded-full font-medium hover:border-light-text-primary dark:hover:border-dark-text-primary transition"
                            variants={itemVariants}
                        >
                            Talk to an Expert
                        </motion.button>
                    </Link>
                </div>
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
                        Entre em Contato
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                Nome
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
                            <label className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                Telefone
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
                            <label className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                Assunto
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
                            <label className="block mb-2 text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                Mensagem
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
                            Enviar Mensagem
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
