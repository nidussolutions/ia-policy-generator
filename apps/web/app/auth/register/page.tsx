'use client';

import {useEffect, useState} from 'react';
import {useAuth} from '@/hooks/useAuth';
import Link from 'next/link';
import {Mail, Lock, User, UserPlus, Loader2, Eye, EyeOff} from 'lucide-react';
import {cpf, cnpj} from 'cpf-cnpj-validator';
import {motion} from 'framer-motion';
import {fetcher} from '@/lib/api';


export default function RegisterPage() {
    const {register} = useAuth();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [cpfCnpjError, setCpfCnpjError] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetcher(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/validatingExpiredToken`,
                token
            )
                .then((res) => {
                    if (res.valid) {
                        window.location.href = '/dashboard';
                    }
                })
                .catch(() => {
                    localStorage.removeItem('token');
                });
        }
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const valid = validateForm();
        if (!valid) return;

        setLoading(true);
        setError('');

        try {
            const error = await register(name, email, password, cpfCnpj, redirect);
            if (error) {
                setError('Erro ao criar conta. Tente novamente.');
            }
        } catch {
            setError('Erro ao criar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('E-mail inválido');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError(
                'A senha deve ter pelo menos 6 caracteres e um caractere especial'
            );
            valid = false;
        } else {
            setPasswordError('');
        }

        const digits = cpfCnpj.replace(/\D/g, '');
        if (digits.length <= 11 && !cpf.isValid(digits)) {
            setCpfCnpjError('CPF inválido');
            valid = false;
        } else if (digits.length > 11 && !cnpj.isValid(digits)) {
            setCpfCnpjError('CNPJ inválido');
            valid = false;
        } else {
            setCpfCnpjError('');
        }

        return valid;
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        return regex.test(password);
    };

    const formatCpfCnpj = (value: string) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 11) {
            return cpf.format(digits);
        } else {
            return cnpj.format(digits);
        }
    };

    const handleCpfCnpjChange = (value: string) => {
        setCpfCnpj(formatCpfCnpj(value));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
            <motion.div
                initial={{opacity: 0, y: 24}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: 'easeOut'}}
                className="w-full max-w-md space-y-6 p-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl"
            >
                <div className="text-center">
                    <Link
                        href="/"
                        className="flex justify-center items-center gap-2 text-3xl font-extrabold text-blue-600 dark:text-blue-400"
                    >
                        <UserPlus className="w-7 h-7"/>
                        Legal Forge
                    </Link>
                    <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                        Criar uma conta
                    </h2>
                </div>

                {error && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        className="text-sm text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200 px-4 py-2 rounded"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nome
                        </label>
                        <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18}/>
              </span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                placeholder="Seu nome completo"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            E-mail
                        </label>
                        <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={18}/>
              </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                                    emailError ? 'border-red-500' : ''
                                }`}
                                placeholder="seuemail@exemplo.com"
                            />
                        </div>
                        {emailError && (
                            <p className="text-sm text-red-500 mt-1">{emailError}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            CPF ou CNPJ
                        </label>
                        <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18}/>
              </span>
                            <input
                                type="text"
                                value={cpfCnpj}
                                onChange={(e) => handleCpfCnpjChange(e.target.value)}
                                required
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                                    cpfCnpjError ? 'border-red-500' : ''
                                }`}
                                placeholder="Digite seu CPF ou CNPJ"
                            />
                        </div>
                        {cpfCnpjError && (
                            <p className="text-sm text-red-500 mt-1">{cpfCnpjError}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Senha
                        </label>
                        <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18}/>
              </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                                    passwordError ? 'border-red-500' : ''
                                }`}
                                placeholder="Crie uma senha segura"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>
                        {passwordError && (
                            <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin"/>
                                Cadastrando...
                            </>
                        ) : (
                            'Criar Conta'
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Já tem uma conta?{' '}
                    <Link
                        href="/auth/login"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                        Entrar
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
