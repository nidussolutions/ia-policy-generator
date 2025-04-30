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

export default function Invoices() {
    const [page, setPage] = useState(1);
    const [loadingPageChange, setLoadingPageChange] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const {t} = useI18n();

    const {data, error, isLoading, mutate} = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/user/invoices?page=${page}&limit=3` : null,
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
            mutate();
        } finally {
            setLoadingUpdate(false);
        }
    };

    useEffect(() => {
        mutate().finally(() => setLoadingPageChange(false));
    }, [page, mutate]);

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            className="bg-light-card/90 dark:bg-dark-card/90 backdrop-blur-lg border border-light-border dark:border-dark-border p-6 rounded-2xl shadow-2xl space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">{t('invoices.title')}</h2>
                <button
                    onClick={handleUpdate}
                    className="flex items-center gap-2 text-sm text-light-accent-purple dark:text-dark-accent-purple hover:underline disabled:opacity-50"
                    disabled={loadingUpdate}
                    aria-label={t('invoices.updateAriaLabel')}
                >
                    {loadingUpdate ? (
                        <><RefreshCw className="animate-spin" size={16}/> {t('invoices.updating')}</>
                    ) : (
                        <><RefreshCw size={16}/> {t('invoices.update')}</>
                    )}
                </button>
            </div>

            {error && <p className="text-red-500 text-sm">{t('invoices.errorLoading')}</p>}
            {(isLoading || loadingPageChange) &&
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">{t('invoices.loading')}</p>}

            {!isLoading && invoices.length > 0 ? (
                <>
                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {invoices.map((invoice) => (
                                <motion.div
                                    key={invoice.id}
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    transition={{duration: 0.3}}
                                    className="border border-light-border dark:border-dark-border rounded-2xl p-5 space-y-4 shadow-lg bg-light-background/50 dark:bg-dark-background/50"
                                >
                                    <div className="flex justify-between items-center">
                                        <div
                                            className="flex items-center gap-2 text-sm text-light-text-primary dark:text-dark-text-primary">
                                            <Receipt size={16}/>
                                            <span
                                                className="text-light-text-secondary dark:text-dark-text-secondary">{t('invoices.invoiceId')}</span>
                                            <span>{invoice.id}</span>
                                        </div>
                                        {invoice.invoiceUrl && (
                                            <a
                                                href={invoice.invoiceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-sm text-light-accent-purple dark:text-dark-accent-purple hover:underline"
                                                aria-label={t('invoices.accessInvoiceAriaLabel')}
                                            >
                                                <LinkIcon size={16}/> {t('invoices.accessInvoice')}
                                            </a>
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
                    </div>
                </>
            ) : (
                !isLoading &&
                <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">{t('invoices.noInvoices')}</p>
            )}
        </motion.div>
    );
}
