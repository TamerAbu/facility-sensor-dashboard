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
  const warningCount = alerts.length - criticalCount;

  return (
    <div>
      <AlertSummaryBar
        totalCount={alerts.length}
        criticalCount={criticalCount}
        warningCount={warningCount}
      />
      <AlertListWithFilter alerts={alerts} />
    </div>
  );
};
