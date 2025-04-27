'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserType } from '@/types/UserType';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import ActionButton from '@/components/ActionButton';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import AnimatedCard from '@/components/AnimatedCard';

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
        const resUser = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (resUser.status === 401) throw new Error('Token expired');
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
        setActivities(logsJson.logs || []);
      } catch (err: any) {
        console.error('Error loading dashboard data:', err.message);
        setError('Error loading dashboard. Please login again.');
        localStorage.removeItem('token');
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoading, isAuthenticated, token, router]);

  if (authLoading || loading) return <Loading page="dashboard" />;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;
  if (!userData) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] text-gray-200">
      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white"
          >
            Hello, {userData.name} 👋
          </motion.h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCard title="Connected Sites" value={metrics.sites} />
            <AnimatedCard
              title="Generated Documents"
              value={metrics.documents}
            />
            <AnimatedCard
              title="Last Login"
              value={new Date(userData.lastLogin).toLocaleString()}
            />
            <AnimatedCard title="Plan" value={userData?.plan?.name || 'Free'} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              Suggested Actions
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <ActionButton
                className="w-full bg-[#8C0368] hover:bg-[#A429A6] text-white"
                text="Register a new site"
                onClick={() => router.push('/sites/new')}
              />
              <ActionButton
                className="w-full bg-[#8C0368] hover:bg-[#A429A6] text-white"
                text="Generate a new document"
                onClick={() => router.push('/sites')}
              />
              <ActionButton
                className="w-full bg-[#8C0368] hover:bg-[#A429A6] text-white"
                text="Check terms status"
                onClick={() => router.push('/sites')}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              Recent Activities
            </h2>
            <ul className="bg-[#1E0359]/30 border border-[#8C0368]/20 rounded-xl divide-y divide-[#030526]">
              {activities.length === 0 ? (
                <li className="p-4 text-gray-400">No recent activities.</li>
              ) : (
                activities.slice(0, 5).map((a, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="p-4 text-gray-200"
                  >
                    {a}
                  </motion.li>
                ))
              )}
            </ul>
          </motion.div>
        </motion.div>
      </Layout>
    </main>
  );
}
