'use client';

import {useState} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';
import {Menu, X, Users, CreditCard, Globe, LogOut, Sun, Moon} from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import {useTheme} from '@/contexts/ThemeContext';
import {useI18n} from '@/contexts/I18nContext';

export default function AdminHeader() {
    const {logout} = useAuth();
    const {theme, toggleTheme} = useTheme();
    const {t, language, changeLanguage} = useI18n();
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    const navItems = [
        {href: '/', label: t('header.dashboard'), icon: <Globe className="w-5 h-5 mr-2"/>},
        {href: '/users', label: t('header.users'), icon: <Users className="w-5 h-5 mr-2"/>},
        {href: '/plans', label: t('header.plans'), icon: <CreditCard className="w-5 h-5 mr-2"/>},
        {href: '/sites', label: t('header.sites'), icon: <Globe className="w-5 h-5 mr-2"/>},
    ];

    return (
        <header className="w-full z-50 bg-light-background dark:bg-dark-background backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link href="/"
                      className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-purple dark:hover:text-dark-accent-purple transition">
                    {t('header.adminPanel')}
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex items-center text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue font-medium transition"
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue font-medium transition"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 mr-2"/>
                        ) : (
                            <Moon className="w-5 h-5 mr-2"/>
                        )}
                    </button>
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
                        onClick={logout}
                        className="flex items-center text-light-text-primary dark:text-dark-text-primary hover:text-red-500 dark:hover:text-red-400 font-medium transition"
                    >
                        <LogOut className="w-5 h-5 mr-2"/>
                        {t('header.logout')}
                    </button>
                </div>

                <div className="md:hidden flex items-center">
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
                                        className="flex items-center text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue font-medium py-2 transition"
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        toggleTheme();
                                    }}
                                    className="flex items-center text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-blue dark:hover:text-dark-accent-blue font-medium py-2 transition w-full text-left"
                                >
                                    {theme === 'dark' ? (
                                        <Sun className="w-5 h-5 mr-2"/>
                                    ) : (
                                        <Moon className="w-5 h-5 mr-2"/>
                                    )}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        logout();
                                    }}
                                    className="flex items-center text-light-text-primary dark:text-dark-text-primary hover:text-red-500 dark:hover:text-red-400 font-medium py-2 transition w-full text-left"
                                >
                                    <LogOut className="w-5 h-5 mr-2"/>
                                    {t('header.logout')}
                                </button>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
