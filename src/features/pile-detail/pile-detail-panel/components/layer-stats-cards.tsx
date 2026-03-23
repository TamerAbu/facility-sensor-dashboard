import { Activity, Droplets, Thermometer } from 'lucide-react';

import type { SensorReading } from '@/lib/types';

interface LayerStatsCardsProps {
  sensors: SensorReading[];
}

export const LayerStatsCards = ({ sensors }: LayerStatsCardsProps) => {
  const nonFaulty = sensors.filter((s) => !s.isFaulty);
  const faultyCount = sensors.filter((s) => s.isFaulty).length;
  const activeCount = sensors.length - faultyCount;

  const maxTemp =
    nonFaulty.length > 0
      ? nonFaulty.reduce((max, s) =>
          s.temperature > max.temperature ? s : max,
        )
      : null;
  const minTemp =
    nonFaulty.length > 0
      ? nonFaulty.reduce((min, s) =>
          s.temperature < min.temperature ? s : min,
        )
      : null;
  const maxMoist =
    nonFaulty.length > 0
      ? nonFaulty.reduce((max, s) => (s.moisture > max.moisture ? s : max))
      : null;
  const minMoist =
    nonFaulty.length > 0
      ? nonFaulty.reduce((min, s) => (s.moisture < min.moisture ? s : min))
      : null;

  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-text-secondary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
            Temp Variance
          </span>
        </div>
        {maxTemp && minTemp && (
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Max Temp</span>
              <span className="font-mono font-semibold text-status-critical">
                {maxTemp.temperature.toFixed(1)}°C ({maxTemp.sensorId})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Min Temp</span>
              <span className="font-mono font-semibold text-status-ok">
                {minTemp.temperature.toFixed(1)}°C ({minTemp.sensorId})
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-text-secondary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
            Moisture Range
          </span>
        </div>
        {maxMoist && minMoist && (
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Max Moisture</span>
              <span className="font-mono font-semibold">
                {maxMoist.moisture.toFixed(1)}% ({maxMoist.sensorId})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Min Moisture</span>
              <span className="font-mono font-semibold">
                {minMoist.moisture.toFixed(1)}% ({minMoist.sensorId})
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-text-secondary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
            Sensor Integrity
          </span>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary">Active Units</span>
            <span className="font-mono font-semibold">
              {activeCount}/{sensors.length}
            </span>
          </div>
          {faultyCount > 0 && (
            <div className="flex justify-between">
              <span className="text-text-secondary">Faults Reported</span>
              <span className="font-mono font-semibold text-status-faulty">
                {faultyCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
