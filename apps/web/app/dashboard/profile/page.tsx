'use client';

import React, {useEffect, useState} from 'react';
import {Loader2, Mail, Lock, User, ArrowLeft, ArrowRight} from 'lucide-react';
import {InvoicesType, PlanType, putWithAuth, SubscriptionType} from '@/lib/api';
import Layout from '@/components/Layout';
import {useCheckout} from "@/hooks/useCheckout";
import Loading from "@/components/Loading";
import ConfirmModal from "@/components/ConfirmModal";
import {useRouter} from "next/navigation";
import Invoices from "@/components/Invoices";
import Subscription from "@/components/Subscription";
import Profile from "@/components/Profile";

export default function PerfilPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [plan, setPlan] = useState<PlanType | null>(null);
    const [subscription, setSubscription] = useState<SubscriptionType | null>(null);
    const [invoices, setInvoices] = useState<InvoicesType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const {startCheckout, cancelSubscription} = useCheckout();

    const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
        }

        const fetchData = async () => {
            try {
                const [resUser, resSubscription, resInvoices] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {headers: {Authorization: `Bearer ${token}`}}),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/subscription`, {headers: {Authorization: `Bearer ${token}`}}),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/invoices?page=${page}&limit=5`, {headers: {Authorization: `Bearer ${token}`}})
                ]);

                const userJson = await resUser.json();
                const subscriptionJson = await resSubscription.json();
                const invoicesJson = await resInvoices.json();

                setName(userJson.name);
                setEmail(userJson.email);
                setPlan(userJson.plan || null);
                setSubscription(subscriptionJson);
                setInvoices((prev) => (page === 1 ? invoicesJson.invoices : [...prev, ...invoicesJson.invoices]));
                setHasMore(invoicesJson.pagination.totalPages > page);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token, page, router]);

    const confirmDelete = async () => {
        try {
            await cancelSubscription();
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
                message="Você tem certeza que deseja cancelar sua assinatura?"
                description="Confirmando você perde de imediato o acesso aos sites e documentos criados. Caso tenha dúvidas, entre em contato com o suporte."
                onConfirm={confirmDelete}
                onCancel={handleCancel}
            />

            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center gap-4 mb-6 dark:text-white">
                    <button onClick={() => window.history.back()}>
                        <ArrowLeft size={24}
                                   className="text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"/>
                    </button>
                    <h1 className="text-3xl font-bold">Meu Perfil</h1>
                </div>

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

                <Subscription
                    plan={plan}
                    subscription={subscription}
                    handleSubscription={handleSubscription}
                />

                <Invoices
                    invoices={invoices}
                    setPage={setPage}
                    page={page}
                    hasMore={hasMore}
                    setInvoices={setInvoices}
                />
            </div>
        </Layout>
    );
}
