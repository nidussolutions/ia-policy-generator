'use client';

import useSWR from 'swr';
import {fetcher, putWithAuth} from '@/lib/api';
import {ArrowLeft, CheckCircle, XCircle, Loader2} from 'lucide-react';
import React, {useEffect, useState, useRef} from 'react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import {motion, AnimatePresence} from 'framer-motion';
import {useParams, useRouter} from 'next/navigation';
import {useI18n} from '@/contexts/I18nContext';

type Status = 'idle' | 'saving' | 'saved' | 'error';

type EmbedSectionProps = {
    height: string;
    setHeight: (height: string) => void;
    embedTheme: 'light' | 'dark';
    setEmbedTheme: (theme: 'light' | 'dark') => void;
    publicId: string;
    copiedEmbed: boolean;
    setCopiedEmbed: (copied: boolean) => void;
    textDirection: number;
    t: (key: string) => string;
}

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

const StatusIcon = ({status}: { status: Status }) => {
    return (
        <AnimatePresence mode="wait">
            {status === 'saving' && (
                <motion.div
                    key="saving"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                >
                    <Loader2 className="animate-spin text-light-accent-blue dark:text-dark-accent-blue"/>
                </motion.div>
            )}
            {status === 'saved' && (
                <motion.div
                    key="saved"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                >
                    <CheckCircle className="text-green-500 dark:text-green-400"/>
                </motion.div>
            )}
            {status === 'error' && (
                <motion.div
                    key="error"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.8}}
                >
                    <XCircle className="text-red-500 dark:text-red-400"/>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const EmbedSection = ({
                          height,
                          setHeight,
                          embedTheme,
                          setEmbedTheme,
                          publicId,
                          copiedEmbed,
                          setCopiedEmbed,
                          textDirection,
                          t
                      }: EmbedSectionProps) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.5}}
            className="mt-6 w-full bg-light-card dark:bg-dark-card p-6 rounded-xl backdrop-blur-md border border-light-border dark:border-dark-border"
        >
            <AnimatePresence mode="wait">
                <motion.h3
                    key={`embed-title-${textDirection}`}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={textDirection}
                    className="text-lg font-bold mb-4 text-light-text-primary dark:text-dark-text-primary"
                >
                    {t('document.edit.embedCode')}
                </motion.h3>
            </AnimatePresence>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <AnimatePresence mode="wait">
                        <motion.label
                            key={`height-label-${textDirection}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="text-light-text-primary dark:text-dark-text-primary block mb-1"
                        >
                            {t('document.edit.height')} (px)
                        </motion.label>
                    </AnimatePresence>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full p-2 rounded-md bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                    />
                </div>
                <div>
                    <AnimatePresence mode="wait">
                        <motion.label
                            key={`theme-label-${textDirection}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="text-light-text-primary dark:text-dark-text-primary block mb-1"
                        >
                            {t('document.edit.theme')}
                        </motion.label>
                    </AnimatePresence>
                    <select
                        value={embedTheme}
                        onChange={(e) => setEmbedTheme(e.target.value as 'light' | 'dark')}
                        className="w-full p-2 rounded-md bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                    >
                        <option value="light">{t('document.edit.themeLight')}</option>
                        <option value="dark">{t('document.edit.themeDark')}</option>
                    </select>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.label
                    key={`embed-code-label-${textDirection}`}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={textDirection}
                    className="text-light-text-primary dark:text-dark-text-primary block mb-1"
                >
                    {t('document.edit.embedCodeLabel')}:
                </motion.label>
            </AnimatePresence>
            <textarea
                readOnly
                value={`<!--suppress CssInvalidPropertyValue -->
<iframe src="${process.env.NEXT_PUBLIC_APP_URL}/embed/${publicId}?theme=${embedTheme}" style="border:none;width:100%;height:${height}px;" loading="lazy" title="Legal Document by Legal Forge"></iframe>`}
                className="w-full h-32 p-3 text-sm font-mono rounded-md bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border focus:outline-none resize-none"
            />

            <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => {
                    navigator.clipboard
                        .writeText(
                            `<!--suppress CssInvalidPropertyValue --> <iframe src="${process.env.NEXT_PUBLIC_APP_URL}/embed/${publicId}?theme=${embedTheme}" style="border:none;width:100%;height:${height}px;" loading="lazy" title="Legal Document by Legal Forge"></iframe>`
                        )
                        .finally();
                    setCopiedEmbed(true);
                    setTimeout(() => setCopiedEmbed(false), 2000);
                }}
                className="mt-4 w-full py-2 rounded-md bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-white font-semibold transition"
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`copy-embed-${copiedEmbed}-${textDirection}`}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                    >
                        {copiedEmbed ? t('document.edit.copied') : t('document.edit.copyEmbed')}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
};

