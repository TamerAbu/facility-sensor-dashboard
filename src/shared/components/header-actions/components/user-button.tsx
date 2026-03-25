'use client';

import { useState } from 'react';
import { LogOut, Mail, Shield, User } from 'lucide-react';

import { DropdownShell } from './dropdown-shell';

const MOCK_USER = {
  name: 'David Cohen',
  role: 'Operator',
  email: 'david.c@agriq.farm',
};

export const UserButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground transition-opacity hover:opacity-80"
      >
        <User className="h-5 w-5 text-white" />
      </button>

      {open && (
        <DropdownShell onClose={() => setOpen(false)}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">{MOCK_USER.name}</p>
              <p className="text-xs text-text-secondary">{MOCK_USER.role}</p>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary">
              <Mail className="h-4 w-4" />
              {MOCK_USER.email}
            </div>
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary">
              <Shield className="h-4 w-4" />
              Role: {MOCK_USER.role}
            </div>
          </div>
          <div className="mt-3 border-t border-border pt-3">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-status-critical transition-colors hover:bg-status-critical/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </DropdownShell>
      )}
    </div>
  );
};
