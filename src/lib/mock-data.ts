import type { Layer, Pile, SensorReading, Site } from './types';

const GRID_COLS = 5;
const GRID_ROWS = 2;
const PILE_W = 50;
const PILE_H = 25;

const LAYER_ORDER: Layer[] = ['bottom', 'middle', 'top'];

const buildSensorId = (index: number): string =>
  `S${String(index + 1).padStart(2, '0')}`;

const buildPosition = (col: number, row: number, seed: number) => ({
  x: ((col + 0.5) / GRID_COLS) * PILE_W + ((seed % 5) - 2),
  y: ((row + 0.5) / GRID_ROWS) * PILE_H + ((seed % 3) - 1),
});

interface SensorOverride {
  sensorIds: number[];
  temperature: number;
  moisture: number;
  isFaulty?: boolean;
}

const buildSensors = (
  normalTemp: number,
  normalMoisture: number,
  overrides: SensorOverride[],
): SensorReading[] => {
  const overrideMap = new Map<
    number,
    { temperature: number; moisture: number; isFaulty: boolean }
  >();

  for (const override of overrides) {
    for (const id of override.sensorIds) {
      overrideMap.set(id, {
        temperature: override.temperature,
        moisture: override.moisture,
        isFaulty: override.isFaulty ?? false,
      });
    }
  }

  return Array.from({ length: 30 }, (_, i) => {
    const layer = LAYER_ORDER[Math.floor(i / 10)];
    const posInLayer = i % 10;
    const col = posInLayer % GRID_COLS;
    const row = Math.floor(posInLayer / GRID_COLS);
    const position = buildPosition(col, row, i);

    const entry = overrideMap.get(i);
    const temperature = entry
      ? entry.temperature + ((i % 3) - 1) * 0.3
      : normalTemp + ((i % 5) - 2) * 0.5;
    const moisture = entry
      ? entry.moisture + ((i % 3) - 1) * 0.2
      : normalMoisture + ((i % 4) - 1.5) * 0.3;
    const isFaulty = entry?.isFaulty ?? false;

    return {
      sensorId: buildSensorId(i),
      layer,
      position,
      temperature: Math.round(temperature * 10) / 10,
      moisture: Math.round(moisture * 10) / 10,
      status: 'ok' as const,
      isFaulty,
    };
  });
};

const buildPile = (
  id: string,
  name: string,
  grainType: string,
  normalTemp: number,
  normalMoisture: number,
  overrides: SensorOverride[],
): Pile => {
  const sensors = buildSensors(normalTemp, normalMoisture, overrides);

  return {
    id,
    name,
    dimensions: { width: PILE_W, height: PILE_H, depth: 10 },
    grainType,
    sensors,
    status: 'ok',
    avgTemperature: 0,
    avgMoisture: 0,
  };
};

const PILES: Pile[] = [
  buildPile('pile-north', 'Emek North', 'Wheat', 21, 12.5, []),
  buildPile('pile-south', 'Emek South', 'Wheat', 28, 13.2, [
    { sensorIds: [0, 1, 2, 3], temperature: 44, moisture: 16.1 },
  ]),
  buildPile('pile-east', 'Emek East', 'Wheat', 26, 13.0, [
    { sensorIds: [10, 11, 12, 13, 14], temperature: 51, moisture: 18.4 },
    { sensorIds: [27], temperature: 95, moisture: 5.2, isFaulty: true },
  ]),
  buildPile('pile-west', 'Emek West', 'Wheat', 35, 14.8, [
    { sensorIds: [5, 6, 7], temperature: 39, moisture: 16.2 },
  ]),
];

export const SITE: Site = {
  id: 'site-emek',
  name: 'Harish 7',
  address: 'Emek Hefer Industrial Park, Israel',
  piles: PILES,
};
