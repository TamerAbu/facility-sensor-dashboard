'use client';

import L from 'leaflet';
import Link from 'next/link';
import { ChevronRight, Thermometer, Droplets } from 'lucide-react';
import { Marker, Popup } from 'react-leaflet';

import { UI_LABELS } from '@/lib/constants';
import type { Pile, PileStatus } from '@/lib/types';

const STATUS_COLORS: Record<PileStatus, string> = {
  ok: '#22c55e',
  warning: '#f59e0b',
  critical: '#ef4444',
};

const STATUS_BG: Record<PileStatus, string> = {
  ok: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  critical: 'bg-red-50 text-red-700',
};

const STATUS_TEXT: Record<PileStatus, string> = {
  ok: 'OK',
  warning: 'Warning',
  critical: 'Critical',
};

const createPulseIcon = (name: string, status: PileStatus) => {
  const color = STATUS_COLORS[status];
  const shortName = name.replace('Emek ', '');

  return L.divIcon({
    className: '',
    iconSize: [80, 56],
    iconAnchor: [40, 20],
    popupAnchor: [0, -22],
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="position:relative;width:20px;height:20px;">
        <div style="
          position:absolute;inset:0;border-radius:50%;
          background:${color};opacity:0.25;
          animation:map-pulse 2s ease-out infinite;
        "></div>
        <div style="
          position:absolute;top:4px;left:4px;
          width:12px;height:12px;border-radius:50%;
          background:${color};
          border:2px solid white;
          box-shadow:0 1px 4px rgba(0,0,0,0.25);
        "></div>
      </div>
      <span style="
        font-size:11px;font-weight:700;color:#334155;
        text-shadow:0 1px 3px rgba(255,255,255,0.9);
        letter-spacing:0.02em;
      ">${shortName}</span>
    </div>`,
  });
};

interface MapPileMarkerProps {
  pile: Pile;
}

export const MapPileMarker = ({ pile }: MapPileMarkerProps) => (
  <Marker
    position={[pile.coordinates.lat, pile.coordinates.lng]}
    icon={createPulseIcon(pile.name, pile.status)}
  >
    <Popup className="map-popup" closeButton={false}>
      <div className="w-[220px] p-1">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-foreground">{pile.name}</h3>
          <span
            className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_BG[pile.status]}`}
          >
            {STATUS_TEXT[pile.status]}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-surface-secondary px-3 py-2">
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
              <Thermometer className="h-3 w-3" />
              {UI_LABELS.AVG_TEMPERATURE}
            </div>
            <p className="mt-0.5 text-base font-bold tabular-nums text-foreground">
              {pile.avgTemperature.toFixed(1)}°C
            </p>
          </div>
          <div className="rounded-lg bg-surface-secondary px-3 py-2">
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
              <Droplets className="h-3 w-3" />
              {UI_LABELS.AVG_MOISTURE}
            </div>
            <p className="mt-0.5 text-base font-bold tabular-nums text-foreground">
              {pile.avgMoisture.toFixed(1)}%
            </p>
          </div>
        </div>

        <Link
          href={`/sites/${pile.id}`}
          className="mt-3 flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-bold tracking-wide text-white transition-opacity hover:opacity-90"
          style={{ background: STATUS_COLORS[pile.status] }}
        >
          {UI_LABELS.INSPECT}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Popup>
  </Marker>
);
