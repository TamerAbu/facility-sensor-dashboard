import { AlertTriangle } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';
import type { Alert, AlertSeverity } from '@/lib/types';

import { AlertActionBox } from './components/alert-action-box';
import { AlertCardActions } from './components/alert-card-actions';
import { AlertSensorReadings } from './components/alert-sensor-readings';
import { AlertTypeBadge } from './components/alert-type-badge';

interface AlertCardProps {
  alert: Alert;
}

const LAYER_LABEL: Record<string, string> = {
  bottom: 'Bottom Layer',
  middle: 'Middle Layer',
  top: 'Top Layer',
};

const SEVERITY_CONFIG: Record<
  AlertSeverity,
  { label: string; color: string; iconColor: string }
> = {
  critical: {
    label: UI_LABELS.CRITICAL_ALERT,
    color: 'text-status-critical',
    iconColor: 'text-status-critical',
  },
  warning: {
    label: UI_LABELS.WARNING_ALERT,
    color: 'text-status-warning',
    iconColor: 'text-status-warning',
  },
};

export const AlertCard = ({ alert }: AlertCardProps) => {
  const config = SEVERITY_CONFIG[alert.severity];
  const layerLabel = LAYER_LABEL[alert.layer] ?? alert.layer;

  return (
    <div
      className="card-base alert-card px-8 py-7"
      data-severity={alert.severity}
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
      <AlertCardActions />
    </div>
  );
};
