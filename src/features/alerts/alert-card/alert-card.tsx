import Link from 'next/link';

import { UI_LABELS } from '@/lib/constants';
import type { Alert } from '@/lib/types';
import { StatusBadge } from '@/shared/components/status-badge';

import { AlertActionBox } from './components/alert-action-box';

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard = ({ alert }: AlertCardProps) => (
  <Link href={`/sites/${alert.pileId}`} className="block">
    <div className="card-base alert-card p-6" data-severity={alert.severity}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{alert.pileName}</h3>
        <StatusBadge status={alert.severity} />
      </div>

      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">
        {UI_LABELS.ALERT_LAYER_LABEL}: {alert.layer}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {alert.description}
      </p>

      <div className="mt-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
          {UI_LABELS.ALERT_AFFECTED_SENSORS}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {alert.affectedSensors.map((sensorId) => (
            <span
              key={sensorId}
              className="rounded-md bg-surface-secondary px-2 py-0.5 text-xs font-mono font-medium"
            >
              {sensorId}
            </span>
          ))}
        </div>
      </div>

      <AlertActionBox action={alert.recommendedAction} />
    </div>
  </Link>
);
