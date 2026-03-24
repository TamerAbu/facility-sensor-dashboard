'use client';

import { useState } from 'react';

import { CheckCircle2 } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';
import type { Alert, AlertSeverity } from '@/lib/types';
import { AlertCard } from '@/features/alerts/alert-card';

type FilterOption = 'all' | AlertSeverity;

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: 'all', label: UI_LABELS.ALERT_FILTER_ALL },
  { value: 'critical', label: UI_LABELS.ALERT_FILTER_CRITICAL },
  { value: 'warning', label: UI_LABELS.ALERT_FILTER_WARNING },
];

interface AlertListWithFilterProps {
  alerts: Alert[];
}

export const AlertListWithFilter = ({ alerts }: AlertListWithFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const criticalCount = alerts.filter(
    (alert) => alert.severity === 'critical',
  ).length;
  const warningCount = alerts.length - criticalCount;

  const countMap: Record<FilterOption, number> = {
    all: alerts.length,
    critical: criticalCount,
    warning: warningCount,
  };

  const filteredAlerts =
    activeFilter === 'all'
      ? alerts
      : alerts.filter((alert) => alert.severity === activeFilter);

  if (alerts.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center gap-3 py-16 text-text-secondary">
        <CheckCircle2 className="h-10 w-10 text-status-ok" />
        <p className="text-sm font-medium">{UI_LABELS.NO_ALERTS}</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setActiveFilter(option.value)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeFilter === option.value
                ? 'bg-accent text-white'
                : 'bg-surface-secondary text-text-secondary hover:bg-border'
            }`}
          >
            {option.label} ({countMap[option.value]})
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-text-secondary">
            {UI_LABELS.NO_MATCHING_ALERTS}
          </p>
        )}
      </div>
    </div>
  );
};
