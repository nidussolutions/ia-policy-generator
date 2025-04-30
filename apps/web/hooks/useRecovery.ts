'use client';

import {useState} from 'react';

export function useRecovery() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleForgot = async (email: string) => {
        setLoading(true);
        setError('');
        try {
            console.log(`${email} is the email to be sent`);
            const res = await fetch(`${API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    user: "João"
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || 'Error sending email');
            }

            return;
        } catch (error) {
            setError('Unexpected error occurred.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (token: string, password: string) => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token, password}),
            });

            if (!res.ok) {
                setError('Error resetting password');
                console.log(res);
            }

            const data = await res.json();

            if (data.message) {
                return setSuccess(data.message);
            }
        } catch (error) {
            setError('Unexpected error occurred.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        success,
        setError,
        handleForgot,
        handleReset,
    };
}
