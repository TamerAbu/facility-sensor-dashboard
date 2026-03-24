'use client';

import { Activity } from 'lucide-react';

import { IntegrityRing } from './integrity-ring';

interface SensorIntegrityCardProps {
  activeCount: number;
  totalCount: number;
  faultySensorIds: string[];
}

export const SensorIntegrityCard = ({
  activeCount,
  totalCount,
  faultySensorIds,
}: SensorIntegrityCardProps) => {
  const percentage = Math.round((activeCount / totalCount) * 100);

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-center gap-2.5">
        <Activity className="h-5 w-5 text-status-ok" />
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-text-secondary">
          Sensor Integrity
        </span>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <IntegrityRing percentage={percentage} />
        <div>
          <p className="text-base font-semibold">
            {activeCount} Active Units
          </p>
          {faultySensorIds.length > 0 && (
            <p className="text-sm uppercase tracking-wide text-text-secondary">
              {faultySensorIds.length} Fault Reported (
              {faultySensorIds.join(', ')})
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
