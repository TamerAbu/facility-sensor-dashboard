import { MapPin } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';
import {
  COMMODITY_PRICE,
  GATEWAY_READING,
  SITE,
  WEATHER_DATA,
} from '@/lib/mock-data';
import type { PileStatus } from '@/lib/types';
import { generateAlerts, processSiteData } from '@/lib/risk-engine';
import { ExternalContextBar } from '@/features/sites/external-context';
import { FacilityGauges } from '@/features/sites/facility-gauges';
import { SitesViewSwitcher } from '@/features/sites/sites-view-switcher';
import { HeaderActions } from '@/shared/components/header-actions';

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
  const alerts = generateAlerts(processedPiles);

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
        <HeaderActions />
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

      <SitesViewSwitcher piles={sortedPiles} />

      <div className="mt-8">
        <FacilityGauges piles={sortedPiles} alerts={alerts} />
      </div>
    </div>
  );
};
