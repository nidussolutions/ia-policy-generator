'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {ShieldCheck, Globe, Code2} from 'lucide-react';
import {useI18n} from '../contexts/I18nContext';
import {LanguageSelector} from '../components/LanguageSelector';
import Image from 'next/image';

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
    return (
        <main
            className="min-h-screen flex flex-col bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] text-gray-200">
            {/* Navbar */}
            <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4">
                <div className="text-2xl font-bold text-white">
                    <Link href="/">Legal Forge</Link>
                </div>
                <nav className="hidden md:flex space-x-8 text-gray-300">
                    <Link href="#features" className="hover:text-white transition">
                        {t('nav.features')}
                    </Link>
                    <Link href="#pricing" className="hover:text-white transition">
                        {t('nav.pricing')}
                    </Link>
                    <Link href="#about" className="hover:text-white transition">
                        {t('nav.aboutUs')}
                    </Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <LanguageSelector/>
                    <Link href="/auth/login">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="px-6 py-2 bg-[#8C0368] rounded-full font-medium shadow-lg backdrop-blur-sm"
                            variants={itemVariants}
                        >
                            {t('nav.getStarted')}
                        </motion.button>
                    </Link>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="px-6 py-2 border border-gray-500 rounded-full font-medium hover:border-white transition"
                            variants={itemVariants}
                        >
                            {t('nav.talkExpert')}
                        </motion.button>
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
                <motion.p
                    className="uppercase mb-4 text-sm tracking-wider text-[#8C0368]/80"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    {t('hero.stats')}
                </motion.p>
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold mb-6 max-w-3xl leading-tight"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    {t('hero.title')}
                </motion.h1>
                <motion.p
                    className="max-w-xl text-gray-400 mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    {t('hero.description')}
                </motion.p>
                <div className="flex space-x-4">
                    <Link href="/auth/login">
                        <motion.button
                            className="px-8 py-3 bg-[#8C0368] rounded-full font-medium shadow-lg backdrop-blur-sm hover:scale-105 transition-transform"
                            initial="hidden"
                            animate="visible"
                            variants={itemVariants}
                        >
                            {t('hero.getStartedFree')}
                        </motion.button>
                    </Link>
                    <Link href="/contact">
                        <motion.button
                            className="px-8 py-3 border border-gray-500 rounded-full font-medium hover:border-white transition-transform"
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
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
                    variants={itemVariants}
                >
                    {t('features.title')}
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-[#1E0359]/30 rounded-2xl"
                        variants={itemVariants}
                    >
                        <ShieldCheck className="w-12 h-12 mb-4 text-[#8C0368]"/>
                        <h3 className="text-xl font-semibold mb-2 text-white">
                            {t('features.customizable.title')}
                        </h3>
                        <p className="text-gray-300">
                            {t('features.customizable.description')}
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-[#1E0359]/30 rounded-2xl"
                        variants={itemVariants}
                    >
                        <Globe className="w-12 h-12 mb-4 text-[#A429A6]"/>
                        <h3 className="text-xl font-semibold mb-2 text-white">
                            {t('features.compliant.title')}
                        </h3>
                        <p className="text-gray-300">
                            {t('features.compliant.description')}
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-[#1E0359]/30 rounded-2xl"
                        variants={itemVariants}
                    >
                        <Code2 className="w-12 h-12 mb-4 text-[#471ED9]"/>
                        <h3 className="text-xl font-semibold mb-2 text-white">
                            {t('features.integration.title')}
                        </h3>
                        <p className="text-gray-300">
                            {t('features.integration.description')}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Pricing Section */}
            <motion.section
                id="pricing"
                className="w-full max-w-6xl mx-auto py-24 px-4 bg-[#030526]/30 backdrop-blur-lg rounded-2xl shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
                    variants={itemVariants}
                >
                    {t('pricing.title')}
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <motion.div
                        className="p-8 bg-[#1E0359]/30 rounded-2xl text-center"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-semibold mb-2 text-white">
                            {t('pricing.free.title')}
                        </h3>
                        <p className="text-lg font-bold mb-4 text-[#8C0368]">
                            {t('pricing.free.price')}
                        </p>
                        <ul className="space-y-2 text-gray-300 mb-6">
                            <li>{t('pricing.free.features.documents')}</li>
                            <li>{t('pricing.free.features.sites')}</li>
                            <li>{t('pricing.free.features.characters')}</li>
                            <li>{t('pricing.free.features.ai')}</li>
                        </ul>
                        <Link href="/auth/register">
                            <motion.button
                                className="w-full py-3 bg-[#8C0368] rounded-full font-medium hover:scale-105 transition-transform"
                                variants={itemVariants}
                            >
                                {t('pricing.free.cta')}
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="p-8 bg-[#1E0359]/30 rounded-2xl text-center border-2 border-[#A429A6]"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-semibold mb-2 text-white">
                            {t('pricing.pro.title')}
                        </h3>
                        <p className="text-lg font-bold mb-4 text-[#A429A6]">
                            {t('pricing.pro.price')}
                        </p>
                        <ul className="space-y-2 text-gray-300 mb-6">
                            <li>{t('pricing.pro.features.documents')}</li>
                            <li>{t('pricing.pro.features.sites')}</li>
                            <li>{t('pricing.pro.features.characters')}</li>
                            <li>{t('pricing.pro.features.ai')}</li>
                        </ul>
                        <Link href="/auth/register?redirect=true">
                            <motion.button
                                className="w-full py-3 bg-[#A429A6] rounded-full font-medium hover:scale-105 transition-transform"
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
                className="w-full max-w-6xl mx-auto py-24 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
                    variants={itemVariants}
                >
                    About Us
                </motion.h2>
                <motion.p
                    className="max-w-2xl mx-auto text-center text-gray-300 mb-8"
                    variants={itemVariants}
                >
                    Legal Forge was born with the mission of simplifying the creation of
                    legal policies for websites and applications, using artificial
                    intelligence to deliver accurate, updated and personalized documents
                    in seconds.
                </motion.p>
                <div className="flex justify-center gap-14 items-center">
                    {[
                        {
                            name: 'João Gustavo',
                            role: 'CEO & Founder',
                            image: '/team/joao.png',
                        },
                        {
                            name: 'Thiago Viana',
                            role: 'CMO & Founder',
                            image: '/team/thiago.png',
                        },
                    ].map((member, idx) => (
                        <motion.div
                            key={idx}
                            className="text-center"
                            variants={itemVariants}
                        >
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full">
                                <Image
                                    alt={member.name}
                                    width={96}
                                    height={96}
                                    src={member.image}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <h4 className="text-lg font-semibold text-white">
                                {member.name}
                            </h4>
                            <p className="text-gray-400">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </main>
    );
}
