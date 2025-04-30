'use client';

import useSWR from 'swr';
import {fetcher, putWithAuth} from '@/lib/api';
import {ArrowLeft, CheckCircle, XCircle, Loader2} from 'lucide-react';
import React, {useEffect, useState, useRef} from 'react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import {motion} from 'framer-motion';
import {useParams, useRouter} from 'next/navigation';

export default function DocumentEditPage() {
    const {documentId} = useParams() as { documentId: string };
    const router = useRouter();
    const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const {data, error, mutate} = useSWR(
        documentId
            ? `${process.env.NEXT_PUBLIC_API_URL}/docs/view/${documentId}`
            : null,
        (url) => fetcher(url, token)
    );

    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
        'idle'
    );
    const [copiedLink, setCopiedLink] = useState(false);
    const [height, setHeight] = useState('400');
    const [embedTheme, setEmbedTheme] = useState<'light' | 'dark'>('light');
    const [copiedEmbed, setCopiedEmbed] = useState(false);
    const saveTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (data?.content) setContent(data.content);
    }, [data]);

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

    if (error)
        return (
            <p className="text-red-500 text-center p-6">Failed to load document.</p>
        );
    if (!data) return <Loading page="document edit"/>;

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
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.2}}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => router.back()}
                                className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition"
                            >
                                <ArrowLeft size={24}/>
                            </button>
                            <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">{data.title}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            {status === 'saving' && (
                                <Loader2 className="animate-spin text-light-accent-blue dark:text-dark-accent-blue"/>
                            )}
                            {status === 'saved' && <CheckCircle className="text-green-500 dark:text-green-400"/>}
                            {status === 'error' && <XCircle className="text-red-500 dark:text-red-400"/>}
                            <button
                                onClick={saveChanges}
                                disabled={status === 'saving'}
                                className="bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-white px-3 py-1 rounded disabled:opacity-50"
                            >
                                Save
                            </button>
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
                                <h2 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">Public
                                    Link:</h2>
                                <input
                                    readOnly
                                    value={`${process.env.NEXT_PUBLIC_APP_URL}/public/${data.publicId}`}
                                    className="flex-1 px-3 py-2 bg-light-card dark:bg-dark-card backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl text-sm text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                                />
                                <button
                                    onClick={copyLink}
                                    className="bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-white px-3 py-2 rounded-xl"
                                >
                                    {copiedLink ? 'Copied!' : 'Copy'}
                                </button>
                            </motion.div>

                            {/* Embed Generator Inline */}
                            <motion.div
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.5}}
                                className="mt-6 w-full bg-light-card dark:bg-dark-card p-6 rounded-xl backdrop-blur-md border border-light-border dark:border-dark-border"
                            >
                                <h3 className="text-lg font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
                                    Embed Code
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label
                                            className="text-light-text-primary dark:text-dark-text-primary block mb-1">Height
                                            (px)</label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            className="w-full p-2 rounded-md bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="text-light-text-primary dark:text-dark-text-primary block mb-1">Theme</label>
                                        <select
                                            value={embedTheme}
                                            onChange={(e) =>
                                                setEmbedTheme(e.target.value as 'light' | 'dark')
                                            }
                                            className="w-full p-2 rounded-md bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                                        >
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                        </select>
                                    </div>
                                </div>

                                <label className="text-light-text-primary dark:text-dark-text-primary block mb-1">Embed
                                    Code:</label>
                                <textarea
                                    readOnly
                                    value={`<iframe src="${process.env.NEXT_PUBLIC_APP_URL}/embed/${data.publicId}?theme=${embedTheme}" style="border:none;width:100%;height:${height}px;" loading="lazy" title="Legal Document by Legal Forge"></iframe>`}
                                    className="w-full h-32 p-3 text-sm font-mono rounded-md bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border focus:outline-none resize-none"
                                />

                                <button
                                    onClick={() => {
                                        navigator.clipboard
                                            .writeText(
                                                `<iframe src="${process.env.NEXT_PUBLIC_APP_URL}/embed/${data.publicId}?theme=${embedTheme}" style="border:none;width:100%;height:${height}px;" loading="lazy" title="Legal Document by Legal Forge"></iframe>`
                                            )
                                            .finally();
                                        setCopiedEmbed(true);
                                        setTimeout(() => setCopiedEmbed(false), 2000);
                                    }}
                                    className="mt-4 w-full py-2 rounded-md bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-white font-semibold transition"
                                >
                                    {copiedEmbed ? 'Copied!' : 'Copy Embed'}
                                </button>
                            </motion.div>
                        </>
                    )}
                </motion.div>
            </Layout>
        </main>
    );
}
