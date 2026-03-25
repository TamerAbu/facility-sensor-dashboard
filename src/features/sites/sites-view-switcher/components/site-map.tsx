'use client';

import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer } from 'react-leaflet';

import { MAP_CENTER, MAP_DEFAULT_ZOOM } from '@/lib/constants';
import type { Pile } from '@/lib/types';

import { MapPileMarker } from './map-pile-marker';

const TILE_URL =
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

interface SiteMapProps {
  piles: Pile[];
}

export const SiteMap = ({ piles }: SiteMapProps) => (
  <div className="overflow-hidden rounded-xl border border-border shadow-sm">
    <MapContainer
      center={[MAP_CENTER.lat, MAP_CENTER.lng]}
      zoom={MAP_DEFAULT_ZOOM}
      className="h-[500px] w-full"
      scrollWheelZoom
      zoomControl={false}
    >
      <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
      {piles.map((pile) => (
        <MapPileMarker key={pile.id} pile={pile} />
      ))}
    </MapContainer>
  </div>
);
