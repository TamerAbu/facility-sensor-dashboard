import type {
  CardVisibility,
  GraphType,
  MetricFilter,
  SensorHistory,
  SensorReading,
  TimeRange,
} from '@/lib/types';
import { SENSOR_TYPE_LABELS, STATUS_LABELS } from '@/lib/constants';

import { Sparkline } from './sparkline';

interface SensorTableViewProps {
  sensors: SensorReading[];
  histories: Record<string, SensorHistory>;
  graphType: GraphType;
  metric: MetricFilter;
  timeRange: TimeRange;
  filteredPointCount: number;
  showGrid: boolean;
  showDots: boolean;
  visibility: CardVisibility;
}

const statusDotColor: Record<string, string> = {
  ok: 'bg-status-ok',
  warning: 'bg-status-warning',
  critical: 'bg-status-critical',
  faulty: 'bg-status-faulty',
};

export const SensorTableView = ({
  sensors,
  histories,
  graphType,
  metric,
  timeRange,
  filteredPointCount,
  showGrid,
  showDots,
  visibility,
}: SensorTableViewProps) => (
  <div className="overflow-hidden rounded-xl border border-border bg-surface">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-surface-secondary text-[10px] font-bold uppercase tracking-wider text-text-secondary">
          <th className="px-4 py-2.5 text-left">Sensor</th>
          <th className="px-4 py-2.5 text-left">Status</th>
          {visibility.sensorType && (
            <th className="px-4 py-2.5 text-left">Type</th>
          )}
          {visibility.temperature && (
            <th className="px-4 py-2.5 text-right">Temp</th>
          )}
          {visibility.moisture && (
            <th className="px-4 py-2.5 text-right">Moisture</th>
          )}
          {visibility.battery && (
            <th className="px-4 py-2.5 text-right">Battery</th>
          )}
          <th className="w-40 px-4 py-2.5 text-center">Trend</th>
        </tr>
      </thead>
      <tbody>
        {sensors.map((sensor) => {
          const history = histories[sensor.sensorId];
          const readings = history?.readings.slice(-filteredPointCount) ?? [];
          const tempData = readings.map((r) => r.temperature);
          const moistureData = readings.map((r) => r.moisture);

          return (
            <tr
              key={sensor.sensorId}
              id={`sensor-${sensor.sensorId}`}
              className="border-b border-border/50 last:border-b-0 hover:bg-surface-secondary/50"
            >
              <td className="px-4 py-2.5 font-bold">{sensor.sensorId}</td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${statusDotColor[sensor.status]}`}
                  />
                  <span className="text-xs">
                    {STATUS_LABELS[sensor.status]}
                  </span>
                </div>
              </td>
              {visibility.sensorType && (
                <td className="px-4 py-2.5 text-xs text-text-secondary">
                  {SENSOR_TYPE_LABELS[sensor.sensorType]}
                </td>
              )}
              {visibility.temperature && (
                <td className="px-4 py-2.5 text-right tabular-nums">
                  {sensor.temperature}°C
                </td>
              )}
              {visibility.moisture && (
                <td className="px-4 py-2.5 text-right tabular-nums">
                  {sensor.moisture}%
                </td>
              )}
              {visibility.battery && (
                <td className="px-4 py-2.5 text-right tabular-nums">
                  {sensor.batteryPercent}%
                </td>
              )}
              <td className="w-40 px-4 py-1">
                {tempData.length > 1 && (
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
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
