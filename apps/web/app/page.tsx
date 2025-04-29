'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {ShieldCheck, Globe, Code2, Menu, X, Sun, Moon} from 'lucide-react';
import {useI18n} from '../contexts/I18nContext';
import {LanguageSelector} from '../components/LanguageSelector';
import {useTheme} from '../components/ThemeContext';
import Image from 'next/image';
import {useState} from 'react';

const containerVariants = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.1}},
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {type: 'spring', stiffness: 100, damping: 12},
    },
};

export default function HomePage() {
    const {t} = useI18n();
    const {theme, toggleTheme} = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <main
            className="min-h-screen flex flex-col bg-light-background dark:bg-gradient-to-b dark:from-[#030526] dark:via-[#1E0359] dark:to-[#030526] text-light-text-primary dark:text-gray-200">
            {/* Navbar */}
            <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4 relative z-20">
                <div className="text-2xl font-bold text-light-text-primary dark:text-white">
                    <Link href="/">Legal Forge</Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 text-light-text-secondary dark:text-gray-300">
                    <Link href="#features" className="hover:text-light-accent-blue dark:hover:text-white transition">
                        {t('nav.features')}
                    </Link>
                    <Link href="#pricing" className="hover:text-light-accent-blue dark:hover:text-white transition">
                        {t('nav.pricing')}
                    </Link>
                    <Link href="#about" className="hover:text-light-accent-blue dark:hover:text-white transition">
                        {t('nav.aboutUs')}
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition"
                    >
                        {theme === 'dark' ? <Sun className="text-yellow-400"/> : <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>}
                    </button>
                    <LanguageSelector/>
                    <Link href="/auth/login">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="px-6 py-2 bg-light-accent-purple dark:bg-[#8C0368] rounded-full font-medium shadow-lg backdrop-blur-sm"
                            variants={itemVariants}
                        >
                            {t('nav.getStarted')}
                        </motion.button>
                    </Link>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="px-6 py-2 border border-light-border dark:border-gray-500 rounded-full font-medium hover:border-light-accent-blue dark:hover:border-white transition"
                            variants={itemVariants}
                        >
                            {t('nav.talkExpert')}
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-light-card dark:hover:bg-dark-card transition"
                    >
                        {theme === 'dark' ? <Sun className="text-yellow-400"/> : <Moon className="text-light-text-secondary dark:text-dark-text-secondary"/>}
                    </button>
                    <LanguageSelector/>
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-light-text-primary dark:text-white p-2"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-light-card/95 dark:bg-[#030526]/95 backdrop-blur-lg p-4 rounded-b-lg shadow-lg md:hidden">
                        <nav className="flex flex-col space-y-4 text-light-text-secondary dark:text-gray-300 mb-6">
                            <Link 
                                href="#features" 
                                className="hover:text-light-accent-blue dark:hover:text-white transition py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.features')}
                            </Link>
                            <Link 
                                href="#pricing" 
                                className="hover:text-light-accent-blue dark:hover:text-white transition py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.pricing')}
                            </Link>
                            <Link 
                                href="#about" 
                                className="hover:text-light-accent-blue dark:hover:text-white transition py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.aboutUs')}
                            </Link>
                        </nav>
                        <div className="flex flex-col space-y-3">
                            <Link href="/auth/login" className="w-full">
                                <motion.button
                                    className="w-full px-6 py-2 bg-light-accent-purple dark:bg-[#8C0368] rounded-full font-medium shadow-lg backdrop-blur-sm"
                                >
                                    {t('nav.getStarted')}
                                </motion.button>
                            </Link>
                            <Link href="/contact" className="w-full">
                                <motion.button
                                    className="w-full px-6 py-2 border border-light-border dark:border-gray-500 rounded-full font-medium hover:border-light-accent-blue dark:hover:border-white transition"
                                >
                                    {t('nav.talkExpert')}
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* Hero */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
                <motion.p
                    className="uppercase mb-4 text-sm tracking-wider text-light-accent-purple/80 dark:text-[#8C0368]/80"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    {t('hero.stats')}
                </motion.p>
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold mb-6 max-w-3xl leading-tight text-light-text-primary dark:text-white"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    {t('hero.title')}
                </motion.h1>
                <motion.p
                    className="max-w-xl text-light-text-secondary dark:text-gray-400 mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    {t('hero.description')}
                </motion.p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <Link href="/auth/login" className="w-full sm:w-auto">
                        <motion.button
                            className="w-full sm:w-auto px-8 py-3 bg-light-accent-purple dark:bg-[#8C0368] rounded-full font-medium shadow-lg backdrop-blur-sm hover:scale-105 transition-transform"
                            initial="hidden"
                            animate="visible"
                            variants={itemVariants}
                        >
                            {t('hero.getStartedFree')}
                        </motion.button>
                    </Link>
                    <Link href="/contact" className="w-full sm:w-auto">
                        <motion.button
                            className="w-full sm:w-auto px-8 py-3 border border-light-border dark:border-gray-500 rounded-full font-medium hover:border-light-accent-blue dark:hover:border-white transition-transform"
                            initial="hidden"
                            animate="visible"
                            variants={itemVariants}
                        >
                            {t('hero.talkExpert')}
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <motion.section
                id="features"
                className="w-full max-w-6xl mx-auto py-24 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-light-text-primary dark:text-white"
                    variants={itemVariants}
                >
                    {t('features.title')}
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-light-card dark:bg-[#1E0359]/30 rounded-2xl shadow-md"
                        variants={itemVariants}
                    >
                        <ShieldCheck className="w-12 h-12 mb-4 text-light-accent-purple dark:text-[#8C0368]"/>
                        <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-white">
                            {t('features.customizable.title')}
                        </h3>
                        <p className="text-light-text-secondary dark:text-gray-300">
                            {t('features.customizable.description')}
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-light-card dark:bg-[#1E0359]/30 rounded-2xl shadow-md"
                        variants={itemVariants}
                    >
                        <Globe className="w-12 h-12 mb-4 text-light-accent-blue dark:text-[#A429A6]"/>
                        <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-white">
                            {t('features.compliant.title')}
                        </h3>
                        <p className="text-light-text-secondary dark:text-gray-300">
                            {t('features.compliant.description')}
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-light-card dark:bg-[#1E0359]/30 rounded-2xl shadow-md"
                        variants={itemVariants}
                    >
                        <Code2 className="w-12 h-12 mb-4 text-light-accent-purple dark:text-[#471ED9]"/>
                        <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-white">
                            {t('features.integration.title')}
                        </h3>
                        <p className="text-light-text-secondary dark:text-gray-300">
                            {t('features.integration.description')}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Pricing Section */}
            <motion.section
                id="pricing"
                className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4 bg-light-card/80 dark:bg-[#030526]/30 backdrop-blur-lg rounded-2xl shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-light-text-primary dark:text-white"
                    variants={itemVariants}
                >
                    {t('pricing.title')}
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <motion.div
                        className="p-8 bg-white dark:bg-[#1E0359]/30 rounded-2xl text-center shadow-md"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-semibold mb-2 text-light-text-primary dark:text-white">
                            {t('pricing.free.title')}
                        </h3>
                        <p className="text-lg font-bold mb-4 text-light-accent-purple dark:text-[#8C0368]">
                            {t('pricing.free.price')}
                        </p>
                        <ul className="space-y-2 text-light-text-secondary dark:text-gray-300 mb-6">
                            <li>{t('pricing.free.features.documents')}</li>
                            <li>{t('pricing.free.features.sites')}</li>
                            <li>{t('pricing.free.features.characters')}</li>
                            <li>{t('pricing.free.features.ai')}</li>
                        </ul>
                        <Link href="/auth/register">
                            <motion.button
                                className="w-full py-3 bg-light-accent-purple dark:bg-[#8C0368] rounded-full font-medium hover:scale-105 transition-transform"
                                variants={itemVariants}
                            >
                                {t('pricing.free.cta')}
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="p-8 bg-white dark:bg-[#1E0359]/30 rounded-2xl text-center border-2 border-light-accent-blue dark:border-[#A429A6] shadow-md"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-semibold mb-2 text-light-text-primary dark:text-white">
                            {t('pricing.pro.title')}
                        </h3>
                        <p className="text-lg font-bold mb-4 text-light-accent-blue dark:text-[#A429A6]">
                            {t('pricing.pro.price')}
                        </p>
                        <ul className="space-y-2 text-light-text-secondary dark:text-gray-300 mb-6">
                            <li>{t('pricing.pro.features.documents')}</li>
                            <li>{t('pricing.pro.features.sites')}</li>
                            <li>{t('pricing.pro.features.characters')}</li>
                            <li>{t('pricing.pro.features.ai')}</li>
                        </ul>
                        <Link href="/auth/register?redirect=true">
                            <motion.button
                                className="w-full py-3 bg-light-accent-blue dark:bg-[#A429A6] rounded-full font-medium hover:scale-105 transition-transform"
                                variants={itemVariants}
                            >
                                {t('pricing.pro.cta')}
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* About Us Section */}
            <motion.section
                id="about"
                className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-light-text-primary dark:text-white"
                    variants={itemVariants}
                >
                    {t('about.title')}
                </motion.h2>
                <motion.p
                    className="max-w-2xl mx-auto text-center text-light-text-secondary dark:text-gray-300 mb-8"
                    variants={itemVariants}
                >
                    {t('about.description')}
                </motion.p>
                <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-14 items-center">
                    {[
                        {
                            name: t('about.team.joao.name'),
                            role: t('about.team.joao.role'),
                            image: '/team/joao.png',
                        },
                        {
                            name: t('about.team.thiago.name'),
                            role: t('about.team.thiago.role'),
                            image: '/team/thiago.png',
                        },
                    ].map((member, idx) => (
                        <motion.div
                            key={idx}
                            className="text-center mb-6 sm:mb-0"
                            variants={itemVariants}
                        >
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-light-card dark:bg-[#1E0359]/30 p-1">
                                <Image
                                    alt={member.name}
                                    width={96}
                                    height={96}
                                    src={member.image}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <h4 className="text-lg font-semibold text-light-text-primary dark:text-white">
                                {member.name}
                            </h4>
                            <p className="text-light-text-secondary dark:text-gray-400">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </main>
    );
}
