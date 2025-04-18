'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postWithAuth } from '@/lib/api';
import { SiteType } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function NewSitePage() {
  const [error, setError] = useState('');
  const [site, setSite] = useState<SiteType>({
    name: '',
    domain: '',
    language: '',
    legislation: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await postWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/sites`,
        site,
        token
      );
      if (res.error) {
        setError(res.error);
        return;
      } else {
        router.push('/sites');
        return;
      }
    } catch (err) {
      console.error('Erro ao criar site:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSite((prevSite) => ({
      ...prevSite,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-6">
        {error != '' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center flex flex-col">
            <span className="font-semibold text-red-600">{error}</span>
            <Link href="/plan" className="text-blue-600 hover:underline">
              Adiquira nosso plano pro e crie sites ilimitados
            </Link>
          </div>
        )}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => window.history.back()}
            className="hover:text-blue-600"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Novo Site</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome do Site
            </label>
            <input
              name="name"
              placeholder="ex: Meu Site"
              type="text"
              value={site.name}
              onChange={(e) => handleChange(e)}
              required
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Domínio
            </label>
            <input
              name="domain"
              type="text"
              placeholder="ex: meu-site.com"
              value={site.domain}
              onChange={(e) => handleChange(e)}
              required
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Idioma
            </label>
            <input
              name="language"
              type="text"
              value={site.language}
              placeholder="ex: pt-BR, en-US"
              onChange={(e) => handleChange(e)}
              required
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Legislação
            </label>
            <input
              name="legislation"
              type="text"
              placeholder="ex: LGPD, GDPR"
              value={site.legislation}
              onChange={(e) => handleChange(e)}
              required
              className="w-full mt-1 border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Salvando...' : 'Criar Site'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
