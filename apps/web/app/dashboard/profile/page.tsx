'use client';

import {useEffect, useState} from 'react';
import {Loader2, Mail, Lock, User, ArrowLeft} from 'lucide-react';
import {PlanType, putWithAuth} from '@/lib/api';
import Layout from '@/components/Layout';
import {useCheckout} from "@/hooks/useCheckout";
import Loading from "@/components/Loading";
import ConfirmModal from "@/components/ConfirmModal";

export default function PerfilPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState<PlanType | null>(null);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true); // começa como true!
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const {startCheckout, cancelSubscription} = useCheckout();

    const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    useEffect(() => {
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }

        const fetchData = async () => {
            try {
                const resUser = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                );

                const userJson = await resUser.json();
                setName(userJson.name);
                setEmail(userJson.email);
                setPlan(userJson.plan || null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        if (password && (password.length < 6 || !/[^A-Za-z0-9]/.test(password))) {
            setError(
                'A senha deve ter pelo menos 6 caracteres e um caractere especial.'
            );
            setLoading(false);
            return;
        }

        try {
            const res = await putWithAuth(
                `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
                {
                    name,
                    email,
                    password: password || undefined,
                },
                token
            );

            if (!res.id) throw new Error();
            setSuccess('Informações atualizadas com sucesso!');
        } catch {
            setError('Erro ao atualizar perfil. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

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
        switch (planName) {
            case 'pro':
                try {
                    setModalOpen(true);
                } catch {
                    setError('Erro ao cancelar plano. Tente novamente.');
                }
                break;
            case 'free':
                try {
                    await startCheckout(plan!.id!);
                } catch {
                    setError('Erro ao contratar plano. Tente novamente.');
                }
                break;
            default:
                setError('Plano inválido.');
                break;
        }
    }

    const handleCancel = () => {
        setModalOpen(false);
    };

    if (loading || !plan) {
        return <Loading page="profile"/>;
    }

    return (
        <Layout>
            <ConfirmModal
                isOpen={modalOpen}
                message="Você tem certeza que deseja cancelar sua assinatura?"
                description="Confirmando você perde de imediato o acesso aos sites e documentos criados. Casa tenho dúvidas entre em contato com o suporte"
                onConfirm={confirmDelete}
                onCancel={handleCancel}
            />
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center gap-4 mb-6 dark:text-white">
                    <button
                        className="flex items-center"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft
                            size={24}
                            className="text-gray-500 cursor-pointer dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                        />
                    </button>
                    <h1 className="text-3xl font-bold">Meu Perfil</h1>
                </div>

                <form
                    onSubmit={handleUpdate}
                    className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
                >
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-600">{success}</p>}

                    <div>
                        <label className="block text-sm font-medium mb-1">Nome</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <User size={18}/>
                            </span>
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Mail size={18}/>
                            </span>
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Nova Senha</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Lock size={18}/>
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full pl-10 pr-12 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Deixe em branco para não alterar"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? 'Ocultar' : 'Ver'}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
                        Salvar Alterações
                    </button>
                </form>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold">Plano Atual</h2>
                            <p>
                                <strong>Tipo:</strong>{' '}
                                {`${plan.name.charAt(0).toUpperCase()}${plan.name.slice(1)}`}
                            </p>
                        </div>
                        <button
                            className={`text-white px-4 py-2 rounded transition cursor-pointer ${plan.name.toLowerCase() === 'pro' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                            onClick={() => handleSubscription(plan.name.toLowerCase())}
                        >
                            {plan.name.toLowerCase() === 'pro' ? 'Cancelar plano' : 'Contratar Pro'}
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold">Faturamento</h2>
                    <p className="text-sm text-gray-500">
                        Histórico de pagamentos e faturas será exibido aqui futuramente.
                    </p>
                </div>
            </div>
        </Layout>
    );
}
