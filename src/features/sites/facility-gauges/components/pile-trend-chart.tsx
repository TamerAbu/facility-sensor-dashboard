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

import { MOISTURE_OK_MAX, TEMP_OK_MAX } from '@/lib/constants';
import type { TrendDataPoint } from '@/lib/types';

type TrendMetric = 'temperature' | 'moisture';

const PILE_COLORS = ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6'];

const METRIC_CONFIG: Record<
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

interface PileTrendChartProps {
  data: TrendDataPoint[];
  pileNames: string[];
}

export const PileTrendChart = ({ data, pileNames }: PileTrendChartProps) => {
  const [metric, setMetric] = useState<TrendMetric>('temperature');
  const config = METRIC_CONFIG[metric];

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold">
          Pile {metric === 'temperature' ? 'Temperature' : 'Moisture'} Trends
        </p>
        <div className="flex gap-1 rounded-lg border border-border bg-surface-secondary p-0.5">
          <button
            onClick={() => setMetric('temperature')}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              metric === 'temperature'
                ? 'bg-surface text-foreground shadow-sm'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            Temp
          </button>
          <button
            onClick={() => setMetric('moisture')}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              metric === 'moisture'
                ? 'bg-surface text-foreground shadow-sm'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            Moisture
          </button>
        </div>
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
