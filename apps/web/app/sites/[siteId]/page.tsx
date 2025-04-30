'use client';
import useSWR from 'swr';
import { DocType } from '@/types/DocumentsType';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import ActionButton from '@/components/ActionButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { notifyError } from '@/hooks/useToast';
import ConfirmModal from '@/components/ConfirmModal';
import { motion } from 'framer-motion';
import { fetcher } from '@/lib/api';
import { useI18n } from '@/contexts/I18nContext';

export default function DocumentPage() {
  const { t } = useI18n();
  const router = useRouter();
  const { siteId } = useParams() as { siteId: string };
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const { data, error, mutate } = useSWR(
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

  if (error) return <Error page="site documents" err={error} />;
  if (!data) return <Loading page="document listing" />;

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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex gap-2 mb-4 justify-around items-center"
        >
          <button
            onClick={() => window.history.back()}
            className="text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue transition"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{t('sites.view.title')}</h1>
          <div className="ml-auto">
            <ActionButton
              text={t('sites.view.actions.newDocument')}
              onClick={() => router.push(`/sites/docs/${siteId}/new`)}
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="overflow-x-auto rounded bg-light-card dark:bg-dark-card shadow backdrop-blur-md border border-light-border dark:border-dark-border"
        >
          <table className="w-full text-sm text-left text-light-text-secondary dark:text-dark-text-secondary">
            <thead className="bg-light-accent-purple/20 dark:bg-dark-accent-purple/20 text-light-text-primary dark:text-dark-text-primary uppercase text-xs">
              <tr>
                <th className="px-4 py-3">{t('sites.view.columns.title')}</th>
                <th className="px-4 py-3">{t('sites.view.columns.type')}</th>
                <th className="px-4 py-3">{t('sites.view.columns.lastUpdated')}</th>
                <th className="px-4 py-3 text-center">{t('sites.view.columns.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((doc: DocType) => (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <td className="px-4 py-3 text-light-text-primary dark:text-dark-text-primary">{doc.title}</td>
                  <td className="px-4 py-3 text-light-text-primary dark:text-dark-text-primary">{doc.type}</td>
                  <td className="px-4 py-3 text-light-text-primary dark:text-dark-text-primary">
                    {new Date(doc.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center items-center text-light-text-primary dark:text-dark-text-primary transition">
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
                        onClick={() => handleDelete(doc.id!)}
                        className="text-red-600 hover:text-red-700 hover:underline transition duration-200"
                      >
                        {t('sites.view.actions.delete')}
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
