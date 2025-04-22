'use client';

import {useParams} from 'next/navigation';
import {CheckCircle, XCircle, Hourglass} from 'lucide-react';
import Link from "next/link";
import Layout from "@/components/Layout";
import Header from "@/components/Header";

export default function PaymentConfirmationPage() {
    const {status} = useParams() as { status: string };


    const renderStatus = () => {
        switch (status) {
            case 'approved':
                return (
                    <div className="text-center text-green-500">
                        <CheckCircle size={64} className="mx-auto mb-4"/>
                        <h2 className="text-2xl font-semibold mb-2">Pagamento Confirmado</h2>
                        <p>Sua assinatura está ativa! É um prezer ter você conosco!</p>
                    </div>

                );
            case 'pending':
                return (
                    <div className="text-center text-yellow-500">
                        <Hourglass size={64} className="mx-auto mb-4 animate-pulse"/>
                        <h2 className="text-2xl font-semibold mb-2">Pagamento pendente</h2>
                        <p>Estamos aguardando a confirmação do pagamento. Verifique novamente mais tarde.</p>
                    </div>
                );
            case 'rejected':
                return (
                    <div className="text-center text-red-500">
                        <XCircle size={64} className="mx-auto mb-4"/>
                        <h2 className="text-2xl font-semibold mb-2">Pagamento rejeitado</h2>
                        <p> Seu pagamento foi rejeitado. Verifique os dados do cartão e tente novamente. </p>
                    </div>
                )
            case 'failure':
                return (
                    <div className="text-center text-red-500">
                        <XCircle size={64} className="mx-auto mb-4"/>
                        <h2 className="text-2xl font-semibold mb-2">Falha no pagamento</h2>
                        <p>
                            Sentimos muito, mas seu pagamento não foi aprovado. Você pode tentar novamente! Se precisar
                            de ajuda, entre em contato com nosso suporte.
                        </p>
                    </div>
                );
            case 'cancelled':
                return (
                    <div className="text-center text-red-500">
                        <XCircle size={64} className="mx-auto mb-4"/>
                        <h2 className="text-2xl font-semibold mb-2">Pagamento Cancelado</h2>
                        <p> Seu pagamento foi cancelado. Se você não fez isso, entre em contato com nosso suporte </p>
                    </div>
                )
                    ;
            default:
                return (
                    <div className="text-center text-neutral-400">
                        <h2 className="text-2xl font-semibold mb-2">Processando...</h2>
                        <p>Estamos processando seu pagamento. Isso pode levar alguns minutos.</p>
                    </div>
                );
        }
    };

    return (
        <main className="text-white min-h-screen  flex flex-col justify-center items-center p-6">
            <div className="p-8 rounded-2xl shadow-xl max-w-lg w-full text-center bg-gray-800 dark:bg-gray-900">
                {renderStatus()}
                <div className="mt-6">
                    <Link href="/dashboard"
                          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                        Voltar para o Dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}
