import type { SensorReading } from '@/lib/types';

import { MoistureRangeCard } from './stats-cards/moisture-range-card';
import { SensorIntegrityCard } from './stats-cards/sensor-integrity-card';
import { TempVarianceCard } from './stats-cards/temp-variance-card';

interface LayerStatsCardsProps {
  sensors: SensorReading[];
}

export const LayerStatsCards = ({ sensors }: LayerStatsCardsProps) => {
  const nonFaulty = sensors.filter((sensor) => !sensor.isFaulty);
  const faultySensorIds = sensors
    .filter((sensor) => sensor.isFaulty)
    .map((sensor) => sensor.sensorId);
  const activeCount = sensors.length - faultySensorIds.length;

  const maxTemp =
    nonFaulty.length > 0
      ? nonFaulty.reduce((max, sensor) =>
          sensor.temperature > max.temperature ? sensor : max,
        )
      : null;
  const minTemp =
    nonFaulty.length > 0
      ? nonFaulty.reduce((min, sensor) =>
          sensor.temperature < min.temperature ? sensor : min,
        )
      : null;
  const maxMoist =
    nonFaulty.length > 0
      ? nonFaulty.reduce((max, sensor) =>
          sensor.moisture > max.moisture ? sensor : max,
        )
      : null;
  const minMoist =
    nonFaulty.length > 0
      ? nonFaulty.reduce((min, sensor) =>
          sensor.moisture < min.moisture ? sensor : min,
        )
      : null;

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
