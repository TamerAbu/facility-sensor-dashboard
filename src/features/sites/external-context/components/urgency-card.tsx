import { ShieldAlert } from 'lucide-react';

import { EXTERNAL_LABELS } from '@/lib/constants';

import type { CommodityPrice, Pile } from '@/lib/types';

interface UrgencyCardProps {
  piles: Pile[];
  price: CommodityPrice;
}

const TONNES_PER_PILE = 3000;
const BUSHELS_PER_TONNE = 36.74;
const CENTS_PER_DOLLAR = 100;

const URGENCY_LEVELS = [
  { max: 0.3, label: 'Low', color: 'text-status-ok', bg: 'bg-status-ok' },
  {
    max: 0.6,
    label: 'Moderate',
    color: 'text-status-warning',
    bg: 'bg-status-warning',
  },
  {
    max: 1,
    label: 'High',
    color: 'text-status-critical',
    bg: 'bg-status-critical',
  },
] as const;

export const UrgencyCard = ({ piles, price }: UrgencyCardProps) => {
  const atRiskPiles = piles.filter((p) => p.status !== 'ok');
  const atRiskTonnes = atRiskPiles.length * TONNES_PER_PILE;
  const atRiskValue = Math.round(
    (atRiskTonnes * BUSHELS_PER_TONNE * price.price) / CENTS_PER_DOLLAR,
  );

  const urgencyScore = atRiskPiles.length / piles.length;
  const level =
    URGENCY_LEVELS.find((l) => urgencyScore <= l.max) ?? URGENCY_LEVELS[2];

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`h-4 w-4 ${level.color}`} />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-secondary">
            {EXTERNAL_LABELS.ECONOMIC_URGENCY}
          </span>
        </div>
        <span className={`text-xs font-bold ${level.color}`}>
          {level.label}
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs text-text-secondary">
            {EXTERNAL_LABELS.AT_RISK_VALUE}
          </p>
          <p className="font-mono text-xl font-bold tabular-nums">
            ${atRiskValue.toLocaleString()}
          </p>
        </div>
        <span className="text-xs text-text-secondary">
          {atRiskPiles.length}/{piles.length} {EXTERNAL_LABELS.PILES_AT_RISK}
        </span>
      </div>
    </div>
  );
};
