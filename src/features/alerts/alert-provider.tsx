'use client';

import { useCallback, useMemo, useState, type ReactNode } from 'react';

import type { Alert } from '@/lib/types';

import {
  AlertContext,
  type AlertContextValue,
  type AlertState,
  type ToastItem,
} from './alert-context';

interface AlertProviderProps {
  alerts: Alert[];
  children: ReactNode;
}

export const AlertProvider = ({ alerts, children }: AlertProviderProps) => {
  const [alertStates, setAlertStates] = useState<Map<string, AlertState>>(
    () => new Map(),
  );
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const handleAlert = useCallback((id: string, message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setAlertStates((prev) => {
      const next = new Map(prev);
      next.set(id, { status: 'handled', handledAt: timestamp });
      return next;
    });
    const toastId = `handle-${id}-${Date.now()}`;
    setToasts((prev) => [...prev, { id: toastId, message }]);
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlertStates((prev) => {
      const next = new Map(prev);
      next.set(id, { status: 'dismissed' });
      return next;
    });
    const toastId = `dismiss-${id}-${Date.now()}`;
    setToasts((prev) => [
      ...prev,
      { id: toastId, message: 'Alert dismissed.', undoAlertId: id },
    ]);
  }, []);

  const undoDismiss = useCallback((id: string) => {
    setAlertStates((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    setToasts((prev) => prev.filter((t) => t.undoAlertId !== id));
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const counts = useMemo(() => {
    let active = 0;
    let critical = 0;
    let warning = 0;
    for (const alert of alerts) {
      const state = alertStates.get(alert.id);
      if (!state || state.status === 'active') {
        active++;
        if (alert.severity === 'critical') critical++;
        else warning++;
      }
    }
    return { active, critical, warning };
  }, [alerts, alertStates]);

  const value: AlertContextValue = useMemo(
    () => ({
      alerts,
      alertStates,
      toasts,
      activeAlertCount: counts.active,
      activeCriticalCount: counts.critical,
      activeWarningCount: counts.warning,
      handleAlert,
      dismissAlert,
      undoDismiss,
      removeToast,
    }),
    [
      alerts,
      alertStates,
      toasts,
      counts,
      handleAlert,
      dismissAlert,
      undoDismiss,
      removeToast,
    ],
  );

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
