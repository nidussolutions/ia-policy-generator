'use client';

import {useState} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';
import {Menu, X, Sun, Moon, Globe} from 'lucide-react';
import {useAuth} from '@/hooks/useAuth';
import {useTheme} from './ThemeContext';
import {useI18n, Language} from '@/contexts/I18nContext';

export default function Header() {
    const {isAuthenticated, logout} = useAuth();
    const {theme, toggleTheme} = useTheme();
    const {t, language, changeLanguage} = useI18n();
    const [menuOpen, setMenuOpen] = useState(false);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    const navItems = [
        {href: '/dashboard', label: t('header.dashboard')},
        {href: '/sites', label: t('header.sites')},
        {href: '/dashboard/profile', label: t('header.account')},
    ];

    return (
        <header className="w-full z-50 bg-light-background dark:bg-dark-background backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link href="/"
                      className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-purple dark:hover:text-dark-accent-purple transition">
                    {t('header.brand')}
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="relative text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue font-medium transition"
                        >
                            {item.label}
                            <motion.span
                                layoutId="underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-light-accent-purple dark:bg-dark-accent-purple"
                                initial={{scaleX: 0}}
                                whileHover={{scaleX: 1}}
                                style={{transformOrigin: 'center'}}
                            />
                        </Link>
                    ))}
                    <div className="relative">
                        <button
                            onClick={() => setLanguageMenuOpen(prev => !prev)}
                            className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition mr-2"
                            aria-label={t('header.language')}
                        >
                            <Globe className="text-light-text-secondary dark:text-dark-text-secondary"/>
                        </button>
                        {languageMenuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 rounded-lg shadow-sm ring-1 ring-black bg-light-card dark:bg-dark-card">
                                <div className="py-1" role="menu" aria-orientation="vertical">
                                    <button
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                            language === 'en'
                                                ? 'text-light-accent-purple dark:text-dark-accent-purple font-medium'
                                                : 'text-light-text-primary dark:text-dark-text-primary'
                                        }`}
                                        onClick={() => {
                                            changeLanguage('en');
                                            setLanguageMenuOpen(false);
                                        }}
                                        role="menuitem"
                                    >
                                        {t('header.languageEN')}
                                    </button>
                                    <button
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                            language === 'pt'
                                                ? 'text-light-accent-purple dark:text-dark-accent-purple font-medium'
                                                : 'text-light-text-primary dark:text-dark-text-primary'
                                        }`}
                                        onClick={() => {
                                            changeLanguage('pt');
                                            setLanguageMenuOpen(false);
                                        }}
                                        role="menuitem"
                                    >
                                        {t('header.languagePT')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition"
                    >
                        {theme === 'dark' ? <Sun className="text-yellow-400"/> :
                            <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>}
                    </button>
                    {isAuthenticated && (
                        <button
                            onClick={logout}
                            className="text-light-accent-purple dark:text-dark-accent-purple hover:text-light-accent-blue dark:hover:text-dark-accent-blue font-medium transition"
                        >
                            {t('header.logout')}
                        </button>
                    )}
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setLanguageMenuOpen(prev => !prev)}
                        className="p-2 mr-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition"
                        aria-label={t('header.language')}
                    >
                        <Globe className="text-light-text-secondary dark:text-dark-text-secondary"/>
                    </button>
                    <button onClick={toggleTheme}
                            className="p-2 mr-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition">
                        {theme === 'dark' ? <Sun className="text-yellow-400"/> :
                            <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>}
                    </button>
                    <button onClick={toggleMenu}
                            className="p-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition">
                        {menuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        initial={{height: 0}}
                        animate={{height: 'auto'}}
                        exit={{height: 0}}
                        className="md:hidden bg-light-background dark:bg-dark-background overflow-hidden"
                    >
                        <ul className="flex flex-col px-4 py-2 space-y-2">
                            {navItems.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue font-medium py-2 transition"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            {isAuthenticated && (
                                <li>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setMenuOpen(false);
                                        }}
                                        className="w-full text-left text-light-accent-purple dark:text-dark-accent-purple hover:text-light-accent-blue dark:hover:text-dark-accent-blue font-medium py-2 transition"
                                    >
                                        {t('header.logout')}
                                    </button>
                                </li>
                            )}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
