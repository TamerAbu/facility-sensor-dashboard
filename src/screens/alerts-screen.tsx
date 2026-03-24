import { UI_LABELS } from '@/lib/constants';
import { SITE } from '@/lib/mock-data';
import { generateAlerts, processSiteData } from '@/lib/risk-engine';
import { AlertSummaryBar } from '@/features/alerts/alert-summary-bar';
import { AlertListWithFilter } from '@/features/alerts/alert-list-with-filter';

export const AlertsScreen = () => {
  const processedPiles = processSiteData(SITE.piles);
  const alerts = generateAlerts(processedPiles);

  const criticalCount = alerts.filter(
    (alert) => alert.severity === 'critical',
  ).length;
  const warningCount = alerts.filter(
    (alert) => alert.severity === 'warning',
  ).length;

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {UI_LABELS.ALERTS_PAGE_TITLE}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {UI_LABELS.ALERTS_PAGE_SUBTITLE}
          </p>
        </div>
        <AlertSummaryBar
          totalCount={alerts.length}
          criticalCount={criticalCount}
          warningCount={warningCount}
        />
      </div>

      <AlertListWithFilter alerts={alerts} />
    </div>
  );
};