export default function DocumentEditPage() {
    const {documentId} = useParams() as { documentId: string };
    const router = useRouter();
    const {t, language} = useI18n();
    const [textDirection, setTextDirection] = useState(0);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const {data, error, mutate} = useSWR(
        documentId ? `${process.env.NEXT_PUBLIC_API_URL}/docs/view/${documentId}` : null,
        (url) => fetcher(url, token)
    );

    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [copiedLink, setCopiedLink] = useState(false);
    const [height, setHeight] = useState('400');
    const [embedTheme, setEmbedTheme] = useState<'light' | 'dark'>('light');
    const [copiedEmbed, setCopiedEmbed] = useState(false);
    const saveTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (data?.content) setContent(data.content);
    }, [data]);

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    const scheduleSave = () => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(saveChanges, 5000);
    };

    const saveChanges = async () => {
        if (status === 'saving') return;
        setStatus('saving');
        try {
            await putWithAuth(
                `${process.env.NEXT_PUBLIC_API_URL}/docs/${documentId}`,
                {content},
                token
            );
            mutate().finally();
            setStatus('saved');
        } catch {
            setStatus('error');
        } finally {
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    const copyLink = () => {
        const link = `${process.env.NEXT_PUBLIC_APP_URL}/public/${data.publicId}`;
        navigator.clipboard.writeText(link).finally();
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    if (error) return (
        <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className="text-red-500 text-center p-6"
        >
            {t('document.edit.errors.loadFailed')}
        </motion.p>
    );

    if (!data) return <Loading page="document edit"/>;

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
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.2}}
                        className="flex items-center justify-between"
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
                                    {data.title}
                                </motion.h1>
                            </AnimatePresence>
                        </div>
                        <div className="flex items-center gap-4">
                            <StatusIcon status={status}/>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={saveChanges}
                                disabled={status === 'saving'}
                                className="bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-white px-3 py-1 rounded disabled:opacity-50"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={`save-${language}-${status}`}
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        custom={textDirection}
                                    >
                                        {status === 'saving' ? t('document.edit.saving') : t('document.edit.save')}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                    >
            <textarea
                className="w-full h-[500px] px-4 py-3 bg-light-card dark:bg-dark-card backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl text-light-text-primary dark:text-dark-text-primary font-mono resize-none focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                    scheduleSave();
                }}
            />
                    </motion.div>

                    {data.publicId && (
                        <>
                            <motion.div
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.4}}
                                className="flex gap-2 items-center"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.h2
                                        key={`public-link-${language}`}
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        custom={textDirection}
                                        className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary"
                                    >
                                        {t('document.edit.publicLink')}:
                                    </motion.h2>
                                </AnimatePresence>
                                <input
                                    readOnly
                                    value={`${process.env.NEXT_PUBLIC_APP_URL}/public/${data.publicId}`}
                                    className="flex-1 px-3 py-2 bg-light-card dark:bg-dark-card backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                                />
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={copyLink}
                                    className="bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-white px-3 py-2 rounded-xl"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={`copy-${copiedLink}-${language}`}
                                            variants={textVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            custom={textDirection}
                                        >
                                            {copiedLink ? t('document.edit.copied') : t('document.edit.copy')}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>
                            </motion.div>

                            <EmbedSection
                                height={height}
                                setHeight={setHeight}
                                embedTheme={embedTheme}
                                setEmbedTheme={setEmbedTheme}
                                publicId={data.publicId}
                                copiedEmbed={copiedEmbed}
                                setCopiedEmbed={setCopiedEmbed}
                                textDirection={textDirection}
                                t={t}
                            />
                        </>
                    )}
                </motion.div>
            </Layout>
        </main>
    );
}