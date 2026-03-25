import type { ReactNode } from 'react';

import { SITE } from '@/lib/mock-data';
import { generateAlerts, processSiteData } from '@/lib/risk-engine';

import { Sidebar } from './sidebar';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const processedPiles = processSiteData(SITE.piles);
  const alerts = generateAlerts(processedPiles);

  return <Sidebar alertCount={alerts.length}>{children}</Sidebar>;
};
