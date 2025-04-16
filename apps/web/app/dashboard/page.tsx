'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserType } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserType>({
    name: '',
    email: '',
    lastLogin: '2025-04-16 16:51:42.222',
    plan: 'Gratuito',
  });
  const [metrics, setMetrics] = useState({ sites: 0, documentos: 0 });
  const [atividades, setAtividades] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Buscar dados do usuário
        const resUser = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userJson = await resUser.json();
        if (!resUser.ok) throw new Error(userJson.message);

        const resMetrics = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/metrics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const metricsJson = await resMetrics.json();

        const resLog = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/logs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const logsJson = await resLog.json();

        setUserData(userJson);
        setMetrics(metricsJson);
        setAtividades(logsJson.logs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading)
    return <div className="p-8 text-gray-700">Carregando dashboard...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Olá, {userData.name} 👋</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Sites Conectados" value={metrics.sites} />
        <Card title="Documentos Gerados" value={metrics.documentos} />
        <Card
          title="Último Login"
          value={new Date(userData.lastLogin).toLocaleString()}
        />
        <Card title="Plano" value={userData?.plan || 'Gratuito'} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Últimas Atividades</h2>
        <ul className="bg-white rounded border divide-y">
          {atividades.length === 0 ? (
            <li className="p-4 text-gray-500">Nenhuma atividade recente.</li>
          ) : (
            atividades.map((a, idx) => (
              <li key={idx} className="p-4 text-gray-700">
                {a}
              </li>
            ))
          )}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Sugestões de Ações</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <ActionButton
            text="Cadastrar novo site"
            onClick={() => router.push('/sites/new')}
          />
          <ActionButton
            text="Gerar novo documento"
            onClick={() => router.push('/documents/new')}
          />
          <ActionButton
            text="Conferir status dos termos"
            onClick={() => router.push('/sites')}
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="p-4 bg-white border rounded shadow text-center hover:shadow-lg transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-1xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  );
}

function ActionButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition"
    >
      {text}
    </button>
  );
}
