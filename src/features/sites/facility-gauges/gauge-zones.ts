import {
  ALERT_CRITICAL_MIN,
  ALERT_WARNING_MIN,
  GAUGE_ALERTS_MAX,
  GAUGE_HEALTH_MAX,
  GAUGE_HEALTH_MIN,
  GAUGE_MOISTURE_MAX,
  GAUGE_TEMP_MAX,
  HEALTH_CRITICAL_MAX,
  HEALTH_WARNING_MAX,
  MOISTURE_OK_MAX,
  MOISTURE_WARNING_MAX,
  TEMP_OK_MAX,
  TEMP_WARNING_MAX,
} from '@/lib/constants';
import type { GaugeZone } from './components/gauge-dial-utils';

export const TEMP_ZONES: GaugeZone[] = [
  { start: 0, end: TEMP_OK_MAX, color: 'var(--status-ok)' },
  { start: TEMP_OK_MAX, end: TEMP_WARNING_MAX, color: 'var(--status-warning)' },
  {
    start: TEMP_WARNING_MAX,
    end: GAUGE_TEMP_MAX,
    color: 'var(--status-critical)',
  },
];

export const MOISTURE_ZONES: GaugeZone[] = [
  { start: 0, end: MOISTURE_OK_MAX, color: 'var(--status-ok)' },
  {
    start: MOISTURE_OK_MAX,
    end: MOISTURE_WARNING_MAX,
    color: 'var(--status-warning)',
  },
  {
    start: MOISTURE_WARNING_MAX,
    end: GAUGE_MOISTURE_MAX,
    color: 'var(--status-critical)',
  },
];

export const HEALTH_ZONES: GaugeZone[] = [
  {
    start: GAUGE_HEALTH_MIN,
    end: HEALTH_CRITICAL_MAX,
    color: 'var(--status-critical)',
  },
  {
    start: HEALTH_CRITICAL_MAX,
    end: HEALTH_WARNING_MAX,
    color: 'var(--status-warning)',
  },
  {
    start: HEALTH_WARNING_MAX,
    end: GAUGE_HEALTH_MAX,
    color: 'var(--status-ok)',
  },
];

export const ALERT_ZONES: GaugeZone[] = [
  { start: 0, end: ALERT_WARNING_MIN, color: 'var(--status-ok)' },
  {
    start: ALERT_WARNING_MIN,
    end: ALERT_CRITICAL_MIN,
    color: 'var(--status-warning)',
  },
  {
    start: ALERT_CRITICAL_MIN,
    end: GAUGE_ALERTS_MAX,
    color: 'var(--status-critical)',
  },
];
