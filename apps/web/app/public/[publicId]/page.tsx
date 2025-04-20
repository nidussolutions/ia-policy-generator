'use client';

import Error from '@/components/Error';
import Loading from '@/components/Loading';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function PublicDocumentPage() {
  const { publicId } = useParams() as { publicId: string };
  const [document, setDocument] = useState<null | {
    title: string;
    content: string;
    type: string;
    createdAt: string;
  }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoc() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/public/${publicId}`
        );
        const data = await res.json();
        setDocument(data);
      } catch (err) {
        console.error('Erro ao carregar documento:', err);
      } finally {
        setLoading(false);
      }
    }

    if (publicId) fetchDoc();
  }, [publicId]);

  if (loading) return <Loading page="o documento" />;
  if (!document)
    return <Error err="Documento não encontrado" page="solicitada" />;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex gap-2 mb-4 justify-center items-center">
        <button
          onClick={() => window.history.back()}
          className="hover:text-blue-600 dark:text-white dark:hover:text-blue-600 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-center">{document.title}</h1>
      </div>
      <div className="prose prose-blue max-w-none bg-white p-6 rounded-xl shadow dark:bg-gray-800">
        <ReactMarkdown>{document.content}</ReactMarkdown>
      </div>
    </div>
  );
}
