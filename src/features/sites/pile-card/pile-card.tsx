import Link from 'next/link';
import { AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';
import type { Pile, PileStatus } from '@/lib/types';
import { StatusBadge } from '@/shared/components/status-badge';

interface PileCardProps {
  pile: Pile;
}

const FOOTER_COLORS: Record<PileStatus, string> = {
  ok: 'bg-status-ok/8',
  warning: 'bg-status-warning/8',
  critical: 'bg-status-critical/8',
};

export const PileCard = ({ pile }: PileCardProps) => {
  const problemCount = pile.sensors.filter(
    (s) => s.status === 'warning' || s.status === 'critical' || s.isFaulty,
  ).length;

  return (
    <Link
      href={`/sites/${pile.id}`}
      className="pile-card block cursor-pointer"
      data-status={pile.status}
    >
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
              {UI_LABELS.INVENTORY_ASSET}
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-tight">
              {pile.name}
            </h3>
          </div>
          <StatusBadge status={pile.status} />
        </div>

        <div className="mt-8 flex gap-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-secondary">
              {UI_LABELS.AVG_TEMPERATURE}
            </p>
            <p className="mt-1 font-mono text-4xl font-bold tabular-nums tracking-tighter">
              {pile.avgTemperature.toFixed(1)}
              <span className="relative -top-3 ml-0.5 text-base font-medium text-text-secondary">
                °C
              </span>
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-secondary">
              {UI_LABELS.AVG_MOISTURE}
            </p>
            <p className="mt-1 font-mono text-4xl font-bold tabular-nums tracking-tighter">
              {pile.avgMoisture.toFixed(1)}
              <span className="relative -top-3 ml-0.5 text-base font-medium text-text-secondary">
                %
              </span>
            </p>
          </div>
        </div>
      </div>

      <div
        className={`mt-6 flex items-center justify-between rounded-b-2xl px-6 py-3 ${FOOTER_COLORS[pile.status]}`}
      >
        {problemCount > 0 ? (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-status-warning" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-status-warning">
              {problemCount} {UI_LABELS.PROBLEM_SENSORS}
              {problemCount === 1 ? '' : 's'}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-status-ok" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-status-ok">
              {UI_LABELS.NOMINAL_OPERATION}
            </span>
          </div>
        )}
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-foreground/60">
          {UI_LABELS.INSPECT}
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
};
