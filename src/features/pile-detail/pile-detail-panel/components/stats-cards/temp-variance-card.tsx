'use client';

import { Thermometer } from 'lucide-react';

import { TEMP_WARNING_MAX } from '@/lib/constants';
import type { SensorReading } from '@/lib/types';

import { RangeBar } from './range-bar';

interface TempVarianceCardProps {
  maxSensor: SensorReading;
  minSensor: SensorReading;
}

export const TempVarianceCard = ({
  maxSensor,
  minSensor,
}: TempVarianceCardProps) => {
  const barRatio = maxSensor.temperature / TEMP_WARNING_MAX;

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-center gap-2.5">
        <Thermometer className="h-5 w-5 text-status-critical" />
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-text-secondary">
          Temp Variance
        </span>
      </div>
      <div className="mt-4 space-y-3 text-base">
        <div className="flex justify-between">
          <span className="text-text-secondary">Max Temp</span>
          <span className="font-mono font-semibold text-status-critical">
            {maxSensor.temperature.toFixed(1)}°C ({maxSensor.sensorId})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Min Temp</span>
          <span className="font-mono font-semibold text-status-ok">
            {minSensor.temperature.toFixed(1)}°C ({minSensor.sensorId})
          </span>
        </div>
      </div>
      <RangeBar ratio={barRatio} color="var(--status-critical)" />
    </div>
  );
};
