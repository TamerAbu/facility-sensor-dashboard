import { Radio, Thermometer, TrendingUp } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';
import type { AlertType } from '@/lib/types';

interface AlertTypeBadgeProps {
  alertType: AlertType;
}

const TYPE_CONFIG: Record<
  AlertType,
  { label: string; Icon: typeof Thermometer }
> = {
  threshold: {
    label: UI_LABELS.ALERT_TYPE_THRESHOLD,
    Icon: Thermometer,
  },
  'rate-of-change': {
    label: UI_LABELS.ALERT_TYPE_RATE_OF_CHANGE,
    Icon: TrendingUp,
  },
  'sensor-health': {
    label: UI_LABELS.ALERT_TYPE_SENSOR_HEALTH,
    Icon: Radio,
  },
};

export const AlertTypeBadge = ({ alertType }: AlertTypeBadgeProps) => {
  const { label, Icon } = TYPE_CONFIG[alertType];

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};
