'use client';

import {useState} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';
import {Menu, X, Users, CreditCard, Globe} from 'lucide-react';

export default function AdminHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    const navItems = [
        {href: '/admin', label: 'Dashboard', icon: <Globe className="w-5 h-5 mr-2" />},
        {href: '/admin/users', label: 'Users', icon: <Users className="w-5 h-5 mr-2" />},
        {href: '/admin/plans', label: 'Plans', icon: <CreditCard className="w-5 h-5 mr-2" />},
        {href: '/admin/sites', label: 'Sites', icon: <Globe className="w-5 h-5 mr-2" />},
    ];

    return (
        <header className="w-full z-50 bg-light-background dark:bg-dark-background backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link href="/admin"
                      className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary hover:text-light-accent-purple dark:hover:text-dark-accent-purple transition">
                    Admin Panel
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
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}