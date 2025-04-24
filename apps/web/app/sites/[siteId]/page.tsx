'use client';
import useSWR from 'swr';
import {DocType, fetcher} from '@/lib/api';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import ActionButton from '@/components/ActionButton';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {notifyError} from '@/hooks/useToast';
import ConfirmModal from '@/components/ConfirmModal';
import {motion} from 'framer-motion';

export default function DocumentPage() {
    const router = useRouter();
    const {siteId} = useParams() as { siteId: string };
    const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const {data, error, mutate} = useSWR(
        siteId ? `${process.env.NEXT_PUBLIC_API_URL}/docs/${siteId}` : null,
        (url) => fetcher(url, token)
    );

    const confirmDelete = async (siteId: string) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/docs/${siteId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            mutate();
        } catch (error) {
            console.error('Error deleting document:', error);
            notifyError('Error deleting document');
        }
    };

    const handleDelete = (siteId: string) => {
        setDeletingDocId(siteId);
        setModalOpen(true);
    };

    const handleConfirm = () => {
        if (deletingDocId) confirmDelete(deletingDocId);
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
                    <button
                        onClick={() => window.history.back()}
                        className="hover:text-blue-600 dark:text-white dark:hover:text-blue-600 transition"
                    >
                        <ArrowLeft size={24}/>
                    </button>
                    <h1 className="text-2xl font-bold">Generated Documents</h1>
                    <div className="ml-auto">
                        <ActionButton
                            text="New Document"
                            onClick={() => router.push(`/sites/docs/${siteId}/new`)}
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.1, duration: 0.4}}
                    className="overflow-x-auto rounded bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-90 shadow backdrop-blur-md"
                >
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="bg-gradient-to-r from-purple-100 to-purple-300 dark:from-purple-700 dark:to-purple-800 text-gray-700 uppercase text-xs dark:text-gray-200">
                        <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Last Updated</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((doc: DocType) => (
                            <motion.tr
                                key={doc.id}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 0.2}}
                            >
                                <td className="px-4 py-3 dark:text-gray-200">{doc.title}</td>
                                <td className="px-4 py-3 dark:text-gray-200">{doc.type}</td>
                                <td className="px-4 py-3 dark:text-gray-200">
                                    {new Date(doc.updatedAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">
                                    <div
                                        className="flex gap-2 justify-center items-center dark:text-white dark:hover:text-blue-600 transition">
                                        <Link
                                            href={`docs/edit/${doc.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/public/${doc.publicId}`}
                                            className="text-orange-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(doc.id!)}
                                            className="text-red-600 hover:underline transition duration-200 dark:text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </motion.div>
            </Layout>
        </>
    );
}