"use client";

import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    CheckCircle,
    Clock,
    XCircle,
    Receipt,
    RefreshCw,
    Link as LinkIcon,
} from "lucide-react";
import React, {useState, useEffect} from "react";
import {fetcher, InvoicesType} from "@/lib/api";
import useSWR from "swr";
import {motion, AnimatePresence} from "framer-motion";

export default function Invoices() {
    const [page, setPage] = useState(1);
    const [loadingPageChange, setLoadingPageChange] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const {data, error, isLoading, mutate, isValidating} = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/user/invoices?page=${page}&limit=3` : null,
        (url: string) => fetcher(url, token!)
    );

    const invoices = data?.invoices as InvoicesType[] ?? [];
    const totalPages = data?.pagination?.totalPages ?? 1;
    const hasMore = page < totalPages;

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

    const changePage = (newPage: number) => {
        setLoadingPageChange(true);
        setPage(newPage);
    };

    useEffect(() => {
        mutate().finally(() => setLoadingPageChange(false));
    }, [page, mutate]);

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Faturas</h2>
                <button
                    onClick={handleUpdate}
                    className="flex items-center gap-2 text-sm text-blue-500 hover:underline disabled:opacity-50"
                    disabled={loadingUpdate}
                >
                    {loadingUpdate ? (
                        <>
                            <RefreshCw className="animate-spin" size={16}/> Atualizando...
                        </>
                    ) : (
                        <>
                            <RefreshCw size={16}/> Atualizar
                        </>
                    )}
                </button>
            </div>

            {error && <p className="text-red-500">Erro ao carregar faturas.</p>}
            {(isLoading || loadingPageChange) && <p className="text-gray-400 text-sm">Carregando faturas...</p>}

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
                                    className="border border-gray-700 rounded-2xl p-5 space-y-4 shadow-sm bg-gray-950 "
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Receipt size={16}/>
                                            <span className="text-gray-500">ID da Fatura:</span>
                                            <span>{invoice.id}</span>
                                        </div>
                                        {invoice.invoiceUrl && (
                                            <div>
                                                <a
                                                    href={invoice.invoiceUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline"
                                                >
                                                    <LinkIcon size={16}/>
                                                    Acessar Fatura
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-400 justify-around">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={16} className="text-gray-400"/>
                                            <div>
                                                <p className="text-xs text-gray-500">Criada em</p>
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
                                                <p className="text-xs text-gray-500">Status</p>
                                                <p className="capitalize">{invoice.status}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span
                                                className="text-green-500 font-bold">R$ {(invoice.amountPaid / 100).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <button
                            onClick={() => changePage(Math.max(page - 1, 1))}
                            disabled={page === 1 || isValidating}
                            className="flex items-center gap-2 text-blue-500 hover:underline disabled:text-gray-500"
                        >
                            <ArrowLeft size={16}/> Anterior
                        </button>
                        <span className="text-xs text-gray-500">
                          Página {page} de {totalPages}
                        </span>
                        <button
                            onClick={() => changePage(page + 1)}
                            disabled={!hasMore || isValidating}
                            className="flex items-center gap-2 text-blue-500 hover:underline disabled:text-gray-500"
                        >
                            Próxima <ArrowRight size={16}/>
                        </button>
                    </div>
                </>
            ) : (
                !isLoading && <p className="text-gray-400 text-sm">Nenhuma fatura encontrada.</p>
            )}
        </motion.div>
    );
}
