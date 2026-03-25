import {
  BATTERY_CRITICAL_PERCENT,
  BATTERY_WARNING_PERCENT,
  MOISTURE_OK_MAX,
  MOISTURE_WARNING_MAX,
  TEMP_OK_MAX,
  TEMP_WARNING_MAX,
} from '@/lib/constants';

export const tempColor = (value: number): string => {
  if (value > TEMP_WARNING_MAX) return 'text-status-critical';
  if (value >= TEMP_OK_MAX) return 'text-status-warning';
  return 'text-foreground';
};

export const moistureColor = (value: number): string => {
  if (value > MOISTURE_WARNING_MAX) return 'text-status-critical';
  if (value >= MOISTURE_OK_MAX) return 'text-status-warning';
  return 'text-foreground';
};

export const batteryColor = (pct: number): string => {
  if (pct <= BATTERY_CRITICAL_PERCENT) return 'text-status-critical';
  if (pct <= BATTERY_WARNING_PERCENT) return 'text-status-warning';
  return 'text-status-ok';
};
