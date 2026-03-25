import { Grid3x3, LayoutList, Maximize2, Settings2 } from 'lucide-react';

import type { SensorViewMode } from '@/lib/types';
import { ToggleGroup } from '@/shared/components/toggle-group';

interface DashboardToolbarProps {
  viewMode: SensorViewMode;
  showCustomize: boolean;
  onViewModeChange: (mode: SensorViewMode) => void;
  onToggleCustomize: () => void;
}

const ICON = 'h-3.5 w-3.5';

const VIEW_OPTIONS = [
  { value: 'grid' as const, label: 'Grid', icon: <Grid3x3 className={ICON} /> },
  {
    value: 'table' as const,
    label: 'Table',
    icon: <LayoutList className={ICON} />,
  },
  {
    value: 'detail' as const,
    label: 'Detail',
    icon: <Maximize2 className={ICON} />,
  },
];

export const DashboardToolbar = ({
  viewMode,
  showCustomize,
  onViewModeChange,
  onToggleCustomize,
}: DashboardToolbarProps) => (
  <div className="flex items-center justify-between">
    <ToggleGroup
      options={VIEW_OPTIONS}
      active={viewMode}
      onChange={onViewModeChange}
    />
    <button
      type="button"
      onClick={onToggleCustomize}
      className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${
        showCustomize
          ? 'bg-foreground text-white'
          : 'bg-surface-secondary text-text-secondary hover:text-foreground'
      }`}
    >
      <Settings2 className="h-3.5 w-3.5" />
      Customize
    </button>
  </div>
);
