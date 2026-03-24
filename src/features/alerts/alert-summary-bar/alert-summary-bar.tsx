import { AlertTriangle } from 'lucide-react';

import { STATUS_LABELS, UI_LABELS } from '@/lib/constants';

interface AlertSummaryBarProps {
  totalCount: number;
  criticalCount: number;
  warningCount: number;
}

export const AlertSummaryBar = ({
  totalCount,
  criticalCount,
  warningCount,
}: AlertSummaryBarProps) => (
  <div className="flex items-center gap-4 rounded-xl bg-surface px-5 py-3 shadow-sm ring-1 ring-border/50">
    <AlertTriangle className="h-5 w-5 text-accent" />
    <span className="text-sm font-semibold">
      {totalCount} {UI_LABELS.ALERT_SUMMARY}
    </span>
    <div className="flex items-center gap-3 text-[12px] font-semibold">
      {criticalCount > 0 && (
        <span className="flex items-center gap-1.5 text-status-critical">
          <span className="h-2 w-2 animate-pulse rounded-full bg-status-critical" />
          {criticalCount} {STATUS_LABELS.critical}
        </span>
      )}
      {warningCount > 0 && (
        <span className="flex items-center gap-1.5 text-status-warning">
          <span className="h-2 w-2 rounded-full bg-status-warning" />
          {warningCount} {STATUS_LABELS.warning}
        </span>
      )}
    </div>
  </div>
);
