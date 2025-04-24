'use client';

import {useParams} from 'next/navigation';
import {CheckCircle, XCircle, Hourglass} from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import {motion} from 'framer-motion';

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
}) => (
    <motion.div
        initial={{opacity: 0, y: 8}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.4}}
        className={`text-center ${color}`}
    >
        <Icon size={64} className="mx-auto mb-4"/>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p>{message}</p>
    </motion.div>
);

export default function PaymentConfirmationPage() {
    const {status} = useParams() as { status: string };

    const renderStatus = () => {
        switch (status) {
            case 'approved':
                return (
                    <StatusMessage
                        icon={CheckCircle}
                        color="text-green-400"
                        title="Payment Confirmed"
                        message="Your subscription is active! We're glad to have you with us!"
                    />
                );
            case 'pending':
                return (
                    <StatusMessage
                        icon={Hourglass}
                        color="text-yellow-400"
                        title="Payment Pending"
                        message="We're waiting for payment confirmation. Please check again later."
                    />
                );
            case 'rejected':
                return (
                    <StatusMessage
                        icon={XCircle}
                        color="text-red-400"
                        title="Payment Rejected"
                        message="Your payment was rejected. Please verify your details and try again."
                    />
                );
            case 'failure':
                return (
                    <StatusMessage
                        icon={XCircle}
                        color="text-red-400"
                        title="Payment Failed"
                        message="Your payment could not be processed. Please try again or contact support."
                    />
                );
            case 'cancelled':
                return (
                    <StatusMessage
                        icon={XCircle}
                        color="text-red-400"
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
                        className="text-center text-gray-400"
                    >
                        <h2 className="text-2xl font-semibold mb-2">Processing...</h2>
                        <p>We’re processing your payment. This may take a few minutes.</p>
                    </motion.div>
                );
        }
    };

    return (
        <main
            className="min-h-screen bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] flex items-center justify-center p-6">
            <Layout>
                <motion.div
                    initial={{opacity: 0, scale: 0.98}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                    className="bg-[#1E0359]/40 backdrop-blur-md border border-[#8C0368]/30 rounded-2xl shadow-lg p-8 max-w-lg w-full text-white"
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
                            className="inline-block bg-[#8C0368] hover:bg-[#A429A6] text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                        >
                            Back to Dashboard
                        </Link>
                    </motion.div>
                </motion.div>
            </Layout>
        </main>
    );
}
