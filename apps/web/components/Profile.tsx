'use client';

import {Loader2, Lock, Mail, User} from 'lucide-react';
import React, {useState} from 'react';
import {putWithAuth} from '@/lib/api';
import {motion, AnimatePresence} from 'framer-motion';

type ProfileProps = {
    name: string;
    email: string;
    password: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    error: string;
    token: string;
};

export default function Profile({
                                    name,
                                    email,
                                    password,
                                    setName,
                                    setEmail,
                                    setPassword,
                                    setError,
                                    setLoading,
                                    loading,
                                    error,
                                    token,
                                }: ProfileProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        if (password && (password.length < 6 || !/[^A-Za-z0-9]/.test(password))) {
            setError('Password must be at least 6 characters and include a special character.');
            setLoading(false);
            return;
        }

        try {
            const res = await putWithAuth(
                `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
                {name, email, password: password || undefined},
                token
            );
            if (!res.id) throw new Error();
            setSuccess('Information updated successfully!');
        } catch {
            setError('Error updating profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const motionTransition = {initial: {opacity: 0, y: 20}, animate: {opacity: 1, y: 0}, transition: {duration: 0.4}};

    return (
        <motion.div {...motionTransition} className="bg-[#1E0359]/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl">
            <motion.form
                onSubmit={handleUpdate}
                className="space-y-6"
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.3}}
            >
                <AnimatePresence>
                    {error && (
                        <motion.p
                            className="text-red-400 bg-red-900/30 px-4 py-2 rounded-lg"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                        >
                            {error}
                        </motion.p>
                    )}
                    {success && (
                        <motion.p
                            className="text-green-300 bg-green-900/30 px-4 py-2 rounded-lg"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                        >
                            {success}
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.div {...motionTransition} transition={{delay: 0.1}}>
                    <label className="block text-sm font-medium text-gray-200 mb-1">Name</label>
                    <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <User size={18}/>
            </span>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#030526]/20 border border-transparent focus:border-[#8C0368] focus:ring-0 text-gray-200 placeholder-gray-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            aria-label="Name"
                        />
                    </div>
                </motion.div>

                <motion.div {...motionTransition} transition={{delay: 0.2}}>
                    <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                    <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={18}/>
            </span>
                        <input
                            type="email"
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#030526]/20 border border-transparent focus:border-[#8C0368] focus:ring-0 text-gray-200 placeholder-gray-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email"
                        />
                    </div>
                </motion.div>

                <motion.div {...motionTransition} transition={{delay: 0.3}}>
                    <label className="block text-sm font-medium text-gray-200 mb-1">New Password</label>
                    <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={18}/>
            </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full pl-10 pr-12 py-2 rounded-lg bg-[#030526]/20 border border-transparent focus:border-[#8C0368] focus:ring-0 text-gray-200 placeholder-gray-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Leave blank to keep current"
                            aria-label="Password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </motion.div>

                <motion.div className="flex justify-end" {...motionTransition} transition={{delay: 0.4}}>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-[#8C0368] hover:bg-[#A429A6] text-white px-6 py-2 rounded-full shadow-lg transition-transform hover:scale-105 disabled:opacity-50"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
                        Save Changes
                    </button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
}
