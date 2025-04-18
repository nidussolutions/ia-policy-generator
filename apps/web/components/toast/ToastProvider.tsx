import React, { ReactNode } from 'react';
import { ToastContextProvider } from './ToastContext';
import Toasts from './Toast';

export const ToastProvider = ({ children }: { children: ReactNode }) => (
  <ToastContextProvider>
    {children}
    <Toasts />
  </ToastContextProvider>
);
