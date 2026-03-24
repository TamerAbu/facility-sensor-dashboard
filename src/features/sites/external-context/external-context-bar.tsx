import {
  Cloud,
  Droplets,
  Radio,
  ShieldAlert,
  Thermometer,
  TrendingUp,
  Wheat,
  Wind,
} from 'lucide-react';

import { EXTERNAL_LABELS } from '@/lib/constants';
import type {
  CommodityPrice,
  GatewayReading,
  Pile,
  WeatherData,
} from '@/lib/types';

interface ExternalContextBarProps {
  weather: WeatherData;
  gateway: GatewayReading;
  price: CommodityPrice;
  piles: Pile[];
}

export const ExternalContextBar = ({
  weather,
  gateway,
  price,
  piles,
}: ExternalContextBarProps) => {
  const atRiskPiles = piles.filter((p) => p.status !== 'ok');
  const isUp = price.change >= 0;

  return (
    <div className="context-strip mb-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl sm:grid-cols-2 lg:grid-cols-4">
      {/* Weather */}
      <div className="flex flex-col justify-between p-4">
        <div className="flex items-center gap-2">
          <Cloud className="h-3.5 w-3.5 text-accent" />
          <span className="context-label">{EXTERNAL_LABELS.WEATHER}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <Thermometer className="h-3 w-3 text-text-secondary" />
            <span className="context-value">{weather.externalTemp}°C</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplets className="h-3 w-3 text-text-secondary" />
            <span className="context-value">{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wind className="h-3 w-3 text-text-secondary" />
            <span className="context-value">{weather.wind} km/h</span>
          </div>
          <span className="text-xs text-text-secondary">
            {weather.conditions}
          </span>
        </div>
      </div>

      {/* Gateway */}
      <div className="flex flex-col justify-between p-4">
        <div className="flex items-center gap-2">
          <Radio className="h-3.5 w-3.5 text-status-ok" />
          <span className="context-label">{EXTERNAL_LABELS.GATEWAY}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-text-secondary">
              {EXTERNAL_LABELS.AMBIENT_TEMP}
            </p>
            <p className="context-value mt-0.5">{gateway.ambientTemp}°C</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-text-secondary">
              {EXTERNAL_LABELS.HUMIDITY}
            </p>
            <p className="context-value mt-0.5">{gateway.ambientHumidity}%</p>
          </div>
        </div>
      </div>

      {/* CBOT Wheat */}
      <div className="flex flex-col justify-between p-4">
        <div className="flex items-center gap-2">
          <Wheat className="h-3.5 w-3.5 text-status-warning" />
          <span className="context-label">{EXTERNAL_LABELS.COMMODITY}</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <p className="font-mono text-xl font-bold tabular-nums">
            {price.price}
            <span className="ml-1 text-[10px] font-normal text-text-secondary">
              {price.unit}
            </span>
          </p>
          <span
            className={`flex items-center gap-1 text-xs font-semibold ${isUp ? 'text-status-ok' : 'text-status-critical'}`}
          >
            <TrendingUp className={`h-3 w-3 ${isUp ? '' : 'rotate-180'}`} />+
            {price.change} ({price.changePercent}%)
          </span>
        </div>
      </div>

      {/* Economic Urgency */}
      <div className="flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-3.5 w-3.5 text-status-critical" />
            <span className="context-label">
              {EXTERNAL_LABELS.ECONOMIC_URGENCY}
            </span>
          </div>
          <span className="text-[10px] font-medium text-text-secondary">
            {atRiskPiles.length}/{piles.length} {EXTERNAL_LABELS.PILES_AT_RISK}
          </span>
        </div>
        <div className="mt-3">
          <p className="text-[9px] uppercase tracking-wider text-text-secondary">
            {EXTERNAL_LABELS.AT_RISK_VALUE}
          </p>
          <p className="font-mono text-xl font-bold tabular-nums text-status-critical">
            $
            {Math.round(
              (atRiskPiles.length * 3000 * 36.74 * price.price) / 100,
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
