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
  <div>
    <h2 className="text-3xl font-bold tracking-tight">
      {totalCount} {UI_LABELS.ALERT_SUMMARY}
    </h2>
    <div className="mt-2 flex gap-2">
      {criticalCount > 0 && (
        <span className="rounded-md bg-status-critical px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          {criticalCount} {STATUS_LABELS.critical}
        </span>
      )}
      {warningCount > 0 && (
        <span className="rounded-md bg-status-warning px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          {warningCount} {STATUS_LABELS.warning}
          {warningCount !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  </div>
);
