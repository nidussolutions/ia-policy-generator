'use client';

import {UserType} from '@/lib/api';
import {useEffect, useState} from 'react';

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
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error(err);
                setError('Error fetching user information');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return {user, loading, error};
}
