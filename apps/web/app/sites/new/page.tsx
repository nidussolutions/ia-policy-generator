'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {postWithAuth, SiteType} from '@/lib/api';
import {ArrowLeft} from 'lucide-react';
import Layout from '@/components/Layout';
import {ToastContainer} from 'react-toastify';
import {notifyError} from '@/hooks/useToast';
import {motion} from 'framer-motion';

export default function NewSitePage() {
    const [site, setSite] = useState<SiteType>({
        name: '',
        domain: '',
        language: '',
        legislation: '',
        observations: '',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const token =
        typeof window !== 'undefined'
            ? localStorage.getItem('token') || ''
            : '';

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

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] text-gray-200">
            <Layout>
                <motion.div
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="p-6 space-y-8"
                >
                    <ToastContainer/>

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
                        <h1 className="text-3xl font-bold text-white">New Site</h1>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {[
                            {label: 'Site Name', name: 'name', placeholder: 'e.g. My Website'},
                            {label: 'Domain', name: 'domain', placeholder: 'e.g. my-site.com'},
                            {label: 'Language', name: 'language', placeholder: 'e.g. en-US, pt-BR'},
                            {label: 'Legislation', name: 'legislation', placeholder: 'e.g. GDPR, LGPD'},
                        ].map(({label, name, placeholder}, idx) => (
                            <motion.div
                                key={name}
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3 + idx * 0.1}}
                            >
                                <label className="block text-sm text-gray-400 mb-1">
                                    {label}
                                </label>
                                <input
                                    name={name}
                                    type="text"
                                    placeholder={placeholder}
                                    value={(site as any)[name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#1E0359]/40 backdrop-blur-md border border-[#8C0368]/30 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C0368]"
                                />
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.7}}
                        >
                            <label className="block text-sm text-gray-400 mb-1">Notes</label>
                            <textarea
                                name="observations"
                                placeholder="e.g. My site is about..."
                                value={site.observations}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-[#1E0359]/40 backdrop-blur-md border border-[#8C0368]/30 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C0368]"
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#8C0368] hover:bg-[#A429A6] text-white rounded-xl px-4 py-2 font-semibold transition disabled:opacity-50"
                            initial={{scale: 1}}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            {loading ? 'Saving...' : 'Create Site'}
                        </motion.button>
                    </form>
                </motion.div>
            </Layout>
        </main>
    );
}