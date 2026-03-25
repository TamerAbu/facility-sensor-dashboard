import { AreaChart, BarChart3, PieChart, TrendingUp } from 'lucide-react';

import type {
  CardVisibility,
  GraphType,
  MetricFilter,
  TimeRange,
} from '@/lib/types';
import { ToggleGroup } from '@/shared/components/toggle-group';
import { ToggleSwitch } from '@/shared/components/toggle-switch';

interface CustomizePanelProps {
  graphType: GraphType;
  metric: MetricFilter;
  timeRange: TimeRange;
  showGrid: boolean;
  showDots: boolean;
  visibility: CardVisibility;
  onGraphTypeChange: (v: GraphType) => void;
  onMetricChange: (v: MetricFilter) => void;
  onTimeRangeChange: (v: TimeRange) => void;
  onShowGridChange: (v: boolean) => void;
  onShowDotsChange: (v: boolean) => void;
  onVisibilityChange: (key: keyof CardVisibility, v: boolean) => void;
}

const ICON = 'h-3.5 w-3.5';

const GRAPH_OPTIONS = [
  {
    value: 'sparkline' as const,
    label: 'Line',
    icon: <TrendingUp className={ICON} />,
  },
  { value: 'bar' as const, label: 'Bar', icon: <BarChart3 className={ICON} /> },
  {
    value: 'area' as const,
    label: 'Area',
    icon: <AreaChart className={ICON} />,
  },
  { value: 'pie' as const, label: 'Pie', icon: <PieChart className={ICON} /> },
];

const METRIC_OPTIONS = [
  { value: 'both' as const, label: 'Both' },
  { value: 'temperature' as const, label: 'Temp' },
  { value: 'moisture' as const, label: 'Moisture' },
];

const TIME_OPTIONS = [
  { value: '3d' as const, label: '3d' },
  { value: '7d' as const, label: '7d' },
  { value: '14d' as const, label: '14d' },
];

const SectionLabel = ({ children }: { children: string }) => (
  <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
    {children}
  </span>
);

export const CustomizePanel = (props: CustomizePanelProps) => (
  <div className="customize-panel rounded-xl border border-border bg-surface p-5">
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col gap-1.5">
        <SectionLabel>Chart Type</SectionLabel>
        <ToggleGroup
          options={GRAPH_OPTIONS}
          active={props.graphType}
          onChange={props.onGraphTypeChange}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <SectionLabel>Metric</SectionLabel>
        <ToggleGroup
          options={METRIC_OPTIONS}
          active={props.metric}
          onChange={props.onMetricChange}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <SectionLabel>Time Range</SectionLabel>
        <ToggleGroup
          options={TIME_OPTIONS}
          active={props.timeRange}
          onChange={props.onTimeRangeChange}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <SectionLabel>Chart Options</SectionLabel>
        <ToggleSwitch
          label="Grid lines"
          checked={props.showGrid}
          onChange={props.onShowGridChange}
        />
        <ToggleSwitch
          label="Data points"
          checked={props.showDots}
          onChange={props.onShowDotsChange}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <SectionLabel>Show Fields</SectionLabel>
        <ToggleSwitch
          label="Temperature"
          checked={props.visibility.temperature}
          onChange={(v) => props.onVisibilityChange('temperature', v)}
        />
        <ToggleSwitch
          label="Moisture"
          checked={props.visibility.moisture}
          onChange={(v) => props.onVisibilityChange('moisture', v)}
        />
        <ToggleSwitch
          label="Battery"
          checked={props.visibility.battery}
          onChange={(v) => props.onVisibilityChange('battery', v)}
        />
        <ToggleSwitch
          label="Last Seen"
          checked={props.visibility.lastSeen}
          onChange={(v) => props.onVisibilityChange('lastSeen', v)}
        />
        <ToggleSwitch
          label="Sensor Type"
          checked={props.visibility.sensorType}
          onChange={(v) => props.onVisibilityChange('sensorType', v)}
        />
      </div>
    </div>
  </div>
);
