import { STATUS_LABELS } from '@/lib/constants';
import type { PileStatus, SensorStatus } from '@/lib/types';

type StatusKey = SensorStatus | PileStatus;

interface StatusBadgeProps {
  status: StatusKey;
}

const STATUS_STYLES: Record<StatusKey, { dot: string; bg: string }> = {
  ok: {
    dot: 'bg-status-ok',
    bg: 'bg-status-ok/8 text-status-ok',
  },
  warning: {
    dot: 'bg-status-warning',
    bg: 'bg-status-warning/8 text-status-warning',
  },
  critical: {
    dot: 'bg-status-critical animate-pulse',
    bg: 'bg-status-critical/8 text-status-critical',
  },
  faulty: {
    dot: 'bg-status-faulty',
    bg: 'bg-status-faulty/8 text-status-faulty',
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${style.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {STATUS_LABELS[status]}
    </span>
  );
};
