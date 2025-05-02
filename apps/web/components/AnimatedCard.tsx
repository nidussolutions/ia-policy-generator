import React, {useState} from "react";
import {motion} from "framer-motion";
import {Loader2} from "lucide-react";

interface CheckoutResponse {
    sessionId: string;
    url: string;
}

interface AnimatedCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    variant?: "purple" | "blue" | "green" | "gold";
}

const variantStyles = {
    purple: "from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover",
    blue: "from-light-accent-blue to-light-purple dark:from-dark-accent-blue dark:to-dark-purple-hover",
    green: "from-light-accent-blue to-light-purple dark:from-dark-accent-green dark:to-dark-purple-hover",
    gold: "from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700",
};

export default function AnimatedCard({
                                         title,
                                         value,
                                         icon,
                                         variant = "purple",
                                     }: AnimatedCardProps) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const startCheckout = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/plans/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                setError("Erro ao iniciar checkout");
                return;
            }

            const data: CheckoutResponse = await response.json();

            if (data?.url) {
                window.location.href = data.url;
            } else {
                setError("Erro ao iniciar checkout");
            }
        } catch (err: any) {
            setError(err.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <motion.div
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
                className="p-4 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl text-center shadow-lg flex flex-col h-full justify-center"
            >
                <p className="text-sm text-red-500">{error}</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center h-full bg-gradient-to-br ${variantStyles[variant]} transition-all duration-300 ease-in-out`}
        >
            {icon && (
                <div className="mb-2 flex items-center justify-center">
                    {icon}
                </div>
            )}
            <p className="text-sm text-dark-text-primary">{title}</p>
            <p className="text-2xl font-bold text-dark-text-primary mt-2">{value}</p>
            {value === "Free" && (
                <button
                    disabled={loading}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 text-light-accent-purple dark:text-dark-accent-purple font-semibold py-2 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={startCheckout}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin"/>
                            Loading...
                        </>
                    ) : (
                        "Upgrade"
                    )}
                </button>
            )}
        </motion.div>
    );
}