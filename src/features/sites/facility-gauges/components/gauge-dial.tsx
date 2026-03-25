'use client';

import type { SensorStatus } from '@/lib/types';

export interface GaugeZone {
  start: number;
  end: number;
  color: string;
}

export interface GaugeDialProps {
  label: string;
  value: number;
  displayValue: string;
  statusLabel: string;
  status: SensorStatus;
  min: number;
  max: number;
  zones: GaugeZone[];
}

const ARC_START_ANGLE = Math.PI;
const CX = 60;
const CY = 58;
const RADIUS = 42;

const polarToCartesian = (angle: number) => ({
  x: CX + RADIUS * Math.cos(angle),
  y: CY - RADIUS * Math.sin(angle),
});

const describeArc = (startAngle: number, endAngle: number) => {
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  const largeArc = startAngle - endAngle > Math.PI ? 1 : 0;
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};

const STATUS_COLORS: Record<SensorStatus, string> = {
  ok: 'var(--status-ok)',
  warning: 'var(--status-warning)',
  critical: 'var(--status-critical)',
  faulty: 'var(--status-faulty)',
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
  const clampedValue = Math.min(Math.max(value, min), max);
  const fraction = (clampedValue - min) / (max - min);
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
            ARC_START_ANGLE - ((zone.start - min) / (max - min)) * Math.PI;
          const zEnd =
            ARC_START_ANGLE - ((zone.end - min) / (max - min)) * Math.PI;
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
      <p
        className="text-[11px] font-semibold"
        style={{ color: STATUS_COLORS[status] }}
      >
        {statusLabel}
      </p>
    </div>
  );
};
