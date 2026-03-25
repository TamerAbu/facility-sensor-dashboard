import { UI_LABELS } from '@/lib/constants';
import type { SensorReadingSummary } from '@/lib/types';

interface AlertSensorReadingsProps {
  readings: SensorReadingSummary[];
}

export const AlertSensorReadings = ({ readings }: AlertSensorReadingsProps) => (
  <div className="mt-4">
    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
      {UI_LABELS.ALERT_AFFECTED_SENSORS}:
    </span>
    <div className="mt-2 flex flex-wrap gap-2">
      {readings.map((reading) => (
        <span
          key={reading.sensorId}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-secondary px-2.5 py-1"
        >
          <span className="font-mono text-xs font-bold">
            {reading.sensorId}
          </span>
          <span className="font-mono text-xs text-text-secondary">
            {reading.temperature.toFixed(1)}°C / {reading.moisture.toFixed(1)}%
          </span>
        </span>
      ))}
    </div>
  </div>
);
