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
        typeof window != 'undefined' ? localStorage.getItem('token') || '' : '';

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
            console.error('Erro ao deletar site:', error);
            notifyError('Erro ao deletar site');
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

    if (error) return <Error page="os documentos do site" err={error}/>;
    if (!data) return <Loading page="a listagem dos documentos"/>;

    return (
        <Layout>
            <ConfirmModal
                isOpen={modalOpen}
                type="deleteDoc"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                className="flex gap-2 mb-4 justify-arroud items-center"
            >
                <button
                    onClick={() => window.history.back()}
                    className="hover:text-blue-600 dark:text-white dark:hover:text-blue-600 transition"
                >
                    <ArrowLeft size={24}/>
                </button>
                <h1 className="text-2xl font-bold">Documentos Gerados</h1>
                <div className="ml-auto">
                    <ActionButton
                        text="Gerar novo documento"
                        onClick={() => router.push(`/sites/docs/${siteId}/new`)}
                    />{' '}
                </div>
            </motion.div>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.1, duration: 0.4}}
                className="overflow-x-auto rounded shadow bg-white dark:bg-gray-800"
            >
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-4 py-3 dark:text-gray-200">Titulo</th>
                        <th className="px-4 py-3 dark:text-gray-200">Tipo</th>
                        <th className="px-4 py-3 dark:text-gray-200">
                            Útima atualização
                        </th>
                        <th className="px-4 py-3 dark:text-gray-200 text-center">
                            Ações
                        </th>
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
                                        Editar
                                    </Link>
                                    <Link
                                        href={`/public/${doc.publicId}`}
                                        className="text-orange-600 hover:underline"
                                    >
                                        Visualizar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(doc.id!)}
                                        className="text-red-600 hover:underline transition duration-200 dark:text-red-500"
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </motion.div>
        </Layout>
    );
}
