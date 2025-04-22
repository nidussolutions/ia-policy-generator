'use client';

import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export function useAuth() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token') || null;
        setToken(storedToken);

        if (storedToken) {
            verification().catch((err) => {
                console.error('Erro ao validar token:', err);
                setIsAuthenticated(false);
            });
        } else {
            setIsAuthenticated(true);
        }

    }, []);

    const verification = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/validate`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const {valid} = await res.json();

        console.log('Token valid:', valid);

        if (!valid) {
            localStorage.removeItem('token');
            setToken(null);
            setIsAuthenticated(false);
        }

        setIsAuthenticated(true);
    }

    const login = async (email: string, password: string) => {
        if (!email || !password) {
            throw new Error('Email e senha são obrigatórios');
        }
        console.log(process.env.NEXT_PUBLIC_API_URL)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            if (!res.ok) {
                return res.json().then((data) => {
                    if (data.error) {
                        return data;
                    }
                });
            }

            const data = await res.json();
            setIsAuthenticated(true);
            localStorage.setItem('token', data.token);
            setToken(data.token);
            router.push('/dashboard');
        } catch (error) {
            console.error('Erro ao logar:', error);
            throw error;
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        identity: string
    ) => {
        if (!name || !email || !password) {
            throw new Error('Nome, email e senha são obrigatórios');
        }
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name, email, password, identity}),
                }
            );

            if (!res.ok) {
                return res.json().then((data) => {
                    if (data.error) {
                        return data;
                    }
                });
            }

            const data = await res.json();
            setIsAuthenticated(true);
            localStorage.setItem('token', data.token);
            setToken(data.token);
            router.push('/dashboard');
        } catch (error) {
            console.error('Erro ao registrar:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
        router.push('/auth/login');
    };

    return {token, login, logout, register, isAuthenticated};
}
