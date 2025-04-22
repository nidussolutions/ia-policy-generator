'use client';

import {useParams, useRouter} from 'next/navigation';
import useSWR from 'swr';
import {fetcher, SiteType} from '@/lib/api';
import React, {useEffect, useState} from 'react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import {ArrowLeft} from "lucide-react";

export default function EditSitePage() {
    const {siteId} = useParams() as { siteId: string };
    const [site, setSite] = useState<SiteType | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

    const {data, error: errorSWR, isLoading, mutate} = useSWR(
        siteId ? `${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}` : null,
        (url) => fetcher(url, token)
    );

    useEffect(() => {
        if (data) {
            setSite(data[0]);
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(site),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.error}`);
                return
            }
            await mutate();
            setSuccess('Site atualizado com sucesso!');
        } catch (err) {
            setError('Erro ao atualizar o site. Tente novamente mais tarde.');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <Loading page="a listagem de sites"/>;
    if (errorSWR) return <Error page="a listagem de sites" err={error}/>;
    if (!site) return <Error page="o site solicitado" err="Site not found"/>;

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center text-white">
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <button
                        onClick={() => window.history.back()}
                        className="hover:text-blue-600 transition-colors duration-200"
                    >
                        <ArrowLeft className="cursor-pointer" size={20}/>
                    </button>
                    <h1 className="text-2xl font-semibold">Editar site</h1>
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}

                <form onSubmit={handleSubmit} className="w-full max-w-md  p-6 rounded-2xl shadow-lg">
                    <label className="block mb-4">
                        <span className="text-neutral-300">Nome do site</span>
                        <input
                            type="text"
                            value={site.name}
                            onChange={(e) => setSite({...site, name: e.target.value})}
                            className="w-full mt-1 px-4 py-2 rounded-xl text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </label>

                    <label className="block mb-6">
                        <span className="text-neutral-300">Domínio</span>
                        <input
                            type="text"
                            value={site.domain}
                            onChange={(e) => setSite({...site, domain: e.target.value})}
                            className="w-full mt-1 px-4 py-2 rounded-xl text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </label>

                    <label className="block mb-6">
                        <span className="text-neutral-300">Idioma</span>
                        <input
                            type="text"
                            value={site.language}
                            onChange={(e) => setSite({...site, language: e.target.value})}
                            className="w-full mt-1 px-4 py-2 rounded-xl text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </label>

                    <label className="block mb-6">
                        <span className="text-neutral-300">Legislação</span>
                        <input
                            type="text"
                            value={site.legislation}
                            onChange={(e) => setSite({...site, legislation: e.target.value})}
                            className="w-full mt-1 px-4 py-2 rounded-xl text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </label>

                    <label className="block mb-6">
                        <span className="text-neutral-300">Observações</span>
                        <textarea
                            value={site.observations || ''}
                            onChange={(e) => setSite({...site, observations: e.target.value})}
                            className="w-full mt-1 px-4 py-2 rounded-xl text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            rows={4}
                            placeholder="Escreva suas observações aqui..."
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full py-2 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition cursor-pointer"
                    >
                        {isSaving ? 'Salvando...' : 'Salvar alterações'}
                    </button>
                </form>
            </div>
        </Layout>
    );
}
