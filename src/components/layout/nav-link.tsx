'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  badge?: number;
}

export const NavLink = ({ href, icon, label, badge }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
        isActive
          ? 'glass-nav-active text-white'
          : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-200'
      }`}
    >
      <span
        className={`transition-colors ${isActive ? 'text-accent' : 'text-slate-500 group-hover:text-slate-400'}`}
      >
        {icon}
      </span>
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-status-critical px-1.5 text-[10px] font-bold tabular-nums text-white shadow-sm shadow-red-500/30">
          {badge}
        </span>
      )}
    </Link>
  );
};
