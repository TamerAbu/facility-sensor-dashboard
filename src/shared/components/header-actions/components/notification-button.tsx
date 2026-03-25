'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, ChevronRight } from 'lucide-react';

import { useAlertContext } from '@/features/alerts/alert-context';

import { DropdownShell } from './dropdown-shell';

export const NotificationButton = () => {
  const [open, setOpen] = useState(false);
  const { activeCriticalCount, activeWarningCount, activeAlertCount } =
    useAlertContext();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative rounded-lg p-1.5 transition-colors hover:bg-border/40"
      >
        <Bell className="h-5 w-5 text-foreground" strokeWidth={2.5} />
        {activeAlertCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-status-critical text-[9px] font-bold text-white">
            {activeAlertCount}
          </span>
        )}
      </button>

      {open && (
        <DropdownShell onClose={() => setOpen(false)}>
          <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
            Notifications
          </p>
          <div className="mt-3 space-y-2">
            {activeAlertCount === 0 ? (
              <p className="py-3 text-center text-sm text-text-secondary">
                All systems nominal
              </p>
            ) : (
              <>
                {activeCriticalCount > 0 && (
                  <div className="flex items-center gap-3 rounded-lg bg-status-critical/10 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-status-critical" />
                    <span className="text-sm font-semibold text-status-critical">
                      {activeCriticalCount} critical alert
                      {activeCriticalCount > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {activeWarningCount > 0 && (
                  <div className="flex items-center gap-3 rounded-lg bg-status-warning/10 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-status-warning" />
                    <span className="text-sm font-semibold text-status-warning">
                      {activeWarningCount} warning alert
                      {activeWarningCount > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          <Link
            href="/alerts"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-foreground px-3 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
          >
            View all alerts
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </DropdownShell>
      )}
    </div>
  );
};
