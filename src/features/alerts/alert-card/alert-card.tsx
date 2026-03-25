'use client';

import { useState } from 'react';

import { AlertTriangle } from 'lucide-react';

import { PRIMARY_ACTION_LABELS, UI_LABELS } from '@/lib/constants';
import { getAlertPrimaryAction } from '@/lib/alert-actions';
import type { Alert } from '@/lib/types';
import { useAlertContext } from '@/features/alerts/alert-context';
import { ConfirmDialog } from '@/shared/components/confirm-dialog';

import { AlertActionBox } from './components/alert-action-box';
import { AlertCardActions } from './components/alert-card-actions';
import { AlertSensorReadings } from './components/alert-sensor-readings';
import { AlertTypeBadge } from './components/alert-type-badge';
import { LAYER_LABEL, SEVERITY_CONFIG } from './components/alert-card-config';

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard = ({ alert }: AlertCardProps) => {
  const { alertStates, handleAlert, dismissAlert } = useAlertContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const alertState = alertStates.get(alert.id);
  const status = alertState?.status ?? 'active';
  const config = SEVERITY_CONFIG[alert.severity];
  const layerLabel = LAYER_LABEL[alert.layer] ?? alert.layer;
  const actionType = getAlertPrimaryAction(
    alert.alertType,
    alert.severity,
    alert.description,
  );
  const primaryLabel = PRIMARY_ACTION_LABELS[actionType];

  const onPrimaryAction = () => {
    const action = alert.recommendedAction.split('.')[0].toLowerCase();
    handleAlert(alert.id, `Action logged — ${alert.pileName} ${action}`);
  };

  const onConfirmDismiss = () => {
    setShowConfirm(false);
    dismissAlert(alert.id);
  };

  return (
    <>
      <div
        className={`card-base alert-card px-8 py-7 ${status === 'dismissed' ? 'alert-card-fade-out' : ''}`}
        data-severity={status === 'handled' ? undefined : alert.severity}
        data-status={status}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-5 w-5 ${config.iconColor}`} />
            <span
              className={`text-xs font-bold uppercase tracking-[0.15em] ${config.color}`}
            >
              {config.label}
            </span>
          </div>
        </div>

        <div className="mt-2">
          <AlertTypeBadge alertType={alert.alertType} />
        </div>

        <h3 className="mt-1 text-xl font-bold tracking-tight">
          {alert.pileName} - {layerLabel}
        </h3>

        <AlertSensorReadings readings={alert.readings} />
        <AlertActionBox
          action={alert.recommendedAction}
          severity={alert.severity}
        />

        {alertState?.handledAt && (
          <p className="mt-3 text-xs text-text-secondary">
            {UI_LABELS.HANDLED_BY_OPERATOR} {alertState.handledAt}
          </p>
        )}

        <AlertCardActions
          primaryLabel={primaryLabel}
          status={status}
          onPrimaryAction={onPrimaryAction}
          onDismiss={() => setShowConfirm(true)}
        />
      </div>
      {showConfirm && (
        <ConfirmDialog
          onConfirm={onConfirmDismiss}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};
