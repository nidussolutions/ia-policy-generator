'use client';

import Link from 'next/link';
import useSWR from 'swr';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import {notifyError} from '@/hooks/useToast';
import ConfirmModal from '@/components/ConfirmModal';
import {fetcher} from '@/lib/api';
import {useState} from 'react';
import {useAuth} from '@/hooks/useAuth';
import {motion} from 'framer-motion';

type Site = {
    id: string;
    name: string;
    domain: string;
};

export default function SitesPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [deletingSiteId, setDeletingSiteId] = useState<string | null>(null);
    const {token, loading: authLoading} = useAuth();

    const {data, error, isLoading, mutate} = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/sites` : null,
        (url) => fetcher(url, token!)
    );

    const confirmDelete = async (siteId: string) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}`, {
                method: 'DELETE',
                headers: {Authorization: `Bearer ${token}`},
            });
            mutate();
        } catch (err) {
            console.error('Error deleting site:', err);
            notifyError('Error deleting site');
        }
    };

    const handleDelete = (siteId: string) => {
        setDeletingSiteId(siteId);
        setModalOpen(true);
    };

    const handleConfirm = () => {
        if (deletingSiteId) confirmDelete(deletingSiteId);
        setModalOpen(false);
        setDeletingSiteId(null);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setDeletingSiteId(null);
    };

    if (authLoading || isLoading) return <Loading page="sites listing"/>;
    if (error) return <Error page="sites listing" err={error}/>;

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] text-gray-200">
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
                        className="flex justify-between items-center border-b border-[#8C0368]/20 pb-4"
                    >
                        <h1 className="text-3xl font-bold text-white">Your Sites</h1>
                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                            <Link
                                href="/sites/new"
                                className="bg-[#8C0368] hover:bg-[#A429A6] text-white px-4 py-2 rounded transition duration-200"
                            >
                                + New Site
                            </Link>
                        </motion.div>
                    </motion.div>

                    {data?.length === 0 && (
                        <motion.p
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                            className="text-gray-400 text-center"
                        >
                            You don&apos;t have any sites registered yet.
                        </motion.p>
                    )}

                    <motion.div layout className="space-y-4">
                        {data?.map((site: Site, idx: number) => (
                            <motion.div
                                key={site.id}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3 + idx * 0.05}}
                                className="p-4 bg-[#1E0359]/40 backdrop-blur-md border border-[#8C0368]/30 rounded-xl flex justify-between items-center"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold text-white">{site.name}</h2>
                                    <p className="text-gray-400 mt-1">{site.domain}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href={`/sites/${site.id}/`}
                                        className="text-[#8C0368] hover:text-[#A429A6] hover:underline transition duration-200"
                                    >
                                        Access
                                    </Link>
                                    <span className="text-gray-600">|</span>
                                    <Link
                                        href={`/sites/edit/${site.id}`}
                                        className="text-[#8C0368] hover:text-[#A429A6] hover:underline transition duration-200"
                                    >
                                        Edit
                                    </Link>
                                    <span className="text-gray-600">|</span>
                                    <button
                                        onClick={() => handleDelete(site.id)}
                                        className="text-[#8C0368] hover:text-[#A429A6] hover:underline transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </Layout>
            <ConfirmModal
                isOpen={modalOpen}
                type="deleteSite"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </main>
    );
}
