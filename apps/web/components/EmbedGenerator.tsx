'use client';

import {useState} from 'react';
import {useTheme} from './ThemeContext';

type Props = {
    publicId: string;
};

export default function EmbedGenerator({publicId}: Props) {
    const [height, setHeight] = useState('400');
    const [embedTheme, setEmbedTheme] = useState<'light' | 'dark'>('light');
    const [copied, setCopied] = useState(false);
    const { theme } = useTheme();

    const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_APP_URL}/embed/${publicId}?theme=${embedTheme}" style="border:none;width:100%;height:${height}px;" loading="lazy" title="Legal Document by Legal Forge"></iframe>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(embedCode).finally();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-6 bg-light-card dark:bg-dark-card p-6 rounded-xl backdrop-blur-md border border-light-border dark:border-dark-border">
            <h3 className="text-lg font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">Embed Code</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-light-text-primary dark:text-dark-text-primary block mb-1">Altura (px)</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full p-2 rounded-md bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                    />
                </div>

                <div>
                    <label className="text-light-text-primary dark:text-dark-text-primary block mb-1">Tema</label>
                    <select
                        value={embedTheme}
                        onChange={(e) => setEmbedTheme(e.target.value as 'light' | 'dark')}
                        className="w-full p-2 rounded-md bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-accent-purple dark:focus:ring-dark-accent-purple"
                    >
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                    </select>
                </div>
            </div>

            <label className="text-light-text-primary dark:text-dark-text-primary block mb-1">Código Embed:</label>
            <textarea
                readOnly
                value={embedCode}
                className="w-full h-32 p-3 text-sm font-mono rounded-md bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border focus:outline-none"
            />

            <button
                onClick={handleCopy}
                className="mt-4 w-full py-2 rounded-md bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-light-background dark:text-dark-background font-semibold transition"
            >
                {copied ? 'Copiado!' : 'Copiar Embed'}
            </button>
        </div>
    );
}
