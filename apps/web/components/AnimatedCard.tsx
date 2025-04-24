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


    return (
        <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            className="p-4 bg-[#1E0359]/40 backdrop-blur-md border border-[#8C0368]/30 rounded-xl text-center shadow-lg shadow-[#8C0368]/20 hover:shadow-[#8C0368]/40 transition-all duration-300 ease-in-out flex flex-col h-full justify-center"
        >
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-1xl font-bold text-white mt-2">{value}</p>
            {value === 'Free'
                && (
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            className="mt-2 w-full bg-[#8C0368] hover:bg-[#A429A6] text-white py-2 rounded-lg text-sm font-semibold"
                            onClick={() => startCheckout()}
                        >
                            Upgrade Plan
                        </button>
                    </div>
                )}
        </motion.div>
    );
}
