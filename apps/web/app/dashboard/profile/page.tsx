'use client';

import React, {useEffect, useState} from 'react';
import {ArrowLeft} from 'lucide-react';
import {PlanType, SubscriptionType} from '@/lib/api';
import Layout from '@/components/Layout';
import {useCheckout} from "@/hooks/useCheckout";
import Loading from "@/components/Loading";
import ConfirmModal from "@/components/ConfirmModal";
import {useRouter} from "next/navigation";
import Invoices from "@/components/Invoices";
import Subscription from "@/components/Subscription";
import Profile from "@/components/Profile";
import {motion} from "framer-motion";

export default function PerfilPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [plan, setPlan] = useState<PlanType | null>(null);
    const [subscription, setSubscription] = useState<SubscriptionType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const {startCheckout, cancelSubscription} = useCheckout();

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
        }

        const fetchData = async () => {
            try {
                const [resUser, resSubscription] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {headers: {Authorization: `Bearer ${token}`}}),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/subscription`, {headers: {Authorization: `Bearer ${token}`}}),
                ]);

                const userJson = await resUser.json();
                const subscriptionJson = await resSubscription.json();

                setName(userJson.name);
                setEmail(userJson.email);
                setPlan(userJson.plan || null);
                setSubscription(subscriptionJson);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token, router]);

    const confirmDelete = async () => {
        try {
            await cancelSubscription(!subscription!.cancelAtPeriodEnd!);
            setModalOpen(false);
        } catch (error) {
            setError('Erro ao cancelar plano. Tente novamente.');
            console.log(error);
        }
    };

    const handleSubscription = async (planName: string) => {
        if (!plan) return;

        try {
            if (planName === 'Pro') {
                setModalOpen(true);
            } else {
                await startCheckout(plan.id!);
            }
        } catch {
            setError('Erro ao processar plano. Tente novamente.');
        }
    };

    const handleCancel = () => setModalOpen(false);

    if (loading || !plan) {
        return <Loading page="profile"/>;
    }

    return (
        <Layout>
            <ConfirmModal
                isOpen={modalOpen}
                type={subscription?.cancelAtPeriodEnd ? 'resumeSubscription' : 'cancelSubscription'}
                onConfirm={confirmDelete}
                onCancel={handleCancel}
            />

            <motion.div
                className="max-w-3xl mx-auto space-y-8"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, ease: 'easeOut'}}
            >
                <motion.div
                    className="flex items-center gap-4 dark:text-white"
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 0.1, duration: 0.4}}
                >
                    <button onClick={() => window.history.back()}>
                        <ArrowLeft
                            size={24}
                            className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                        />
                    </button>
                    <h1 className="text-3xl font-bold">Meu Perfil</h1>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2, duration: 0.5}}
                >
                    <Profile
                        name={name}
                        email={email}
                        password={password}
                        setName={setName}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        error={error}
                        setError={setError}
                        token={token}
                        setLoading={setLoading}
                        loading={loading}
                    />
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3, duration: 0.5}}
                >
                    <Subscription
                        plan={plan}
                        subscription={subscription}
                        handleSubscription={handleSubscription}
                    />
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.4, duration: 0.5}}
                >
                    <Invoices/>
                </motion.div>
            </motion.div>
        </Layout>
    );
}
