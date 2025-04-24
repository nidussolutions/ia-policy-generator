'use client';

import Link from 'next/link';

export default function Footer() {
  return (
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-white dark:text-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm items-center">
          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link
                    href="/jur/politica-de-privacidade"
                    className="hover:underline"
                    target="_blank"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                    href="/jur/termos-de-uso"
                    className="hover:underline"
                    target="_blank"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                    href="/jur/politica-de-cookies"
                    className="hover:underline"
                    target="_blank"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <ul className="space-y-1">
              <li>
                <a
                    href="mailto:contato@nidussolutions.com"
                    className="hover:underline"
                >
                  contato@nidussolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 dark:text-gray-600 py-4 ">
          © {new Date().getFullYear()} SaaS owned by Nidus Solutions. All rights reserved.
        </div>
      </footer>
  );
}
