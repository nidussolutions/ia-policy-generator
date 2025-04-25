'use client';

import {useState} from 'react';

type Props = {
    publicId: string;
};

export default function EmbedGenerator({publicId}: Props) {
    const [height, setHeight] = useState('400');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [copied, setCopied] = useState(false);

    const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_APP_URL}/embed/${publicId}?theme=${theme}" style="border:none;width:100%;height:${height}px;" loading="lazy" title="Legal Document by Legal Forge"></iframe>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode).finally();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-6 bg-[#1E0359]/30 p-6 rounded-xl backdrop-blur-md border border-[#8C0368]/30">
            <h3 className="text-lg font-bold mb-4 text-white">Embed Code</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-white block mb-1">Altura (px)</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full p-2 rounded-md bg-[#0c0c0c] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8C0368]"
                    />
                </div>

                <div>
                    <label className="text-white block mb-1">Tema</label>
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                        className="w-full p-2 rounded-md bg-[#0c0c0c] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8C0368]"
                    >
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                    </select>
                </div>
            </div>

            <label className="text-white block mb-1">Código Embed:</label>
            <textarea
                readOnly
                value={embedCode}
                className="w-full h-32 p-3 text-sm font-mono rounded-md bg-white text-black border border-gray-300 focus:outline-none"
            />

            <button
                onClick={handleCopy}
                className="mt-4 w-full py-2 rounded-md bg-[#8C0368] hover:bg-[#A429A6] text-white font-semibold transition"
            >
                {copied ? 'Copiado!' : 'Copiar Embed'}
            </button>
        </div>
    );
}
