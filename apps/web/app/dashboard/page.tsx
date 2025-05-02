'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {UserType} from '@/types/UserType';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import {useAuth} from '@/hooks/useAuth';
import {useI18n} from '@/contexts/I18nContext';
import {motion, AnimatePresence} from 'framer-motion';
import AnimatedCard from '@/components/AnimatedCard';
import {Globe, FileText, Clock, Crown, Plus, FileCheck, Book, Activity} from 'lucide-react';

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
};

const buttonVariants = {
    hover: {
        scale: 1.05,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10,
        },
    },
    tap: {scale: 0.95},
};

const textVariants = {
    enter: (direction: number) => ({
        y: direction > 0 ? 20 : -20,
        opacity: 0
    }),
    center: {
        y: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        y: direction < 0 ? 20 : -20,
        opacity: 0
    })
};

export default function DashboardPage() {
    const router = useRouter();
    const [textDirection, setTextDirection] = useState(0);
    const {token, isAuthenticated, loading: authLoading} = useAuth();
    const {t} = useI18n();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserType | null>(null);
    const [metrics, setMetrics] = useState({sites: 0, documents: 0});
    const [activities, setActivities] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [t]);

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
                        headers: {Authorization: `Bearer ${token}`},
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
                        headers: {Authorization: `Bearer ${token}`},
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
                        headers: {Authorization: `Bearer ${token}`},
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

    if (authLoading || loading) return <Loading page="dashboard"/>;
    if (error) return <div className="text-center text-red-500 p-6">{error}</div>;
    if (!userData) return null;


    if (authLoading || loading) return <Loading page="dashboard"/>;
    if (error) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-background via-light-card to-light-background dark:from-dark-background dark:via-dark-card dark:to-dark-background">
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    className="p-8 rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-gray-800/20 shadow-2xl text-red-400 text-center"
                >
                    {error}
                </motion.div>
            </div>
        );
    }
    if (!userData) return null;

    return (
        <main
            className="min-h-screen bg-gradient-to-br from-light-background via-light-card to-light-background dark:from-dark-background dark:via-dark-card dark:to-dark-background">
            <Layout>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-8 space-y-8"
                >
                    {/* Greeting Section */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-4 bg-white/5 dark:bg-black/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 dark:border-gray-800/10"
                    >
                        <div className="flex-1">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.h1
                                    key={`greeting-${textDirection}`}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    custom={textDirection}
                                    className="text-3xl font-bold bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                                >
                                    {t('dashboard.greeting').replace('{name}', userData.name)}
                                </motion.h1>
                            </AnimatePresence>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
                                {new Date().toLocaleDateString(undefined, {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </motion.div>

                    {/* Metrics Grid */}
                    <motion.div variants={itemVariants}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-dark-text-primary">
                        <AnimatePresence mode="wait">
                            <AnimatedCard
                                key={`sites-${textDirection}`}
                                icon={<Globe className="w-6 h-6"/>}
                                title={t('dashboard.metrics.connectedSites')}
                                value={metrics.sites}
                                variant="purple"
                            />
                            <AnimatedCard
                                key={`docs-${textDirection}`}
                                icon={<FileText className="w-6 h-6"/>}
                                title={t('dashboard.metrics.generatedDocuments')}
                                value={metrics.documents}
                                variant="blue"
                            />
                            <AnimatedCard
                                key={`login-${textDirection}`}
                                icon={<Clock className="w-6 h-6"/>}
                                title={t('dashboard.metrics.lastLogin')}
                                value={new Date(userData.lastLogin).toLocaleString()}
                                variant="green"
                            />
                            <AnimatedCard
                                key={`plan-${textDirection}`}
                                icon={<Crown className="w-6 h-6"/>}
                                title={t('dashboard.metrics.plan')}
                                value={userData?.plan?.name || 'Free'}
                                variant="gold"
                            />
                        </AnimatePresence>
                    </motion.div>

                    {/* Actions Section */}
                    <motion.div variants={itemVariants}>
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={`actions-${textDirection}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                                className="text-xl font-semibold mb-6 flex items-center gap-2 text-light-text-primary dark:text-dark-text-primary"
                            >
                                <Activity className="w-5 h-5"/>
                                {t('dashboard.actions.title')}
                            </motion.h2>
                        </AnimatePresence>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <AnimatePresence mode="wait">
                                {['registerSite', 'generateDocument', 'checkTerms'].map((action, index) => (
                                    <motion.button
                                        key={`${action}-${textDirection}`}
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        custom={textDirection}
                                        onClick={() => router.push(action === 'registerSite' ? '/sites/new' : '/sites')}
                                        className={`p-4 rounded-xl bg-gradient-to-r ${
                                            index === 0
                                                ? 'from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover'
                                                : index === 1
                                                    ? 'from-dark-accent-purple to-light-purple dark:from-dark-accent-blue dark:to-dark-purple-hover'
                                                    : 'from-light-accent-blue to-light-purple dark:from-dark-accent-green dark:to-dark-purple-hover'
                                        } text-white shadow-lg shadow-light-accent-purple/20 dark:shadow-dark-accent-purple/20 flex items-center gap-3 justify-center`}
                                    >
                                        {index === 0 ? <Plus className="w-5 h-5"/> : index === 1 ?
                                            <FileCheck className="w-5 h-5"/> : <Book className="w-5 h-5"/>}
                                        {t(`dashboard.actions.${action}`)}
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Activities Section */}
                    <motion.div variants={itemVariants}>
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={`activities-${textDirection}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                                className="text-xl font-semibold mb-6 flex items-center gap-2 text-light-text-primary dark:text-dark-text-primary"
                            >
                                <Activity className="w-5 h-5"/>
                                {t('dashboard.activities.title')}
                            </motion.h2>
                        </AnimatePresence>
                        <div
                            className="bg-white/5 dark:bg-black/5 rounded-2xl backdrop-blur-sm border border-white/10 dark:border-gray-800/10 overflow-hidden">
                            <AnimatePresence mode="wait">
                                {activities.length === 0 ? (
                                    <motion.div
                                        key={`no-activities-${textDirection}`}
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        custom={textDirection}
                                        className="p-6 text-center text-light-text-secondary dark:text-dark-text-secondary"
                                    >
                                        {t('dashboard.activities.noActivities')}
                                    </motion.div>
                                ) : (
                                    <ul className="divide-y divide-white/5 dark:divide-gray-800/5">
                                        {activities.slice(0, 5).map((activity, idx) => (
                                            <motion.li
                                                key={`${idx}-${textDirection}`}
                                                variants={textVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                custom={textDirection}
                                                className="p-4 hover:bg-white/5 dark:hover:bg-black/5 transition-colors flex items-center gap-3"
                                            >
                                                <div
                                                    className="w-2 h-2 rounded-full bg-light-accent-purple dark:bg-dark-accent-purple"/>
                                                <span className="text-light-text-primary dark:text-dark-text-primary">
                          {activity}
                        </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </Layout>
        </main>
    );
}