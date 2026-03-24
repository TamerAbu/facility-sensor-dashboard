import type { Layer } from './types';

// Temperature thresholds (°C)
export const TEMP_OK_MAX = 30;
export const TEMP_WARNING_MAX = 45;

// Moisture thresholds (%)
export const MOISTURE_OK_MAX = 14;
export const MOISTURE_WARNING_MAX = 17;

// Faulty sensor detection
export const FAULTY_DEVIATION_THRESHOLD = 15;

// Pile dimensions (meters)
export const PILE_WIDTH = 50;
export const PILE_HEIGHT = 25;
export const PILE_DEPTH = 10;

// Sensors per layer
export const SENSORS_PER_LAYER = 10;

// Layer definitions
export const LAYER_DEFINITIONS: {
  layer: Layer;
  label: string;
  sensorRange: string;
}[] = [
  { layer: 'bottom', label: 'Bottom', sensorRange: 'S01–S10' },
  { layer: 'middle', label: 'Middle', sensorRange: 'S11–S20' },
  { layer: 'top', label: 'Top', sensorRange: 'S21–S30' },
];

// Recommended actions mapping
export const RECOMMENDED_ACTIONS = {
  BOTTOM_HIGH_TEMP:
    'Turn on aeration fans for bottom zone. Check again in 6 hours.',
  MIDDLE_HIGH_TEMP_MOISTURE: 'URGENT: Begin grain turning or transfer.',
  TOP_HIGH_READINGS: 'Check if external weather is causing surface heating.',
  FAULTY_SENSOR: 'Sensor may be malfunctioning. Schedule physical inspection.',
  BOTH_WARNING:
    'Activate aeration immediately. If no improvement in 12h, begin grain transfer.',
} as const;

// Status labels
export const STATUS_LABELS = {
  ok: 'OK',
  warning: 'Warning',
  critical: 'Critical',
  faulty: 'Faulty',
} as const;

// UI labels
export const UI_LABELS = {
  INVENTORY_ASSET: 'Inventory Asset',
  AVG_TEMPERATURE: 'Avg Temperature',
  AVG_MOISTURE: 'Avg Moisture',
  NOMINAL_OPERATION: 'Nominal Operation',
  INSPECT: 'Inspect',
  PILE_MONITORING: 'Pile Monitoring',
  PROBLEM_SENSORS: 'Problem Sensor',
  ACTIVE_PILES: 'Active Piles',
  BACK_TO_MONITORING: 'Back to Monitoring',
  GRAIN_TYPE_LABEL: 'Grain',
  DIMENSIONS_LABEL: 'Footprint',
  LAYER_AVG_TEMP: 'Layer Avg Temp',
  LAYER_AVG_MOISTURE: 'Layer Avg Moisture',
  LAYER_PROBLEMS: 'Flagged',
  NO_PROBLEMS: 'All Clear',
  SENSORS_LABEL: 'Sensors',
  TEMP_VARIANCE: 'Temp Variance',
  MAX_TEMP: 'Max Temp',
  MIN_TEMP: 'Min Temp',
  MOISTURE_RANGE: 'Moisture Range',
  MAX_MOISTURE: 'Max Moisture',
  MIN_MOISTURE: 'Min Moisture',
  SENSOR_INTEGRITY: 'Sensor Integrity',
  ACTIVE_UNITS: 'Active Units',
  FAULT_REPORTED: 'Fault Reported',
  ALERTS_PAGE_TITLE: 'Active Alerts',
  ALERTS_PAGE_SUBTITLE: 'Alerts requiring immediate attention',
  ALERT_SUMMARY: 'active alerts',
  ALERT_FILTER_ALL: 'All',
  ALERT_FILTER_CRITICAL: 'Critical',
  ALERT_FILTER_WARNING: 'Warning',
  ALERT_AFFECTED_SENSORS: 'Affected Sensors',
  ALERT_RECOMMENDED_ACTION: 'Recommended Action',
  ALERT_LAYER_LABEL: 'Layer',
  NO_ALERTS: 'No active alerts. All systems nominal.',
  NO_MATCHING_ALERTS: 'No alerts match the selected filter.',
  CRITICAL_ALERT: 'Critical Alert',
  WARNING_ALERT: 'Warning',
  SORTED_BY_SEVERITY: 'Sorted by Severity',
  EXECUTE: 'Execute',
  DISMISS: 'Dismiss',
} as const;

// External data labels
export const EXTERNAL_LABELS = {
  WEATHER: 'Weather',
  GATEWAY: 'Cell Ambient',
  COMMODITY: 'CBOT Wheat',
  EXTERNAL_TEMP: 'External',
  AMBIENT_TEMP: 'Ambient',
  HUMIDITY: 'Humidity',
  WIND: 'Wind',
  CONDITIONS: 'Conditions',
  ECONOMIC_URGENCY: 'Economic Urgency',
  AT_RISK_VALUE: 'At-Risk Value',
  PRICE_TREND: 'Price Trend',
} as const;

// Grain types
export const GRAIN_TYPES = {
  WHEAT: 'Wheat',
  CORN: 'Corn',
  BARLEY: 'Barley',
  SORGHUM: 'Sorghum',
} as const;
