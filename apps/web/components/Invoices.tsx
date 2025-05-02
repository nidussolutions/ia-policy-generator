"use client";

import {
    CalendarDays,
    CheckCircle,
    Clock,
    XCircle,
    Receipt,
    RefreshCw,
    Link as LinkIcon,
} from "lucide-react";
import React, {useState, useEffect} from "react";
import {fetcher} from "@/lib/api";
import {InvoicesType} from "@/types/SubscriptionsType";
import useSWR from "swr";
import {motion, AnimatePresence} from "framer-motion";
import {useI18n} from "@/hooks/useI18n";

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

const containerVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            staggerChildren: 0.1
        }
    }
};

const invoiceVariants = {
    hidden: {opacity: 0, scale: 0.95, y: 20},
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -20,
        transition: {
            duration: 0.2
        }
    }
};

export default function Invoices() {
    const [loadingPageChange, setLoadingPageChange] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [textDirection, setTextDirection] = useState(0);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const {t, language} = useI18n();

    useEffect(() => {
        setTextDirection(prev => prev + 1);
    }, [language]);

    const {data, error, isLoading, mutate} = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/user/invoices` : null,
        (url: string) => fetcher(url, token!)
    );

    const invoices = data?.invoices as InvoicesType[] ?? [];

    const handleUpdate = async () => {
        setLoadingUpdate(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/update-invoices-profile`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            await mutate();
        } finally {
            setLoadingUpdate(false);
        }
    };

    useEffect(() => {
        mutate().finally(() => setLoadingPageChange(false));
    }, [mutate]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-light-card/90 dark:bg-dark-card/90 backdrop-blur-lg border border-light-border dark:border-dark-border p-6 rounded-2xl shadow-2xl space-y-6"
        >
            <div className="flex justify-between items-center">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.h2
                        key={`title-${language}`}
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                        className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary"
                    >
                        {t('invoices.title')}
                    </motion.h2>
                </AnimatePresence>
                <motion.button
                    onClick={handleUpdate}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    className="flex items-center gap-2 text-sm text-light-accent-purple dark:text-dark-accent-purple hover:underline disabled:opacity-50"
                    disabled={loadingUpdate}
                    aria-label={t('invoices.updateAriaLabel')}
                >
                    <RefreshCw className={loadingUpdate ? "animate-spin" : ""} size={16}/>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={`update-${language}-${loadingUpdate}`}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={textDirection}
                        >
                            {loadingUpdate ? t('invoices.updating') : t('invoices.update')}
                        </motion.span>
                    </AnimatePresence>
                </motion.button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
                {error && (
                    <motion.p
                        key="error"
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                        className="text-red-500 text-sm"
                    >
                        {t('invoices.errorLoading')}
                    </motion.p>
                )}

                {(isLoading || loadingPageChange) && (
                    <motion.p
                        key="loading"
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                        className="text-light-text-secondary dark:text-dark-text-secondary text-sm"
                    >
                        {t('invoices.loading')}
                    </motion.p>
                )}

                {!isLoading && invoices.length === 0 && (
                    <motion.p
                        key="no-invoices"
                        variants={textVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={textDirection}
                        className="text-light-text-secondary dark:text-dark-text-secondary text-sm"
                    >
                        {t('invoices.noInvoices')}
                    </motion.p>
                )}

                {!isLoading && invoices.length > 0 && (
                    <motion.div
                        key="invoices-list"
                        className="space-y-4"
                        variants={containerVariants}
                    >
                        <AnimatePresence mode="wait">
                            {invoices.map((invoice) => (
                                <motion.div
                                    key={invoice.id}
                                    variants={invoiceVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="border border-light-border dark:border-dark-border rounded-2xl p-5 space-y-4 shadow-lg bg-light-background/50 dark:bg-dark-background/50"
                                >
                                    {/* ... (resto do conteúdo do invoice permanece o mesmo, apenas adicionando AnimatePresence para os textos) ... */}
                                    <div className="flex justify-between items-center">
                                        <div
                                            className="flex items-center gap-2 text-sm text-light-text-primary dark:text-dark-text-primary">
                                            <Receipt size={16}/>
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.span
                                                    key={`invoice-id-${language}`}
                                                    variants={textVariants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    custom={textDirection}
                                                    className="text-light-text-secondary dark:text-dark-text-secondary"
                                                >
                                                    {t('invoices.invoiceId')}
                                                </motion.span>
                                            </AnimatePresence>
                                            <span>{invoice.id}</span>
                                        </div>

                                        {invoice.invoiceUrl && (
                                            <motion.a
                                                href={invoice.invoiceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{scale: 1.05}}
                                                whileTap={{scale: 0.95}}
                                                className="inline-flex items-center gap-1 text-sm text-light-accent-purple dark:text-dark-accent-purple hover:underline"
                                                aria-label={t('invoices.accessInvoiceAriaLabel')}
                                            >
                                                <LinkIcon size={16}/>
                                                <AnimatePresence mode="wait" initial={false}>
                                                    <motion.span
                                                        key={`access-invoice-${language}`}
                                                        variants={textVariants}
                                                        initial="enter"
                                                        animate="center"
                                                        exit="exit"
                                                        custom={textDirection}
                                                    >
                                                        {t('invoices.accessInvoice')}
                                                    </motion.span>
                                                </AnimatePresence>
                                            </motion.a>
                                        )}
                                    </div>

                                    <div
                                        className="flex flex-wrap items-center gap-4 text-sm text-light-text-primary dark:text-dark-text-primary justify-between">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={16}
                                                          className="text-light-text-secondary dark:text-dark-text-secondary"/>
                                            <div>
                                                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{t('invoices.createdOn')}</p>
                                                <p>{new Date(invoice.createdAt!).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {invoice.status === "paid" ? (
                                                <CheckCircle size={16} className="text-green-500"/>
                                            ) : invoice.status === "open" ? (
                                                <Clock size={16} className="text-yellow-500"/>
                                            ) : (
                                                <XCircle size={16} className="text-red-500"/>
                                            )}
                                            <div>
                                                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{t('invoices.status')}</p>
                                                <p className="capitalize text-light-text-primary dark:text-dark-text-primary">{invoice.status}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-green-500 font-semibold">
                                            <span>$ {(invoice.amountPaid / 100).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}