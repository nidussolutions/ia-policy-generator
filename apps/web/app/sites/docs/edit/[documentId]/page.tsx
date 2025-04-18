'use client';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { fetcher, putWithAuth } from '@/lib/api';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';

export default function DocumentEditPage() {
  const { documentId } = useParams() as { documentId: string };
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
    'idle'
  );
  const [hasChanges, setHasChanges] = useState(false);

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const { data, error, mutate } = useSWR(
    documentId
      ? `${process.env.NEXT_PUBLIC_API_URL}/docs/view/${documentId}`
      : null,
    (url) => fetcher(url, token)
  );

  useEffect(() => {
    if (data?.content) setContent(data.content);
  }, [data]);

  if (error) return <p className="text-red-600">Erro ao carregar documento</p>;
  if (!data) return <Loading page="o documento solicitado" />;

  const handleCopyPublicLink = () => {
    const link = `${process.env.NEXT_PUBLIC_APP_URL}/public/${data.publicId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const autoSave = async () => {
    if (!hasChanges || saving) return;

    setSaving(true);
    setStatus('saving');
    try {
      await putWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/docs/${documentId}`,
        { content },
        token
      );
      mutate();
      setHasChanges(false);
      setStatus('saved');
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setSaving(false);
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const handleChange = (value: string) => {
    setContent(value);
    setHasChanges(true);

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      autoSave();
    }, 5000);
  };

  const handleManualSave = async () => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    await autoSave();
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('Descartar alterações?')) {
        setContent(data.content);
        setHasChanges(false);
      }
    } else {
      window.history.back();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white shadow sticky top-0 z-10 px-6 py-4 flex justify-between items-center border-b dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <button
              onClick={() => window.history.back()}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 leading-6">
              Editando:{' '}
              <span className="font-mono text-gray-600 dark:text-gray-400 text-sm">
                {data.title}
              </span>
            </h1>
          </div>

          <div className="flex gap-3 items-center text-sm dark:text-gray-400 text-gray-600">
            {status === 'saving' && (
              <span className="flex items-center gap-1 text-blue-500 font-semibold dark:text-blue-400">
                <Loader2 className="animate-spin" size={16} /> Salvando...
              </span>
            )}
            {status === 'saved' && (
              <span className="flex items-center gap-1 text-green-600 font-semibold dark:text-green-400">
                <CheckCircle size={16} /> Salvo
              </span>
            )}
            {status === 'error' && (
              <span className="flex items-center gap-1 text-red-500">
                <XCircle size={16} /> Erro ao salvar
              </span>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="bg-gray-200 px-4 py-1.5 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleManualSave}
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200 disabled:cursor-not-allowed"
              >
                Salvar
              </button>
            </div>
            {data.publicId && (
              <div className="flex items-center gap-2 bg-gray-100 p-2 rounded dark:bg-gray-800">
                <input
                  type="text"
                  readOnly
                  value={`${process.env.NEXT_PUBLIC_APP_URL}/public/${data.publicId}`}
                  className="w-full p-2 border rounded text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200 bg-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCopyPublicLink}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm transition-colors duration-200 disabled:cursor-not-allowed"
                >
                  {copied ? 'Copiado' : 'Copiar'}
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="p-6">
          <textarea
            className="w-full h-[500px] p-4 border rounded shadow-sm bg-white text-sm font-mono resize-none dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => handleChange(e.target.value)}
          />
        </main>
      </div>
    </Layout>
  );
}
