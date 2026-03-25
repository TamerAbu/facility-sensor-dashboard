import { ArrowUpDown } from 'lucide-react';

import { ALERT_SORT_OPTIONS, UI_LABELS } from '@/lib/constants';
import type { AlertSortOption } from '@/lib/types';

interface AlertSortButtonProps {
  activeSort: AlertSortOption;
  onSortChange: (value: AlertSortOption) => void;
}

export const AlertSortButton = ({
  activeSort,
  onSortChange,
}: AlertSortButtonProps) => (
  <div className="flex items-center gap-2">
    <ArrowUpDown className="h-4 w-4 text-text-secondary" />
    <label htmlFor="alert-sort" className="text-sm text-text-secondary">
      {UI_LABELS.SORT_LABEL_PREFIX}
    </label>
    <select
      id="alert-sort"
      value={activeSort}
      onChange={(e) => onSortChange(e.target.value as AlertSortOption)}
      className="rounded-lg bg-surface-secondary px-3 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-border"
    >
      {ALERT_SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
