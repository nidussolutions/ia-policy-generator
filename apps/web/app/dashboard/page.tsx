'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserType } from '@/lib/api';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import ActionButton from '@/components/ActionButton';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const router = useRouter();
    const { token, isAuthenticated, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserType | null>(null);
    const [metrics, setMetrics] = useState({ sites: 0, documents: 0 });
    const [activities, setActivities] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

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

                if (resUser.status === 401) throw new Error('Token expired');
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
                setActivities(logsJson.logs || []);
            } catch (err: any) {
                console.error('Error loading dashboard data:', err.message);
                setError('There was an error loading your dashboard data. Please try again.');
                localStorage.removeItem('token');
                router.push('/auth/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [authLoading, isAuthenticated, token, router]);

    if (authLoading || loading) return <Loading page="dashboard" />;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!userData) return null;

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 space-y-6"
            >
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold"
                >
                    Hello, {userData.name} 👋
                </motion.h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AnimatedCard title="Connected Sites" value={metrics.sites} />
                    <AnimatedCard title="Generated Documents" value={metrics.documents} />
                    <AnimatedCard title="Last Login" value={new Date(userData.lastLogin).toLocaleString()} />
                    <AnimatedCard title="Plan" value={userData?.plan?.name || 'Free'} />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-xl font-semibold mb-2">Suggested Actions</h2>
                    <div className="flex flex-col justify-between md:flex-row gap-4">
                        <ActionButton className="w-full" text="Register a new site" onClick={() => router.push('/sites/new')} />
                        <ActionButton className="w-full" text="Generate a new document" onClick={() => router.push('/sites')} />
                        <ActionButton className="w-full" text="Check terms status" onClick={() => router.push('/sites')} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
                    <ul className="bg-white rounded border divide-y divide-gray-700 dark:bg-gray-800 dark:border-gray-700">
                        {activities.length === 0 ? (
                            <li className="p-4 text-gray-500 dark:text-gray-400">No recent activities.</li>
                        ) : (
                            activities.slice(0, 5).map((a, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + idx * 0.1 }}
                                    className="p-4 text-gray-700 dark:text-gray-200"
                                >
                                    {a}
                                </motion.li>
                            ))
                        )}
                    </ul>
                </motion.div>
            </motion.div>
        </Layout>
    );
}

function AnimatedCard({ title, value }: { title: string; value: string | number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-white border rounded shadow text-center hover:shadow-lg transition duration-200 dark:bg-gray-800 dark:border-gray-700"
        >
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-1xl font-bold text-gray-800 mt-1 dark:text-white">{value}</p>
        </motion.div>
    );
}
