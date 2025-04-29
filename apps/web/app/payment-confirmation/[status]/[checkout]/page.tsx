'use client';

import {useParams} from 'next/navigation';
import {CheckCircle, XCircle, Hourglass} from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import {motion} from 'framer-motion';
import {useTheme} from '@/components/ThemeContext';
import { sendGTMEvent } from '@next/third-parties/google'
import React, {useEffect} from 'react';


const StatusMessage = ({
                           icon: Icon,
                           color,
                           title,
                           message,
                       }: {
    icon: React.ElementType;
    color: string;
    title: string;
    message: string;
}) => {
    const {theme} = useTheme();

    return (
        <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            className={`text-center ${color} `}
        >
            <Icon size={64} className="mx-auto mb-4"/>
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className={theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}>
                {message}
            </p>
        </motion.div>
    );
};

export default function PaymentConfirmationPage() {
    const {status} = useParams() as { status: string };
    const {theme} = useTheme();

    useEffect(() => {
      sendGTMEvent({ event: 'conversion', value: 1.0 })
    },[]);

    const renderStatus = () => {
        switch (status) {
            case 'approved':
                return (
                    <StatusMessage
                        icon={CheckCircle}
                        color="text-green-500 dark:text-green-400"
                        title="Payment Confirmed"
                        message="Your subscription is active! We're glad to have you with us!"
                    />
                );
            case 'pending':
                return (
                    <StatusMessage
                        icon={Hourglass}
                        color="text-yellow-500 dark:text-yellow-400"
                        title="Payment Pending"
                        message="We're waiting for payment confirmation. Please check again later."
                    />
                );
            case 'rejected':
                return (
                    <StatusMessage
                        icon={XCircle}
                        color="text-red-500 dark:text-red-400"
                        title="Payment Rejected"
                        message="Your payment was rejected. Please verify your details and try again."
                    />
                );
            case 'failure':
                return (
                    <StatusMessage
                        icon={XCircle}
                        color="text-red-500 dark:text-red-400"
                        title="Payment Failed"
                        message="Your payment could not be processed. Please try again or contact support."
                    />
                );
            case 'cancelled':
                return (
                    <StatusMessage
                        icon={XCircle}
                        color="text-red-500 dark:text-red-400"
                        title="Payment Cancelled"
                        message="Your payment was cancelled. If this was not you, contact support."
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
                        <h2 className="text-2xl font-semibold mb-2">Processing...</h2>
                        <p>We’re processing your payment. This may take a few minutes.</p>
                    </motion.div>
                );
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center w-full">
                <motion.div
                    initial={{opacity: 0, scale: 0.98}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
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
                            Back to Dashboard
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </Layout>
    );
}
