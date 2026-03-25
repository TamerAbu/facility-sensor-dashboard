'use client';

import { useEffect } from 'react';

import { CheckCircle2 } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';

const AUTO_DISMISS_MS = 5000;

interface ToastProps {
  message: string;
  undoAlertId?: string;
  onDismiss: () => void;
  onUndo?: (alertId: string) => void;
}

export const Toast = ({
  message,
  undoAlertId,
  onDismiss,
  onUndo,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="animate-slide-up flex items-center gap-3 rounded-lg bg-foreground px-5 py-3 text-sm text-white shadow-lg">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-status-ok" />
      <span className="flex-1">{message}</span>
      {undoAlertId && onUndo && (
        <button
          type="button"
          onClick={() => onUndo(undoAlertId)}
          className="font-bold uppercase tracking-wider text-status-warning transition-opacity hover:opacity-80"
        >
          {UI_LABELS.UNDO}
        </button>
      )}
    </div>
  );
};
