'use client';

import React from 'react';
import AdminHeader from './AdminHeader';
import {motion} from 'framer-motion';

interface Props {
    children: React.ReactNode;
}

export default function AdminLayout({children}: Props) {
    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary">
            <AdminHeader />
            <motion.main
                key="page-transition"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="p-6 mt-8 max-w-7xl mx-auto"
            >
                <div className="w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </motion.main>
        </div>
    );
}