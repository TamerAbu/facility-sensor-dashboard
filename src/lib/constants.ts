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

// Grain types
export const GRAIN_TYPES = {
  WHEAT: 'Wheat',
  CORN: 'Corn',
  BARLEY: 'Barley',
  SORGHUM: 'Sorghum',
} as const;
