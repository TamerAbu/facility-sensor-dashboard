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
  const hasBadge = badge !== undefined && badge > 0;

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`group relative flex items-center rounded-xl px-3.5 py-3 text-[13px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ease-in-out ${
        collapsed ? 'justify-center' : 'gap-3'
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
      <span
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          collapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'
        }`}
      >
        {label}
      </span>
      {hasBadge && (
        <span
          className={`flex items-center justify-center rounded-full bg-status-critical font-bold tabular-nums text-white transition-all duration-300 ease-in-out ${
            collapsed
              ? 'absolute -right-1 -top-1 h-4 min-w-4 px-0.5 text-[8px]'
              : 'ml-auto h-5 min-w-5 px-1.5 text-[10px]'
          }`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
};
