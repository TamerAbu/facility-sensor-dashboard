'use client';

import { Droplets } from 'lucide-react';

import { MOISTURE_WARNING_MAX, UI_LABELS } from '@/lib/constants';
import type { SensorReading } from '@/lib/types';

import { RangeBar } from './range-bar';

interface MoistureRangeCardProps {
  maxSensor: SensorReading;
  minSensor: SensorReading;
}

export const MoistureRangeCard = ({
  maxSensor,
  minSensor,
}: MoistureRangeCardProps) => {
  const barRatio = maxSensor.moisture / MOISTURE_WARNING_MAX;

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-center gap-2.5">
        <Droplets className="h-5 w-5 text-accent" />
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-text-secondary">
          {UI_LABELS.MOISTURE_RANGE}
        </span>
      </div>
      <div className="mt-4 space-y-3 text-base">
        <div className="flex justify-between">
          <span className="text-text-secondary">
            {UI_LABELS.MAX_MOISTURE}
          </span>
          <span className="font-mono font-semibold">
            {maxSensor.moisture.toFixed(1)}% ({maxSensor.sensorId})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">
            {UI_LABELS.MIN_MOISTURE}
          </span>
          <span className="font-mono font-semibold">
            {minSensor.moisture.toFixed(1)}% ({minSensor.sensorId})
          </span>
        </div>
      </div>
      <RangeBar ratio={barRatio} color="var(--foreground)" />
    </div>
  );
};
