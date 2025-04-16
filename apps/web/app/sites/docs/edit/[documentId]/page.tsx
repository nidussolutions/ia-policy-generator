'use client';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { fetcher, putWithAuth } from '@/lib/api';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function DocumentEditPage() {
  const { documentId } = useParams() as { documentId: string };
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<
    'idle' | 'saving' | 'success' | 'error'
  >('idle');
  const [hasChanges, setHasChanges] = useState(false);

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

  const handleSave = async () => {
    setSaving(true);
    setSaveState('saving');
    try {
      await putWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/docs/${documentId}`,
        { content },
        token
      );
      mutate();
      setHasChanges(false);
      setSaveState('success');
    } catch (err) {
      console.error(err);
      setSaveState('error');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveState('idle'), 3000);
    }
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

  if (error) return <p className="text-red-600">Erro ao carregar documento</p>;
  if (!data)
    return <p className="animate-pulse text-gray-500">Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-10 px-6 py-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.history.back()}
            className="hover:text-blue-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            Editando:{' '}
            <span className="font-mono text-gray-600">{data.type}</span>
          </h1>
        </div>

        <div className="flex gap-2 items-center">
          {saveState === 'saving' && (
            <Loader2 className="animate-spin text-blue-500" size={20} />
          )}
          {saveState === 'success' && (
            <CheckCircle className="text-green-500" size={20} />
          )}
          {saveState === 'error' && (
            <XCircle className="text-red-500" size={20} />
          )}
          {hasChanges && saveState === 'idle' && (
            <span className="text-sm text-yellow-600">
              Alterações não salvas
            </span>
          )}
          <button
            onClick={handleCancel}
            className="bg-gray-200 px-4 py-1.5 rounded hover:bg-gray-300 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-1.5 rounded text-sm text-white ${
              saving ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Salvar
          </button>
        </div>
      </header>

      <main className="p-6">
        <textarea
          className="w-full h-[500px] p-4 border rounded shadow-sm bg-white text-sm font-mono resize-none"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setHasChanges(true);
          }}
        />
      </main>
    </div>
  );
}
