import { ListFilter } from 'lucide-react';

import { UI_LABELS } from '@/lib/constants';
import type { AlertSeverity, AlertType } from '@/lib/types';

type SeverityFilter = 'all' | AlertSeverity;
type TypeFilter = 'all' | AlertType;

interface FilterOption<T extends string> {
  value: T;
  label: string;
}

const SEVERITY_OPTIONS: FilterOption<SeverityFilter>[] = [
  { value: 'all', label: UI_LABELS.ALERT_FILTER_ALL },
  { value: 'critical', label: UI_LABELS.ALERT_FILTER_CRITICAL },
  { value: 'warning', label: UI_LABELS.ALERT_FILTER_WARNING },
];

const TYPE_OPTIONS: FilterOption<TypeFilter>[] = [
  { value: 'all', label: UI_LABELS.ALERT_FILTER_ALL_TYPES },
  { value: 'threshold', label: UI_LABELS.ALERT_TYPE_THRESHOLD },
  { value: 'rate-of-change', label: UI_LABELS.ALERT_TYPE_RATE_OF_CHANGE },
  { value: 'sensor-health', label: UI_LABELS.ALERT_TYPE_SENSOR_HEALTH },
];

interface AlertFilterBarProps {
  activeSeverity: SeverityFilter;
  activeType: TypeFilter;
  onSeverityChange: (value: SeverityFilter) => void;
  onTypeChange: (value: TypeFilter) => void;
}

const FilterPills = <T extends string>({
  options,
  active,
  onChange,
}: {
  options: FilterOption<T>[];
  active: T;
  onChange: (value: T) => void;
}) => (
  <div className="flex gap-2">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
          active === option.value
            ? 'bg-foreground text-white'
            : 'bg-surface-secondary text-text-secondary hover:bg-border'
        }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);

export const AlertFilterBar = ({
  activeSeverity,
  activeType,
  onSeverityChange,
  onTypeChange,
}: AlertFilterBarProps) => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <FilterPills
        options={SEVERITY_OPTIONS}
        active={activeSeverity}
        onChange={onSeverityChange}
      />
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <ListFilter className="h-4 w-4" />
        {UI_LABELS.SORTED_BY_SEVERITY}
      </div>
    </div>
    <FilterPills
      options={TYPE_OPTIONS}
      active={activeType}
      onChange={onTypeChange}
    />
  </div>
);

export type { SeverityFilter, TypeFilter };
