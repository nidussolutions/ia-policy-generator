import React from "react";

type SubscriptionProps = {
    plan: { name: string };
    subscription: { status: string; cancelAtPeriodEnd: boolean; currentPeriodEnd: string | null } | null;
    handleSubscription: (planName: string) => void;
}

const statusLabel: Record<string, string> = {
    active: 'Ativo',
    canceled: 'Cancelado',
    incomplete: 'Incompleto',
    unpaid: 'Não pago',
};

export default function Subscription({plan, subscription, handleSubscription}: SubscriptionProps) {
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-2">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Plano Atual</h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Tipo:</strong> {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}
                    </p>
                </div>
                {subscription &&
                    <button
                        onClick={() => handleSubscription(plan.name)}
                        className={`px-4 py-2 cursor-pointer rounded text-white font-medium transition ${
                            plan.name === "Free" ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                                : subscription.cancelAtPeriodEnd ? 'bg-yellow-600 hover:accent-yellow-600 dark:accent-yellow-600 dark:hover:accent-yellow-800'
                                    : 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'
                        }`}
                    >
                        {plan.name === "Free" ? 'Assinar'
                            : subscription.cancelAtPeriodEnd ? 'Reativar Assinatura'
                                : 'Cancelar Assinatura'
                        }
                    </button>
                }
            </div>

            {subscription && (
                <div className="pt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <p className={`inline-block px-2 py-1 rounded-sm text-xs font-semibold ${
                        subscription.status !== "active" ? "bg-red-600"
                            : subscription.cancelAtPeriodEnd ? "bg-yellow-600"
                                : "bg-green-600"
                    } text-white`}>
                        <strong>Status:</strong>{' '}
                        {
                            subscription.cancelAtPeriodEnd ? "Não renovar"
                                : statusLabel[subscription.status] || subscription.status
                        }
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <strong>
                            {subscription.cancelAtPeriodEnd ? 'Finaliza em' : 'Próxima cobrança em'}
                        </strong>{' '}
                        {subscription.currentPeriodEnd
                            ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                            : '---'}
                    </p>
                </div>
            )}
        </div>
    )
}