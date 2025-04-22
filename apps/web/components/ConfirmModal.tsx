'use client';

import {motion, AnimatePresence} from 'framer-motion';
import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    message: string;
    description?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal(
    {
        isOpen,
        description,
        title = 'Confirmação',
        message,
        onConfirm,
        onCancel,
    }: ConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm w-full p-6 mx-4"
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.8, opacity: 0}}
                        transition={{type: 'spring', stiffness: 300, damping: 25}}
                    >
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                            {title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{message}</p>
                        {description && (
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {description}
                            </p>
                        )}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 rounded bg-green-200 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-600 transition cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition cursor-pointer"
                            >
                                Confirmar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
