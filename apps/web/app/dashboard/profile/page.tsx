'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PlanType } from '@/types/PlanType';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import Invoices from '@/components/Invoices';
import Subscription from '@/components/Subscription';
import Profile from '@/components/Profile';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/contexts/I18nContext';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const textVariants = {
    enter: (direction: number) => ({
        y: direction > 0 ? 20 : -20,
        opacity: 0
    }),
    center: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    exit: (direction: number) => ({
        y: direction < 0 ? 20 : -20,
        opacity: 0
    })
};

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    }
};

export default function ProfilePage() {
    const router = useRouter();
    const { t, language } = useI18n();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [plan, setPlan] = useState<PlanType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [textDirection, setTextDirection] = useState(0);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
            return;
        }
        const fetchProfile = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const data = await res.json();
                setName(data.name);
                setEmail(data.email);
                setPlan(data.plan || null);
            } catch {
                setError('Error loading data');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile().finally();
    }, [token, router]);

    if (loading || !plan) return <Loading page={"Profile"} />;

    return (
        <Layout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-3xl mx-auto space-y-8 p-6"
            >
                {/* Back & Title */}
                <motion.div
                    className="flex items-center gap-4"
                    variants={sectionVariants}
                >
                    <motion.button
                        onClick={() => router.back()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-200 hover:text-[#8C0368] transition-colors" />
                    </motion.button>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.h1
                            key={`title-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                            className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary"
                        >
                            {t("profile.title")}
                        </motion.h1>
                    </AnimatePresence>
                </motion.div>

                {/* Profile Form */}
                <motion.div variants={sectionVariants}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={`profile-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                        >
                            <Profile
                                name={name}
                                email={email}
                                password={password}
                                setName={setName}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                error={error}
                                setError={setError}
                                token={token}
                                setLoading={setLoading}
                                loading={loading}
                            />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Subscription */}
                <motion.div variants={sectionVariants}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={`subscription-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                        >
                            <Subscription />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Invoices */}
                <motion.div variants={sectionVariants}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={`invoices-${language}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                        >
                            <Invoices />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </Layout>
    );
}