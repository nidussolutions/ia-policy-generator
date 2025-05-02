'use client';

import {useParams, useRouter} from 'next/navigation';
import useSWR from 'swr';
import {fetcher} from '@/lib/api';
import React, {useEffect, useState} from 'react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import {ArrowLeft} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';
import {SiteType} from '@/types/SitesType';
import {useI18n} from '@/contexts/I18nContext';
import FormField from '@/components/FormField';

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

export default function EditSitePage() {
    const {t, language} = useI18n();
    const {siteId} = useParams() as { siteId: string };
    const router = useRouter();
    const [textDirection, setTextDirection] = useState(0);
    const [site, setSite] = useState<SiteType | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const {
        data,
        error: errorSWR,
        isLoading,
        mutate,
    } = useSWR(
        siteId ? `${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}` : null,
        (url) => fetcher(url, token)
    );


    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    useEffect(() => {
        if (data) setSite(data[0]);
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!site) return;
        setIsSaving(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(site),
                }
            );
            if (!res.ok) {
                const err = await res.json();
                setError(err.error || 'Failed to update');
            } else {
                await mutate();
                setSuccess(t('sites.edit.success'));
            }
        } catch (err) {
            console.error(err);
            setError('Error updating the site. Please try again later.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <Loading page="edit site"/>;
    if (errorSWR) return <Error page="edit site" err={errorSWR}/>;
    if (!site) return <Error page="requested site" err="Site not found"/>;


    const formFields = [
        {label: t('sites.new.siteName'), key: 'name'},
        {label: t('sites.new.domain'), key: 'domain'},
        {label: t('sites.new.language'), key: 'language'},
        {label: t('sites.new.legislation'), key: 'legislation'},
    ];

    return (
        <main
            className="min-h-screen bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary">
            <Layout>
                <motion.div
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="p-6 space-y-8"
                >
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
                                {t('sites.edit.title')}
                            </motion.h1>
                        </AnimatePresence>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.p
                                key={`error-${error}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                                className="text-red-500"
                            >
                                {error}
                            </motion.p>
                        )}
                        {success && (
                            <motion.p
                                key={`success-${success}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                                className="text-green-400"
                            >
                                {success}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {formFields.map(({label, key}, idx) => (
                            <FormField
                                name="site"
                                type="input"
                                key={key}
                                label={label}
                                value={(site as any)?.[key] || ''}
                                onChange={(e) => setSite({...(site as SiteType), [key]: e.target.value})}
                                textDirection={textDirection}
                                delay={0.3 + idx * 0.1}
                                placeholder={t(`sites.new.placeholders.${key}`)}
                                required={key !== 'observations'}
                            />
                        ))}

                        <FormField
                            name="observations"
                            label={t('sites.new.notes')}
                            value={site?.observations || ''}
                            onChange={(e) => setSite({...(site as SiteType), observations: e.target.value})}
                            type="textarea"
                            placeholder={t('sites.new.placeholders.notes')}
                            textDirection={textDirection}
                            delay={0.7}
                            required={false}
                        />

                        <motion.button
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-light-background dark:text-dark-background rounded-xl px-4 py-2 font-semibold transition disabled:opacity-50"
                            initial={{scale: 1}}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`button-${language}-${isSaving}`}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    custom={textDirection}
                                >
                                    {isSaving ? t('sites.edit.buttons.saving') : t('sites.edit.buttons.save')}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>
                    </form>
                </motion.div>
            </Layout>
        </main>
    );
}