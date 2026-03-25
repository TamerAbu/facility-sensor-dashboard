import type { GeoCoordinate, Layer } from './types';

// Temperature thresholds (°C)
export const TEMP_OK_MAX = 30;
export const TEMP_WARNING_MAX = 45;

// Moisture thresholds (%)
export const MOISTURE_OK_MAX = 14;
export const MOISTURE_WARNING_MAX = 17;

// Faulty sensor detection
export const FAULTY_DEVIATION_THRESHOLD = 15;

// Rate-of-change thresholds
export const RATE_GRADUAL_MIN_RISE = 0.5;
export const RATE_GRADUAL_MIN_CYCLES = 3;
export const RATE_SUDDEN_SPIKE = 8;

// Sensor health thresholds
export const BATTERY_WARNING_PERCENT = 20;
export const BATTERY_CRITICAL_PERCENT = 10;
export const MISSED_TRANSMISSION_THRESHOLD = 2;
export const CYCLE_INTERVAL_HOURS = 12;

// Mock current timestamp
export const CURRENT_TIMESTAMP = '2026-03-25T08:30:00Z';

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
  GRADUAL_RISE:
    'Temperature trending upward. Increase monitoring frequency and prepare aeration.',
  SUDDEN_SPIKE:
    'EMERGENCY: Sudden temperature spike detected. Activate aeration immediately and notify site manager via SMS.',
  LOW_BATTERY_WARNING:
    'Sensor battery below 20%. Schedule battery replacement within 7 days.',
  LOW_BATTERY_CRITICAL:
    'Sensor battery critically low. Replace immediately to avoid data gaps.',
  MISSED_TRANSMISSION:
    'Sensor has missed 2+ transmissions. Check antenna, wiring, or replace unit.',
} as const;

// Alert sort options
export const ALERT_SORT_OPTIONS = [
  { value: 'severity', label: 'Severity' },
  { value: 'pile', label: 'Pile Name' },
  { value: 'type', label: 'Alert Type' },
] as const;

export const SEVERITY_SORT_ORDER: Record<string, number> = {
  critical: 0,
  warning: 1,
};

export const ALERT_TYPE_SORT_ORDER: Record<string, number> = {
  threshold: 0,
  'rate-of-change': 1,
  'sensor-health': 2,
};

// Primary action labels per alert action type
export const PRIMARY_ACTION_LABELS = {
  execute: 'EXECUTE ACTION',
  acknowledge: 'ACKNOWLEDGE',
  'schedule-maintenance': 'SCHEDULE MAINTENANCE',
  'schedule-replacement': 'SCHEDULE REPLACEMENT',
  investigate: 'INVESTIGATE',
} as const;

// Sensor type labels
export const SENSOR_TYPE_LABELS = {
  thermocouple: 'Thermocouple',
  capacitive: 'Capacitive',
  resistive: 'Resistive',
  infrared: 'Infrared',
  'fiber-optic': 'Fiber Optic',
} as const;

// Default card field visibility
export const DEFAULT_CARD_VISIBILITY = {
  temperature: true,
  moisture: true,
  battery: true,
  lastSeen: true,
  sensorType: true,
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
  SORT_LABEL_PREFIX: 'Sorted by',
  DISMISS: 'Dismiss',
  DISMISS_CONFIRM_TITLE: 'Dismiss Alert',
  DISMISS_CONFIRM_MESSAGE:
    'Are you sure? This alert will be removed from the active list.',
  DISMISS_CONFIRM_CANCEL: 'Cancel',
  UNDO: 'UNDO',
  ALERT_DISMISSED: 'Alert dismissed.',
  HANDLED_BY_OPERATOR: 'Handled by operator at',
  ACTIVE_FACILITY: 'Active Facility',
  SITES_OVERVIEW: 'Sites Overview',
  SITES_SUBTITLE: 'Real-time status monitoring for grain storage clusters.',
  GENERATE_REPORT: 'Generate Report',
  SUPPORT: 'Support',
  SIGN_OUT: 'Sign Out',
  ALERT_TYPE_THRESHOLD: 'Threshold',
  ALERT_TYPE_RATE_OF_CHANGE: 'Rate of Change',
  ALERT_TYPE_SENSOR_HEALTH: 'Sensor Health',
  ALERT_FILTER_ALL_TYPES: 'All Types',
  SITES_VIEW_GRID: 'Grid',
  SITES_VIEW_MAP: 'Map',
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
  PILES_AT_RISK: 'piles at risk',
} as const;

// Map view constants — piles in Emek Hefer Industrial Park
export const PILE_COORDINATES: Record<string, GeoCoordinate> = {
  'pile-north': { lat: 32.3922, lng: 34.8798 },
  'pile-south': { lat: 32.3908, lng: 34.88 },
  'pile-east': { lat: 32.3914, lng: 34.8818 },
  'pile-west': { lat: 32.3916, lng: 34.8782 },
};

export const MAP_CENTER: GeoCoordinate = { lat: 32.3915, lng: 34.88 };
export const MAP_DEFAULT_ZOOM = 17;

// Economic urgency calculation
export const PILE_CAPACITY_TONNES = 3000;
export const TONNES_TO_BUSHELS_FACTOR = 36.74;

// Display range ceiling for bar charts
export const TEMP_DISPLAY_CEILING = 70;

// Facility gauge labels
export const GAUGE_LABELS = {
  SENSOR_HEALTH: 'Sensor Health',
  ACTIVE_ALERTS: 'Active Alerts',
  NORMAL: 'Normal',
  ELEVATED: 'Elevated',
  CRITICAL_LEVEL: 'Critical',
  FAULTY_SENSORS: 'Faulty',
  NO_ALERTS: 'All Clear',
  TEMP_TOGGLE: 'Temp',
  MOISTURE_TOGGLE: 'Moisture',
  TREND_TEMP_TITLE: 'Pile Temperature Trends',
  TREND_MOISTURE_TITLE: 'Pile Moisture Trends',
} as const;

// Gauge range limits
export const GAUGE_TEMP_MAX = 60;
export const GAUGE_MOISTURE_MAX = 25;
export const GAUGE_HEALTH_MIN = 0;
export const GAUGE_HEALTH_MAX = 100;
export const GAUGE_ALERTS_MAX = 10;

// Gauge health/alert thresholds
export const HEALTH_CRITICAL_MAX = 60;
export const HEALTH_WARNING_MAX = 85;
export const ALERT_WARNING_MIN = 1;
export const ALERT_CRITICAL_MIN = 4;

// Grain types
export const GRAIN_TYPES = {
  WHEAT: 'Wheat',
  CORN: 'Corn',
  BARLEY: 'Barley',
  SORGHUM: 'Sorghum',
} as const;
