'use client';

import type { CSSProperties } from 'react';

type BarColor =
  | 'var(--status-critical)'
  | 'var(--status-warning)'
  | 'var(--status-ok)'
  | 'var(--foreground)';

interface RangeBarProps {
  ratio: number;
  color: BarColor;
}

export const RangeBar = ({ ratio, color }: RangeBarProps) => {
  const clampedRatio = Math.max(0, Math.min(1, ratio));

  const barStyle = {
    '--bar-width': `${clampedRatio * 100}%`,
    '--bar-color': color,
  } as CSSProperties;

  return (
    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-surface-secondary">
      <div
        className="h-full w-[var(--bar-width)] rounded-full bg-[var(--bar-color)] transition-all duration-500"
        style={barStyle}
      />
    </div>
  );
};
