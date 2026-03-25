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

interface SensorDetailCardProps {
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

export const SensorDetailCard = ({
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
}: SensorDetailCardProps) => {
  const readings = history?.readings.slice(-filteredPointCount) ?? [];
  const tempData = readings.map((r) => r.temperature);
  const moistureData = readings.map((r) => r.moisture);
  const lastTime = new Date(sensor.lastTransmissionAt).toLocaleTimeString(
    'en-US',
    { hour: '2-digit', minute: '2-digit', hour12: false },
  );

  return (
    <div
      id={`sensor-${sensor.sensorId}`}
      className={`card-base sensor-card px-6 py-5 ${isHighlighted ? 'sensor-card-highlight' : ''}`}
      data-status={sensor.status}
    >
      <div className="flex items-start gap-5">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold">{sensor.sensorId}</span>
              {visibility.sensorType && (
                <div className="mt-0.5 flex items-center gap-1 text-[10px] text-text-secondary">
                  <Cpu className="h-3 w-3" />
                  {SENSOR_TYPE_LABELS[sensor.sensorType]}
                </div>
              )}
            </div>
            <StatusBadge status={sensor.status} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
            {visibility.temperature && (
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-text-secondary" />
                <span className="text-xs text-text-secondary">Temp</span>
                <span
                  className={`ml-auto text-sm font-bold tabular-nums ${tempColor(sensor.temperature)}`}
                >
                  {sensor.temperature}°C
                </span>
              </div>
            )}
            {visibility.moisture && (
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-text-secondary" />
                <span className="text-xs text-text-secondary">Moisture</span>
                <span
                  className={`ml-auto text-sm font-bold tabular-nums ${moistureColor(sensor.moisture)}`}
                >
                  {sensor.moisture}%
                </span>
              </div>
            )}
            {visibility.battery && (
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-text-secondary" />
                <span className="text-xs text-text-secondary">Battery</span>
                <span
                  className={`ml-auto text-sm font-bold tabular-nums ${batteryColor(sensor.batteryPercent)}`}
                >
                  {sensor.batteryPercent}%
                </span>
              </div>
            )}
            {visibility.lastSeen && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-text-secondary" />
                <span className="text-xs text-text-secondary">Last Seen</span>
                <span className="ml-auto text-sm font-bold tabular-nums">
                  {lastTime}
                </span>
              </div>
            )}
          </div>
        </div>

        {tempData.length > 1 && (
          <div className="w-1/2 shrink-0">
            <Sparkline
              tempData={tempData}
              moistureData={moistureData}
              graphType={graphType}
              metric={metric}
              timeRange={timeRange}
              size="lg"
              showGrid={showGrid}
              showDots={showDots}
            />
          </div>
        )}
      </div>
    </div>
  );
};
