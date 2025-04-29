'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useTheme } from './ThemeContext';

interface ConfirmModalProps {
    isOpen: boolean;
    type: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const titleLabel: Record<string, string> = {
    cancelSubscription: 'Cancel Subscription',
    resumeSubscription: 'Resume Subscription',
    deleteSite: 'Delete Site',
    deleteDoc: 'Delete Document',
};

const messageLabel: Record<string, string> = {
    cancelSubscription: 'Are you sure you want to cancel your subscription?',
    resumeSubscription: 'Glad to have you back!',
    deleteSite: 'Are you sure you want to delete this site?',
    deleteDoc: 'Are you sure you want to delete this document?',
};

const descLabel: Record<string, string> = {
    cancelSubscription: 'You will still be able to use Pro features until the end of your subscription.',
    resumeSubscription: 'Just confirming. You will not be charged again.',
    deleteSite: 'This action cannot be undone.',
    deleteDoc: 'This action cannot be undone.',
};

export default function ConfirmModal({
                                         isOpen,
                                         type,
                                         onConfirm,
                                         onCancel,
                                     }: ConfirmModalProps) {
    const { theme } = useTheme();
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-light-card dark:bg-dark-card backdrop-blur-md border border-light-border dark:border-dark-border rounded-2xl shadow-lg p-6 max-w-sm w-full mx-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                            {titleLabel[type]}
                        </h2>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-2">{messageLabel[type]}</p>
                        {descLabel[type] && (
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">{descLabel[type]}</p>
                        )}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 rounded-xl bg-light-accent-purple dark:bg-dark-accent-purple hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue text-light-background dark:text-dark-background transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className={`px-4 py-2 rounded-xl transition ${
                  type.includes('delete')
                    ? 'bg-red-600 hover:bg-red-700 text-light-background dark:text-dark-background'
                    : 'bg-green-500 hover:bg-green-600 text-light-background dark:text-dark-background'
                }`}
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
