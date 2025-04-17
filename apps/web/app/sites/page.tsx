'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { fetcher } from '@/lib/api';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

type Site = {
  id: string;
  name: string;
  domain: string;
};

export default function SitesPage() {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/sites`,
    (url) => fetcher(url, token)
  );

  if (isLoading) return <Loading page="a listagem de sites" />;
  if (error) return <Error page="a listagem de sites" err={error} />;

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Seus Sites</h1>
          <Link
            href="/sites/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Novo Site
          </Link>
        </div>

        {data?.length === 0 && (
          <p className="text-gray-600">
            Você ainda não tem nenhum site cadastrado.
          </p>
        )}

        <div className="space-y-4">
          {data?.map((site: Site) => (
            <div
              key={site.id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{site.name}</h2>
                <p className="text-sm text-gray-500">{site.domain}</p>
              </div>
              <Link
                href={`/sites/${site.id}/`}
                className="text-blue-600 hover:underline"
              >
                Acessar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
