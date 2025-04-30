'use client';

import React from 'react';
import Header from './Header';
import {MotionConfig, motion} from 'framer-motion';

interface Props {
    children: React.ReactNode;
}

export default function Layout({children}: Props) {

    return (
        <div
            className="min-h-screen bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary">
            <Header/>
            <MotionConfig transition={{duration: 0.5}}>
                <motion.main
                    key="page-transition"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="p-6 mt-8 max-w-5xl mx-auto"
                >
                    <div className="w-full max-w-5xl mx-auto">
                        {children}
                    </div>
                </motion.main>
            </MotionConfig>
        </div>
    );
}
