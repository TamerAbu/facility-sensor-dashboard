import { UI_LABELS } from '@/lib/constants';
import type { AlertSeverity } from '@/lib/types';

interface AlertActionBoxProps {
  action: string;
  severity: AlertSeverity;
}

const SEVERITY_BORDER: Record<AlertSeverity, string> = {
  critical: 'border-l-status-critical',
  warning: 'border-l-status-warning',
};

const SEVERITY_BG: Record<AlertSeverity, string> = {
  critical: 'bg-status-critical/5',
  warning: 'bg-status-warning/5',
};

export const AlertActionBox = ({ action, severity }: AlertActionBoxProps) => (
  <div
    className={`mt-5 rounded-r-lg border-l-4 py-3 pr-4 pl-4 ${SEVERITY_BORDER[severity]} ${SEVERITY_BG[severity]}`}
  >
    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-status-critical">
      {UI_LABELS.ALERT_RECOMMENDED_ACTION}
    </p>
    <p className="mt-1 text-sm leading-relaxed">{action}</p>
  </div>
);
