'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {postWithAuth} from '@/lib/api';
import {ArrowLeft} from 'lucide-react';
import Layout from '@/components/Layout';
import {ToastContainer} from 'react-toastify';
import {notifyError} from '@/hooks/useToast';
import {AnimatePresence, motion} from 'framer-motion';
import {SiteType} from '@/types/SitesType';
import {useI18n} from '@/contexts/I18nContext';
import FormField from "@/components/FormField";

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

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};


export default function NewSitePage() {
    const {t, language} = useI18n();
    const [site, setSite] = useState<SiteType>({
        name: '',
        domain: '',
        language: '',
        legislation: '',
        observations: '',
    });
    const [loading, setLoading] = useState(false);
    const [textDirection, setTextDirection] = useState(0);
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await postWithAuth(
                `${process.env.NEXT_PUBLIC_API_URL}/sites`,
                site,
                token
            );
            if (response.error) {
                notifyError(response.error);
            } else {
                router.push('/sites');
            }
        } catch (err) {
            console.error('Error while creating site:', err);
            notifyError('Unexpected error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setSite((current) => ({...current, [name]: value}));
    };
    const formFields = [
        {
            label: t('sites.new.siteName'),
            name: 'name',
            placeholder: t('sites.new.placeholders.siteName'),
        },
        {
            label: t('sites.new.domain'),
            name: 'domain',
            placeholder: t('sites.new.placeholders.domain'),
        },
        {
            label: t('sites.new.language'),
            name: 'language',
            placeholder: t('sites.new.placeholders.language'),
        },
        {
            label: t('sites.new.legislation'),
            name: 'legislation',
            placeholder: t('sites.new.placeholders.legislation'),
        },
    ];

    return (
        <main
            className="min-h-screen bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary">
            <Layout>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-6 space-y-8"
                >
                    <ToastContainer/>

                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                            onClick={() => router.back()}
                            className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition"
                        >
                            <ArrowLeft size={24}/>
                        </motion.button>
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={`title-${language}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                                className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary"
                            >
                                {t('sites.new.title')}
                            </motion.h1>
                        </AnimatePresence>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {formFields.map((field, idx) => (
                            <FormField
                                key={field.name}
                                {...field}
                                value={site[field.name as keyof SiteType] as string}
                                onChange={handleChange}
                                textDirection={textDirection}
                                delay={0.3 + idx * 0.1}
                            />
                        ))}

                        <FormField
                            label={t('sites.new.notes')}
                            name="observations"
                            placeholder={t('sites.new.placeholders.notes')}
                            value={site.observations as string}
                            onChange={handleChange}
                            type="textarea"
                            textDirection={textDirection}
                            delay={0.7}
                        />

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-purple-hover dark:hover:bg-dark-purple-hover text-light-background dark:text-dark-background rounded-xl px-4 py-2 font-semibold transition disabled:opacity-50"
                            initial={{scale: 1}}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`button-${language}-${loading}`}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    custom={textDirection}
                                >
                                    {loading ? t('sites.new.buttons.saving') : t('sites.new.buttons.create')}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>
                    </form>
                </motion.div>
            </Layout>
        </main>
    );
}