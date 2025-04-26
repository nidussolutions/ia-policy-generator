'use client';

import React, {useState} from 'react';
import {useRecovery} from '@/hooks/useRecovery';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {Mail, ArrowLeft} from 'lucide-react';

const containerVariants = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.12}},
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {type: 'spring', stiffness: 100, damping: 12}},
};

export default function ForgotPasswordPage() {
    const {handleForgot, loading, error, setError} = useRecovery();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async () => {
        if (!email) return alert('Email is required');

        try {
            await handleForgot(email);
            if (!error) {
                setSent(true);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to send recovery email');
        }
    }

    return (
        <main
            className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] px-4">
            <motion.div
                className="w-full max-w-md p-8 bg-[#1E0359]/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#8C0368]/20"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className="text-center mb-6" variants={itemVariants}>
                    <Link href="/auth/login"
                          className="inline-flex items-center gap-2 text-3xl font-extrabold text-[#A429A6]">
                        <ArrowLeft className="w-6 h-6"/>
                        Back
                    </Link>
                    <h2 className="mt-4 text-xl font-semibold text-gray-200">Forgot your password?</h2>
                </motion.div>

                {sent ? (
                    <motion.div className="text-center text-green-400" variants={itemVariants}>
                        Recovery email sent! Please check your inbox.
                    </motion.div>
                ) : (
                    <motion.form className="space-y-6" variants={containerVariants}>
                        {error && (
                            <motion.div
                                className="mb-4 text-sm text-red-400 bg-red-900/30 px-4 py-2 rounded-lg text-center"
                                initial={{opacity: 0}} animate={{opacity: 1}}>
                                {error}
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={18}/>
                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="youremail@example.com"
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#030526]/20 border border-transparent focus:border-[#8C0368] focus:ring-0 text-gray-200 placeholder-gray-500"
                                />
                            </div>
                        </motion.div>

                        <motion.button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-3 rounded-full font-medium bg-[#8C0368] hover:bg-[#A429A6] transition-transform disabled:opacity-50 disabled:cursor-not-allowed text-white"
                            variants={itemVariants}
                        >
                            {loading ? 'Sending...' : 'Send Recovery Email'}
                        </motion.button>
                    </motion.form>
                )}
            </motion.div>
        </main>
    );
}
