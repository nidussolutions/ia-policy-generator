'use client';

import { useCheckout } from '@/hooks/useCheckout';
import { useUser } from '@/hooks/useUser';
import Layout from '@/components/Layout';

const plans = [
    {
        id: 'plan_free_id',
        name: 'Plano Gratuito',
        description: 'Ideal para testar o sistema',
        price: 'R$ 0,00',
    },
    {
        id: '1296cf67-6cc5-4aa0-9b73-62a4780d3681',
        name: 'Plano Pro',
        description: 'Para sites ilimitados e IA avançada',
        price: 'R$ 39,90/mês',
    },
];

export default function CheckoutPage() {
    const { user, loading: loadingUser } = useUser();
    const { startCheckout, loading: loadingCheckout, error } = useCheckout();

    const currentPlanId = user?.currentPlanId;

    return (
        <Layout>
            <div className="min-h-screen bg-[#0c0c0c] text-white p-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-2 text-[#79d3d3]">Gerenciar Plano</h1>

                {loadingUser ? (
                    <p className="text-[#9e9d97] mb-6">Carregando plano atual...</p>
                ) : (
                    <p className="text-[#9e9d97] mb-6">
                        Plano atual:{' '}
                        <span className="text-white font-semibold">
              {plans.find((p) => p.id === currentPlanId)?.name || 'Desconhecido'}
            </span>
                    </p>
                )}

                <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {plans.map((plan) => {
                        const isCurrent = plan.id === currentPlanId;

                        return (
                            <div
                                key={plan.id}
                                className={`p-6 rounded-2xl shadow-md border ${
                                    isCurrent ? 'border-[#e93120] bg-[#1e1e1e]' : 'border-[#79d3d3] bg-[#1c1c1c]'
                                }`}
                            >
                                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                                <p className="text-[#9e9d97] mb-4">{plan.description}</p>
                                <p className="text-lg font-semibold text-[#79d3d3] mb-6">{plan.price}</p>
                                <button
                                    onClick={() => startCheckout(plan.id)}
                                    disabled={isCurrent || loadingCheckout}
                                    className={`px-4 py-2 rounded-xl w-full transition ${
                                        isCurrent
                                            ? 'bg-gray-600 text-white cursor-not-allowed'
                                            : 'bg-[#79d3d3] text-black hover:bg-[#6acaca]'
                                    }`}
                                >
                                    {isCurrent
                                        ? 'Plano Atual'
                                        : loadingCheckout
                                            ? 'Redirecionando...'
                                            : 'Assinar'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </Layout>
    );
}
