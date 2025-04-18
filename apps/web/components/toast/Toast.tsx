import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastContext } from './ToastContext';

const Toasts = () => {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      <AnimatePresence initial={false}>
        {toasts.map(({ id, message, type }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`
              max-w-xs w-full px-4 py-2 rounded shadow-lg flex items-center
              ${type === 'success' ? 'bg-green-500' : ''}
              ${type === 'error' ? 'bg-red-500' : ''}
              ${type === 'info' ? 'bg-blue-500' : ''}
              text-white
            `}
            onClick={() => removeToast(id)}
          >
            {message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toasts;
