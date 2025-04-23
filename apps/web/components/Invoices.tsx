import {ArrowLeft, ArrowRight} from "lucide-react";
import React from "react";
import {InvoicesType} from "@/lib/api";

type InvoiceProps = {
    invoices: InvoicesType[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    hasMore: boolean;
    setInvoices: React.Dispatch<React.SetStateAction<InvoicesType[]>>;
}


export default function Invoices({invoices, setPage, page, hasMore, setInvoices}: InvoiceProps) {
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4">
            <h2 className="text-lg font-semibold">Faturamento</h2>
            {invoices.length > 0 ? (
                <>
                    <div className="space-y-4">
                        {invoices.map((invoice) => (
                            <div key={invoice.id} className="border border-gray-700 rounded-2xl p-4 shadow-sm">
                                <div className="flex justify-center gap-2 items-center mb-4 ">
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
                                                    className={`inline-block px-2 py-1 rounded-sm text-xs font-semibold ${
                                                        invoice.status === "paid"
                                                            ? "bg-green-600"
                                                            : invoice.status === "open"
                                                                ? "bg-yellow-600"
                                                                : "bg-red-600"
                                                    } text-white`}>
                                                        <strong>Status:</strong> {invoice.status}
                                                </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs text-gray-500">Valor</p>
                                        <p className="font-semibold text-white">R$ {(invoice.amountPaid / 100).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between pt-4">
                        <button
                            onClick={() => {
                                setPage((prev) => Math.max(prev - 1, 1));
                                setInvoices([]);
                            }}
                            disabled={page === 1}
                            className="flex items-center gap-2 text-blue-500 hover:underline disabled:text-gray-500"
                        >
                            <ArrowLeft size={16}/> Anterior
                        </button>
                        <button
                            onClick={() => {
                                setPage((prev) => prev + 1);
                                setInvoices([]);
                            }}
                            disabled={!hasMore}
                            className="flex items-center gap-2 text-blue-500 hover:underline disabled:text-gray-500"
                        >
                            Próximo <ArrowRight size={16}/>
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-400 text-sm">Nenhuma fatura encontrada.</p>
            )}
        </div>
    )
}