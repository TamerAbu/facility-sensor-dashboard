'use client';

import type { SensorStatus } from '@/lib/types';
import {
  ARC_START_ANGLE,
  CX,
  CY,
  describeArc,
  polarToCartesian,
} from './gauge-dial-utils';
import type { GaugeZone } from './gauge-dial-utils';

export type { GaugeZone } from './gauge-dial-utils';

interface GaugeDialProps {
  label: string;
  value: number;
  displayValue: string;
  statusLabel: string;
  status: SensorStatus;
  min: number;
  max: number;
  zones: GaugeZone[];
}

const STATUS_TEXT_CLASS: Record<SensorStatus, string> = {
  ok: 'text-status-ok',
  warning: 'text-status-warning',
  critical: 'text-status-critical',
  faulty: 'text-status-faulty',
};

export const GaugeDial = ({
  label,
  value,
  displayValue,
  statusLabel,
  status,
  min,
  max,
  zones,
}: GaugeDialProps) => {
  const range = max - min;
  const clampedValue = Math.min(Math.max(value, min), max);
  const fraction = range > 0 ? (clampedValue - min) / range : 0;
  const needleAngle = ARC_START_ANGLE - fraction * Math.PI;
  const needleTip = polarToCartesian(needleAngle);

  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
        {label}
      </p>
      <svg viewBox="0 0 120 75" className="mt-1 w-full max-w-[130px]">
        {zones.map((zone, i) => {
          const zStart =
            ARC_START_ANGLE - ((zone.start - min) / range) * Math.PI;
          const zEnd = ARC_START_ANGLE - ((zone.end - min) / range) * Math.PI;
          return (
            <path
              key={i}
              d={describeArc(zStart, zEnd)}
              fill="none"
              stroke={zone.color}
              strokeWidth="7"
              strokeLinecap="round"
            />
          );
        })}
        <line
          x1={CX}
          y1={CY}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="var(--foreground)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={CX} cy={CY} r="3.5" fill="var(--foreground)" />
      </svg>
      <p className="mt-0.5 font-mono text-xl font-bold">{displayValue}</p>
      <p className={`text-[11px] font-semibold ${STATUS_TEXT_CLASS[status]}`}>
        {statusLabel}
      </p>
    </div>
  );
};
