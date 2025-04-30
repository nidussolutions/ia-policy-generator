'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {useI18n} from '@/contexts/I18nContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
      }

      // Store the token in localStorage
      localStorage.setItem('adminToken', data.accessToken);

      // Redirect to dashboard
      router.push('/');
    } catch (err: any) {
      setError(err.message || t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-light-background dark:bg-dark-background">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-light-card dark:bg-dark-card p-6 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-light-text-primary dark:text-dark-text-primary">
            {t('login.title')}
          </h2>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex">
              <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
            </div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                {t('login.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-light-text-primary dark:text-dark-text-primary bg-white dark:bg-dark-card placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:outline-none focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple sm:text-sm"
                placeholder={t('login.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t('login.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-light-text-primary dark:text-dark-text-primary bg-white dark:bg-dark-card placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-light-accent-purple dark:focus:border-dark-accent-purple focus:outline-none focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple sm:text-sm"
                placeholder={t('login.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-light-accent-purple dark:bg-dark-accent-purple px-4 py-2 text-sm font-medium text-white hover:bg-light-accent-purple/90 dark:hover:bg-dark-accent-purple/90 focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple focus:ring-offset-2"
            >
              {loading ? t('login.loggingIn') : t('login.signIn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
