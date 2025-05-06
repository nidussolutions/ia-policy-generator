'use client';
import {motion} from "framer-motion";
import useSWR from 'swr';
import Link from "next/link";
import {useI18n} from "@/contexts/I18nContext";
import AdminLayout from "@/components/AdminLayout";
import {fetcher} from "web/lib/api";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

type Users = {
    id: string,
    name: string,
    email: string,
    plan: {
        name: string,
    },
    subscription: {
        status: string,
    } | null
}

export default function UsersPage() {
    const {t} = useI18n();

    const token = localStorage.getItem('adminToken');

    const {data, error, isLoading} = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/admin/users` : null,
        (url) => fetcher(url, token!)
    );

    if (isLoading) return <Loading page="Users"/>;
    if (error) return <Error page="Users" err={error}/>;

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
                            {t('users.title')}
                        </h1>
                    </motion.div>
                </motion.div>

                {data?.length === 0 && (
                    <motion.p
                        initial={{opacity: 0, y: 0}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="text-light-text-secondary dark:text-dark-text-secondary text-center"
                    >
                        {t('users.noUsers')}
                    </motion.p>
                )}

                {data[0] !== null ? (
                    <motion.div layout className="space-y-4">
                        {data.map((user: Users, idx: number) => (
                            <motion.div
                                key={user.id}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3 + idx * 0.05}}
                                className="p-4 bg-light-card dark:bg-dark-card backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl flex justify-between items-center"
                            >
                                <div>
                                    <div className="flex items-center space-x-1">
                                        <h2 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">
                                            {user.name}
                                        </h2>
                                        {user.subscription ?
                                            <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                           - {t('users.sub')}
                                        </span>
                                            :
                                            <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                          - {t('users.noSub')}
                                        </span>
                                        }
                                    </div>
                                    <div className="flex flex-col space-x-1 ml-2">
                                        {user.plan && (
                                            <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                                {t('users.actions.plan')}: {user.plan.name}
                                            </p>
                                        )}
                                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href={`/users/${user.id}/`}
                                        className="text-light-accent-purple dark:text-dark-accent-purple hover:text-light-accent-blue dark:hover:text-dark-accent-blue hover:underline transition duration-200"
                                    >
                                        {t('users.actions.access')}
                                    </Link>
                                    <span
                                        className="text-light-text-secondary dark:text-dark-text-secondary">|</span>
                                    <Link
                                        href={`/users/edit/${user.id}`}
                                        className="text-light-accent-purple dark:text-dark-accent-purple hover:text-light-accent-blue dark:hover:text-dark-accent-blue hover:underline transition duration-200"
                                    >
                                        {t('users.actions.edit')}
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
                        {t('users.noSites')}
                    </motion.p>
                )}
            </AdminLayout>
        </main>
    )
}