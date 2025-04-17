'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Moon, Sun } from 'lucide-react';
import DarkModeToggle from './DarkModeToogle';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition"
        >
          Legal Forge
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              <Link
                href="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                Dashboard
              </Link>
              <Link
                href="/sites"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                Sites
              </Link>
              <button
                onClick={logout}
                className="text-red-500 hover:underline font-medium transition"
              >
                Sair
              </button>
            </>
          )}

          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
