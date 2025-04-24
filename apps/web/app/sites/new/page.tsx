'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {postWithAuth} from '@/lib/api';
import {SiteType} from '@/lib/api';
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
            const res = await postWithAuth(
                `${process.env.NEXT_PUBLIC_API_URL}/sites`,
                site,
                token
            );
            if (res.error) {
                notifyError(res.error);
                return;
            } else {
                router.push('/sites');
                return;
            }
        } catch (err) {
            console.error('Erro ao criar site:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSite((prevSite) => ({
            ...prevSite,
            [name]: value,
        }));
    };

    const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setSite((prevSite) => ({
            ...prevSite,
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
                    <h1 className="text-2xl font-bold">Novo Site</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.1}}
                    >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Nome do Site
                        </label>
                        <input
                            name="name"
                            placeholder="ex: Meu Site"
                            type="text"
                            value={site.name}
                            onChange={(e) => handleChange(e)}
                            required
                            className="w-full mt-1 border rounded px-3 py-2"
                        />
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2}}
                    >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Domínio
                        </label>
                        <input
                            name="domain"
                            type="text"
                            placeholder="ex: meu-site.com"
                            value={site.domain}
                            onChange={(e) => handleChange(e)}
                            required
                            className="w-full mt-1 border rounded px-3 py-2"
                        />
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.3}}
                    >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Idioma
                        </label>
                        <input
                            name="language"
                            type="text"
                            value={site.language}
                            placeholder="ex: pt-BR, en-US"
                            onChange={(e) => handleChange(e)}
                            required
                            className="w-full mt-1 border rounded px-3 py-2"
                        />
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.4}}
                    >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Legislação
                        </label>
                        <input
                            name="legislation"
                            type="text"
                            placeholder="ex: LGPD, GDPR"
                            value={site.legislation}
                            onChange={(e) => handleChange(e)}
                            required
                            className="w-full mt-1 border rounded px-3 py-2"
                        />
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5}}
                    >
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Observações
                        </label>
                        <textarea
                            name="observations"
                            placeholder="ex: Meu site é sobre... Gostaria de... O email padrão é..."
                            value={site.observations}
                            onChange={(e) => handleChangeTextarea(e)}
                            className="w-full mt-1 border rounded px-3 py-2"
                            rows={4}
                        ></textarea>
                    </motion.div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        initial={{scale: 1}}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        {loading ? 'Salvando...' : 'Criar Site'}
                    </motion.button>
                </form>
            </motion.div>
        </Layout>
    );
}
