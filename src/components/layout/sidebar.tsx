'use client';

import {
  FileText,
  HelpCircle,
  LayoutGrid,
  PanelLeftClose,
  PanelLeftOpen,
  Radio,
  TriangleAlert,
} from 'lucide-react';
import { useState } from 'react';

import { UI_LABELS } from '@/lib/constants';
import { downloadFacilityReport } from '@/lib/generate-report';
import { SITE } from '@/lib/mock-data';
import { useAlertContext } from '@/features/alerts/alert-context';

import { NavLink } from './nav-link';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const { activeAlertCount } = useAlertContext();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className={`sidebar fixed flex h-screen flex-col overflow-hidden transition-[width] duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Header */}
        <div className="px-5 pt-7 pb-2">
          <div className="flex items-center justify-center">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-white"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <Radio className="h-5 w-5" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                collapsed
                  ? 'ml-0 max-w-0 opacity-0'
                  : 'ml-3 max-w-48 opacity-100'
              }`}
            >
              <span className="whitespace-nowrap text-lg font-bold tracking-tight">
                agriQ
              </span>
              <p className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.2em] text-text-secondary">
                Industrial Sentinel
              </p>
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className={`shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
                collapsed
                  ? 'ml-0 max-w-0 opacity-0'
                  : 'ml-auto max-w-8 opacity-100'
              }`}
              title="Collapse sidebar"
              tabIndex={collapsed ? -1 : 0}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg text-text-secondary hover:bg-border/50">
                <PanelLeftClose className="h-3.5 w-3.5" />
              </div>
            </button>
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
            badge={activeAlertCount}
            collapsed={collapsed}
          />
        </nav>

        {/* Footer */}
        <SidebarFooter collapsed={collapsed} />
      </aside>

      <main
        className={`flex-1 overflow-y-auto p-8 transition-[margin] duration-300 ease-in-out ${
          collapsed ? 'ml-20' : 'ml-72'
        }`}
      >
        {children}
      </main>
    </>
  );
};

const SidebarFooter = ({ collapsed }: { collapsed: boolean }) => (
  <div
    className={`pb-8 transition-[padding] duration-300 ease-in-out ${
      collapsed ? 'px-2' : 'px-4'
    }`}
  >
    <div className="flex flex-col items-center gap-7">
      <button
        type="button"
        onClick={() => downloadFacilityReport(SITE)}
        className={`rounded-xl bg-foreground text-white transition-all duration-300 ease-in-out hover:opacity-80 ${
          collapsed ? 'h-11 w-11' : 'w-full py-3'
        }`}
      >
        <span
          className={`text-[11px] font-bold uppercase tracking-wider transition-opacity duration-300 ${
            collapsed ? 'hidden' : 'inline'
          }`}
        >
          {UI_LABELS.GENERATE_REPORT}
        </span>
        <FileText
          className={`h-4 w-4 transition-opacity duration-300 ${
            collapsed ? 'inline-block' : 'hidden'
          }`}
        />
      </button>
      <div
        className={`flex w-full flex-col gap-6 transition-[padding] duration-300 ease-in-out ${
          collapsed ? 'items-center px-0' : 'px-1'
        }`}
      >
        <FooterLink
          icon={<HelpCircle className="h-5 w-5 shrink-0" />}
          label={UI_LABELS.SUPPORT}
          collapsed={collapsed}
        />
      </div>
    </div>
  </div>
);

interface FooterLinkProps {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  className?: string;
}

const FooterLink = ({
  icon,
  label,
  collapsed,
  className = 'text-text-secondary hover:text-foreground',
}: FooterLinkProps) => (
  <button
    type="button"
    className={`flex items-center gap-2.5 transition-colors ${className}`}
    title={collapsed ? label : undefined}
  >
    {icon}
    <span
      className={`overflow-hidden whitespace-nowrap text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-in-out ${
        collapsed ? 'max-w-0 opacity-0' : 'max-w-48 opacity-100'
      }`}
    >
      {label}
    </span>
  </button>
);
