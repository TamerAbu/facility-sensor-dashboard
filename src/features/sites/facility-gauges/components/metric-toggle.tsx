'use client';

import { GAUGE_LABELS } from '@/lib/constants';
import type { TrendMetric } from './trend-chart-config';

interface MetricToggleProps {
  metric: TrendMetric;
  onChange: (metric: TrendMetric) => void;
}

export const MetricToggle = ({ metric, onChange }: MetricToggleProps) => {
  const baseClass =
    'rounded-md px-3 py-1 text-xs font-medium transition-colors';
  const activeClass = 'bg-surface text-foreground shadow-sm';
  const inactiveClass = 'text-text-secondary hover:text-foreground';

  return (
    <div className="flex gap-1 rounded-lg border border-border bg-surface-secondary p-0.5">
      <button
        onClick={() => onChange('temperature')}
        className={`${baseClass} ${metric === 'temperature' ? activeClass : inactiveClass}`}
      >
        {GAUGE_LABELS.TEMP_TOGGLE}
      </button>
      <button
        onClick={() => onChange('moisture')}
        className={`${baseClass} ${metric === 'moisture' ? activeClass : inactiveClass}`}
      >
        {GAUGE_LABELS.MOISTURE_TOGGLE}
      </button>
    </div>
  );
};
