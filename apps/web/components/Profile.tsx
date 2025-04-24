import {Loader2, Lock, Mail, User} from "lucide-react";
import React, {useState} from "react";
import {putWithAuth} from "@/lib/api";
import {motion, AnimatePresence} from "framer-motion";

type ProfileProps = {
    name: string;
    email: string;
    password: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    error: string;
    token: string;
}

export default function ({
                             name,
                             email,
                             password,
                             setName,
                             setEmail,
                             error,
                             setPassword,
                             token,
                             setError,
                             loading,
                             setLoading
                         }: ProfileProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState('');

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        if (password && (password.length < 6 || !/[^A-Za-z0-9]/.test(password))) {
            setError('A senha deve ter pelo menos 6 caracteres e um caractere especial.');
            setLoading(false);
            return;
        }

        try {
            const res = await putWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
                name,
                email,
                password: password || undefined,
            }, token);

            if (!res.id) return setError('Erro ao atualizar perfil. Tente novamente.');

            setSuccess('Informações atualizadas com sucesso!');
        } catch {
            setError('Erro ao atualizar perfil. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
        >
            <motion.form
                onSubmit={handleUpdate}
                className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.3}}
            >
                <AnimatePresence>
                    {error && (
                        <motion.p
                            className="text-red-500"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                        >
                            {error}
                        </motion.p>
                    )}
                    {success && (
                        <motion.p
                            className="text-green-600"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                        >
                            {success}
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{opacity: 0, x: -10}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 0.1}}
                >
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <User size={18}/>
                        </span>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, x: -10}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 0.2}}
                >
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail size={18}/>
                        </span>
                        <input
                            type="email"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, x: -10}}
                    animate={{opacity: 1, x: 0}}
                    transition={{delay: 0.3}}
                >
                    <label className="block text-sm font-medium mb-1">Nova Senha</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock size={18}/>
                        </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full pl-10 pr-12 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Deixe em branco para não alterar"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? 'Ocultar' : 'Ver'}
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="flex justify-end"
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.4}}
                >
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2 cursor-pointer dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
                        Salvar Alterações
                    </button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
}
