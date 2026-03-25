'use client';

import { useState } from 'react';

import { CheckCircle2 } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';
import type { Alert } from '@/lib/types';
import { AlertCard } from '@/features/alerts/alert-card';

import {
  AlertFilterBar,
  type SeverityFilter,
  type TypeFilter,
} from './components/alert-filter-bar';

interface AlertListWithFilterProps {
  alerts: Alert[];
}

export const AlertListWithFilter = ({ alerts }: AlertListWithFilterProps) => {
  const [activeSeverity, setActiveSeverity] = useState<SeverityFilter>('all');
  const [activeType, setActiveType] = useState<TypeFilter>('all');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity =
      activeSeverity === 'all' || alert.severity === activeSeverity;
    const matchesType = activeType === 'all' || alert.alertType === activeType;
    return matchesSeverity && matchesType;
  });

  if (alerts.length === 0) {
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
        onSeverityChange={setActiveSeverity}
        onTypeChange={setActiveType}
      />

      <div className="mt-6 space-y-5">
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
