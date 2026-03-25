import dynamic from 'next/dynamic';

import type { Pile } from '@/lib/types';

const SiteMap = dynamic(() => import('./site-map').then((m) => m.SiteMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center rounded-xl border border-border bg-surface">
      <p className="text-sm text-text-secondary">Loading map...</p>
    </div>
  ),
});

interface SiteMapLoaderProps {
  piles: Pile[];
}

export const SiteMapLoader = ({ piles }: SiteMapLoaderProps) => (
  <SiteMap piles={piles} />
);
