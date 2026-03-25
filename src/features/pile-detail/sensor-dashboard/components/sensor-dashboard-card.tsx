import { Battery, Clock, Cpu, Droplets, Thermometer } from 'lucide-react';

import { SENSOR_TYPE_LABELS } from '@/lib/constants';
import type {
  CardVisibility,
  GraphType,
  MetricFilter,
  SensorHistory,
  SensorReading,
  TimeRange,
} from '@/lib/types';
import { StatusBadge } from '@/shared/components/status-badge';

import { batteryColor, moistureColor, tempColor } from './reading-colors';
import { Sparkline } from './sparkline';

interface SensorDashboardCardProps {
  sensor: SensorReading;
  history: SensorHistory | undefined;
  isHighlighted: boolean;
  graphType: GraphType;
  metric: MetricFilter;
  timeRange: TimeRange;
  filteredPointCount: number;
  showGrid: boolean;
  showDots: boolean;
  visibility: CardVisibility;
}

export const SensorDashboardCard = ({
  sensor,
  history,
  isHighlighted,
  graphType,
  metric,
  timeRange,
  filteredPointCount,
  showGrid,
  showDots,
  visibility,
}: SensorDashboardCardProps) => {
  const readings = history?.readings.slice(-filteredPointCount) ?? [];
  const tempData = readings.map((r) => r.temperature);
  const moistureData = readings.map((r) => r.moisture);

  return (
    <div
      id={`sensor-${sensor.sensorId}`}
      className={`card-base sensor-card px-4 py-3 ${isHighlighted ? 'sensor-card-highlight' : ''}`}
      data-status={sensor.status}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">{sensor.sensorId}</span>
        <StatusBadge status={sensor.status} />
      </div>

      {visibility.sensorType && (
        <div className="mt-1 flex items-center gap-1 text-[10px] text-text-secondary">
          <Cpu className="h-3 w-3" />
          {SENSOR_TYPE_LABELS[sensor.sensorType]}
        </div>
      )}

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
        {visibility.temperature && (
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-text-secondary" />
            <span
              className={`text-base font-bold tabular-nums ${tempColor(sensor.temperature)}`}
            >
              {sensor.temperature}°C
            </span>
          </div>
        )}
        {visibility.moisture && (
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-text-secondary" />
            <span
              className={`text-base font-bold tabular-nums ${moistureColor(sensor.moisture)}`}
            >
              {sensor.moisture}%
            </span>
          </div>
        )}
        {visibility.battery && (
          <div
            className={`flex items-center gap-2 ${batteryColor(sensor.batteryPercent)}`}
          >
            <Battery className="h-4 w-4" />
            <span className="text-xs font-semibold tabular-nums">
              {sensor.batteryPercent}%
            </span>
          </div>
        )}
        {visibility.lastSeen && (
          <div className="flex items-center gap-2 text-text-secondary">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-semibold tabular-nums">
              {new Date(sensor.lastTransmissionAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </span>
          </div>
        )}
      </div>

      {tempData.length > 1 && (
        <div className="mt-2">
          <Sparkline
            tempData={tempData}
            moistureData={moistureData}
            graphType={graphType}
            metric={metric}
            timeRange={timeRange}
            size="sm"
            showGrid={showGrid}
            showDots={showDots}
          />
        </div>
      )}
    </div>
  );
};
