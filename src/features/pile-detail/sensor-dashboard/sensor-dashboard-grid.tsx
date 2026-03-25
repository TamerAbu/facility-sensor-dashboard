'use client';

import { useCallback, useState } from 'react';

import { DEFAULT_CARD_VISIBILITY } from '@/lib/constants';
import type {
  CardVisibility,
  GraphType,
  MetricFilter,
  SensorHistory,
  SensorReading,
  SensorViewMode,
  TimeRange,
} from '@/lib/types';

import { CustomizePanel } from './components/customize-panel';
import { DashboardToolbar } from './components/dashboard-toolbar';
import { SensorDashboardCard } from './components/sensor-dashboard-card';
import { SensorDetailCard } from './components/sensor-detail-card';
import { SensorTableView } from './components/sensor-table-view';

interface SensorDashboardGridProps {
  sensors: SensorReading[];
  histories: Record<string, SensorHistory>;
  highlightedSensorId: string | null;
}

const TIME_RANGE_POINTS: Record<TimeRange, number> = {
  '3d': 6,
  '7d': 14,
  '14d': 28,
};

export const SensorDashboardGrid = ({
  sensors,
  histories,
  highlightedSensorId,
}: SensorDashboardGridProps) => {
  const [viewMode, setViewMode] = useState<SensorViewMode>('grid');
  const [graphType, setGraphType] = useState<GraphType>('sparkline');
  const [metric, setMetric] = useState<MetricFilter>('both');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [showCustomize, setShowCustomize] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showDots, setShowDots] = useState(true);
  const [visibility, setVisibility] = useState<CardVisibility>(() => ({
    ...DEFAULT_CARD_VISIBILITY,
  }));

  const handleVisibilityChange = useCallback(
    (key: keyof CardVisibility, value: boolean) => {
      setVisibility((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const pointCount = TIME_RANGE_POINTS[timeRange];
  const chartProps = {
    graphType,
    metric,
    timeRange,
    showGrid,
    showDots,
    visibility,
  };

  return (
    <div className="mt-6">
      <DashboardToolbar
        viewMode={viewMode}
        showCustomize={showCustomize}
        onViewModeChange={setViewMode}
        onToggleCustomize={() => setShowCustomize((p) => !p)}
      />

      {showCustomize && (
        <div className="mt-3">
          <CustomizePanel
            {...chartProps}
            onGraphTypeChange={setGraphType}
            onMetricChange={setMetric}
            onTimeRangeChange={setTimeRange}
            onShowGridChange={setShowGrid}
            onShowDotsChange={setShowDots}
            onVisibilityChange={handleVisibilityChange}
          />
        </div>
      )}

      {viewMode === 'table' && (
        <div className="mt-4">
          <SensorTableView
            sensors={sensors}
            histories={histories}
            filteredPointCount={pointCount}
            {...chartProps}
          />
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {sensors.map((s) => (
            <SensorDashboardCard
              key={s.sensorId}
              sensor={s}
              history={histories[s.sensorId]}
              isHighlighted={s.sensorId === highlightedSensorId}
              filteredPointCount={pointCount}
              {...chartProps}
            />
          ))}
        </div>
      )}

      {viewMode === 'detail' && (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {sensors.map((s) => (
            <SensorDetailCard
              key={s.sensorId}
              sensor={s}
              history={histories[s.sensorId]}
              isHighlighted={s.sensorId === highlightedSensorId}
              filteredPointCount={pointCount}
              {...chartProps}
            />
          ))}
        </div>
      )}
    </div>
  );
};
