'use client';

import Error from '@/components/Error';
import Loading from '@/components/Loading';
import {ArrowLeft} from 'lucide-react';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';

export default function PublicDocumentPage() {
    const {publicId} = useParams() as { publicId: string };
    const [document, setDocument] = useState<null | {
        title: string;
        content: string;
        type: string;
        createdAt: string;
    }>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDoc() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/public/${publicId}`
                );
                const data = await res.json();
                setDocument(data);
            } catch (err) {
                console.error('Error loading document:', err);
            } finally {
                setLoading(false);
            }
        }

        if (publicId) fetchDoc();
    }, [publicId]);

    if (loading) return <Loading page="document"/>;
    if (!document)
        return <Error err="Document not found" page="requested"/>;

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8">
            <div className="flex gap-4 mb-6 items-center justify-between sm:justify-start">
                <button
                    onClick={() => window.history.back()}
                    className="hover:text-blue-600 text-gray-800 dark:text-white dark:hover:text-blue-600 transition duration-200 ease-in-out p-2 rounded-md border border-transparent hover:border-blue-500"
                >
                    <ArrowLeft size={24}/>
                </button>
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white">{document.title}</h1>
            </div>

            <div
                className="prose prose-lg prose-blue max-w-none bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800 dark:text-white dark:prose-invert">
                <ReactMarkdown>{document.content}</ReactMarkdown>
            </div>
        </div>
    );
}
