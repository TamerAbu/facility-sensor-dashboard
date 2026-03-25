import type { Alert, Pile, SensorReading } from '@/lib/types';

const roundTo1 = (value: number): number => Math.round(value * 10) / 10;

const avgField = (
  sensors: SensorReading[],
  field: 'temperature' | 'moisture',
) =>
  sensors.length > 0
    ? roundTo1(sensors.reduce((sum, s) => sum + s[field], 0) / sensors.length)
    : 0;

export interface SiteAggregates {
  avgTemp: number;
  avgMoisture: number;
  healthPercent: number;
  faultyCount: number;
  alertCount: number;
  criticalCount: number;
  warningCount: number;
}

export const computeSiteAggregates = (
  piles: Pile[],
  alerts: Alert[],
): SiteAggregates => {
  const allSensors = piles.flatMap((p) => p.sensors);
  const nonFaulty = allSensors.filter((s) => !s.isFaulty);
  const totalSensors = allSensors.length;
  const faultyCount = totalSensors - nonFaulty.length;
  const healthPercent =
    totalSensors > 0
      ? Math.round(((totalSensors - faultyCount) / totalSensors) * 100)
      : 100;

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;

  return {
    avgTemp: avgField(nonFaulty, 'temperature'),
    avgMoisture: avgField(nonFaulty, 'moisture'),
    healthPercent,
    faultyCount,
    alertCount: alerts.length,
    criticalCount,
    warningCount: alerts.length - criticalCount,
  };
};
