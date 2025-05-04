'use client';
import {motion} from "framer-motion";
import useSWR from 'swr';
import Link from "next/link";
import {useI18n} from "@/contexts/I18nContext";
import AdminLayout from "@/components/AdminLayout";
import {fetcher} from "web/lib/api";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

type Plan = {
    id: string;
    name: string;
    description: string;
    price: [{
        unit_amount: number
    }];
}

export default function PlansPage() {
    const {t} = useI18n();

    const token = localStorage.getItem('adminToken');

    const {data, error, isLoading, mutate} = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/admin/plans` : null,
        (url) => fetcher(url, token!)
    );

    if (isLoading) return <Loading page="Plans"/>;
    if (error) return <Error page="Plans" err={error}/>;

    return (
        <main>
            <AdminLayout>
                <motion.div
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="p-6 space-y-8"
                >
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.2}}
                        className="flex justify-between items-center border-b border-light-border dark:border-dark-border pb-4"
                    >
                        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
                            {t('plans.title')}
                        </h1>
                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                            <Link
                                href="/plans/new"
                                className="bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-light-background dark:text-white px-4 py-2 rounded transition duration-200"
                            >
                                {t('plans.newPlans')}
                            </Link>
                        </motion.div>
                    </motion.div>
                    {data?.length === 0 && (
                        <motion.p
                            initial={{opacity: 0, y: 0}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                            className="text-light-text-secondary dark:text-dark-text-secondary text-center"
                        >
                            {t('plans.noPlans')}
                        </motion.p>
                    )}

                    {data[0] !== null ? (
                        <motion.div layout className="space-y-4">
                            {data.map((plan: Plan, idx: number) => (
                                <motion.div
                                    key={plan.id}
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.3 + idx * 0.05}}
                                    className="p-4 bg-light-card dark:bg-dark-card backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl flex justify-between items-center"
                                >
                                    <div>
                                        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                                            {plan.name || ''}
                                        </h2>
                                        <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">{plan.description}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            href={`/plans/${plan.id}/`}
                                            className="text-light-accent-purple dark:text-dark-accent-purple hover:text-light-accent-blue dark:hover:text-dark-accent-blue hover:underline transition duration-200"
                                        >
                                            {t('plans.actions.access')}
                                        </Link>
                                        <span
                                            className="text-light-text-secondary dark:text-dark-text-secondary">|</span>
                                        <Link
                                            href={`/plans/edit/${plan.id}`}
                                            className="text-light-accent-purple dark:text-dark-accent-purple hover:text-light-accent-blue dark:hover:text-dark-accent-blue hover:underline transition duration-200"
                                        >
                                            {t('plans.actions.edit')}
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.p
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                            className="text-light-text-secondary dark:text-dark-text-secondary text-center"
                        >
                            {t('plans.noSites')}
                        </motion.p>
                    )}
                </motion.div>
            </AdminLayout>
        </main>
    )
}
