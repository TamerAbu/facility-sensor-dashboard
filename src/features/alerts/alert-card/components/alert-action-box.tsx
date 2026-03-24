import { UI_LABELS } from '@/lib/constants';
import type { AlertSeverity } from '@/lib/types';

interface AlertActionBoxProps {
  action: string;
  severity: AlertSeverity;
}

const SEVERITY_STYLES: Record<
  AlertSeverity,
  { border: string; bg: string; label: string }
> = {
  critical: {
    border: 'border-l-status-critical',
    bg: 'bg-status-critical/5',
    label: 'text-status-critical',
  },
  warning: {
    border: 'border-l-status-warning',
    bg: 'bg-status-warning/5',
    label: 'text-status-warning',
  },
};

export const AlertActionBox = ({ action, severity }: AlertActionBoxProps) => {
  const styles = SEVERITY_STYLES[severity];

  return (
    <div
      className={`-mx-8 mt-6 border-l-4 px-8 py-4 ${styles.border} ${styles.bg}`}
    >
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.15em] ${styles.label}`}
      >
        {UI_LABELS.ALERT_RECOMMENDED_ACTION}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed">{action}</p>
    </div>
  );
};
