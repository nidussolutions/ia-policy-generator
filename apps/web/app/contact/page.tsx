'use client';

import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useForm} from '@formspree/react';
import Link from 'next/link';
import {useI18n} from '@/contexts/I18nContext';
import HeaderPublic from "@/components/HeaderPublic";

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
            {/* Navbar */}
            <HeaderPublic/>

            {/* Form */}
            <div
                className="min-h-screen bg-light-background dark:bg-dark-background py-16 px-4 text-light-text-primary dark:text-dark-text-primary">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="max-w-2xl mx-auto bg-light-card dark:bg-dark-card p-8 rounded-2xl backdrop-blur-md border border-light-border dark:border-dark-accent-blue shadow-lg"
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
                                className="w-full px-4 py-2 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-text-secondary text-light-text-primary dark:text-dark-text-primary focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue focus:border-light-accent-blue dark:focus:border-dark-accent-blue"
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
                                className="w-full px-4 py-2 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-text-secondary text-light-text-primary dark:text-dark-text-primary focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue focus:border-light-accent-blue dark:focus:border-dark-accent-blue"
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
                                className="w-full px-4 py-2 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-text-secondary text-light-text-primary dark:text-dark-text-primary focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue focus:border-light-accent-blue dark:focus:border-dark-accent-blue"
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
                                className="w-full px-4 py-2 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-text-secondary text-light-text-primary dark:text-dark-text-primary focus:ring-light-accent-blue dark:focus:ring-dark-accent-blue focus:border-light-accent-blue dark:focus:border-dark-accent-blue"
                            ></textarea>
                        </div>
                        <motion.button
                            whileHover={{scale: 1.03}}
                            whileTap={{scale: 0.97}}
                            type="submit"
                            className="w-full bg-light-accent-blue dark:bg-dark-accent-blue text-light-background dark:text-dark-text-primary font-semibold py-2 rounded-lg transition shadow hover:shadow-md"
                        >
                            {t('contact.form.submit')}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
