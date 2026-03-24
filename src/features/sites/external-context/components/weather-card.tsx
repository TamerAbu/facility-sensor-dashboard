import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

import { EXTERNAL_LABELS } from '@/lib/constants';
import type { WeatherData } from '@/lib/types';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => (
  <div className="rounded-lg border border-border bg-surface p-4">
    <div className="flex items-center gap-2">
      <Cloud className="h-4 w-4 text-accent" />
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
        {EXTERNAL_LABELS.WEATHER}
      </span>
    </div>
    <div className="mt-3 grid grid-cols-2 gap-3">
      <div className="flex items-center gap-2">
        <Thermometer className="h-3.5 w-3.5 text-text-secondary" />
        <span className="text-sm font-semibold">{weather.externalTemp}°C</span>
      </div>
      <div className="flex items-center gap-2">
        <Droplets className="h-3.5 w-3.5 text-text-secondary" />
        <span className="text-sm font-semibold">{weather.humidity}%</span>
      </div>
      <div className="flex items-center gap-2">
        <Wind className="h-3.5 w-3.5 text-text-secondary" />
        <span className="text-sm font-semibold">{weather.wind} km/h</span>
      </div>
      <div className="text-sm font-medium text-text-secondary">
        {weather.conditions}
      </div>
    </div>
  </div>
);
