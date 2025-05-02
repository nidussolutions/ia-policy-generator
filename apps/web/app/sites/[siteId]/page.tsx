'use client';

import useSWR from 'swr';
import {DocType} from '@/types/DocumentsType';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import {useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';
import {notifyError} from '@/hooks/useToast';
import ConfirmModal from '@/components/ConfirmModal';
import {motion, AnimatePresence} from 'framer-motion';
import {fetcher} from '@/lib/api';
import {useI18n} from '@/contexts/I18nContext';

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

const tableVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

type TableHeaderProps = {
    textDirection: number;
    t: (key: string) => string;
}

type TableRowProps = {
    doc: DocType;
    onDelete: (docId: string) => void;
    textDirection: number;
    t: (key: string) => string;
};


const TableHeader = ({textDirection, t}: TableHeaderProps) => (
    <thead
        className="bg-light-accent-purple/20 dark:bg-dark-accent-purple/20 text-light-text-primary dark:text-dark-text-primary uppercase text-xs">
    <tr>
        {['title', 'type', 'lastUpdated', 'actions'].map((column) => (
            <th key={column} className={`px-4 py-3 ${column === 'actions' ? 'text-center' : ''}`}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`header-${column}-${textDirection}`}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                    >
                        {t(`sites.view.columns.${column}`)}
                    </motion.span>
                </AnimatePresence>
            </th>
        ))}
    </tr>
    </thead>
);

const TableRow = ({doc, onDelete, textDirection, t}: TableRowProps) => (
    <motion.tr
        initial={{opacity: 0, x: -20}}
        animate={{opacity: 1, x: 0}}
        exit={{opacity: 0, x: 20}}
        className="border-b border-light-border dark:border-dark-border hover:bg-light-accent-purple/5 dark:hover:bg-dark-accent-purple/5 transition-colors"
    >
        <td className="px-4 py-3 text-light-text-primary dark:text-dark-text-primary">{doc.title}</td>
        <td className="px-4 py-3 text-light-text-primary dark:text-dark-text-primary">{doc.type}</td>
        <td className="px-4 py-3 text-light-text-primary dark:text-dark-text-primary">
            {new Date(doc.updatedAt).toLocaleDateString()}
        </td>
        <td className="px-4 py-3">
            <div
                className="flex gap-2 justify-center items-center text-light-text-primary dark:text-dark-text-primary transition">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`actions-${doc.id}-${textDirection}`}
                        className="flex gap-2"
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                    >
                        <Link
                            href={`docs/edit/${doc.id}`}
                            className="text-light-accent-blue dark:text-dark-accent-blue hover:underline"
                        >
                            {t('sites.view.actions.edit')}
                        </Link>
                        <Link
                            href={`/public/${doc.publicId}`}
                            className="text-light-accent-purple dark:text-dark-accent-purple hover:underline"
                        >
                            {t('sites.view.actions.view')}
                        </Link>
                        <button
                            onClick={() => onDelete(doc.id!)}
                            className="text-red-600 hover:text-red-700 hover:underline transition duration-200"
                        >
                            {t('sites.view.actions.delete')}
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>
        </td>
    </motion.tr>
);

export default function DocumentPage() {
    const {t, language} = useI18n();
    const router = useRouter();
    const {siteId} = useParams() as { siteId: string };
    const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [textDirection, setTextDirection] = useState(0);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const {data, error, mutate} = useSWR(
        siteId ? `${process.env.NEXT_PUBLIC_API_URL}/docs/${siteId}` : null,
        (url) => fetcher(url, token)
    );

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    const confirmDelete = async (docId: string) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/docs/${docId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await mutate();
        } catch (error) {
            console.error('Error deleting document:', error);
            notifyError(t('sites.view.errors.deleteFailed'));
        }
    };

    const handleDelete = (docId: string) => {
        setDeletingDocId(docId);
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        if (deletingDocId) await confirmDelete(deletingDocId);
        setModalOpen(false);
        setDeletingDocId(null);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setDeletingDocId(null);
    };

    if (error) return <Error page="site documents" err={error}/>;
    if (!data) return <Loading page="document listing"/>;

    return (
        <>
            <ConfirmModal
                isOpen={modalOpen}
                type="deleteDoc"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <Layout>
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.4}}
                    className="flex gap-2 mb-4 justify-around items-center"
                >
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        onClick={() => window.history.back()}
                        className="text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition"
                    >
                        <ArrowLeft size={24}/>
                    </motion.button>
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`title-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary"
                        >
                            {t('sites.view.title')}
                        </motion.h1>
                    </AnimatePresence>
                    <div className="ml-auto">
                        <button
                            className={`bg-light-accent-purple dark:bg-dark-accent-purple text-light-background dark:text-dark-text-primary py-3 px-6 rounded-full shadow-lg transition-transform hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue`}
                            onClick={() => router.push(`/sites/docs/${siteId}/new`)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`new-doc-${language}`}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    custom={textDirection}
                                >
                                    {t('sites.view.actions.newDocument')}
                                </motion.span>
                            </AnimatePresence>
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    variants={tableVariants}
                    initial="hidden"
                    animate="visible"
                    className="overflow-x-auto rounded bg-light-card dark:bg-dark-card shadow backdrop-blur-md border border-light-border dark:border-dark-border"
                >
                    <table className="w-full text-sm text-left text-light-text-secondary dark:text-dark-text-secondary">
                        <TableHeader textDirection={textDirection} t={t}/>
                        <tbody>
                        <AnimatePresence mode="wait">
                            {data.map((doc: DocType) => (
                                <TableRow
                                    key={doc.id}
                                    doc={doc}
                                    onDelete={handleDelete}
                                    textDirection={textDirection}
                                    t={t}
                                />
                            ))}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </motion.div>
            </Layout>
        </>
    );
}