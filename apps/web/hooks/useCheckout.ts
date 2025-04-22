'use client';

import {useEffect, useState} from 'react';
import {PlanType} from "@/lib/api";

interface CheckoutResponse {
    sessionId: string;
    url: string;
}

export function useCheckout() {
    const [loading, setLoading] = useState(false);
    const [plans, setPlans] = useState<PlanType[] | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Token não encontrado');
            return;
        }

        try {
            setLoading(true);
            const fetchPlans = async () => {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Falha ao buscar planos');
                }

                const data = await res.json()
                setPlans(data.plans);
                setLoading(false);
            };

            fetchPlans();
        } catch (error) {
            setError('Erro ao buscar planos');
            console.error('Erro ao buscar planos:', error);
        }
    }, []);

    const startCheckout = async (planId: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');

            console.log(process.env.NEXT_PUBLIC_API_URL)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({planId}),
            });

            if (!response.ok) {
                setError('Erro ao iniciar checkout');
                console.log(response);
                return
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
    }

    const cancelSubscription = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/plans/cancel-subscription`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

            if (!response.ok) {
                setError('Erro ao cancelar assinatura');
                console.log(response);
                return
            }

            const data = await response.json();

            if (data?.message) {
                alert(data.message);
            } else {
                setError('Erro ao cancelar assinatura');
            }

        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
            console.error('Erro ao cancelar assinatura:', err);
        } finally {
            setLoading(false);
        }
    }

    return {startCheckout, loading, error, plans};
}
