'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {ShieldCheck, Globe, Code2} from 'lucide-react';
import {useI18n} from '@/contexts/I18nContext';
import Image from 'next/image';
import CookieConsent from '@/components/CookieConsent';
import HeaderPublic from "@/components/HeaderPublic";

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
            className="min-h-screen flex flex-col bg-light-background dark:bg-dark-background">
            {/* Navbar */}
            <HeaderPublic/>

            {/* Hero */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
                <motion.p
                    className="uppercase mb-4 text-sm tracking-wider text-light-accent-purple/80 dark:text-dark-accent-purple/80"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    {t('hero.stats')}
                </motion.p>
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold mb-6 max-w-3xl leading-tight text-light-text-primary dark:text-dark-text-primary"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    {t('hero.title')}
                </motion.h1>
                <motion.p
                    className="max-w-xl text-light-text-secondary dark:text-dark-text-secondary"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    {t('hero.description')}
                </motion.p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
                    <Link href="/auth/login" className="w-full sm:w-auto">
                        <motion.button
                            className="w-full sm:w-auto px-8 py-3 bg-light-accent-purple dark:bg-dark-accent-purple text-white rounded-md"
                            initial="hidden"
                            animate="visible"
                            variants={itemVariants}
                        >
                            {t('hero.getStartedFree')}
                        </motion.button>
                    </Link>
                    <Link href="/contact" className="w-full sm:w-auto">
                        <motion.button
                            className="w-full sm:w-auto px-8 py-3 border border-light-border dark:border-dark-border rounded-md text-light-text-primary dark:text-dark-text-primary"
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
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-light-text-primary dark:text-dark-text-primary"
                    variants={itemVariants}
                >
                    {t('features.title')}
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-light-card dark:bg-dark-card rounded-lg"
                        variants={itemVariants}
                    >
                        <ShieldCheck className="w-12 h-12 mb-4 text-light-accent-purple dark:text-dark-accent-purple"/>
                        <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
                            {t('features.customizable.title')}
                        </h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                            {t('features.customizable.description')}
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-light-card dark:bg-dark-card rounded-lg"
                        variants={itemVariants}
                    >
                        <Globe className="w-12 h-12 mb-4 text-light-accent-blue dark:text-dark-accent-blue"/>
                        <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
                            {t('features.compliant.title')}
                        </h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                            {t('features.compliant.description')}
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-light-card dark:bg-dark-card rounded-lg"
                        variants={itemVariants}
                    >
                        <Code2 className="w-12 h-12 mb-4 text-light-accent-purple dark:text-dark-accent-purple"/>
                        <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
                            {t('features.integration.title')}
                        </h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                            {t('features.integration.description')}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Pricing Section */}
            <motion.section
                id="pricing"
                className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4 bg-light-card/80 dark:bg-dark-card/80"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-light-text-primary dark:text-dark-text-primary"
                    variants={itemVariants}
                >
                    {t('pricing.title')}
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <motion.div
                        className="p-8 bg-white dark:bg-dark-background rounded-lg shadow-md"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
                            {t('pricing.free.title')}
                        </h3>
                        <p className="text-lg font-bold mb-4 text-light-accent-purple dark:text-dark-accent-purple">
                            {t('pricing.free.price')}
                        </p>
                        <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                            <li>{t('pricing.free.features.documents')}</li>
                            <li>{t('pricing.free.features.sites')}</li>
                            <li>{t('pricing.free.features.characters')}</li>
                            <li>{t('pricing.free.features.ai')}</li>
                        </ul>
                        <Link href="/auth/register" className="block mt-6">
                            <motion.button
                                className="w-full py-3 bg-light-accent-purple dark:bg-dark-accent-purple text-white rounded-md"
                                variants={itemVariants}
                            >
                                {t('pricing.free.cta')}
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="p-8 bg-white dark:bg-dark-background rounded-lg shadow-md"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
                            {t('pricing.pro.title')}
                        </h3>
                        <p className="text-lg font-bold mb-4 text-light-accent-blue dark:text-dark-accent-blue">
                            {t('pricing.pro.price')}
                        </p>
                        <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                            <li>{t('pricing.pro.features.documents')}</li>
                            <li>{t('pricing.pro.features.sites')}</li>
                            <li>{t('pricing.pro.features.characters')}</li>
                            <li>{t('pricing.pro.features.ai')}</li>
                        </ul>
                        <Link href="/auth/register?redirect=true" className="block mt-6">
                            <motion.button
                                className="w-full py-3 bg-light-accent-blue dark:bg-dark-accent-blue text-white rounded-md"
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
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-light-text-primary dark:text-dark-text-primary"
                    variants={itemVariants}
                >
                    {t('about.title')}
                </motion.h2>
                <motion.p
                    className="max-w-2xl mx-auto text-center text-light-text-secondary dark:text-dark-text-secondary mb-12"
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
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-light-card dark:bg-dark-card">
                                <Image
                                    alt={member.name}
                                    width={96}
                                    height={96}
                                    src={member.image}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                                {member.name}
                            </h4>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                {member.role}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Cookie Consent Banner */}
            <CookieConsent/>
        </main>
    );
}