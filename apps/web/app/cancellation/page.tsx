'use client';

import { useState } from 'react';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function CancellationPage() {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Feedback sent:', feedback);
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-[#0c0c0c] text-white flex flex-col justify-center items-center p-6">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
                <XCircle size={64} className="text-red-500 mx-auto mb-4"/>
                <h1 className="text-2xl font-semibold mb-2">Subscription Cancelled</h1>
                <p className="text-neutral-400 mb-6">
                    Your subscription has been successfully cancelled.
                </p>

                <p className="text-neutral-400 mb-6">
                    We will miss you! But don’t worry, you can resubscribe anytime. Your data and documents are safe with us.
                </p>

                {!submitted ? (
                    <>
                        <p className="text-sm text-neutral-400">By the way, could you tell us why?</p>
                        <p className="mb-4 text-sm text-neutral-400">Your feedback helps us improve.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <textarea
                                className="bg-[#0c0c0c] border border-neutral-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#79d3d3]"
                                rows={4}
                                placeholder="Write your feedback here..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-[#79d3d3] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#60c3c3] transition duration-200"
                            >
                                Send Feedback
                            </button>
                        </form>
                    </>
                ) : (
                    <p className="text-green-500 font-medium">Thank you for your feedback! 💙</p>
                )}

                <div className="mt-6">
                    <Link
                        href="/dashboard"
                        className="text-sm text-neutral-400 hover:underline hover:text-white transition"
                    >
                        Return to the homepage
                    </Link>
                </div>
            </div>
        </main>
    );
}
