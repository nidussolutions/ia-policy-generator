'use client';

import React from "react";
import {useI18n} from "@/contexts/I18nContext";
import {useParams} from "next/navigation";
import useSWR from 'swr';
import {fetcher} from "web/lib/api";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import AdminLayout from "@/components/AdminLayout";
import {motion} from "framer-motion";

type UserType = {
    id: string;
    name: string;
    email: string;
    cretedAt: string;
    updatedAt: string;
    plan: {
        name: string;
    },
    subscription: {
        status: string;
        createdAt: string;
        updatedAt: string;
    } | null;
}

export default function UserDetailsPage() {
    const {t} = useI18n();
    const {userId} = useParams() as { userId: string };

    const token = localStorage.getItem("adminToken")

    const {data, error, isLoading} = useSWR(
        userId ? `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}` : null,
        (url) => fetcher(url, token!)
    );

    if (isLoading) return <Loading page="User Details"/>
    if (error) return <Error page="user details" err={error}/>

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
                            {data.name}
                        </h1>
                    </motion.div>


                </motion.div>
            </AdminLayout>
        </main>
    );
}