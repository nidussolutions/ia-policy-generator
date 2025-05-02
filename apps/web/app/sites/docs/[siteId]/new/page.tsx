'use client';

import Layout from '@/components/Layout';
import {postWithAuth} from '@/lib/api';
import {ArrowLeft} from 'lucide-react';
import {useParams, useRouter} from 'next/navigation';
import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {notifyError} from '@/hooks/useToast';
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

type Doc = {
    title: string;
    siteId: string;
    type: string;
    observations: string;
}

export default function NewDocPage() {
    const router = useRouter();
    const {siteId} = useParams() as { siteId: string };
    const {t, language} = useI18n();
    const [textDirection, setTextDirection] = useState(0);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const [loading, setLoading] = useState(false);
    const [doc, setDoc] = useState<Doc>({
        title: '',
        siteId,
        type: '',
        observations: '',
    });

    useEffect(() => {
        if (!token) router.push('/auth/login');
    }, [token, router]);

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await postWithAuth(
                `${process.env.NEXT_PUBLIC_API_URL}/docs/generate`,
                doc,
                token
            );
            router.push(`/sites/${siteId}`);
        } catch (err) {
            console.error('Error generating document', err);
            notifyError(t('document.new.errors.generateFailed'));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setDoc((prev) => ({...prev, [name]: value}));
    };

    const formFields = [
        {
            label: t('document.new.title'),
            name: 'title',
            placeholder: t('document.new.placeholders.title'),
        },
        {
            label: t('document.new.type'),
            name: 'type',
            placeholder: t('document.new.placeholders.type'),
        },
        {
            label: t('document.new.observations'),
            name: 'observations',
            placeholder: t('document.new.placeholders.observations'),
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] text-gray-200">
            <Layout>
                <motion.div
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="p-6 space-y-8 max-w-lg mx-auto"
                >
                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                            onClick={() => router.back()}
                            className="text-gray-400 hover:text-[#79d3d3] transition"
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
                                className="text-3xl font-bold text-white"
                            >
                                {t('document.new.pageTitle')}
                            </motion.h1>
                        </AnimatePresence>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {formFields.map((field, idx) => (
                            <FormField
                                key={field.name}
                                {...field}
                                value={doc[field.name as keyof Doc] as string}
                                onChange={handleChange}
                                required={field.name !== 'observations'}
                                textDirection={textDirection}
                                delay={0.3 + idx * 0.1}
                            />
                        ))}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#8C0368] hover:bg-[#A429A6] text-white rounded-xl px-4 py-2 font-semibold transition disabled:opacity-50"
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
                                    {loading ? t('document.new.generating') : t('document.new.generate')}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>

                        <AnimatePresence>
                            {loading && (
                                <motion.p
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    className="text-gray-400 text-sm text-center"
                                >
                                    {t('document.new.generatingTime')}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </Layout>
        </main>
    );
}