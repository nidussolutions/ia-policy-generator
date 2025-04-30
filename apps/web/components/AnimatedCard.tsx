import {useState} from "react";
import {motion} from "framer-motion";

interface CheckoutResponse {
    sessionId: string;
    url: string;
}

export default function AnimatedCard({title, value}: { title: string; value: string | number; plan?: string }) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const startCheckout = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token');
            console.log(process.env.NEXT_PUBLIC_API_URL);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setError('Erro ao iniciar checkout');
                console.log(response);
                return;
            }

            const data: CheckoutResponse = await response.json();

            if (data?.url) {
                window.location.href = data.url;
            } else {
                setError('Erro ao iniciar checkout');
            }

        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
            console.error('Erro ao iniciar checkout:', err);
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
                className="p-4 bg-light-card dark:bg-dark-card backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl text-center shadow-lg transition-all duration-300 ease-in-out flex flex-col h-full justify-center"
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
            className="p-4 bg-light-card dark:bg-dark-card backdrop-blur-md border border-light-border dark:border-dark-border rounded-xl text-center shadow-lg transition-all duration-300 ease-in-out flex flex-col h-full justify-center"
        >
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{title}</p>
            <p className="text-1xl font-bold text-light-text-primary dark:text-dark-text-primary mt-2">{value}</p>
            {value === 'Free'
                && (
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            disabled={loading}
                            className="mt-2 w-full bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-light-background dark:text-dark-text-primary py-2 rounded-lg text-sm font-semibold disabled:bg-light-border dark:disabled:bg-dark-disabled"
                            onClick={() => startCheckout()}
                        >
                            {loading ? 'Loading...' : 'Subscribe'}
                        </button>
                    </div>
                )}
        </motion.div>
    );
}
