import { AlertTriangle } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';
import type { Alert, AlertSeverity } from '@/lib/types';

import { AlertActionBox } from './components/alert-action-box';
import { AlertCardActions } from './components/alert-card-actions';

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
    <div className="card-base alert-card p-7" data-severity={alert.severity}>
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

      <h3 className="mt-2 text-xl font-bold tracking-tight">
        {alert.pileName} - {layerLabel}
      </h3>

      <div className="mt-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
          {UI_LABELS.ALERT_AFFECTED_SENSORS}:
        </span>
        <span className="ml-2 inline-flex gap-1.5">
          {alert.affectedSensors.map((sensorId) => (
            <span
              key={sensorId}
              className="rounded-md border border-border bg-surface-secondary px-2.5 py-0.5 font-mono text-xs font-medium"
            >
              {sensorId}
            </span>
          ))}
        </span>
      </div>

      <AlertActionBox
        action={alert.recommendedAction}
        severity={alert.severity}
      />
      <AlertCardActions />
    </div>
  );
};
