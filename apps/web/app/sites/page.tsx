'use client';

import Link from 'next/link';
import useSWR from 'swr';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import {notifyError} from '@/hooks/useToast';
import ConfirmModal from '@/components/ConfirmModal';
import {fetcher} from '@/lib/api';
import {useState, useEffect} from 'react';
import {useAuth} from '@/hooks/useAuth';
import {useI18n} from '@/contexts/I18nContext';
import {motion, AnimatePresence} from 'framer-motion';

type Site = {
    id: string;
    name: string;
    domain: string;
};

type SiteCardProps = {
    site: Site;
    onDelete: (siteId: string) => void;
    textDirection: number;
    t: (key: string) => string;
}

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

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const SiteCard = ({site, onDelete, textDirection, t}: SiteCardProps) => {
    return (
        <motion.div
            layout
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            className="p-4 bg-light-card dark:bg-dark-card backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl flex justify-between items-center"
        >
            <div>
                <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                    {site.name || ''}
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">{site.domain}</p>
            </div>
            <div className="flex items-center space-x-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`actions-${site.id}-${textDirection}`}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                        className="flex items-center space-x-2"
                    >
                        <Link
                            href={`/sites/${site.id}/`}
                            className="text-light-accent-purple dark:text-dark-accent-purple hover:text-light-accent-blue dark:hover:text-dark-accent-blue hover:underline transition duration-200"
                        >
                            {t('sites.actions.access')}
                        </Link>
                        <span className="text-light-text-secondary dark:text-dark-text-secondary">|</span>
                        <Link
                            href={`/sites/edit/${site.id}`}
                            className="text-light-accent-purple dark:text-dark-accent-purple hover:text-light-accent-blue dark:hover:text-dark-accent-blue hover:underline transition duration-200"
                        >
                            {t('sites.actions.edit')}
                        </Link>
                        <span className="text-light-text-secondary dark:text-dark-text-secondary">|</span>
                        <button
                            onClick={() => onDelete(site.id)}
                            className="text-light-accent-purple dark:text-dark-accent-purple hover:text-light-accent-blue dark:hover:text-dark-accent-blue hover:underline transition duration-200"
                        >
                            {t('sites.actions.delete')}
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default function SitesPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [deletingSiteId, setDeletingSiteId] = useState<string | null>(null);
    const {token, loading: authLoading} = useAuth();
    const {t, language} = useI18n();
    const [textDirection, setTextDirection] = useState(0);

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    const { data, error, isLoading, mutate } = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/sites` : null,
        (url) => fetcher(url, token!)
    );

    const confirmDelete = async (siteId: string) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            mutate().finally();
        } catch (err) {
            console.error('Error deleting site:', err);
            notifyError(t('sites.errors.deleteFailed'));
        }
    };

    const handleDelete = (siteId: string) => {
        setDeletingSiteId(siteId);
        setModalOpen(true);
    };

    const handleConfirm = () => {
        if (deletingSiteId) confirmDelete(deletingSiteId).finally();
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
        <main
            className="min-h-screen bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary">
            <Layout>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-6 space-y-8"
                >
                    <div
                        className="flex justify-between items-center border-b border-light-border dark:border-dark-border pb-4">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={`title-${language}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                                className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary"
                            >
                                {t('sites.title')}
                            </motion.h1>
                        </AnimatePresence>

                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                            <Link
                                href="/sites/new"
                                className="bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-light-background dark:text-dark-background px-4 py-2 rounded transition duration-200"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={`new-site-${language}`}
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        custom={textDirection}
                                    >
                                        {t('sites.newSite')}
                                    </motion.span>
                                </AnimatePresence>
                            </Link>
                        </motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                        {data?.length === 0 && (
                            <motion.p
                                key={`no-sites-${language}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                                className="text-light-text-secondary dark:text-dark-text-secondary text-center"
                            >
                                {t('sites.noSites')}
                            </motion.p>
                        )}

                        {data[0] !== null && (
                            <motion.div layout className="space-y-4">
                                <AnimatePresence mode="wait">
                                    {data.map((site: Site) => (
                                        <SiteCard
                                            key={site.id}
                                            site={site}
                                            onDelete={handleDelete}
                                            textDirection={textDirection}
                                            t={t}
                                        />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
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