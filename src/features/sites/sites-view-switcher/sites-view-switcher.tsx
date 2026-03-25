'use client';

import { useState } from 'react';
import { LayoutGrid, Map } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';
import type { Pile, SitesViewMode } from '@/lib/types';
import { PileCard } from '@/features/sites/pile-card';
import { ToggleGroup } from '@/shared/components/toggle-group';

import { SiteMapLoader } from './components/site-map-loader';

const VIEW_OPTIONS = [
  {
    value: 'grid' as const,
    label: UI_LABELS.SITES_VIEW_GRID,
    icon: <LayoutGrid className="h-3.5 w-3.5" />,
  },
  {
    value: 'map' as const,
    label: UI_LABELS.SITES_VIEW_MAP,
    icon: <Map className="h-3.5 w-3.5" />,
  },
];

interface SitesViewSwitcherProps {
  piles: Pile[];
}

export const SitesViewSwitcher = ({ piles }: SitesViewSwitcherProps) => {
  const [viewMode, setViewMode] = useState<SitesViewMode>('grid');

  return (
    <div>
      <div className="mb-6 flex items-center justify-end">
        <ToggleGroup
          options={VIEW_OPTIONS}
          active={viewMode}
          onChange={setViewMode}
        />
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {piles.map((pile) => (
            <PileCard key={pile.id} pile={pile} />
          ))}
        </div>
      ) : (
        <SiteMapLoader piles={piles} />
      )}
    </div>
  );
};
