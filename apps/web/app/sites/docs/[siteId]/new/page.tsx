'use client';

import Layout from '@/components/Layout';
import {postWithAuth} from '@/lib/api';
import {ArrowLeft} from 'lucide-react';
import {useParams, useRouter} from 'next/navigation';
import {useState} from 'react';
import {motion} from 'framer-motion';

export default function NewDoc() {
    const router = useRouter();
    const {siteId} = useParams() as { siteId: string };
    const [loading, setLoading] = useState(false);
    const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const [doc, setDoc] = useState({
        title: '',
        siteId: siteId,
        type: '',
        observations: '',
    });

    if (!token) return router.push('/auth/login'); // Redirect if not authenticated

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
        } finally {
            setLoading(false);
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDoc((prevDoc) => ({
            ...prevDoc,
            [name]: value,
        }));
    };

    return (
        <Layout>
            <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                className="max-w-xl mx-auto p-6"
            >
                <div className="flex items-center gap-2 mb-6">
                    <button onClick={() => window.history.back()}>
                        <ArrowLeft size={20}/>
                    </button>
                    <h1 className="text-2xl font-bold">New Document</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.1}}
                    >
                        <label className="block text-sm font-medium text-gray-700">
                            Document Title
                        </label>
                        <input
                            name="title"
                            placeholder="e.g., Terms of Use"
                            type="text"
                            value={doc.title}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded px-3 py-2"
                            required
                        />
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2}}
                    >
                        <label className="block text-sm font-medium text-gray-700">
                            Document Type
                        </label>
                        <input
                            name="type"
                            placeholder="e.g., Terms of Use"
                            type="text"
                            value={doc.type}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded px-3 py-2"
                            required
                        />
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.3}}
                    >
                        <label className="block text-sm font-medium text-gray-700">
                            Observations
                        </label>
                        <input
                            name="observations"
                            placeholder="e.g., Add the email example@gmail.com"
                            type="text"
                            value={doc.observations}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded px-3 py-2"
                        />
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.4}}
                        className="flex flex-col justify-center items-center"
                    >
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {loading ? 'Generating...' : 'Generate'}
                        </button>
                        {loading && (
                            <span className="text-gray-600 text-sm">
                                This process may take up to 90 seconds.
                            </span>
                        )}
                    </motion.div>
                </form>
            </motion.div>
        </Layout>
    );
}
