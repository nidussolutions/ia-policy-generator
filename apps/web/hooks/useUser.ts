'use client';

import { UserType } from '@/lib/api';
import { useEffect, useState } from 'react';

export function useUser() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Falha ao buscar usuário');
        }

        console.log(res);

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError('Erro ao buscar informações do usuário');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
