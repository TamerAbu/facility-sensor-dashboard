'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  badge?: number;
  collapsed?: boolean;
}

export const NavLink = ({
  href,
  icon,
  label,
  badge,
  collapsed,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`group relative flex items-center rounded-xl text-[13px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
        collapsed
          ? 'mx-auto h-11 w-11 justify-center overflow-visible'
          : 'gap-3 overflow-hidden px-3.5 py-3'
      } ${
        isActive
          ? `text-foreground ${collapsed ? 'bg-[var(--surface)]' : 'sidebar-nav-active'}`
          : 'text-text-secondary hover:bg-surface-secondary hover:text-foreground'
      }`}
    >
      <span
        className={`shrink-0 transition-colors ${isActive ? 'text-foreground' : 'text-text-secondary group-hover:text-foreground'}`}
      >
        {icon}
      </span>
      {badge !== undefined && badge > 0 && collapsed && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-status-critical px-0.5 text-[8px] font-bold tabular-nums text-white">
          {badge}
        </span>
      )}
      {!collapsed && <span className="overflow-hidden">{label}</span>}
      {badge !== undefined && badge > 0 && !collapsed && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-status-critical px-1.5 text-[10px] font-bold tabular-nums text-white">
          {badge}
        </span>
      )}
    </Link>
  );
};
