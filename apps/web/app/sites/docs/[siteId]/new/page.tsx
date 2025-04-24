'use client';

import Layout from '@/components/Layout';
import {postWithAuth} from '@/lib/api';
import {ArrowLeft} from 'lucide-react';
import {useParams, useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {notifyError} from '@/hooks/useToast';

export default function NewDocPage() {
    const router = useRouter();
    const {siteId} = useParams() as { siteId: string };
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('token') || ''
            : '';

    const [loading, setLoading] = useState(false);
    const [doc, setDoc] = useState({
        title: '',
        siteId,
        type: '',
        observations: '',
    });

    useEffect(() => {
        if (!token) router.push('/auth/login');
    }, [token, router]);

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
            notifyError('Error generating document');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const {name, value} = e.target;
        setDoc((prev) => ({...prev, [name]: value}));
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] text-gray-200">
            <Layout>
                <motion.div
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="p-6 space-y-8 max-w-lg mx-auto"
                >
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.2}}
                        className="flex items-center gap-2"
                    >
                        <button
                            onClick={() => router.back()}
                            className="text-gray-400 hover:text-[#79d3d3] transition"
                        >
                            <ArrowLeft size={24}/>
                        </button>
                        <h1 className="text-3xl font-bold text-white">New Document</h1>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {[
                            {label: 'Document Title', name: 'title', placeholder: 'e.g. Terms of Use'},
                            {label: 'Document Type', name: 'type', placeholder: 'e.g. Privacy Policy'},
                            {
                                label: 'Observations',
                                name: 'observations',
                                placeholder: 'e.g. include example@gmail.com'
                            },
                        ].map((field, idx) => (
                            <motion.div
                                key={field.name}
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3 + idx * 0.1}}
                            >
                                <label className="block text-sm text-gray-400 mb-1">
                                    {field.label}
                                </label>
                                <input
                                    name={field.name}
                                    type="text"
                                    placeholder={field.placeholder}
                                    value={(doc as any)[field.name]}
                                    onChange={handleChange}
                                    required={field.name !== 'observations'}
                                    className="w-full bg-[#1E0359]/40 backdrop-blur-md border border-[#8C0368]/30 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C0368]"
                                />
                            </motion.div>
                        ))}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#8C0368] hover:bg-[#A429A6] text-white rounded-xl px-4 py-2 font-semibold transition disabled:opacity-50"
                            initial={{scale: 1}}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            {loading ? 'Generating...' : 'Generate'}
                        </motion.button>

                        {loading && (
                            <motion.p
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                className="text-gray-400 text-sm text-center"
                            >
                                This process may take up to 90 seconds.
                            </motion.p>
                        )}
                    </form>
                </motion.div>
            </Layout>
        </main>
    );
}