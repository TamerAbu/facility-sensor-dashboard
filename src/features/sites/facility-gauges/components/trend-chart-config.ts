import { MOISTURE_OK_MAX, TEMP_OK_MAX } from '@/lib/constants';

export type TrendMetric = 'temperature' | 'moisture';

export const PILE_COLORS = ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6'];

export const METRIC_CONFIG: Record<
  TrendMetric,
  { unit: string; threshold: number; thresholdLabel: string }
> = {
  temperature: {
    unit: '°C',
    threshold: TEMP_OK_MAX,
    thresholdLabel: `${TEMP_OK_MAX}°C Warning`,
  },
  moisture: {
    unit: '%',
    threshold: MOISTURE_OK_MAX,
    thresholdLabel: `${MOISTURE_OK_MAX}% Warning`,
  },
};
