'use client';

import {useState} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';
// import {Menu, X, Sun, Moon} from 'lucide-react';
import {useAuth} from '@/hooks/useAuth';

export default function Header() {
    const {isAuthenticated, logout} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    // const [darkMode, setDarkMode] = useState(false);

    // const toggleMenu = () => setMenuOpen(prev => !prev);
    // const toggleDarkMode = () => {
    //     setDarkMode(prev => !prev);
    //     document.documentElement.classList.toggle('dark', !darkMode);
    // };

    const navItems = [
        {href: '/dashboard', label: 'Dashboard'},
        {href: '/sites', label: 'Sites'},
        {href: '/dashboard/profile', label: 'Account'},
    ];

    return (
        <header className="w-full z-50 bg-[#030526]/80 backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link href="/" className="text-2xl font-bold text-white hover:text-[#8C0368] transition">
                    Legal Forge
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="relative text-gray-200 hover:text-white font-medium transition"
                        >
                            {item.label}
                            <motion.span
                                layoutId="underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C0368]"
                                initial={{scaleX: 0}}
                                whileHover={{scaleX: 1}}
                                style={{transformOrigin: 'center'}}
                            />
                        </Link>
                    ))}
                    {/*<button*/}
                    {/*    onClick={toggleDarkMode}*/}
                    {/*    className="p-2 rounded-full hover:bg-[#1E0359]/50 transition"*/}
                    {/*>*/}
                    {/*    {darkMode ? <Sun className="text-yellow-400"/> : <Moon className="text-gray-200"/>}*/}
                    {/*</button>*/}
                    {isAuthenticated && (
                        <button
                            onClick={logout}
                            className="text-[#A429A6] hover:text-[#8C0368] font-medium transition"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/*<div className="md:hidden flex items-center">*/}
                {/*    <button onClick={toggleDarkMode} className="p-2 mr-2 rounded-full hover:bg-[#1E0359]/50 transition">*/}
                {/*        {darkMode ? <Sun className="text-yellow-400"/> : <Moon className="text-gray-200"/>}*/}
                {/*    </button>*/}
                {/*    <button onClick={toggleMenu} className="p-2 rounded-md text-gray-200 hover:text-white transition">*/}
                {/*        {menuOpen ? <X size={24}/> : <Menu size={24}/>}*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        initial={{height: 0}}
                        animate={{height: 'auto'}}
                        exit={{height: 0}}
                        className="md:hidden bg-[#030526]/90 overflow-hidden"
                    >
                        <ul className="flex flex-col px-4 py-2 space-y-2">
                            {navItems.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-gray-200 hover:text-white font-medium py-2 transition"
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
                                        className="w-full text-left text-[#A429A6] hover:text-[#8C0368] font-medium py-2 transition"
                                    >
                                        Logout
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
