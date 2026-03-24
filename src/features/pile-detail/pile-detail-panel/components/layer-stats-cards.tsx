import type { SensorReading } from '@/lib/types';

import { MoistureRangeCard } from './stats-cards/moisture-range-card';
import { SensorIntegrityCard } from './stats-cards/sensor-integrity-card';
import { TempVarianceCard } from './stats-cards/temp-variance-card';

interface LayerStatsCardsProps {
  sensors: SensorReading[];
}

export const LayerStatsCards = ({ sensors }: LayerStatsCardsProps) => {
  const nonFaulty = sensors.filter((s) => !s.isFaulty);
  const faultySensorIds = sensors
    .filter((s) => s.isFaulty)
    .map((s) => s.sensorId);
  const activeCount = sensors.length - faultySensorIds.length;

  const maxTemp =
    nonFaulty.length > 0
      ? nonFaulty.reduce((max, s) =>
          s.temperature > max.temperature ? s : max,
        )
      : null;
  const minTemp =
    nonFaulty.length > 0
      ? nonFaulty.reduce((min, s) =>
          s.temperature < min.temperature ? s : min,
        )
      : null;
  const maxMoist =
    nonFaulty.length > 0
      ? nonFaulty.reduce((max, s) => (s.moisture > max.moisture ? s : max))
      : null;
  const minMoist =
    nonFaulty.length > 0
      ? nonFaulty.reduce((min, s) => (s.moisture < min.moisture ? s : min))
      : null;

  return (
    <div className="mt-6 grid grid-cols-3 gap-4">
      {maxTemp && minTemp && (
        <TempVarianceCard maxSensor={maxTemp} minSensor={minTemp} />
      )}
      {maxMoist && minMoist && (
        <MoistureRangeCard maxSensor={maxMoist} minSensor={minMoist} />
      )}
      <SensorIntegrityCard
        activeCount={activeCount}
        totalCount={sensors.length}
        faultySensorIds={faultySensorIds}
      />
    </div>
  );
};
