'use client';

import { useEffect } from 'react';

import { UI_LABELS } from '@/lib/constants';

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({ onConfirm, onCancel }: ConfirmDialogProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  return (
    <div
      className="confirm-overlay fixed inset-0 z-50 flex items-center justify-center"
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="w-full max-w-sm rounded-xl bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <h3 id="confirm-title" className="text-lg font-bold">
          {UI_LABELS.DISMISS_CONFIRM_TITLE}
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          {UI_LABELS.DISMISS_CONFIRM_MESSAGE}
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border bg-surface px-5 py-2 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-surface-secondary"
          >
            {UI_LABELS.DISMISS_CONFIRM_CANCEL}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-status-critical px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-80"
          >
            {UI_LABELS.DISMISS}
          </button>
        </div>
      </div>
    </div>
  );
};
