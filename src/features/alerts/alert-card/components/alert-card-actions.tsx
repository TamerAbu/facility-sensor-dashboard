'use client';

import { UI_LABELS } from '@/lib/constants';

export const AlertCardActions = () => (
  <div className="mt-5 flex justify-end gap-3">
    <button
      type="button"
      className="rounded-lg bg-foreground px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-80"
    >
      {UI_LABELS.EXECUTE}
    </button>
    <button
      type="button"
      className="rounded-lg border border-border bg-surface px-5 py-2 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-surface-secondary"
    >
      {UI_LABELS.DISMISS}
    </button>
  </div>
);
