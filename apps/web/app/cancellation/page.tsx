'use client';

import {useState} from 'react';
import {XCircle} from 'lucide-react';
import Link from 'next/link';

export default function CancellationPage() {
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Feedback enviado:', feedback);
        setSubmitted(true);
    };

    return (

        <main className="min-h-screen bg-[#0c0c0c] text-white flex flex-col justify-center items-center p-6">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
                <XCircle size={64} className="text-red-500 mx-auto mb-4"/>
                <h1 className="text-2xl font-semibold mb-2">Assinatura cancelada</h1>
                <p className="text-neutral-400 mb-6">
                    Sua assinatura foi cancelada com sucesso.
                </p>

                <p className="text-neutral-400 mb-6">
                    Sentiremos sua falta! Mas não se preocupe, você pode voltar a assinar a qualquer momento.
                    Seus dados e documentos estão seguros conosco.
                </p>

                {!submitted ? (
                    <>
                        <p className=" text-sm text-neutral-400">Mas aproveitando, por que você não conta para nós o
                            motivo? </p>
                        <p className="mb-4 text-sm text-neutral-400">Seu feedback nos ajuda a melhorar.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                  className="bg-[#0c0c0c] border border-neutral-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#79d3d3]"
                  rows={4}
                  placeholder="Escreva seu feedback aqui..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
              />
                            <button
                                type="submit"
                                className="bg-[#79d3d3] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#60c3c3] transition duration-200"
                            >
                                Enviar feedback
                            </button>
                        </form>
                    </>
                ) : (
                    <p className="text-green-500 font-medium">Obrigado pelo seu feedback! 💙</p>
                )}

                <div className="mt-6">
                    <Link
                        href="/dashboard"
                        className="text-sm text-neutral-400 hover:underline hover:text-white transition"
                    >
                        Voltar à página inicial
                    </Link>
                </div>
            </div>
        </main>
    );
}
