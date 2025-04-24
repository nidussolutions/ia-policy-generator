import React from "react";
import { motion } from "framer-motion";

type SubscriptionProps = {
    plan: { name: string };
    subscription: {
        status: string;
        cancelAtPeriodEnd: boolean;
        currentPeriodEnd: string | null;
    } | null;
    handleSubscription: (planName: string) => void;
};

const statusLabel: Record<string, string> = {
    active: "Ativo",
    canceled: "Cancelado",
    incomplete: "Incompleto",
    unpaid: "Não pago",
};

const Subscription = ({ plan, subscription, handleSubscription }: SubscriptionProps) => {
    const getButtonClass = () => {
        if (plan.name === "Free")
            return "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800";
        if (subscription?.cancelAtPeriodEnd)
            return "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800";
        return "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800";
    };

    const getButtonLabel = () => {
        if (plan.name === "Free") return "Assinar";
        if (subscription?.cancelAtPeriodEnd) return "Reativar Assinatura";
        return "Cancelar Assinatura";
    };

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Plano Atual
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Tipo:</strong>{" "}
                        {plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}
                    </p>
                </div>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSubscription(plan.name)}
                    className={`px-4 py-2 rounded text-white font-medium transition ${getButtonClass()}`}
                    aria-label={getButtonLabel()}
                >
                    {getButtonLabel()}
                </motion.button>
            </div>

            {subscription ? (
                <div className="pt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <p
                        className={`inline-block px-2 py-1 rounded-sm text-xs font-semibold ${
                            subscription.status !== "active"
                                ? "bg-red-600"
                                : subscription.cancelAtPeriodEnd
                                    ? "bg-yellow-600"
                                    : "bg-green-600"
                        } text-white`}
                    >
                        <strong>Status:</strong>{" "}
                        {subscription.cancelAtPeriodEnd
                            ? "Ativo - Não Renovar"
                            : statusLabel[subscription.status] || subscription.status}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <strong>
                            {subscription.cancelAtPeriodEnd
                                ? "Finaliza em"
                                : "Próxima cobrança em"}
                        </strong>{" "}
                        {subscription.currentPeriodEnd
                            ? formatDate(subscription.currentPeriodEnd)
                            : "---"}
                    </p>
                </div>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Nenhuma assinatura ativa no momento.
                </p>
            )}
        </motion.div>
    );
};

export default Subscription;
