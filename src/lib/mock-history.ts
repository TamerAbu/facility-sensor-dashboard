import { CYCLE_INTERVAL_HOURS } from './constants';
import type { SensorHistory, SensorReading } from './types';

const HISTORY_DAYS = 14;
const READINGS_PER_DAY = 2;
const TOTAL_POINTS = HISTORY_DAYS * READINGS_PER_DAY;
const BASE_TIMESTAMP = new Date('2026-03-25T08:00:00Z');

const buildTimestamp = (cyclesAgo: number): string => {
  const date = new Date(
    BASE_TIMESTAMP.getTime() - cyclesAgo * CYCLE_INTERVAL_HOURS * 3600_000,
  );
  return date.toISOString();
};

const vary = (base: number, index: number, range: number): number => {
  const offsets = [0.7, -0.4, 0.9, -0.6, 0.3, 0.2, -0.8, 0.5, -0.3, 0.6];
  const offset = offsets[index % offsets.length] * range;
  return Math.round((base + offset) * 10) / 10;
};

const buildSensorHistory = (sensor: SensorReading): SensorHistory => ({
  sensorId: sensor.sensorId,
  readings: Array.from({ length: TOTAL_POINTS }, (_, i) => ({
    temperature: vary(sensor.temperature, i, 2.5),
    moisture: vary(sensor.moisture, i, 1.2),
    timestamp: buildTimestamp(TOTAL_POINTS - 1 - i),
  })),
});

// Hand-crafted entry for rate-of-change alert (sudden spike — 12h apart)
const SPIKE_HISTORY: SensorHistory = {
  sensorId: 'S16',
  readings: [
    { temperature: 36.0, moisture: 13.0, timestamp: '2026-03-24T20:00:00Z' },
    { temperature: 46.0, moisture: 13.0, timestamp: '2026-03-25T08:00:00Z' },
  ],
};

export const buildAllSensorHistories = (
  sensors: SensorReading[],
): Record<string, SensorHistory> => {
  const histories: Record<string, SensorHistory> = {};
  for (const sensor of sensors) {
    histories[sensor.sensorId] = buildSensorHistory(sensor);
  }
  return histories;
};

export const getHistoryForSensor = (
  pileId: string,
  sensorId: string,
  sensors: SensorReading[],
): SensorHistory | undefined => {
  if (pileId === 'pile-west' && sensorId === 'S16') return SPIKE_HISTORY;
  const sensor = sensors.find((s) => s.sensorId === sensorId);
  if (!sensor) return undefined;
  return buildSensorHistory(sensor);
};
