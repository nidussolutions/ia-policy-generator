'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
      <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky z-50 w-full bg-white border-b border-gray-200 shadow-sm transition-colors duration-300 dark:bg-gray-900 dark:border-gray-800 dark:shadow-none"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
              href="/"
              className="text-2xl font-bold text-gray-900 :opacity-80 transition hover:opacity-100 dark:text-white"
          >
            Legal Forge
          </Link>

          <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex items-center gap-4 text-gray-700 dark:text-gray-200"
          >
            {isAuthenticated && (
                <>
                  <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <Link
                        href="/dashboard"
                        className="text-gray-700 hover:text-blue-600 font-medium transition dark:text-gray-200 dark:hover:text-blue-400"
                    >
                      Dashboard
                    </Link>
                  </motion.div>

                  <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <Link
                        href="/sites"
                        className="text-gray-700 hover:text-blue-600 font-medium transition dark:text-gray-200 dark:hover:text-blue-400"
                    >
                      Sites
                    </Link>
                  </motion.div>

                  <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <Link
                        href="/dashboard/profile"
                        className="text-gray-700 hover:text-blue-600 font-medium transition dark:text-gray-200 dark:hover:text-blue-400"
                    >
                      Account
                    </Link>
                  </motion.div>

                  <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <button
                        onClick={logout}
                        className="text-red-500 hover:underline font-medium transition cursor-pointer dark:text-red-400 dark:hover:underline"
                    >
                      Logout
                    </button>
                  </motion.div>
                </>
            )}
          </motion.div>
        </div>
      </motion.header>
  );
}
