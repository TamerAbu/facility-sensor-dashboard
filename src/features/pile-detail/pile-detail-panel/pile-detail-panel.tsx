'use client';

import { useState } from 'react';

import { STATUS_LABELS } from '@/lib/constants';
import type { Layer, SensorReading, SensorStatus } from '@/lib/types';
import { SensorLayerView } from '@/features/pile-detail/sensor-layer-view';

import { LayerTabs } from './components/layer-tabs';
import { LayerStatsCards } from './components/layer-stats-cards';

interface PileDetailPanelProps {
  sensors: SensorReading[];
}

const LEGEND_ITEMS: { status: SensorStatus; color: string }[] = [
  { status: 'ok', color: 'bg-status-ok' },
  { status: 'warning', color: 'bg-status-warning' },
  { status: 'critical', color: 'bg-status-critical' },
  { status: 'faulty', color: 'bg-status-faulty' },
];

export const PileDetailPanel = ({ sensors }: PileDetailPanelProps) => {
  const [activeLayer, setActiveLayer] = useState<Layer>('bottom');
  const layerSensors = sensors.filter((s) => s.layer === activeLayer);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <LayerTabs activeLayer={activeLayer} onLayerChange={setActiveLayer} />
        <div className="flex items-center gap-4">
          {LEGEND_ITEMS.map(({ status, color }) => (
            <div key={status} className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                {STATUS_LABELS[status]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <SensorLayerView sensors={layerSensors} />
      </div>

      <LayerStatsCards sensors={layerSensors} />
    </div>
  );
};
