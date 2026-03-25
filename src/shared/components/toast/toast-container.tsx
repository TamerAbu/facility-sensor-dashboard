'use client';

import type { ToastItem } from '@/features/alerts/alert-context';

import { Toast } from './toast';

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemoveToast: (id: string) => void;
  onUndo: (alertId: string) => void;
}

export const ToastContainer = ({
  toasts,
  onRemoveToast,
  onUndo,
}: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          undoAlertId={toast.undoAlertId}
          onDismiss={() => onRemoveToast(toast.id)}
          onUndo={onUndo}
        />
      ))}
    </div>
  );
};
