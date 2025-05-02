'use client';

import {motion, AnimatePresence} from 'framer-motion';
import Layout from '@/components/Layout';
import {useRouter} from 'next/navigation';
import {useCheckout} from '@/hooks/useCheckout';
import {useI18n} from '@/contexts/I18nContext';
import {useState, useEffect} from 'react';

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

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    },
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12
        },
    },
};

type PlanCardProps = {
    type: 'free' | 'monthly' | 'annual';
    highlight?: boolean;
    handleSubscription: (plan: string) => void;
    textDirection: number;
    t: (key: string) => string;
}

const PlanCard = ({
                      type,
                      highlight = false,
                      handleSubscription,
                      textDirection,
                      t
                  }: PlanCardProps) => {
    return (
        <motion.div
            className={`${
                highlight
                    ? "relative p-10 bg-light-card dark:bg-dark-card border-4 border-light-accent-purple dark:border-dark-accent-purple rounded-2xl text-center backdrop-blur-md scale-105 shadow-2xl"
                    : "p-8 bg-light-card dark:bg-dark-card rounded-2xl text-center backdrop-blur-md border border-light-border dark:border-dark-border"
            }`}
            variants={itemVariants}
        >
            {highlight && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`badge-${type}`}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-accent-purple dark:bg-dark-accent-purple text-white text-xs font-bold py-1 px-4 rounded-full"
                    >
                        {t(`pricingPage.plans.${type}.badge`)}
                    </motion.div>
                </AnimatePresence>
            )}

            <AnimatePresence mode="wait">
                <motion.h3
                    key={`title-${type}`}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={textDirection}
                    className={`${highlight ? 'text-3xl' : 'text-2xl'} font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary`}
                >
                    {t(`pricingPage.plans.${type}.title`)}
                </motion.h3>
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.p
                    key={`price-${type}`}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={textDirection}
                    className={`text-lg font-bold mb-4 ${
                        type === 'monthly'
                            ? 'text-light-accent-blue dark:text-dark-accent-blue'
                            : 'text-light-accent-purple dark:text-dark-accent-purple'
                    }`}
                >
                    {t(`pricingPage.plans.${type}.price`)}
                </motion.p>
            </AnimatePresence>

            <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary mb-6">
                {[0, 1, 2, 3].map((index) => {
                    const feature = t(`pricingPage.plans.${type}.features.${index}`);
                    if (!feature) return null;

                    return (
                        <AnimatePresence mode="wait" key={index}>
                            <motion.li
                                key={`feature-${type}-${index}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                            >
                                {feature}
                            </motion.li>
                        </AnimatePresence>
                    );
                })}
            </ul>

            <motion.button
                whileHover={{scale: 1.05}}
                onClick={() => handleSubscription(type)}
                className={`w-full py-3 ${
                    type === 'monthly'
                        ? 'bg-light-accent-blue dark:bg-dark-accent-blue'
                        : 'bg-light-accent-purple dark:bg-dark-accent-purple'
                } text-white rounded-full font-medium transition-transform`}
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={`button-${type}`}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                    >
                        {t(`pricingPage.plans.${type}.button`)}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
};

export default function PricingPage() {
    const router = useRouter();
    const {startCheckout} = useCheckout();
    const {t, language} = useI18n();
    const [textDirection, setTextDirection] = useState(0);

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    const handleSubscription = async (plan: string) => {
        if (plan === 'free') return router.push('/dashboard');

        try {
            await startCheckout(plan).finally();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <main className="flex flex-col text-light-text-primary dark:text-dark-text-primary">
                <motion.section
                    className="w-full max-w-6xl mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`title-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="text-4xl md:text-6xl font-extrabold mb-6 text-center text-light-text-primary dark:text-dark-text-primary"
                        >
                            {t('pricingPage.title')}
                        </motion.h1>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`description-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="max-w-xl text-light-text-secondary dark:text-dark-text-secondary text-center mb-12"
                        >
                            {t('pricingPage.description')}
                        </motion.p>
                    </AnimatePresence>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PlanCard
                            type="free"
                            handleSubscription={handleSubscription}
                            textDirection={textDirection}
                            t={t}
                        />
                        <PlanCard
                            type="annual"
                            highlight={true}
                            handleSubscription={handleSubscription}
                            textDirection={textDirection}
                            t={t}
                        />
                        <PlanCard
                            type="monthly"
                            handleSubscription={handleSubscription}
                            textDirection={textDirection}
                            t={t}
                        />
                    </div>
                </motion.section>
            </main>
        </Layout>
    );
}