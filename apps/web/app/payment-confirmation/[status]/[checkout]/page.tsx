'use client';

import {useParams} from 'next/navigation';
import {CheckCircle, XCircle, Hourglass} from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import {motion, AnimatePresence} from 'framer-motion';
import {useTheme} from '@/components/ThemeContext';
import {sendGTMEvent} from '@next/third-parties/google';
import React, {useEffect, useState} from 'react';
import {useI18n} from '@/contexts/I18nContext';

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
    hidden: {opacity: 0, scale: 0.98},
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1
        }
    }
};

const StatusMessage = ({
                           icon: Icon,
                           color,
                           title,
                           message,
                           textDirection
                       }: {
    icon: React.ElementType;
    color: string;
    title: string;
    message: string;
    textDirection: number;
}) => {
    const {theme} = useTheme();

    return (
        <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            className={`text-center ${color}`}
        >
            <Icon size={64} className="mx-auto mb-4"/>
            <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                    key={`title-${title}`}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={textDirection}
                    className="text-2xl font-semibold mb-2"
                >
                    {title}
                </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
                <motion.p
                    key={`message-${message}`}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={textDirection}
                    className={theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}
                >
                    {message}
                </motion.p>
            </AnimatePresence>
        </motion.div>
    );
};

export default function PaymentConfirmationPage() {
    const {status} = useParams() as { status: string };
    const {theme} = useTheme();
    const {t, language} = useI18n();
    const [textDirection, setTextDirection] = useState(0);

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    useEffect(() => {
        sendGTMEvent({event: 'conversion', value: 1.0});
    }, []);

    const renderStatus = () => {
        switch (status) {
            case 'approved':
                return (
                    <StatusMessage
                        icon={CheckCircle}
                        color="text-green-500 dark:text-green-400"
                        title={t('payment.confirmation.approved.title')}
                        message={t('payment.confirmation.approved.message')}
                        textDirection={textDirection}
                    />
                );
            case 'pending':
                return (
                    <StatusMessage
                        icon={Hourglass}
                        color="text-yellow-500 dark:text-yellow-400"
                        title={t('payment.confirmation.pending.title')}
                        message={t('payment.confirmation.pending.message')}
                        textDirection={textDirection}
                    />
                );
            case 'rejected':
                return (
                    <StatusMessage
                        icon={XCircle}
                        color="text-red-500 dark:text-red-400"
                        title={t('payment.confirmation.rejected.title')}
                        message={t('payment.confirmation.rejected.message')}
                        textDirection={textDirection}
                    />
                );
            case 'failure':
                return (
                    <StatusMessage
                        icon={XCircle}
                        color="text-red-500 dark:text-red-400"
                        title={t('payment.confirmation.failure.title')}
                        message={t('payment.confirmation.failure.message')}
                        textDirection={textDirection}
                    />
                );
            case 'cancelled':
                return (
                    <StatusMessage
                        icon={XCircle}
                        color="text-red-500 dark:text-red-400"
                        title={t('payment.confirmation.cancelled.title')}
                        message={t('payment.confirmation.cancelled.message')}
                        textDirection={textDirection}
                    />
                );
            default:
                return (
                    <motion.div
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.4}}
                        className={`text-center ${theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}`}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.h2
                                key={`processing-title-${language}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                                className="text-2xl font-semibold mb-2"
                            >
                                {t('payment.confirmation.processing.title')}
                            </motion.h2>
                        </AnimatePresence>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.p
                                key={`processing-message-${language}`}
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                custom={textDirection}
                            >
                                {t('payment.confirmation.processing.message')}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>
                );
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`
            ${theme === 'light'
                        ? 'bg-light-card border-light-border text-light-text-primary'
                        : 'bg-dark-purple-light/40 border-dark-purple/30 text-dark-text-primary'
                    }
            backdrop-blur-md border rounded-2xl shadow-lg p-8 max-w-lg w-full
          `}
                >
                    {renderStatus()}

                    <motion.div
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="mt-6 text-center"
                    >
                        <Link
                            href="/dashboard"
                            className={`
                inline-block font-semibold py-2 px-4 rounded-xl transition duration-200
                ${theme === 'light'
                                ? 'bg-light-accent-purple hover:bg-light-purple-hover text-light-background'
                                : 'bg-dark-purple hover:bg-dark-purple-hover text-dark-text-primary'
                            }
              `}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={`back-${language}`}
                                    variants={textVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    custom={textDirection}
                                >
                                    {t('payment.confirmation.backToDashboard')}
                                </motion.span>
                            </AnimatePresence>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </Layout>
    );
}