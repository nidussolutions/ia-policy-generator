'use client';

import React from "react";
import Header from './Header';
import {MotionConfig, motion} from "framer-motion";
import {ThemeProvider} from "@/components/ThemeContext";

interface Props {
    children: React.ReactNode;
}

export default function Layout({children}: Props) {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-100 bg-white text-black dark:bg-gray-950 dark:text-white mb-8">
                <Header/>
                <MotionConfig transition={{duration: 0.5}}>
                    <motion.main
                        key="page-transition"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="p-6 mt-8 max-w-5xl mx-auto dark:bg-blend-darken dark:bg-gray-900/30 rounded-lg shadow-md"
                    >
                        {children}
                    </motion.main>
                </MotionConfig>
            </div>
        </ThemeProvider>

    );
}
