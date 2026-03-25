export type SensorStatus = 'ok' | 'warning' | 'critical' | 'faulty';

export type PileStatus = 'ok' | 'warning' | 'critical';

export type Layer = 'bottom' | 'middle' | 'top';

export type AlertSeverity = 'warning' | 'critical';

export type AlertType = 'threshold' | 'rate-of-change' | 'sensor-health';

export type AlertSortOption = 'severity' | 'pile' | 'type';

export type SensorViewMode = 'grid' | 'table' | 'detail';

export type SitesViewMode = 'grid' | 'map';

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export type GraphType = 'sparkline' | 'bar' | 'area' | 'pie';

export type MetricFilter = 'both' | 'temperature' | 'moisture';

export type TimeRange = '3d' | '7d' | '14d';

export type SensorType =
  | 'thermocouple'
  | 'capacitive'
  | 'resistive'
  | 'infrared'
  | 'fiber-optic';

export interface CardVisibility {
  temperature: boolean;
  moisture: boolean;
  battery: boolean;
  lastSeen: boolean;
  sensorType: boolean;
}

export type AlertActionType =
  | 'execute'
  | 'acknowledge'
  | 'schedule-maintenance'
  | 'schedule-replacement'
  | 'investigate';

export type AlertStatus = 'active' | 'handled' | 'dismissed';

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
  batteryPercent: number;
  lastTransmissionAt: string;
  sensorType: SensorType;
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
  coordinates: GeoCoordinate;
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

export interface SensorReadingSummary {
  sensorId: string;
  temperature: number;
  moisture: number;
}

export interface Alert {
  id: string;
  pileId: string;
  pileName: string;
  severity: AlertSeverity;
  affectedSensors: string[];
  readings: SensorReadingSummary[];
  layer: Layer;
  alertType: AlertType;
  description: string;
  recommendedAction: string;
}

export interface HistoricalReading {
  temperature: number;
  moisture: number;
  timestamp: string;
}

export interface SensorHistory {
  sensorId: string;
  readings: HistoricalReading[];
}

export interface TrendDataPoint {
  date: string;
  [key: string]: string | number;
}
