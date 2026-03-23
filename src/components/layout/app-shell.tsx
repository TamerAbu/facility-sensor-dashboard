import { Bell, MapPin, Warehouse } from 'lucide-react';
import type { ReactNode } from 'react';

import { SITE } from '@/lib/mock-data';
import { generateAlerts, processSiteData } from '@/lib/risk-engine';

import { NavLink } from './nav-link';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const processedPiles = processSiteData(SITE.piles);
  const alerts = generateAlerts(processedPiles);
  const alertCount = alerts.length;

  return (
    <div className="flex h-full min-h-screen">
      <aside className="glass-sidebar fixed flex h-screen w-60 flex-col">
        <div className="border-b border-white/[0.06] px-5 py-6">
          <div className="flex items-center gap-2.5">
            <div className="glass-logo flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-sm font-bold text-white">aQ</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              agriQ
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-slate-400">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{SITE.name}, Emek Hefer</span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 pt-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            Monitor
          </p>
          <NavLink
            href="/sites"
            icon={<Warehouse className="h-[18px] w-[18px]" />}
            label="Sites"
          />
          <NavLink
            href="/alerts"
            icon={<Bell className="h-[18px] w-[18px]" />}
            label="Alerts"
            badge={alertCount}
          />
        </nav>

        <div className="border-t border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-status-ok" />
            <span className="text-xs text-slate-500">
              All systems operational
            </span>
          </div>
        </div>
      </aside>

      <main className="ml-60 flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
};
