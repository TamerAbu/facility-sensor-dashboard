'use client';

import { useState } from 'react';

import { CheckCircle2 } from 'lucide-react';

import {
  ALERT_TYPE_SORT_ORDER,
  SEVERITY_SORT_ORDER,
  UI_LABELS,
} from '@/lib/constants';
import type { Alert, AlertSortOption } from '@/lib/types';
import { useAlertContext } from '@/features/alerts/alert-context';
import { AlertCard } from '@/features/alerts/alert-card';
import { ToastContainer } from '@/shared/components/toast';

import {
  AlertFilterBar,
  type SeverityFilter,
  type TypeFilter,
} from './components/alert-filter-bar';

interface AlertListWithFilterProps {
  alerts: Alert[];
}

const sortAlerts = (alerts: Alert[], sortBy: AlertSortOption): Alert[] => {
  return [...alerts].sort((a, b) => {
    if (sortBy === 'severity') {
      return SEVERITY_SORT_ORDER[a.severity] - SEVERITY_SORT_ORDER[b.severity];
    }
    if (sortBy === 'pile') {
      return a.pileName.localeCompare(b.pileName);
    }
    return (
      ALERT_TYPE_SORT_ORDER[a.alertType] - ALERT_TYPE_SORT_ORDER[b.alertType]
    );
  });
};

export const AlertListWithFilter = ({ alerts }: AlertListWithFilterProps) => {
  const { alertStates, toasts, removeToast, undoDismiss } = useAlertContext();
  const [activeSeverity, setActiveSeverity] = useState<SeverityFilter>('all');
  const [activeType, setActiveType] = useState<TypeFilter>('all');
  const [activeSort, setActiveSort] = useState<AlertSortOption>('severity');

  const visibleAlerts = alerts.filter((alert) => {
    const state = alertStates.get(alert.id);
    return !state || state.status !== 'dismissed';
  });

  const filteredAlerts = visibleAlerts.filter((alert) => {
    const matchesSeverity =
      activeSeverity === 'all' || alert.severity === activeSeverity;
    const matchesType = activeType === 'all' || alert.alertType === activeType;
    return matchesSeverity && matchesType;
  });

  const sortedAlerts = sortAlerts(filteredAlerts, activeSort);

  if (visibleAlerts.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center gap-3 py-16">
        <CheckCircle2 className="h-10 w-10 text-status-ok" />
        <p className="text-sm font-medium text-text-secondary">
          {UI_LABELS.NO_ALERTS}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <AlertFilterBar
        activeSeverity={activeSeverity}
        activeType={activeType}
        activeSort={activeSort}
        onSeverityChange={setActiveSeverity}
        onTypeChange={setActiveType}
        onSortChange={setActiveSort}
      />

      <div className="mt-6 space-y-5">
        {sortedAlerts.length > 0 ? (
          sortedAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-text-secondary">
            {UI_LABELS.NO_MATCHING_ALERTS}
          </p>
        )}
      </div>

      <ToastContainer
        toasts={toasts}
        onRemoveToast={removeToast}
        onUndo={undoDismiss}
      />
    </div>
  );
};
