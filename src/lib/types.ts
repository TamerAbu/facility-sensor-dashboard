export type SensorStatus = 'ok' | 'warning' | 'critical' | 'faulty';

export type PileStatus = 'ok' | 'warning' | 'critical';

export type Layer = 'bottom' | 'middle' | 'top';

export type AlertSeverity = 'warning' | 'critical';

export interface Position {
  x: number;
  y: number;
}

export interface SensorReading {
  sensorId: string;
  layer: Layer;
  position: Position;
  temperature: number;
  moisture: number;
  status: SensorStatus;
  isFaulty: boolean;
}

export interface Pile {
  id: string;
  name: string;
  dimensions: { width: number; height: number; depth: number };
  grainType: string;
  sensors: SensorReading[];
  status: PileStatus;
  avgTemperature: number;
  avgMoisture: number;
}

export interface Site {
  id: string;
  name: string;
  address: string;
  piles: Pile[];
}

export interface GatewayReading {
  ambientTemp: number;
  ambientHumidity: number;
  timestamp: string;
}

export interface WeatherData {
  externalTemp: number;
  humidity: number;
  wind: number;
  conditions: string;
}

export interface CommodityPrice {
  commodity: string;
  price: number;
  unit: string;
  change: number;
  changePercent: number;
}

export interface Alert {
  id: string;
  pileId: string;
  pileName: string;
  severity: AlertSeverity;
  affectedSensors: string[];
  layer: Layer;
  description: string;
  recommendedAction: string;
}
