'use client';

import { useState } from 'react';

interface CheckoutResponse {
    sessionId: string;
    url: string;
}

export function useCheckout() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startCheckout = async (planId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/plans/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ planId }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Erro ao iniciar o checkout');
            }

            const data: CheckoutResponse = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('URL do Stripe não recebida');
            }
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
            console.error('Erro ao iniciar checkout:', err);
        } finally {
            setLoading(false);
        }
    };

    return { startCheckout, loading, error };
}
