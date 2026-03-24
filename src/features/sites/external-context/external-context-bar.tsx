import type {
  CommodityPrice,
  GatewayReading,
  Pile,
  WeatherData,
} from '@/lib/types';

import { CommodityCard } from './components/commodity-card';
import { GatewayCard } from './components/gateway-card';
import { UrgencyCard } from './components/urgency-card';
import { WeatherCard } from './components/weather-card';

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
}: ExternalContextBarProps) => (
  <div className="mb-6 grid grid-cols-4 gap-4">
    <WeatherCard weather={weather} />
    <GatewayCard gateway={gateway} />
    <CommodityCard price={price} />
    <UrgencyCard piles={piles} price={price} />
  </div>
);
