'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { logout, token } = useAuth();

  return (
    <header
      className={`w-full bg-white shadown-sm py-4 px-6 flex justify-${token ? 'between' : 'center'} items-center stick top-0 z-50`}
    >
      <Link href="/" className="text-xl font-bold text-gray-800">
        Legal Forge
      </Link>
      {token && (
        <nav className="space-x-6">
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/sites"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Sites
          </Link>
          <button
            onClick={logout}
            className="text-red-500 hover:underline cursor-pointer"
          >
            Sair
          </button>
        </nav>
      )}
    </header>
  );
}
