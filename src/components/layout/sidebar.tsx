'use client';

import {
  MapPin,
  PanelLeftClose,
  PanelLeftOpen,
  TriangleAlert,
  Warehouse,
} from 'lucide-react';
import { useState } from 'react';

import { NavLink } from './nav-link';

interface SidebarProps {
  alertCount: number;
  siteName: string;
  children: React.ReactNode;
}

export const Sidebar = ({ alertCount, siteName, children }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className={`glass-sidebar fixed flex h-screen flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <div className="border-b border-white/[0.06] px-4 py-5">
          <div className="flex h-8 items-center justify-center">
            {collapsed ? (
              <button
                onClick={() => setCollapsed(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-200"
                title="Expand sidebar"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </button>
            ) : (
              <>
                <div className="glass-logo flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                  <span className="text-sm font-bold text-white">aQ</span>
                </div>
                <span className="ml-2.5 flex-1 whitespace-nowrap text-lg font-bold tracking-tight text-white">
                  agriQ
                </span>
                <button
                  onClick={() => setCollapsed(true)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-200"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 pt-4">
          <div className="mb-2 h-5 overflow-hidden px-3">
            <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Monitor
            </p>
          </div>
          <NavLink
            href="/sites"
            icon={<Warehouse className="h-[18px] w-[18px]" />}
            label="Sites"
            collapsed={collapsed}
          />
          <NavLink
            href="/alerts"
            icon={<TriangleAlert className="h-[18px] w-[18px]" />}
            label="Alerts"
            badge={alertCount}
            collapsed={collapsed}
          />
        </nav>

        <div className="border-t border-white/[0.06] px-4 py-4">
          <div className="flex flex-col gap-2 overflow-hidden">
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="whitespace-nowrap text-xs">
                {siteName}, Emek Hefer
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-status-ok" />
              <span className="whitespace-nowrap text-xs text-slate-500">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </aside>

      <main
        className={`flex-1 overflow-y-auto p-8 transition-all duration-300 ease-in-out ${
          collapsed ? 'ml-16' : 'ml-60'
        }`}
      >
        {children}
      </main>
    </>
  );
};
