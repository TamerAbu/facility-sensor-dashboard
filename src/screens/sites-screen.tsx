import { Bell, MapPin, Settings, User } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';
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

  const pileCount = String(sortedPiles.length).padStart(2, '0');

  return (
    <div>
      <div className="mb-6 flex items-center justify-between border-b border-border pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
            {UI_LABELS.ACTIVE_FACILITY}
          </p>
          <p className="mt-1 flex items-center gap-2 text-lg font-bold">
            <MapPin className="h-5 w-5" />
            {SITE.name}, Emek Hefer
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="h-5 w-5 text-foreground" strokeWidth={2.5} />
          <Settings className="h-5 w-5 text-foreground" strokeWidth={2.5} />
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {UI_LABELS.SITES_OVERVIEW}
          </h2>
          <p className="mt-1.5 text-sm text-text-secondary">
            {UI_LABELS.SITES_SUBTITLE}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-status-ok" />
          <span className="text-xs font-bold uppercase tracking-wider">
            {UI_LABELS.ACTIVE_PILES}: {pileCount}
          </span>
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
