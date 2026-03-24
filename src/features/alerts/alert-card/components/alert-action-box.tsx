import { Wrench } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';

interface AlertActionBoxProps {
  action: string;
}

export const AlertActionBox = ({ action }: AlertActionBoxProps) => (
  <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 px-4 py-3">
    <div className="flex items-start gap-2.5">
      <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
          {UI_LABELS.ALERT_RECOMMENDED_ACTION}
        </p>
        <p className="mt-1 text-sm leading-relaxed">{action}</p>
      </div>
    </div>
  </div>
);
