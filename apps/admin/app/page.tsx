'use client';

import AdminLayout from '@/components/AdminLayout';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {Users, CreditCard, Globe} from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import {useI18n} from '@/contexts/I18nContext';

export default function AdminDashboardPage() {
    const { isLoading, isAuthenticated } = useAuth();
    const { t } = useI18n();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-light-accent-purple dark:border-dark-accent-purple"></div>
                <span className="sr-only">{t('common.loading')}</span>
            </div>
        );
    }

    return (
        <AdminLayout>
            <motion.div
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="p-6 space-y-8"
            >
                <motion.h1
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 0.2}}
                    className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary"
                >
                    {t('dashboard.title')}
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/admin/users">
                        <motion.div
                            whileHover={{scale: 1.02}}
                            className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center h-48"
                        >
                            <Users className="w-16 h-16 mb-4 text-light-accent-purple dark:text-dark-accent-purple" />
                            <h2 className="text-xl font-semibold">{t('dashboard.userManagement')}</h2>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
                                {t('dashboard.userManagementDesc')}
                            </p>
                        </motion.div>
                    </Link>

                    <Link href="/admin/plans">
                        <motion.div
                            whileHover={{scale: 1.02}}
                            className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center h-48"
                        >
                            <CreditCard className="w-16 h-16 mb-4 text-light-accent-blue dark:text-dark-accent-blue" />
                            <h2 className="text-xl font-semibold">{t('dashboard.planManagement')}</h2>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
                                {t('dashboard.planManagementDesc')}
                            </p>
                        </motion.div>
                    </Link>

                    <Link href="/admin/sites">
                        <motion.div
                            whileHover={{scale: 1.02}}
                            className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center h-48"
                        >
                            <Globe className="w-16 h-16 mb-4 text-light-accent-purple dark:text-dark-accent-purple" />
                            <h2 className="text-xl font-semibold">{t('dashboard.siteManagement')}</h2>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
                                {t('dashboard.siteManagementDesc')}
                            </p>
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </AdminLayout>
    );
}
