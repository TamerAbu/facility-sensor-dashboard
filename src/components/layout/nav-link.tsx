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
      className={`group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
        isActive
          ? 'glass-nav-active text-white'
          : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
      }`}
    >
      <span
        className={`shrink-0 transition-colors ${isActive ? 'text-accent' : 'text-slate-500 group-hover:text-slate-400'}`}
      >
        {icon}
      </span>
      <span className="overflow-hidden">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span
          className={`flex items-center justify-center rounded-full bg-status-critical font-bold tabular-nums text-white transition-all duration-300 ${
            collapsed
              ? 'absolute -right-0.5 -top-0.5 h-3.5 min-w-3.5 px-0.5 text-[8px]'
              : 'ml-auto h-5 min-w-5 px-1.5 text-[10px] shadow-sm shadow-red-500/30'
          }`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
};
