"use client";

import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import React, { useState, useEffect } from "react";
import { fetcher, InvoicesType } from "@/lib/api";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";

export default function Invoices() {
    const [page, setPage] = useState(1);
    const [loadingPageChange, setLoadingPageChange] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const { data, error, isLoading, mutate, isValidating } = useSWR(
        token ? `${process.env.NEXT_PUBLIC_API_URL}/user/invoices?page=${page}&limit=3` : null,
        (url: string) => fetcher(url, token!)
    );

    const invoices = data?.invoices as InvoicesType[] ?? [];
    const totalPages = data?.pagination?.totalPages ?? 1;
    const hasMore = page < totalPages;

    const handleUpdate = async () => {
        setLoadingUpdate(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plans/update-entire-profile`, {
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Faturamento</h2>
                <button
                    onClick={handleUpdate}
                    className="flex items-center gap-2 text-sm text-blue-500 hover:underline disabled:opacity-50"
                    disabled={loadingUpdate}
                >
                    {loadingUpdate ? (
                        <>
                            <RefreshCw className="animate-spin" size={16} /> Atualizando...
                        </>
                    ) : (
                        <>
                            <RefreshCw size={16} /> Atualizar
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
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="border border-gray-700 rounded-2xl p-4 shadow-sm"
                                >
                                    <div className="flex justify-center gap-2 items-center mb-4">
                                        <p className="text-xs text-gray-500">ID da Fatura</p>
                                        <p className="text-xs">{invoice.id}</p>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-gray-300">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xs text-gray-500">Criado dia</p>
                                            <p className="font-medium">{new Date(invoice.createdAt!).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span
                                                className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                                    invoice.status === "paid"
                                                        ? "bg-green-600"
                                                        : invoice.status === "open"
                                                            ? "bg-yellow-600"
                                                            : "bg-red-600"
                                                } text-white`}
                                            >
                                                Status: {invoice.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xs text-gray-500">Valor</p>
                                            <p className="font-semibold text-white">R$ {(invoice.amountPaid / 100).toFixed(2)}</p>
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
                            <ArrowLeft size={16} /> Anterior
                        </button>
                        <span className="text-xs text-gray-500">
                            Página {page} de {totalPages}
                        </span>
                        <button
                            onClick={() => changePage(page + 1)}
                            disabled={!hasMore || isValidating}
                            className="flex items-center gap-2 text-blue-500 hover:underline disabled:text-gray-500"
                        >
                            Próximo <ArrowRight size={16} />
                        </button>
                    </div>
                </>
            ) : (
                !isLoading && <p className="text-gray-400 text-sm">Nenhuma fatura encontrada.</p>
            )}
        </motion.div>
    );
}
