'use client';

import { useEffect, useState } from 'react';
import { PlanType } from '@/types/PlanType'; // Assuming PlanType is defined in your API lib

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

      fetchPlans().finally();
    } catch (error) {
      setError('Erro ao buscar planos');
      console.error('Erro ao buscar planos:', error);
    }
  }, []);

  // Function to initiate checkout
  const startCheckout = async (plan: string) => {
    setLoading(true);
    setError(null); // Reset error

    console.log(plan)

    try {
      const token = localStorage.getItem('token');

      if(!token) {
        console.log('token')
        setError('Token não encontrado');
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plans/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan }),
        }
      );

      if (!response.ok) {
        setError('Error starting checkout');
        return;
      }

      const data: CheckoutResponse = await response.json();

      if (data?.url) {
        window.location.href = data.url; // Redirect to the checkout URL
      } else {
        setError('Error starting checkout');
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Function to access customer portal
  const accessPortalClient = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plans/create-customer-portal-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setError('Error accessing the customer portal');
        return;
      }

      const data: CheckoutResponse = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Error accessing the customer portal');
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { startCheckout, accessPortalClient, loading, error, plans };
}
