'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

interface UseAuthOptions {
    redirectTo?: string;
    redirectIfFound?: boolean;
}

export default function useAuth({
                                    redirectTo = '/login',
                                    redirectIfFound = false,
                                }: UseAuthOptions = {}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check if we have a token in localStorage
                const token = localStorage.getItem('adminToken');

                if (!token) {
                    // No token found, user is not authenticated
                    setIsAuthenticated(false);
                    setUserId(null);

                    if (!redirectIfFound) {
                        // Redirect to log in if not authenticated and redirectIfFound is false
                        router.push(redirectTo);
                    }

                    setIsLoading(false);
                    return;
                }

                // Validate the token with the server
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/validate-token`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok || !data.valid) {
                    localStorage.removeItem('adminToken');
                    setIsAuthenticated(false);
                    setUserId(null);

                    if (!redirectIfFound) {
                        router.push(redirectTo);
                    }

                    setIsLoading(false);
                    return;
                }

                // Token is valid, user is authenticated
                setIsAuthenticated(true);
                setUserId(data.userId);

                if (redirectIfFound) {
                    // Redirect if a user is found and redirectIfFound is true
                    router.push(redirectTo);
                }
            } catch (error) {
                console.error('Authentication error:', error);
                // In case of error, assume the user is not authenticated
                setIsAuthenticated(false);
                setUserId(null);

                if (!redirectIfFound) {
                    router.push(redirectTo);
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [redirectIfFound, redirectTo, router]);

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setUserId(null);
        router.push(redirectTo);
    }

    return {isLoading, isAuthenticated, userId, logout};
}