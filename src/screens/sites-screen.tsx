import { Activity } from 'lucide-react';

import { STATUS_LABELS, UI_LABELS } from '@/lib/constants';
import {
  COMMODITY_PRICE,
  GATEWAY_READING,
  SITE,
  WEATHER_DATA,
} from '@/lib/mock-data';
import type { PileStatus } from '@/lib/types';
import { processSiteData } from '@/lib/risk-engine';
import { ExternalContextBar } from '@/features/sites/external-context';
import { PileCard } from '@/features/sites/pile-card';

const SEVERITY_ORDER: Record<PileStatus, number> = {
  critical: 0,
  warning: 1,
  ok: 2,
};

export const SitesScreen = () => {
  const processedPiles = processSiteData(SITE.piles);
  const sortedPiles = [...processedPiles].sort(
    (a, b) => SEVERITY_ORDER[a.status] - SEVERITY_ORDER[b.status],
  );

  const criticalCount = sortedPiles.filter(
    (p) => p.status === 'critical',
  ).length;
  const warningCount = sortedPiles.filter((p) => p.status === 'warning').length;
  const okCount = sortedPiles.filter((p) => p.status === 'ok').length;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {UI_LABELS.PILE_MONITORING}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {SITE.name} · {SITE.address}
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-surface px-4 py-2.5 shadow-sm ring-1 ring-border/50">
          <Activity className="h-4 w-4 text-accent" />
          <div className="flex items-center gap-3 text-[12px] font-semibold">
            {criticalCount > 0 && (
              <span className="flex items-center gap-1.5 text-status-critical">
                <span className="h-2 w-2 animate-pulse rounded-full bg-status-critical" />
                {criticalCount} {STATUS_LABELS.critical}
              </span>
            )}
            {warningCount > 0 && (
              <span className="flex items-center gap-1.5 text-status-warning">
                <span className="h-2 w-2 rounded-full bg-status-warning" />
                {warningCount} {STATUS_LABELS.warning}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-status-ok">
              <span className="h-2 w-2 rounded-full bg-status-ok" />
              {okCount} {STATUS_LABELS.ok}
            </span>
          </div>
        </div>
      </div>

      <ExternalContextBar
        weather={WEATHER_DATA}
        gateway={GATEWAY_READING}
        price={COMMODITY_PRICE}
        piles={sortedPiles}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {sortedPiles.map((pile) => (
          <PileCard key={pile.id} pile={pile} />
        ))}
      </div>
    </div>
  );
};
