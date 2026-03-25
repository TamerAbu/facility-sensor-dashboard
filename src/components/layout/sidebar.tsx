'use client';

import {
  HelpCircle,
  LayoutGrid,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Radio,
  TriangleAlert,
} from 'lucide-react';
import { useState } from 'react';

import { UI_LABELS } from '@/lib/constants';

import { NavLink } from './nav-link';

interface SidebarProps {
  alertCount: number;
  children: React.ReactNode;
}

export const Sidebar = ({ alertCount, children }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className={`sidebar fixed flex h-screen flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Logo */}
        <div className="px-5 pt-7 pb-2">
          <div className="flex items-center justify-center">
            {collapsed ? (
              <button
                onClick={() => setCollapsed(false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-white"
                title="Expand sidebar"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </button>
            ) : (
              <>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground">
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
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-border/50"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-2 px-3 pt-8">
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

        {/* Footer */}
        <div className="px-4 pb-8">
          <div className="flex flex-col gap-5 overflow-hidden">
            <button
              type="button"
              className="w-full rounded-xl bg-foreground px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-80"
            >
              {UI_LABELS.GENERATE_REPORT}
            </button>
            <div className="flex flex-col gap-4 px-1">
              <button
                type="button"
                className="flex items-center gap-2.5 text-text-secondary transition-colors hover:text-foreground"
              >
                <HelpCircle className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider">
                  {UI_LABELS.SUPPORT}
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-2.5 text-status-critical transition-opacity hover:opacity-70"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider">
                  {UI_LABELS.SIGN_OUT}
                </span>
              </button>
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
