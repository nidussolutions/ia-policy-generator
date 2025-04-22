'use client';

import { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Hourglass } from 'lucide-react';
import Link from "next/link";

export default function PaymentConfirmationPage() {
    const searchParams = useSearchParams();

    const status = searchParams.get('status');

    const renderStatus = () => {
        switch (status) {
            case 'approved':
                return (
                    <div className="text-center text-green-500">
                        <CheckCircle size={64} className="mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Payment Confirmed!</h2>
                        <p>Your subscription has been activated successfully.</p>
                    </div>
                );
            case 'pending':
                return (
                    <div className="text-center text-yellow-500">
                        <Hourglass size={64} className="mx-auto mb-4 animate-pulse" />
                        <h2 className="text-2xl font-semibold mb-2">Payment Pending</h2>
                        <p>We’re waiting for the payment confirmation. Please check again later.</p>
                    </div>
                );
            case 'rejected':
            case 'failure':
                return (
                    <div className="text-center text-red-500">
                        <XCircle size={64} className="mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Payment Failed</h2>
                        <p>Something went wrong. Please try again or contact support.</p>
                    </div>
                );
            case 'cancelled':
                return (
                    <div className="text-center text-red-500">
                        <XCircle size={64} className="mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Payment Cancelled</h2>
                        <p>Your payment was cancelled. Please try again.</p>
                    </div>
                );
            default:
                return (
                    <div className="text-center text-neutral-400">
                        <h2 className="text-2xl font-semibold mb-2">Processing...</h2>
                        <p>We are verifying your payment status.</p>
                    </div>
                );
        }
    };

    return (
        <main className="min-h-screen bg-[#0c0c0c] text-white flex flex-col justify-center items-center p-6">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
	    		<Suspense fallback={<>Loading...</>}>
                	{renderStatus()}
				</Suspense>
                <div className="mt-6">
                    <Link href="/dashboard" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}
