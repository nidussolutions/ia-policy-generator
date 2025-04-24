'use client';

import React from "react";
import Header from './Header';
import { MotionConfig, motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
}

export default function Layout({children}: Props) {
    return (
        <div className="min-h-screen bg-gray-100 bg-white text-black dark:bg-gray-950 dark:text-white mb-8">
            <Header/>
            <MotionConfig transition={{ duration: 0.5 }}>
                <motion.main
                    key="page-transition"
                    initial={{ opacity: 0 }} // Opacidade inicial
                    animate={{ opacity: 1 }} // Opacidade final
                    exit={{ opacity: 0 }} // Opacidade ao sair
                    className="p-6 mt-8 max-w-5xl mx-auto dark:bg-blend-darken dark:bg-gray-900/30 rounded-lg shadow-md"
                >
                    {children}
                </motion.main>
            </MotionConfig>
        </div>
    );
}
