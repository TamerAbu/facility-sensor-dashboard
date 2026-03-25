import { UI_LABELS } from '@/lib/constants';
import type { AlertSeverity } from '@/lib/types';

export const LAYER_LABEL: Record<string, string> = {
  bottom: 'Bottom Layer',
  middle: 'Middle Layer',
  top: 'Top Layer',
};

export const SEVERITY_CONFIG: Record<
  AlertSeverity,
  { label: string; color: string; iconColor: string }
> = {
  critical: {
    label: UI_LABELS.CRITICAL_ALERT,
    color: 'text-status-critical',
    iconColor: 'text-status-critical',
  },
  warning: {
    label: UI_LABELS.WARNING_ALERT,
    color: 'text-status-warning',
    iconColor: 'text-status-warning',
  },
};
