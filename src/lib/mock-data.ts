import type {
  CommodityPrice,
  GatewayReading,
  Layer,
  Pile,
  SensorReading,
  Site,
  WeatherData,
} from './types';

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
  temperature?: number;
  moisture?: number;
  isFaulty?: boolean;
  batteryPercent?: number;
  lastTransmissionAt?: string;
}

const buildSensors = (
  normalTemp: number,
  normalMoisture: number,
  overrides: SensorOverride[],
): SensorReading[] => {
  const overrideMap = new Map<
    number,
    {
      temperature?: number;
      moisture?: number;
      isFaulty: boolean;
      batteryPercent?: number;
      lastTransmissionAt?: string;
    }
  >();

  for (const override of overrides) {
    for (const id of override.sensorIds) {
      overrideMap.set(id, {
        temperature: override.temperature,
        moisture: override.moisture,
        isFaulty: override.isFaulty ?? false,
        batteryPercent: override.batteryPercent,
        lastTransmissionAt: override.lastTransmissionAt,
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
    const temperature =
      entry?.temperature != null
        ? entry.temperature + ((i % 3) - 1) * 0.3
        : normalTemp + ((i % 5) - 2) * 0.5;
    const moisture =
      entry?.moisture != null
        ? entry.moisture + ((i % 3) - 1) * 0.2
        : normalMoisture + ((i % 4) - 1.5) * 0.3;
    const isFaulty = entry?.isFaulty ?? false;
    const batteryPercent = entry?.batteryPercent ?? 85 + (i % 15);
    const lastTransmissionAt =
      entry?.lastTransmissionAt ?? '2026-03-25T08:00:00Z';

    return {
      sensorId: buildSensorId(i),
      layer,
      position,
      temperature: Math.round(temperature * 10) / 10,
      moisture: Math.round(moisture * 10) / 10,
      status: 'ok' as const,
      isFaulty,
      batteryPercent,
      lastTransmissionAt,
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
  buildPile('pile-east', 'Emek East', 'Wheat', 27, 13.0, [
    { sensorIds: [10, 11, 12, 13, 14], temperature: 51, moisture: 18.4 },
    { sensorIds: [27], temperature: 95, moisture: 5.2, isFaulty: true },
    { sensorIds: [21], batteryPercent: 15 },
  ]),
  buildPile('pile-west', 'Emek West', 'Wheat', 27, 13.0, [
    { sensorIds: [5, 6, 7], temperature: 39, moisture: 16.2 },
    { sensorIds: [28, 29], lastTransmissionAt: '2026-03-24T14:00:00Z' },
  ]),
];

export const SITE: Site = {
  id: 'site-emek',
  name: 'Harish 7',
  address: 'Emek Hefer Industrial Park, Israel',
  piles: PILES,
};

export const GATEWAY_READING: GatewayReading = {
  ambientTemp: 29.4,
  ambientHumidity: 58,
  timestamp: '2026-03-24T08:30:00Z',
};

export const WEATHER_DATA: WeatherData = {
  externalTemp: 32.1,
  humidity: 65,
  wind: 12,
  conditions: 'Clear',
};

export const COMMODITY_PRICE: CommodityPrice = {
  commodity: 'CBOT Wheat',
  price: 542,
  unit: '¢/bushel',
  change: 8,
  changePercent: 1.5,
};
