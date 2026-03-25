'use client';

import { useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { GAUGE_LABELS } from '@/lib/constants';
import type { TrendDataPoint } from '@/lib/types';
import { MetricToggle } from './metric-toggle';
import { METRIC_CONFIG, PILE_COLORS } from './trend-chart-config';
import type { TrendMetric } from './trend-chart-config';

interface PileTrendChartProps {
  data: TrendDataPoint[];
  pileNames: string[];
}

export const PileTrendChart = ({ data, pileNames }: PileTrendChartProps) => {
  const [metric, setMetric] = useState<TrendMetric>('temperature');
  const config = METRIC_CONFIG[metric];
  const title =
    metric === 'temperature'
      ? GAUGE_LABELS.TREND_TEMP_TITLE
      : GAUGE_LABELS.TREND_MOISTURE_TITLE;

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold">{title}</p>
        <MetricToggle metric={metric} onChange={setMetric} />
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
            tickLine={false}
          />
          <YAxis
            unit={config.unit}
            tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
            tickLine={false}
            width={50}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Legend
            iconType="plainline"
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
          />
          <ReferenceLine
            y={config.threshold}
            stroke="var(--status-warning)"
            strokeDasharray="4 4"
            label={{
              value: config.thresholdLabel,
              position: 'insideTopRight',
              fontSize: 10,
              fill: 'var(--status-warning)',
            }}
          />
          {pileNames.map((name, i) => (
            <Line
              key={name}
              type="monotone"
              dataKey={`${name}_${metric}`}
              name={name}
              stroke={PILE_COLORS[i % PILE_COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
