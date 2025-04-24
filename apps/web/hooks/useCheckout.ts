'use client';

import { useEffect, useState } from 'react';
import { PlanType } from "@/lib/api"; // Assuming PlanType is defined in your API lib

interface CheckoutResponse {
    sessionId: string;
    url: string;
}

export function useCheckout() {
    const [loading, setLoading] = useState(false); // State to track loading status
    const [plans, setPlans] = useState<PlanType[] | null>(null); // Plans state to store available plans
    const [error, setError] = useState<string | null>(null); // Error state to store error messages

    // Fetch available plans when the component loads
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Token não encontrado'); // Set error if token is not found
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

                const data = await res.json();
                setPlans(data.plans); // Set the fetched plans
                setLoading(false);
            };

            fetchPlans();
        } catch (error) {
            setError('Erro ao buscar planos');
            console.error('Erro ao buscar planos:', error);
        }
    }, []); // Empty dependency array means this runs once on component mount

    // Function to initiate checkout
    const startCheckout = async (planId: string) => {
        setLoading(true);
        setError(null); // Reset error

        try {
            const token = localStorage.getItem('token');
            console.log(process.env.NEXT_PUBLIC_API_URL); // Debugging

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ planId }),
            });

            if (!response.ok) {
                setError('Erro ao iniciar checkout');
                console.log(response);
                return;
            }

            const data: CheckoutResponse = await response.json();

            if (data?.url) {
                window.location.href = data.url; // Redirect to the checkout URL
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

    // Function to cancel subscription
    const cancelSubscription = async (type: boolean) => {
        setLoading(true);
        setError(null); // Reset error

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
                return;
            }

            const data = await response.json();

            if (data?.message) {
                if (type) {
                    window.location.href = '/cancellation'; // Redirect to cancellation page
                } else {
                    window.location.reload(); // Reload the page
                }
            } else {
                setError('Erro ao cancelar assinatura');
            }

        } catch (err: any) {
            setError(err.message || 'Erro desconhecido');
            console.error('Erro ao cancelar assinatura:', err);
        } finally {
            setLoading(false);
        }
    };

    return { startCheckout, cancelSubscription, loading, error, plans };
}
