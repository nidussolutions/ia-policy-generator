'use client';

import {useRouter} from 'next/navigation';
import {useEffect, useState, useCallback} from 'react';

export function useAuth() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        const checkToken = async () => {
            if (!API_URL) {
                console.error('API_URL is not defined.');
                return;
            }

            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/auth/validate-token`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (res.ok) {
                    setToken(storedToken);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Error validating token:', error);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, [API_URL]);

    const login = useCallback(
        async (email: string, password: string): Promise<string | void> => {
            if (!API_URL) return 'API URL is not configured';
            if (!email || !password) return 'Email and password are required';

            try {
                const res = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password}),
                });

                const data = await res.json();

                if (!res.ok) {
                    return data?.error || 'Login failed';
                }

                localStorage.setItem('token', data.token);
                setToken(data.token);
                setIsAuthenticated(true);
                router.push('/dashboard');
            } catch (error) {
                console.error('Login error:', error);
                return 'Unexpected error during login';
            }
        },
        [API_URL, router]
    );

    const register = useCallback(
        async (
            name: string,
            email: string,
            password: string,
            identity: string,
            redirect?: boolean
        ): Promise<string | void> => {
            if (!API_URL) return 'API URL is not configured';
            if (!name || !email || !password) return 'Name, email, and password are required';

            try {
                const res = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name, email, password, identity}),
                });

                const data = await res.json();
                if (!res.ok) return data?.error || 'Registration failed';

                localStorage.setItem('token', data.token);
                setToken(data.token);
                setIsAuthenticated(true);

                router.push(redirect ? '/dashboard/profile' : '/dashboard');
            } catch (error) {
                console.error('Registration error:', error);
                return 'Unexpected error during registration';
            }
        },
        [API_URL, router]
    );

    const logout = useCallback(() => {
        localStorage.removeItem('token');
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
