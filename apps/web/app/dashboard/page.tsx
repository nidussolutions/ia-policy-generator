'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserType } from '@/types/UserType';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import ActionButton from '@/components/ActionButton';
import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/contexts/I18nContext';
import { motion } from 'framer-motion';
import AnimatedCard from '@/components/AnimatedCard';

export default function DashboardPage() {
  const router = useRouter();
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const { t } = useI18n();
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
        if (!token) {
          setError(t('dashboard.errors.noToken'));
          localStorage.removeItem('token');
          router.push('/auth/login');
          return;
        }

        const resUser = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (resUser.status === 401) {
          setError(t('dashboard.errors.tokenExpired'));
          localStorage.removeItem('token');
          router.push('/auth/login');
          return;
        }

        const userJson = await resUser.json();

        if (!resUser.ok) {
          setError(userJson.message || 'Failed to fetch user profile');
          return;
        }

        const resMetrics = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/metrics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (resMetrics.status === 401) {
          setError(t('dashboard.errors.tokenExpired'));
          localStorage.removeItem('token');
          router.push('/auth/login');
          return;
        }

        const metricsJson = await resMetrics.json();

        if (!resMetrics.ok) {
          setError(metricsJson.message || 'Failed to fetch metrics data');
          return;
        }

        const resLog = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/logs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (resLog.status === 401) {
          setError(t('dashboard.errors.tokenExpired'));
          localStorage.removeItem('token');
          router.push('/auth/login');
          return;
        }

        const logsJson = await resLog.json();

        if (!resLog.ok) {
          setError(logsJson.message || 'Failed to fetch logs data');
          return;
        }

        setUserData(userJson);
        setMetrics(metricsJson);
        setActivities(logsJson.logs || []);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError(t('dashboard.errors.loadingError'));
        localStorage.removeItem('token');
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData().then(() => {
      setLoading(false);
    });
  }, [authLoading, isAuthenticated, token, router, t]);

  if (authLoading || loading) return <Loading page="dashboard" />;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;
  if (!userData) return null;

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary">
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
            className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary"
          >
            {t('dashboard.greeting').replace('{name}', userData.name)}
          </motion.h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCard
              title={t('dashboard.metrics.connectedSites')}
              value={metrics.sites}
            />
            <AnimatedCard
              title={t('dashboard.metrics.generatedDocuments')}
              value={metrics.documents}
            />
            <AnimatedCard
              title={t('dashboard.metrics.lastLogin')}
              value={new Date(userData.lastLogin).toLocaleString()}
            />
            <AnimatedCard
              title={t('dashboard.metrics.plan')}
              value={userData?.plan?.name || 'Free'}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">
              {t('dashboard.actions.title')}
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <ActionButton
                className="w-full bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-light-background dark:text-dark-text-primary"
                text={t('dashboard.actions.registerSite')}
                onClick={() => router.push('/sites/new')}
              />
              <ActionButton
                className="w-full bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-light-background dark:text-dark-text-primary"
                text={t('dashboard.actions.generateDocument')}
                onClick={() => router.push('/sites')}
              />
              <ActionButton
                className="w-full bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-light-background dark:text-dark-text-primary"
                text={t('dashboard.actions.checkTerms')}
                onClick={() => router.push('/sites')}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">
              {t('dashboard.activities.title')}
            </h2>
            <ul className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl divide-y divide-light-border dark:divide-dark-border">
              {activities.length === 0 ? (
                <li className="p-4 text-light-text-secondary dark:text-dark-text-secondary">
                  {t('dashboard.activities.noActivities')}
                </li>
              ) : (
                activities.slice(0, 5).map((a, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="p-4 text-light-text-primary dark:text-dark-text-primary"
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
