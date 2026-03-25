'use client';

import { UI_LABELS } from '@/lib/constants';
import type { AlertStatus } from '@/lib/types';

interface AlertCardActionsProps {
  primaryLabel: string;
  status: AlertStatus;
  onPrimaryAction: () => void;
  onDismiss: () => void;
}

export const AlertCardActions = ({
  primaryLabel,
  status,
  onPrimaryAction,
  onDismiss,
}: AlertCardActionsProps) => {
  const isHandled = status === 'handled';

  return (
    <div className="mt-5 flex justify-end gap-3">
      <button
        type="button"
        disabled={isHandled}
        onClick={onPrimaryAction}
        className={`rounded-md px-5 py-2 text-xs font-bold uppercase tracking-wider transition-opacity ${
          isHandled
            ? 'cursor-not-allowed bg-status-faulty text-white opacity-50'
            : 'bg-foreground text-white hover:opacity-80'
        }`}
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        disabled={isHandled}
        onClick={onDismiss}
        className={`rounded-md border border-border px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
          isHandled
            ? 'cursor-not-allowed bg-surface-secondary text-text-secondary opacity-50'
            : 'bg-surface text-foreground hover:bg-surface-secondary'
        }`}
      >
        {UI_LABELS.DISMISS}
      </button>
    </div>
  );
};
