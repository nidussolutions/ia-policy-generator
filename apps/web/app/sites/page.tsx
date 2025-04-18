'use client';

import Link from 'next/link';
import useSWR from 'swr';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { notifyError } from '@/hooks/useToast';
import ConfirmModal from '@/components/ConfirmModal';
import { fetcher } from '@/lib/api';
import { useState } from 'react';

type Site = {
  id: string;
  name: string;
  domain: string;
};

export default function SitesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingSiteId, setDeletingSiteId] = useState<string | null>(null);
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/sites`,
    (url) => fetcher(url, token)
  );

  const confirmDelete = async (siteId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}`, {
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

  if (isLoading) return <Loading page="a listagem de sites" />;
  if (error) return <Error page="a listagem de sites" err={error} />;

  return (
    <Layout>
      <ConfirmModal
        isOpen={modalOpen}
        message="Você tem certeza que deseja deletar este site?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Seus Sites
          </h1>
          <Link
            href="/sites/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            + Novo Site
          </Link>
        </div>

        {data?.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Você ainda não tem nenhum site cadastrado.
          </p>
        )}

        <div className="space-y-4">
          {data?.map((site: Site) => (
            <div
              key={site.id}
              className="p-2 px-4 bg-white shadow rounded flex justify-between items-center transition duration-200 dark:bg-gray-900 dark:shadow-gray-800"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {site.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {site.domain}
                </p>
              </div>
              <div>
                <Link
                  href={`/sites/${site.id}/`}
                  className="text-blue-600 hover:underline transition duration-200 dark:text-blue-500"
                >
                  Acessar
                </Link>
                <span className="mx-2 text-gray-400">|</span>
                <Link
                  href={`/sites/${site.id}/edit`}
                  className="text-yellow-600 hover:underline transition duration-200 dark:text-yellow-500"
                >
                  Editar
                </Link>
                <span className="mx-2 text-gray-400">|</span>
                <button
                  onClick={() => handleDelete(site.id)}
                  className="text-red-600 hover:underline transition duration-200 dark:text-red-500"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
