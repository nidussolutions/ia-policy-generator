'use client';

import Layout from '@/components/Layout';
import { postWithAuth } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewDoc() {
  const router = useRouter();
  const { siteId } = useParams() as { siteId: string };
  const [loading, setLoading] = useState(false);
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const [doc, setDoc] = useState({
    siteid: siteId,
    type: '',
    observations: '',
  });

  if (!token) return router.push('/auth/login'); // temp

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await postWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/docs/generate`,
        doc,
        token
      );
      router.push(`/sites/${siteId}`);
    } catch (err) {
      console.error('Erro ao gerar documento', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoc((prevDoc) => ({
      ...prevDoc,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => window.history.back()}>
            <ArrowLeft size={20} />
          </button>
          <h1>Novo Docuemento</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de documento
            </label>
            <input
              name="type"
              placeholder="ex: Termo de uso"
              type="text"
              value={doc.type}
              onChange={handleChange}
              className="w-full mt-1 border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Observações
            </label>
            <input
              name="observations"
              placeholder="ex: Adicionar o email fulano@gmail.com"
              type="text"
              value={doc.observations}
              onChange={handleChange}
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? 'Gerando...' : 'Gerar'}
            </button>
            {loading && (
              <span className="text-gray-600 text-sm">
                Esse processo pode demorar até 90 segundos
              </span>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
}
