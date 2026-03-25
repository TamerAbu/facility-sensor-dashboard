import {
  ALERT_CRITICAL_MIN,
  ALERT_WARNING_MIN,
  GAUGE_LABELS,
  HEALTH_CRITICAL_MAX,
  HEALTH_WARNING_MAX,
  MOISTURE_OK_MAX,
  MOISTURE_WARNING_MAX,
  TEMP_OK_MAX,
  TEMP_WARNING_MAX,
} from '@/lib/constants';
import type { SensorStatus } from '@/lib/types';

export const classifyTemp = (value: number): SensorStatus => {
  if (value >= TEMP_WARNING_MAX) return 'critical';
  if (value >= TEMP_OK_MAX) return 'warning';
  return 'ok';
};

export const classifyMoisture = (value: number): SensorStatus => {
  if (value >= MOISTURE_WARNING_MAX) return 'critical';
  if (value >= MOISTURE_OK_MAX) return 'warning';
  return 'ok';
};

export const classifyHealth = (percent: number): SensorStatus => {
  if (percent < HEALTH_CRITICAL_MAX) return 'critical';
  if (percent < HEALTH_WARNING_MAX) return 'warning';
  return 'ok';
};

export const classifyAlerts = (count: number): SensorStatus => {
  if (count >= ALERT_CRITICAL_MIN) return 'critical';
  if (count >= ALERT_WARNING_MIN) return 'warning';
  return 'ok';
};

export const statusLabel = (status: SensorStatus): string => {
  if (status === 'ok') return GAUGE_LABELS.NORMAL;
  if (status === 'warning') return GAUGE_LABELS.ELEVATED;
  return GAUGE_LABELS.CRITICAL_LEVEL;
};
