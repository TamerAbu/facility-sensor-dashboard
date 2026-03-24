import { TrendingUp, Wheat } from 'lucide-react';

import { EXTERNAL_LABELS } from '@/lib/constants';
import type { CommodityPrice } from '@/lib/types';

interface CommodityCardProps {
  price: CommodityPrice;
}

export const CommodityCard = ({ price }: CommodityCardProps) => {
  const isUp = price.change >= 0;

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center gap-2">
        <Wheat className="h-4 w-4 text-accent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
          {EXTERNAL_LABELS.COMMODITY}
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="font-mono text-2xl font-bold tabular-nums">
            {price.price}
            <span className="ml-1 text-xs font-medium text-text-secondary">
              {price.unit}
            </span>
          </p>
        </div>
        <div
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold ${
            isUp
              ? 'bg-status-ok/10 text-status-ok'
              : 'bg-status-critical/10 text-status-critical'
          }`}
        >
          <TrendingUp className={`h-3 w-3 ${isUp ? '' : 'rotate-180'}`} />+
          {price.change} ({price.changePercent}%)
        </div>
      </div>
    </div>
  );
};
