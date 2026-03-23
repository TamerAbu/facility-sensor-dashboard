import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import {
  PILE_DEPTH,
  PILE_HEIGHT,
  PILE_WIDTH,
  UI_LABELS,
} from '@/lib/constants';
import { SITE } from '@/lib/mock-data';
import { processSiteData } from '@/lib/risk-engine';
import { StatusBadge } from '@/shared/components/status-badge';
import { PileDetailPanel } from '@/features/pile-detail/pile-detail-panel';

interface PileDetailScreenProps {
  pileId: string;
}

export const PileDetailScreen = ({ pileId }: PileDetailScreenProps) => {
  const processedPiles = processSiteData(SITE.piles);
  const pile = processedPiles.find((p) => p.id === pileId);

  if (!pile) {
    return <p className="text-text-secondary">Pile not found.</p>;
  }

  return (
    <div>
      <Link
        href="/sites"
        className="mb-6 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-text-secondary transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {UI_LABELS.BACK_TO_MONITORING}
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tight">{pile.name}</h2>
            <StatusBadge status={pile.status} />
          </div>
          <p className="mt-1 text-[12px] text-text-secondary">
            {pile.grainType} · {PILE_WIDTH}m × {PILE_HEIGHT}m × {PILE_DEPTH}m ·{' '}
            {pile.sensors.length} {UI_LABELS.SENSORS_LABEL.toLowerCase()}
          </p>
        </div>

        <div className="flex gap-3">
          <div className="rounded-xl border border-border bg-surface px-5 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
              {UI_LABELS.AVG_TEMPERATURE}
            </p>
            <p className="mt-1 font-mono text-3xl font-bold tabular-nums tracking-tighter">
              {pile.avgTemperature.toFixed(1)}
              <span className="ml-0.5 text-sm font-medium text-text-secondary">
                °C
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface px-5 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
              {UI_LABELS.AVG_MOISTURE}
            </p>
            <p className="mt-1 font-mono text-3xl font-bold tabular-nums tracking-tighter">
              {pile.avgMoisture.toFixed(1)}
              <span className="ml-0.5 text-sm font-medium text-text-secondary">
                %
              </span>
            </p>
          </div>
        </div>
      </div>

      <PileDetailPanel sensors={pile.sensors} />
    </div>
  );
};
