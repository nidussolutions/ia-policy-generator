'use client';

import {useState} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';
import {Menu, X, Sun, Moon, Globe, Home, Layout, User, LogOut} from 'lucide-react';
import {useAuth} from '@/hooks/useAuth';
import {useTheme} from './ThemeContext';
import {Language, useI18n} from '@/contexts/I18nContext';

const navVariants = {
    hidden: {opacity: 0, y: -20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: {opacity: 0, x: -20},
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
};

const textVariants = {
    enter: (direction: number) => ({
        y: direction > 0 ? 20 : -20,
        opacity: 0
    }),
    center: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    exit: (direction: number) => ({
        y: direction < 0 ? 20 : -20,
        opacity: 0
    })
};

const languageButtonVariants = {
    hover: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        scale: 1.02,
        transition: {
            duration: 0.2
        }
    },
    tap: {
        scale: 0.98
    }
};

const menuVariants = {
    hidden: {opacity: 0, height: 0},
    visible: {
        opacity: 1,
        height: 'auto',
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 20,
        },
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
};

export default function Header() {
    const {isAuthenticated, logout} = useAuth();
    const {theme, toggleTheme} = useTheme();
    const {t, language, changeLanguage} = useI18n();
    const [menuOpen, setMenuOpen] = useState(false);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const [textDirection, setTextDirection] = useState(0);

    const navItems = [
        {href: '/dashboard', label: 'header.dashboard', icon: <Home size={18}/>},
        {href: '/sites', label: 'header.sites', icon: <Layout size={18}/>},
        {href: '/dashboard/profile', label: 'header.account', icon: <User size={18}/>},
    ];

    const handleLanguageChange = (newLang: Language) => {
        setTextDirection(newLang === 'en' ? 1 : -1);
        changeLanguage(newLang);
        setLanguageMenuOpen(false);
    };

    return (
        <header
            className="sticky top-0 w-full z-50 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-gray-800/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/">
                        <motion.div
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="text-2xl font-bold bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={`brand-${language}`}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    custom={textDirection}
                                >
                                    {t('header.brand')}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        <motion.div
                            variants={navVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-center space-x-6"
                        >
                            {navItems.map((item, idx) => (
                                <Link key={idx} href={item.href}>
                                    <motion.div
                                        variants={itemVariants}
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 dark:hover:bg-black/5 text-light-text-primary dark:text-dark-text-primary transition-colors"
                                    >
                                        {item.icon}
                                        <AnimatePresence mode="wait" initial={false}>
                                            <motion.span
                                                key={`${item.label}-${language}`}
                                                variants={textVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                custom={textDirection}
                                            >
                                                {t(item.label)}
                                            </motion.span>
                                        </AnimatePresence>
                                    </motion.div>
                                </Link>
                            ))}

                            <div className="relative">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                                    className="p-2 rounded-lg hover:bg-white/5 dark:hover:bg-black/5 transition-colors flex items-center gap-2"
                                >
                                    <Globe className="text-light-text-secondary dark:text-dark-text-secondary"/>
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={`current-lang-${language}`}
                                            variants={textVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            custom={textDirection}
                                            className="text-sm font-medium"
                                        >
                                            {language.toUpperCase()}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>

                                <AnimatePresence>
                                    {languageMenuOpen && (
                                        <motion.div
                                            initial={{opacity: 0, scale: 0.95, y: 10}}
                                            animate={{opacity: 1, scale: 1, y: 0}}
                                            exit={{opacity: 0, scale: 0.95, y: 10}}
                                            transition={{type: "spring", stiffness: 300, damping: 30}}
                                            className="absolute right-0 mt-2 w-48 rounded-xl backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-gray-800/20 shadow-xl overflow-hidden"
                                        >
                                            {['en', 'pt'].map((lang) => (
                                                <motion.button
                                                    key={lang}
                                                    variants={languageButtonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                    onClick={() => handleLanguageChange(lang as Language)}
                                                    className={`w-full px-4 py-3 text-left text-sm flex items-center gap-2 transition-colors ${
                                                        language === lang
                                                            ? 'bg-white/10 dark:bg-white/5 text-light-accent-purple dark:text-dark-accent-purple font-medium'
                                                            : 'text-light-text-primary dark:text-dark-text-primary'
                                                    }`}
                                                >
                                                    <Globe size={16}/>
                                                    <AnimatePresence mode="wait" initial={false}>
                                                        <motion.span
                                                            key={`lang-option-${lang}-${language}`}
                                                            variants={textVariants}
                                                            initial="enter"
                                                            animate="center"
                                                            exit="exit"
                                                            custom={textDirection}
                                                        >
                                                            {t(`header.language${lang.toUpperCase()}`)}
                                                        </motion.span>
                                                    </AnimatePresence>
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-white/5 dark:hover:bg-black/5 transition-colors"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="text-yellow-400"/>
                                ) : (
                                    <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>
                                )}
                            </motion.button>

                            {isAuthenticated && (
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={logout}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-black/10 text-light-accent-purple dark:text-dark-accent-purple transition-colors"
                                >
                                    <LogOut size={18}/>
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={`logout-${language}`}
                                            variants={textVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            custom={textDirection}
                                        >
                                            {t('header.logout')}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>
                            )}
                        </motion.div>
                    </nav>

                    {/* Menu Mobile */}
                    <div className="md:hidden flex items-center gap-2">
                        {/* ... (botões mobile permanecem os mesmos) ... */}
                    </div>
                </div>

                {/* Menu Mobile Dropdown */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.nav
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="md:hidden overflow-hidden"
                        >
                            <motion.div variants={navVariants} className="py-4 space-y-2">
                                {navItems.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={itemVariants}
                                        whileHover={{x: 10}}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 dark:hover:bg-black/5 text-light-text-primary dark:text-dark-text-primary"
                                        >
                                            {item.icon}
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.span
                                                    key={`mobile-${item.label}-${language}`}
                                                    variants={textVariants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    custom={textDirection}
                                                >
                                                    {t(item.label)}
                                                </motion.span>
                                            </AnimatePresence>
                                        </Link>
                                    </motion.div>
                                ))}
                                {isAuthenticated && (
                                    <motion.div
                                        variants={itemVariants}
                                        whileHover={{x: 10}}
                                    >
                                        <button
                                            onClick={() => {
                                                logout();
                                                setMenuOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 dark:hover:bg-black/5 text-light-accent-purple dark:text-dark-accent-purple"
                                        >
                                            <LogOut size={18}/>
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.span
                                                    key={`mobile-logout-${language}`}
                                                    variants={textVariants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    custom={textDirection}
                                                >
                                                    {t('header.logout')}
                                                </motion.span>
                                            </AnimatePresence>
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}