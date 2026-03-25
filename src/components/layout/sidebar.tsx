'use client';

import {
  LayoutGrid,
  MapPin,
  PanelLeftClose,
  PanelLeftOpen,
  Radio,
  TriangleAlert,
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
        className={`sidebar fixed flex h-screen flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <div className="px-4 py-6">
          <div className="flex items-center justify-center">
            {collapsed ? (
              <button
                onClick={() => setCollapsed(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-white"
                title="Expand sidebar"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </button>
            ) : (
              <>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground">
                  <Radio className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <span className="whitespace-nowrap text-lg font-bold tracking-tight">
                    agriQ
                  </span>
                  <p className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.2em] text-text-secondary">
                    Industrial Sentinel
                  </p>
                </div>
                <button
                  onClick={() => setCollapsed(true)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-secondary"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 px-3 pt-4">
          <NavLink
            href="/sites"
            icon={<LayoutGrid className="h-[18px] w-[18px]" />}
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

        <div className="border-t border-border px-4 py-4">
          <div className="flex flex-col gap-2 overflow-hidden">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="whitespace-nowrap text-xs">
                {siteName}, Emek Hefer
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-status-ok" />
              <span className="whitespace-nowrap text-xs text-text-secondary">
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
