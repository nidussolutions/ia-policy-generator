'use client';

import React, {useEffect, useState} from 'react';
import {ArrowLeft} from 'lucide-react';
import {PlanType} from '@/lib/api';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import ConfirmModal from '@/components/ConfirmModal';
import {useRouter} from 'next/navigation';
import Invoices from '@/components/Invoices';
import Subscription from '@/components/Subscription';
import Profile from '@/components/Profile';
import {motion} from 'framer-motion';
import {useCheckout} from '@/hooks/useCheckout';

export default function ProfilePage() {
    const router = useRouter();
    const [type, setType] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [plan, setPlan] = useState<PlanType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const {startCheckout, cancelSubscription} = useCheckout();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
            return;
        }
        const fetchProfile = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
                    {headers: {Authorization: `Bearer ${token}`}}
                );
                const data = await res.json();
                setName(data.name);
                setEmail(data.email);
                setPlan(data.plan || null);
            } catch {
                setError('Error loading data');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [token, router]);

    const confirmDelete = async () => {
        try {
            await cancelSubscription(type);
            setModalOpen(false);
        } catch {
            setError('Error cancelling the plan. Please try again.');
        }
    };

    const handleSubscription = async (planName: string) => {
        if (!plan) return;
        try {
            if (planName === 'Pro') setModalOpen(true);
            else await startCheckout(plan.id!);
        } catch {
            setError('Error processing plan. Please try again.');
        }
    };

    if (loading || !plan) return <Loading page="profile"/>;

    return (
        <>
            <ConfirmModal
                isOpen={modalOpen}
                type={type ? 'resumeSubscription' : 'cancelSubscription'}
                onConfirm={confirmDelete}
                onCancel={() => setModalOpen(false)}
            />
            <Layout>


                <motion.div
                    className="max-w-3xl mx-auto space-y-8 p-6"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, ease: 'easeOut'}}
                >
                    {/* Back & Title */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.1, duration: 0.4}}
                    >
                        <button onClick={() => router.back()}>
                            <ArrowLeft className="w-6 h-6 text-gray-200 hover:text-[#8C0368] transition-colors"/>
                        </button>
                        <h1 className="text-3xl font-bold text-white">My Profile</h1>
                    </motion.div>

                    {/* Profile Form */}
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

                    {/* Subscription */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3, duration: 0.5}}
                    >
                        <Subscription setType={setType} handleSubscription={handleSubscription}/>
                    </motion.div>

                    {/* Invoices */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4, duration: 0.5}}
                    >
                        <Invoices/>
                    </motion.div>
                </motion.div>
            </Layout>
        </>
    );
}
