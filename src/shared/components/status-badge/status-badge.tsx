import type { PileStatus, SensorStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: SensorStatus | PileStatus;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; bg: string }
> = {
  ok: {
    label: 'OK',
    dot: 'bg-status-ok',
    bg: 'bg-status-ok/8 text-status-ok',
  },
  warning: {
    label: 'Warning',
    dot: 'bg-status-warning',
    bg: 'bg-status-warning/8 text-status-warning',
  },
  critical: {
    label: 'Critical',
    dot: 'bg-status-critical animate-pulse',
    bg: 'bg-status-critical/8 text-status-critical',
  },
  faulty: {
    label: 'Faulty',
    dot: 'bg-status-faulty',
    bg: 'bg-status-faulty/8 text-status-faulty',
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${config.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};
