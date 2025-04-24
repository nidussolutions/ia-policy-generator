'use client';

import {motion, AnimatePresence} from 'framer-motion';
import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    type: string;
    description?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const titleLabel: Record<string, string> = {
    cancelSubscription: 'Cancel Subscription',
    resumeSubscription: 'Resume Subscription',
    deleteSite: 'Delete Site',
    deleteDoc: 'Delete Document',
}

const messageLabel: Record<string, string> = {
    cancelSubscription: 'Are you sure you want to cancel your subscription?',
    resumeSubscription: 'Glad to have you back!',
    deleteSite: 'Are you sure you want to delete this site?',
    deleteDoc: 'Are you sure you want to delete this document?',
}

const descLabel: Record<string, string> = {
    cancelSubscription: 'You will still be able to use Pro features until the end of your subscription.',
    resumeSubscription: 'Just confirming. You will not be charged again.',
    deleteSite: 'This action cannot be undone.',
    deleteDoc: 'This action cannot be undone.',
}

const buttonConfirmBg: Record<string, string> = {
    resumeSubscription: "px-4 py-2 rounded bg-green-200 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-600 transition cursor-pointer",
    cancelSubscription: "px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer",
    deleteSite: "px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition cursor-pointer",
    deleteDoc: "px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition cursor-pointer",
}

const buttonCancelBg: Record<string, string> = {
    cancelSubscription: "px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition dark:bg-red-700 dark:hover:bg-red-800 cursor-pointer",
    resumeSubscription: "px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition cursor-pointer",
    deleteSite: "px-4 py-2 rounded bg-green-200 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-600 transition cursor-pointer",
    deleteDoc: "px-4 py-2 rounded bg-green-200 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-600 transition cursor-pointer",
}

export default function ConfirmModal(
    {
        isOpen,
        type,
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
                            {titleLabel[type]}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{messageLabel[type]}</p>
                        {descLabel[type] && (
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {descLabel[type]}
                            </p>
                        )}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={onCancel}
                                className={buttonCancelBg[type]}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className={buttonConfirmBg[type]}
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
