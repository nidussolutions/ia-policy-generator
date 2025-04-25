'use client';

import React from 'react';
import Header from './Header';
import { MotionConfig, motion } from 'framer-motion';

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] text-gray-200">
            <Header />
            <MotionConfig transition={{ duration: 0.5 }}>
                <motion.main
                    key="page-transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 mt-8 max-w-5xl mx-auto"
                >
                    {children}
                </motion.main>
            </MotionConfig>
        </div>
    );
}
