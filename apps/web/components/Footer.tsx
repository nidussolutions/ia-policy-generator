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
              <Link href="/politica-de-privacidade" className="hover:underline">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos-de-uso" className="hover:underline">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contato</h3>
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
        © {new Date().getFullYear()} SaaS pertecente a Nidus Solutions. Todos
        os direitos reservados.
      </div>
    </footer>
  );
}
