import type { SensorHistory } from './types';

const SENSOR_HISTORY_MAP = new Map<string, SensorHistory>([
  [
    'pile-west:S16',
    {
      sensorId: 'S16',
      readings: [
        {
          temperature: 36.0,
          moisture: 13.0,
          timestamp: '2026-03-25T02:30:00Z',
        },
        {
          temperature: 46.0,
          moisture: 13.0,
          timestamp: '2026-03-25T08:30:00Z',
        },
      ],
    },
  ],
]);

export const getHistoryForSensor = (
  pileId: string,
  sensorId: string,
): SensorHistory | undefined => SENSOR_HISTORY_MAP.get(`${pileId}:${sensorId}`);
