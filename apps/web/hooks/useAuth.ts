'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export function useAuth() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        const validateOrRefreshToken = async () => {
            try {
                const res = await fetch(`${API_URL}/auth/validate-token`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });

                const data = await res.json();
                if (!res.ok || !data.valid) return ('Invalid token') as string;

                if (data.error === 'Token expired') {
                    const res = await fetch(`${API_URL}/auth/refresh-token`, {
                        credentials: 'include',
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refreshToken: storedRefreshToken }),
                    });

                    const data = await res.json();
                    if (!res.ok || !data.token) return ('Invalid refresh token') as string;

                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    setIsAuthenticated(true);
                }

                setToken(storedToken);
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem('token');
                setToken(null);
                setIsAuthenticated(false);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        validateOrRefreshToken().finally()
    }, [API_URL, router]);

    const login = useCallback(async (email: string, password: string) => {
        if (!email || !password) return ('Email and password are required');

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                return (data?.error || 'Login error') as string;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            setToken(data.token);
            setIsAuthenticated(true);
            router.push('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }, [API_URL, router]);

    const register = useCallback(
        async (
            name: string,
            email: string,
            password: string,
            identity: string,
            redirect?: boolean
        ) => {
            if (!name || !email || !password)
                return ('Name, email, and password are required');

            try {
                const res = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, identity }),
                });

                const data = await res.json();
                if (!res.ok) return (data?.error || 'Registration error') as string;

                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
                setToken(data.token);
                setIsAuthenticated(true);

                router.push(redirect ? '/dashboard/profile' : '/dashboard');
            } catch (error) {
                console.error('Registration error:', error);
                throw error;
            }
        },
        [API_URL, router]
    );

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setToken(null);
        setIsAuthenticated(false);
        router.push('/auth/login');
    }, [router]);

    return {
        token,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
    };
}
