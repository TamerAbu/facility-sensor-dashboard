'use client';

import { createContext, useContext } from 'react';

import type { Alert, AlertStatus } from '@/lib/types';

// In production, alert state would be persisted via API
export interface AlertState {
  status: AlertStatus;
  handledAt?: string;
}

export interface ToastItem {
  id: string;
  message: string;
  undoAlertId?: string;
}

export interface AlertContextValue {
  alerts: Alert[];
  alertStates: Map<string, AlertState>;
  toasts: ToastItem[];
  activeAlertCount: number;
  activeCriticalCount: number;
  activeWarningCount: number;
  handleAlert: (id: string, message: string) => void;
  dismissAlert: (id: string) => void;
  undoDismiss: (id: string) => void;
  removeToast: (id: string) => void;
}

export const AlertContext = createContext<AlertContextValue | null>(null);

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within AlertProvider');
  }
  return context;
};
