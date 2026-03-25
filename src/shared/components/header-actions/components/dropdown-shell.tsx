'use client';

import { useEffect, useRef } from 'react';

interface DropdownShellProps {
  children: React.ReactNode;
  onClose: () => void;
  align?: 'left' | 'right';
}

export const DropdownShell = ({
  children,
  onClose,
  align = 'right',
}: DropdownShellProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={`absolute top-full mt-2 w-72 rounded-xl border border-border bg-white p-4 shadow-lg ${
        align === 'right' ? 'right-0' : 'left-0'
      }`}
    >
      {children}
    </div>
  );
};
