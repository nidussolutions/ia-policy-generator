'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserType } from '@/lib/api';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import ActionButton from '@/components/ActionButton';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
    const router = useRouter();
    const { token, isAuthenticated, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserType | null>(null);
    const [metrics, setMetrics] = useState({ sites: 0, documentos: 0 });
    const [atividades, setAtividades] = useState<string[]>([]);

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        const fetchData = async () => {
            try {
                const resUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (resUser.status === 401) throw new Error('Token expirado');

                const userJson = await resUser.json();
                if (!resUser.ok) throw new Error(userJson.message);

                const resMetrics = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/metrics`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const metricsJson = await resMetrics.json();

                const resLog = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/logs`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const logsJson = await resLog.json();

                setUserData(userJson);
                setMetrics(metricsJson);
                setAtividades(logsJson.logs || []);
            } catch (err: any) {
                console.error('Erro ao carregar dados do dashboard:', err.message);
                localStorage.removeItem('token');
                router.push('/auth/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [authLoading, isAuthenticated, token, router]);

    if (authLoading || loading) return <Loading page="dashboard" />;
    if (!userData) return null; // Evita render antes de redirecionar

    return (
        <Layout>
            <div className="p-6 space-y-6 ">
                <h1 className="text-3xl font-bold">Olá, {userData.name} 👋</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card title="Sites Conectados" value={metrics.sites} />
                    <Card title="Documentos Gerados" value={metrics.documentos} />
                    <Card
                        title="Último Login"
                        value={new Date(userData.lastLogin).toLocaleString()}
                    />
                    <Card title="Plano" value={userData?.plan?.name || 'Free'} />
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Sugestões de Ações</h2>
                    <div className="flex flex-col justify-between md:flex-row gap-4">
                        <ActionButton
                            className="w-full"
                            text="Cadastrar novo site"
                            onClick={() => router.push('/sites/new')}
                        />
                        <ActionButton
                            className="w-full"
                            text="Gerar novo documento"
                            onClick={() => router.push('/sites')}
                        />
                        <ActionButton
                            className="w-full"
                            text="Conferir status dos termos"
                            onClick={() => router.push('/sites')}
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Últimas Atividades</h2>
                    <ul className="bg-white rounded border divide-y divide-gray-700 dark:bg-gray-800 dark:border-gray-700">
                        {atividades.length === 0 ? (
                            <li className="p-4 text-gray-500 dark:text-gray-400">
                                Nenhuma atividade recente.
                            </li>
                        ) : (
                            atividades.slice(0, 5).map((a, idx) => (
                                <li key={idx} className="p-4 text-gray-700 dark:text-gray-200">
                                    {a}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}

function Card({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="p-4 bg-white border rounded shadow text-center hover:shadow-lg transition duration-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-1xl font-bold text-gray-800 mt-1 dark:text-white">
                {value}
            </p>
        </div>
    );
}
