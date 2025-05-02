'use client';

import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';
import {ShieldCheck, Globe, Code2} from 'lucide-react';
import {useI18n} from '@/contexts/I18nContext';
import Image from 'next/image';
import CookieConsent from '@/components/CookieConsent';
import HeaderPublic from "@/components/HeaderPublic";

// Animações
const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        }
    }
};

const itemVariants = {
    hidden: {opacity: 0, y: 30},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 0.6
        }
    }
};

const cardVariants = {
    hidden: {opacity: 0, scale: 0.8},
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
        }
    },
    hover: {
        scale: 1.05,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
        }
    }
};

const buttonVariants = {
    hidden: {opacity: 0, scale: 0.8},
    visible: {
        opacity: 1,
        scale: 1,
        transition: {type: 'spring', stiffness: 100, damping: 15}
    },
    hover: {
        scale: 1.05,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
        }
    },
    tap: {scale: 0.95}
};

const textChangeVariants = {
    enter: {
        opacity: 0,
        y: 20,
        transition: {duration: 0.3}
    },
    center: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.3}
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {duration: 0.3}
    }
};

const imageVariants = {
    hidden: {opacity: 0, scale: 0.8},
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        scale: 1.1,
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
        }
    }
};

export default function HomePage() {
    const {t, language} = useI18n();

    return (
        <main
            className="min-h-screen flex flex-col bg-gradient-to-b from-light-background to-light-card dark:from-dark-background dark:to-dark-card">
            <HeaderPublic/>

            {/* Hero Section */}
            <motion.section
                className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <AnimatePresence mode="wait">
                    <motion.p
                        key={`stats-${language}`}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={textChangeVariants}
                        className="uppercase mb-4 text-sm tracking-wider bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                    >
                        {t('hero.stats')}
                    </motion.p>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.h1
                        key={`title-${language}`}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={textChangeVariants}
                        className="text-4xl md:text-6xl font-extrabold mb-6 max-w-3xl leading-tight bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                    >
                        {t('hero.title')}
                    </motion.h1>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={`description-${language}`}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={textChangeVariants}
                        className="max-w-xl text-light-text-secondary dark:text-dark-text-secondary"
                    >
                        {t('hero.description')}
                    </motion.p>
                </AnimatePresence>

                <motion.div
                    className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8"
                    variants={containerVariants}
                >
                    <Link href="/auth/login" className="w-full sm:w-auto">
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover text-white rounded-md"
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`button1-${language}`}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={textChangeVariants}
                                >
                                    {t('hero.getStartedFree')}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>
                    </Link>
                    <Link href="/contact" className="w-full sm:w-auto">
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="w-full sm:w-auto px-8 py-3 border border-light-border dark:border-dark-border rounded-md bg-gradient-to-r from-light-text-primary to-light-text-secondary dark:from-dark-text-primary dark:to-dark-text-secondary bg-clip-text text-transparent"
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`button2-${language}`}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={textChangeVariants}
                                >
                                    {t('hero.talkExpert')}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.section>

            {/* Features Section */}
            <motion.section
                id="features"
                className="w-full max-w-6xl mx-auto py-24 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
                variants={containerVariants}
            >
                <div className="h-[60px] overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={`features-title-${language}`}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={textChangeVariants}
                            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-light-accent-blue to-light-accent-purple dark:from-dark-accent-blue dark:to-dark-accent-purple bg-clip-text text-transparent"
                        >
                            {t('features.title')}
                        </motion.h2>
                    </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`feature1-${language}`}
                            variants={cardVariants}
                            whileHover="hover"
                            className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-gradient-to-br from-light-card to-light-background dark:from-dark-card dark:to-dark-background rounded-lg transform-gpu"
                        >
                            <ShieldCheck
                                className="w-12 h-12 mb-4 text-light-accent-purple dark:text-dark-accent-purple"/>
                            <div className="h-[32px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.h3
                                        key={`feature1-title-${language}`}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        variants={textChangeVariants}
                                        className="text-xl font-semibold mb-2 bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                                    >
                                        {t('features.customizable.title')}
                                    </motion.h3>
                                </AnimatePresence>
                            </div>
                            <div className="h-[80px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={`feature1-desc-${language}`}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        variants={textChangeVariants}
                                        className="text-light-text-secondary dark:text-dark-text-secondary"
                                    >
                                        {t('features.customizable.description')}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        <motion.div
                            key={`feature2-${language}`}
                            variants={cardVariants}
                            whileHover="hover"
                            className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-gradient-to-br from-light-card to-light-background dark:from-dark-card dark:to-dark-background rounded-lg transform-gpu"
                        >
                            <Globe className="w-12 h-12 mb-4 text-light-accent-blue dark:text-dark-accent-blue"/>
                            <div className="h-[32px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.h3
                                        key={`feature2-title-${language}`}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        variants={textChangeVariants}
                                        className="text-xl font-semibold mb-2 bg-gradient-to-r from-light-accent-blue to-light-accent-purple dark:from-dark-accent-blue dark:to-dark-accent-purple bg-clip-text text-transparent"
                                    >
                                        {t('features.compliant.title')}
                                    </motion.h3>
                                </AnimatePresence>
                            </div>
                            <div className="h-[80px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={`feature2-desc-${language}`}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        variants={textChangeVariants}
                                        className="text-light-text-secondary dark:text-dark-text-secondary"
                                    >
                                        {t('features.compliant.description')}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        <motion.div
                            key={`feature3-${language}`}
                            variants={cardVariants}
                            whileHover="hover"
                            className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-gradient-to-br from-light-card to-light-background dark:from-dark-card dark:to-dark-background rounded-lg transform-gpu"
                        >
                            <Code2 className="w-12 h-12 mb-4 text-light-accent-purple dark:text-dark-accent-purple"/>
                            <div className="h-[32px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.h3
                                        key={`feature3-title-${language}`}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        variants={textChangeVariants}
                                        className="text-xl font-semibold mb-2 bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                                    >
                                        {t('features.integration.title')}
                                    </motion.h3>
                                </AnimatePresence>
                            </div>
                            <div className="h-[80px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={`feature3-desc-${language}`}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        variants={textChangeVariants}
                                        className="text-light-text-secondary dark:text-dark-text-secondary"
                                    >
                                        {t('features.integration.description')}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.section>

            {/* Pricing Section */}
            <motion.section
                id="pricing"
                className="w-full max-w-6xl mx-auto py-16 md:py-24 px-4 bg-gradient-to-br from-light-card/80 to-light-background/80 dark:from-dark-card/80 dark:to-dark-background/80"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
                variants={containerVariants}
            >
                <div className="h-[60px] overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={`pricing-title-${language}`}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={textChangeVariants}
                            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-light-accent-blue to-light-accent-purple dark:from-dark-accent-blue dark:to-dark-accent-purple bg-clip-text text-transparent"
                        >
                            {t('pricing.title')}
                        </motion.h2>
                    </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Free Plan */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="p-8 bg-gradient-to-br from-white to-light-card dark:from-dark-background dark:to-dark-card rounded-lg shadow-md"
                    >
                        <div className="h-[40px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.h3
                                    key={`free-title-${language}`}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={textChangeVariants}
                                    className="text-2xl font-semibold mb-2 bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                                >
                                    {t('pricing.free.title')}
                                </motion.h3>
                            </AnimatePresence>
                        </div>

                        <div className="h-[40px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={`free-price-${language}`}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={textChangeVariants}
                                    className="text-lg font-bold mb-4 bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover bg-clip-text text-transparent"
                                >
                                    {t('pricing.free.price')}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <div className="h-[160px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.ul
                                    key={`free-features-${language}`}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={textChangeVariants}
                                    className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary"
                                >
                                    <li>{t('pricing.free.features.documents')}</li>
                                    <li>{t('pricing.free.features.sites')}</li>
                                    <li>{t('pricing.free.features.characters')}</li>
                                    <li>{t('pricing.free.features.ai')}</li>
                                </motion.ul>
                            </AnimatePresence>
                        </div>

                        <Link href="/auth/register" className="block mt-6">
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="w-full py-3 bg-gradient-to-r from-light-accent-purple to-light-purple dark:from-dark-purple dark:to-dark-purple-hover text-white rounded-md"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={`free-cta-${language}`}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        variants={textChangeVariants}
                                    >
                                        {t('pricing.free.cta')}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Pro Plan */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="p-8 bg-gradient-to-br from-white to-light-card dark:from-dark-background dark:to-dark-card rounded-lg shadow-md"
                    >
                        <div className="h-[40px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.h3
                                    key={`pro-title-${language}`}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={textChangeVariants}
                                    className="text-2xl font-semibold mb-2 bg-gradient-to-r from-light-accent-blue to-light-accent-purple dark:from-dark-accent-blue dark:to-dark-accent-purple bg-clip-text text-transparent"
                                >
                                    {t('pricing.pro.title')}
                                </motion.h3>
                            </AnimatePresence>
                        </div>

                        <div className="h-[40px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={`pro-price-${language}`}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={textChangeVariants}
                                    className="text-lg font-bold mb-4 bg-gradient-to-r from-light-accent-blue to-light-accent-purple dark:from-dark-accent-blue dark:to-dark-accent-purple bg-clip-text text-transparent"
                                >
                                    {t('pricing.pro.price')}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <div className="h-[160px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.ul
                                    key={`pro-features-${language}`}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={textChangeVariants}
                                    className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary"
                                >
                                    <li>{t('pricing.pro.features.documents')}</li>
                                    <li>{t('pricing.pro.features.sites')}</li>
                                    <li>{t('pricing.pro.features.characters')}</li>
                                    <li>{t('pricing.pro.features.ai')}</li>
                                </motion.ul>
                            </AnimatePresence>
                        </div>

                        <Link href="/auth/register?redirect=true" className="block mt-6">
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="w-full py-3 bg-gradient-to-r from-light-accent-blue to-light-accent-purple dark:from-dark-accent-blue dark:to-dark-accent-purple text-white rounded-md"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={`pro-cta-${language}`}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        variants={textChangeVariants}
                                    >
                                        {t('pricing.pro.cta')}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
            <CookieConsent/>
        </main>
    );
}