'use client';

interface RangeBarProps {
  ratio: number;
  color: string;
}

export const RangeBar = ({ ratio, color }: RangeBarProps) => {
  const clampedRatio = Math.max(0, Math.min(1, ratio));

  return (
    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-surface-secondary">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${clampedRatio * 100}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};
