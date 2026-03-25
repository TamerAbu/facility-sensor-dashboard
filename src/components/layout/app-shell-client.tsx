'use client';

import type { ReactNode } from 'react';

import type { Alert } from '@/lib/types';
import { AlertProvider } from '@/features/alerts/alert-provider';

import { Sidebar } from './sidebar';

interface AppShellClientProps {
  alerts: Alert[];
  children: ReactNode;
}

export const AppShellClient = ({ alerts, children }: AppShellClientProps) => (
  <AlertProvider alerts={alerts}>
    <Sidebar>{children}</Sidebar>
  </AlertProvider>
);
