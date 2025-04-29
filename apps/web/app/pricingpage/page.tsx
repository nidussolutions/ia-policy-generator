'use client';

import {motion} from 'framer-motion';
import Layout from '@/components/Layout';
import {useRouter} from 'next/navigation';
import {useCheckout} from '@/hooks/useCheckout';
import {useTheme} from '@/components/ThemeContext';

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

export default function PricingPage() {
    const router = useRouter();
    const {startCheckout} = useCheckout();
    const {theme} = useTheme();

    const handleSubscription = async (plan: string) => {
        if (plan == 'free') return router.push('/dashboard');

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
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold mb-6 text-center text-light-text-primary dark:text-dark-text-primary"
                        variants={itemVariants}
                    >
                        Choose Your Plan
                    </motion.h1>
                    <motion.p
                        className="max-w-xl text-light-text-secondary dark:text-dark-text-secondary text-center mb-12"
                        variants={itemVariants}
                    >
                        Find the perfect plan for your business needs and start generating
                        legal documents in seconds.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Free Plan */}
                        <motion.div
                            className="p-8 bg-light-card dark:bg-dark-card rounded-2xl text-center backdrop-blur-md border border-light-border dark:border-dark-border"
                            variants={itemVariants}
                        >
                            <h3 className="text-2xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Free</h3>
                            <p className="text-lg font-bold mb-4 text-light-accent-purple dark:text-dark-accent-purple">
                                $0 / month
                            </p>
                            <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary mb-6">
                                <li>1 document</li>
                                <li>1 website</li>
                                <li>Basic AI</li>
                            </ul>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                onClick={() => handleSubscription('free')}
                                className="w-full py-3 bg-light-accent-purple dark:bg-dark-accent-purple text-white rounded-full font-medium transition-transform"
                            >
                                Continue for free
                            </motion.button>
                        </motion.div>

                        {/* Annual Plan (Highlight) */}
                        <motion.div
                            className="relative p-10 bg-light-card dark:bg-dark-card border-4 border-light-accent-purple dark:border-dark-accent-purple rounded-2xl text-center backdrop-blur-md scale-105 shadow-2xl"
                            variants={itemVariants}
                        >
                            <div
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-accent-purple dark:bg-dark-accent-purple text-white text-xs font-bold py-1 px-4 rounded-full">
                                Best Value
                            </div>
                            <h3 className="text-3xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Annual</h3>
                            <p className="text-lg font-bold mb-4 text-light-accent-purple dark:text-dark-accent-purple">
                                $40 / year
                            </p>
                            <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary mb-6">
                                <li>Unlimited documents</li>
                                <li>Up to 10 websites</li>
                                <li>Premium AI</li>
                                <li>Priority updates</li>
                            </ul>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                onClick={() => handleSubscription('annual')}
                                className="w-full py-3 bg-light-accent-purple dark:bg-dark-accent-purple text-white rounded-full font-medium transition-transform"
                            >
                                Get Annual Plan
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-light-card dark:bg-dark-card rounded-2xl text-center backdrop-blur-md border border-light-border dark:border-dark-border"
                            variants={itemVariants}
                        >
                            <h3 className="text-2xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
                                Monthly
                            </h3>
                            <p className="text-lg font-bold mb-4 text-light-accent-blue dark:text-dark-accent-blue">
                                $5 / month
                            </p>
                            <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary mb-6">
                                <li>Unlimited documents</li>
                                <li>Up to 10 websites</li>
                                <li>Advanced AI</li>
                            </ul>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                onClick={() => handleSubscription('monthly')}
                                className="w-full py-3 bg-light-accent-blue dark:bg-dark-acecent-blue text-white rounded-full font-medium transition-transform"
                            >
                                Get Monthly Plan
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.section>
            </main>
        </Layout>
    );
}
