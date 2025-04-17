'use client';
import useSWR from 'swr';
import { DocType, fetcher } from '@/lib/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';

export default function DocumentPage() {
  const { siteId } = useParams() as { siteId: string };
  const token =
    typeof window != 'undefined' ? localStorage.getItem('token') || '' : '';

  const { data, error } = useSWR(
    siteId ? `${process.env.NEXT_PUBLIC_API_URL}/docs/${siteId}` : null,
    (url) => fetcher(url, token)
  );

  if (error) return <p>Error ao carregar documentos</p>;
  if (!data) return <p>Carregando...</p>;

  return (
    <Layout>
      <div className="flex gap-2 mb-4 justify-start items-center">
        <button
          onClick={() => window.history.back()}
          className="hover:text-blue-600 mt-1"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Documentos Gerados</h1>
      </div>
      <div className="overflow-x-auto rounded shadown bg-white">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Útima atualização</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((doc: DocType) => (
              <tr key={doc.id} className=" hover:bg-gray-100 transition">
                <td className="px-4 py-3">{doc.type}</td>
                <td className="px-4 py-3">
                  {new Date(doc.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`docs/edit/${doc.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
