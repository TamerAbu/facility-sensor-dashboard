import { CURRENT_TIMESTAMP } from './constants';
import type { Pile, TrendDataPoint } from './types';

const TREND_DAYS = 7;
const BASE_DATE = new Date(CURRENT_TIMESTAMP);
BASE_DATE.setDate(BASE_DATE.getDate() - TREND_DAYS + 1);

const formatDate = (date: Date): string =>
  `${date.getMonth() + 1}/${date.getDate()}`;

const jitter = (base: number, amplitude: number, seed: number): number =>
  Math.round((base + Math.sin(seed) * amplitude) * 10) / 10;

export const buildPileTrendData = (piles: Pile[]): TrendDataPoint[] =>
  Array.from({ length: TREND_DAYS }, (_, dayIndex) => {
    const date = new Date(BASE_DATE);
    date.setDate(date.getDate() + dayIndex);

    const point: TrendDataPoint = { date: formatDate(date) };

    for (const pile of piles) {
      const tempBase = pile.avgTemperature;
      const moistBase = pile.avgMoisture;
      const seed = dayIndex * 3.7 + pile.id.charCodeAt(5);

      point[`${pile.name}_temperature`] = jitter(tempBase, 1.5, seed);
      point[`${pile.name}_moisture`] = jitter(moistBase, 0.6, seed + 1);
    }

    return point;
  });
