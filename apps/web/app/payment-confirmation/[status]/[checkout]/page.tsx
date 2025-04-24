'use client';

import {useParams} from 'next/navigation';
import {CheckCircle, XCircle, Hourglass} from 'lucide-react';
import Link from "next/link";

// Reusable StatusMessage component for cleaner code
const StatusMessage = ({icon: Icon, color, title, message}: {
    icon: React.ElementType,
    color: string,
    title: string,
    message: string
}) => (
    <div className={`text-center ${color}`}>
        <Icon size={64} className="mx-auto mb-4"/>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p>{message}</p>
    </div>
);

export default function PaymentConfirmationPage() {
    const {status} = useParams() as { status: string };

    const renderStatus = () => {
        switch (status) {
            case 'approved':
                return <StatusMessage icon={CheckCircle} color="text-green-500" title="Payment Confirmed"
                                      message="Your subscription is active! We're glad to have you with us!"/>;
            case 'pending':
                return <StatusMessage icon={Hourglass} color="text-yellow-500" title="Payment Pending"
                                      message="We're waiting for the payment confirmation. Please check again later."/>;
            case 'rejected':
                return <StatusMessage icon={XCircle} color="text-red-500" title="Payment Rejected"
                                      message="Your payment was rejected. Please verify your card details and try again."/>;
            case 'failure':
                return <StatusMessage icon={XCircle} color="text-red-500" title="Payment Failed"
                                      message="We're sorry, but your payment was not approved. Please try again! If you need help, contact support."/>;
            case 'cancelled':
                return <StatusMessage icon={XCircle} color="text-red-500" title="Payment Cancelled"
                                      message="Your payment was cancelled. If you didn't do this, please contact support."/>;
            default:
                return <div className="text-center text-neutral-400">
                    <h2 className="text-2xl font-semibold mb-2">Processing...</h2>
                    <p>We&apos;re processing your payment. This may take a few minutes.</p>
                </div>;
        }
    };

    return (
        <main className="text-white min-h-screen flex flex-col justify-center items-center p-6">
            <div className="p-8 rounded-2xl shadow-xl max-w-lg w-full text-center bg-gray-800 dark:bg-gray-900">
                {renderStatus()}
                <div className="mt-6">
                    <Link href="/dashboard"
                          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}
