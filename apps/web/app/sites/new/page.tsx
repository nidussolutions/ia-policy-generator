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
        typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

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
                return;
            }

            router.push('/sites');
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
        setSite((currentSite) => ({
            ...currentSite,
            [name]: value,
        }));
    };

    return (
        <Layout>
            <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                className="max-w-xl mx-auto p-6 rounded-lg shadow-md"
            >
                <ToastContainer/>
                <div className="flex items-center gap-2 mb-6 text-gray-700 dark:text-gray-200">
                    <button
                        onClick={() => window.history.back()}
                        className="hover:text-blue-600"
                    >
                        <ArrowLeft size={20}/>
                    </button>
                    <h1 className="text-2xl font-bold">New Site</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        {label: 'Site Name', name: 'name', placeholder: 'e.g. My Website'},
                        {label: 'Domain', name: 'domain', placeholder: 'e.g. my-site.com'},
                        {label: 'Language', name: 'language', placeholder: 'e.g. en-US, pt-BR'},
                        {label: 'Legislation', name: 'legislation', placeholder: 'e.g. GDPR, LGPD'},
                    ].map(({label, name, placeholder}, index) => (
                        <motion.div
                            key={name}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.1 * (index + 1)}}
                        >
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                {label}
                            </label>
                            <input
                                name={name}
                                type="text"
                                placeholder={placeholder}
                                value={(site as any)[name]}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 border rounded px-3 py-2"
                            />
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5}}
                    >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Notes
                        </label>
                        <textarea
                            name="observations"
                            placeholder="e.g. My site is about... I would like to... The default email is..."
                            value={site.observations}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded px-3 py-2"
                            rows={4}
                        />
                    </motion.div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        initial={{scale: 1}}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        {loading ? 'Saving...' : 'Create Site'}
                    </motion.button>
                </form>
            </motion.div>
        </Layout>
    );
}
