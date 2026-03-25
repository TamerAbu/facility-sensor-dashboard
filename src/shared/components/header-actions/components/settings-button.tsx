'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';

import {
  TEMP_OK_MAX,
  TEMP_WARNING_MAX,
  MOISTURE_OK_MAX,
  MOISTURE_WARNING_MAX,
  CYCLE_INTERVAL_HOURS,
} from '@/lib/constants';

import { DropdownShell } from './dropdown-shell';

const THRESHOLD_ROWS = [
  { label: 'Temp OK', value: `< ${TEMP_OK_MAX}°C` },
  { label: 'Temp Warning', value: `${TEMP_OK_MAX}–${TEMP_WARNING_MAX}°C` },
  { label: 'Temp Critical', value: `> ${TEMP_WARNING_MAX}°C` },
  { label: 'Moisture OK', value: `< ${MOISTURE_OK_MAX}%` },
  {
    label: 'Moisture Warning',
    value: `${MOISTURE_OK_MAX}–${MOISTURE_WARNING_MAX}%`,
  },
  { label: 'Moisture Critical', value: `> ${MOISTURE_WARNING_MAX}%` },
  { label: 'Sensor Cycle', value: `${CYCLE_INTERVAL_HOURS}h` },
];

export const SettingsButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg p-1.5 transition-colors hover:bg-border/40"
      >
        <Settings className="h-5 w-5 text-foreground" strokeWidth={2.5} />
      </button>

      {open && (
        <DropdownShell onClose={() => setOpen(false)}>
          <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Facility Thresholds
          </p>
          <div className="mt-3 space-y-1.5">
            {THRESHOLD_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-lg bg-surface-secondary px-3 py-1.5"
              >
                <span className="text-xs text-text-secondary">{row.label}</span>
                <span className="text-xs font-bold tabular-nums">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </DropdownShell>
      )}
    </div>
  );
};
