'use client';

import Link from 'next/link';
import {useTheme} from './ThemeContext';

export default function Footer() {
    const {theme} = useTheme();

    return (
        <footer
            className="w-full z-50 bg-light-background/80 dark:bg-dark-card backdrop-blur-md shadow-lg"
        >
            <div
                className="max-w-6xl mx-auto px-4 py-10 text-sm text-light-text-primary dark:text-dark-text-primary flex justify-between items-center">
                <div>
                    <h3 className="font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Legal</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link
                                href="/jur/politica-de-privacidade"
                                className="hover:underline text-light-text-secondary dark:text-dark-text-secondary"
                                target="_blank"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/jur/termos-de-uso"
                                className="hover:underline text-light-text-secondary dark:text-dark-text-secondary"
                                target="_blank"
                            >
                                Terms of Use
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/jur/politica-de-cookies"
                                className="hover:underline text-light-text-secondary dark:text-dark-text-secondary"
                                target="_blank"
                            >
                                Cookie Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Contact</h3>
                    <ul className="space-y-1">
                        <li>
                            <a
                                href="mailto:legalforge@nidussolutions.com"
                                className="hover:underline text-light-text-secondary dark:text-dark-text-secondary"
                            >
                                legalforge@nidussolutions.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-xs text-light-text-secondary dark:text-dark-text-secondary py-4">
                © {new Date().getFullYear()} Legal Forge owned by Nidus Solutions. All rights reserved.
            </div>
        </footer>
    );
}
