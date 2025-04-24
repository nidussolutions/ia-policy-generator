'use client';

import {useState} from 'react';
import {XCircle} from 'lucide-react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import {motion} from 'framer-motion';

export default function CancellationPage() {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Feedback sent:', feedback);
        setSubmitted(true);
    };

    return (
        <Layout>
            <main
                className=" text-gray-200 flex items-center justify-center p-6">
                <motion.div
                    initial={{opacity: 0, scale: 0.98}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                    className=" p-8 max-w-lg w-full text-center"
                >
                    <motion.div
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1}}
                        className="mb-4"
                    >
                        <XCircle size={64} className="text-red-400 mx-auto"/>
                    </motion.div>

                    <motion.h1
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        className="text-2xl font-semibold mb-2 text-white"
                    >
                        Subscription Cancelled
                    </motion.h1>

                    <motion.p
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="text-gray-400 mb-4"
                    >
                        Your subscription has been successfully cancelled.
                    </motion.p>

                    <motion.p
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4}}
                        className="text-gray-400 mb-6"
                    >
                        We will miss you! But don’t worry, you can resubscribe anytime. Your data and documents are safe
                        with us.
                    </motion.p>

                    {!submitted ? (
                        <>
                            <motion.p
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.5}}
                                className="text-sm text-gray-400 mb-1"
                            >
                                Could you tell us why?
                            </motion.p>
                            <motion.form
                                onSubmit={handleSubmit}
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.6}}
                                className="flex flex-col gap-4"
                            >
                <textarea
                    className="w-full bg-[#1E0359]/40 backdrop-blur-md border border-[#8C0368]/30 rounded-xl p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8C0368]"
                    rows={4}
                    placeholder="Write your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                                <button
                                    type="submit"
                                    className="w-full bg-[#8C0368] hover:bg-[#A429A6] text-white font-semibold py-2 rounded-xl transition disabled:opacity-50"
                                >
                                    Send Feedback
                                </button>
                            </motion.form>
                        </>
                    ) : (
                        <motion.p
                            initial={{opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.7}}
                            className="text-green-400 font-medium"
                        >
                            Thank you for your feedback! 💙
                        </motion.p>
                    )}

                    <motion.div
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.8}}
                        className="mt-6"
                    >
                        <Link
                            href="/dashboard"
                            className="inline-block bg-[#8C0368] hover:bg-[#A429A6] text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                        >
                            Return to Homepage
                        </Link>
                    </motion.div>
                </motion.div>
            </main>
        </Layout>
    );
}
