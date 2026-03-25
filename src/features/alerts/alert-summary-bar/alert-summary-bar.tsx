'use client';

import { STATUS_LABELS, UI_LABELS } from '@/lib/constants';
import { useAlertContext } from '@/features/alerts/alert-context';

export const AlertSummaryBar = () => {
  const { activeAlertCount, activeCriticalCount, activeWarningCount } =
    useAlertContext();

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">
        {activeAlertCount} {UI_LABELS.ALERT_SUMMARY}
      </h2>
      <div className="mt-2 flex gap-2">
        {activeCriticalCount > 0 && (
          <span className="rounded-md bg-status-critical px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            {activeCriticalCount} {STATUS_LABELS.critical}
          </span>
        )}
        {activeWarningCount > 0 && (
          <span className="rounded-md bg-status-warning px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            {activeWarningCount} {STATUS_LABELS.warning}
            {activeWarningCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
};
