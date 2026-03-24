import { Droplets, Radio, Thermometer } from 'lucide-react';

import { EXTERNAL_LABELS } from '@/lib/constants';
import type { GatewayReading } from '@/lib/types';

interface GatewayCardProps {
  gateway: GatewayReading;
}

export const GatewayCard = ({ gateway }: GatewayCardProps) => (
  <div className="rounded-lg border border-border bg-surface p-4">
    <div className="flex items-center gap-2">
      <Radio className="h-4 w-4 text-accent" />
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
        {EXTERNAL_LABELS.GATEWAY}
      </span>
    </div>
    <div className="mt-3 grid grid-cols-2 gap-3">
      <div>
        <p className="text-xs text-text-secondary">
          {EXTERNAL_LABELS.AMBIENT_TEMP}
        </p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <Thermometer className="h-3.5 w-3.5 text-text-secondary" />
          <span className="text-sm font-semibold">{gateway.ambientTemp}°C</span>
        </div>
      </div>
      <div>
        <p className="text-xs text-text-secondary">
          {EXTERNAL_LABELS.HUMIDITY}
        </p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <Droplets className="h-3.5 w-3.5 text-text-secondary" />
          <span className="text-sm font-semibold">
            {gateway.ambientHumidity}%
          </span>
        </div>
      </div>
    </div>
  </div>
);
