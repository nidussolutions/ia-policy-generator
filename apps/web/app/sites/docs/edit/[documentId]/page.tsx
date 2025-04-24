'use client';

import {useParams} from 'next/navigation';
import useSWR from 'swr';
import {fetcher, putWithAuth} from '@/lib/api';
import {useState, useEffect, useRef} from 'react';
import {ArrowLeft, CheckCircle, XCircle, Loader2} from 'lucide-react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';

export default function DocumentEditPage() {
    const {documentId} = useParams() as { documentId: string };
    const [content, setContent] = useState('');
    const [copied, setCopied] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [hasChanges, setHasChanges] = useState(false);
    const saveTimeout = useRef<NodeJS.Timeout | null>(null);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const {data, error, mutate} = useSWR(
        documentId ? `${process.env.NEXT_PUBLIC_API_URL}/docs/view/${documentId}` : null,
        (url) => fetcher(url, token)
    );

    useEffect(() => {
        if (data?.content) setContent(data.content);
    }, [data]);

    if (error) return <p className="text-red-600">Failed to load document.</p>;
    if (!data) return <Loading page="the requested document"/>;

    const handleCopyPublicLink = () => {
        const link = `${process.env.NEXT_PUBLIC_APP_URL}/public/${data.publicId}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const autoSave = async () => {
        if (!hasChanges || isSaving) return;

        setIsSaving(true);
        setStatus('saving');

        try {
            await putWithAuth(
                `${process.env.NEXT_PUBLIC_API_URL}/docs/${documentId}`,
                {content},
                token
            );
            mutate();
            setHasChanges(false);
            setStatus('saved');
        } catch (err) {
            console.error(err);
            setStatus('error');
        } finally {
            setIsSaving(false);
            setTimeout(() => setStatus('idle'), 2000);
        }
    };

    const handleChange = (value: string) => {
        setContent(value);
        setHasChanges(true);

        if (saveTimeout.current) clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
            autoSave();
        }, 5000);
    };

    const handleManualSave = async () => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);
        await autoSave();
    };

    const handleCancel = () => {
        if (hasChanges) {
            const confirm = window.confirm('Are you sure you want to discard changes?');
            if (confirm) {
                setContent(data.content);
                setHasChanges(false);
            }
        } else {
            window.history.back();
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <header
                    className="bg-white dark:bg-gray-800 shadow sticky top-0 z-10 px-6 py-4 flex justify-between items-center border-b dark:border-gray-700">
                    <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                        <button
                            onClick={() => window.history.back()}
                            className="hover:text-blue-600 transition-colors duration-200"
                        >
                            <ArrowLeft size={20}/>
                        </button>
                        <h1 className="text-lg font-semibold">
                            Editing:{' '}
                            <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                {data.title}
              </span>
                        </h1>
                    </div>

                    <div className="flex gap-3 items-center text-sm text-gray-600 dark:text-gray-400">
                        {status === 'saving' && (
                            <span className="flex items-center gap-1 text-blue-500 font-semibold dark:text-blue-400">
                <Loader2 className="animate-spin" size={16}/> Saving...
              </span>
                        )}
                        {status === 'saved' && (
                            <span className="flex items-center gap-1 text-green-600 font-semibold dark:text-green-400">
                <CheckCircle size={16}/> Saved
              </span>
                        )}
                        {status === 'error' && (
                            <span className="flex items-center gap-1 text-red-500">
                <XCircle size={16}/> Error saving
              </span>
                        )}
                        <div className="flex gap-2">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-1.5 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleManualSave}
                                disabled={isSaving}
                                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 disabled:bg-blue-300 transition duration-200 disabled:cursor-not-allowed"
                            >
                                Save
                            </button>
                        </div>
                        {data.publicId && (
                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                <input
                                    type="text"
                                    readOnly
                                    value={`${process.env.NEXT_PUBLIC_APP_URL}/public/${data.publicId}`}
                                    className="w-full p-2 border rounded text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleCopyPublicLink}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm transition-colors duration-200"
                                >
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <main className="p-6">
          <textarea
              className="w-full h-[500px] p-4 border rounded shadow-sm bg-white dark:bg-gray-800 text-sm font-mono resize-none text-gray-900 dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={content}
              onChange={(e) => handleChange(e.target.value)}
          />
                </main>
            </div>
        </Layout>
    );
}
