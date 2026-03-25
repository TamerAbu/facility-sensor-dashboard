import type { GraphType, MetricFilter, TimeRange } from '@/lib/types';

import { ChartGradients } from './chart-defs';
import { ChartGrid } from './chart-grid';
import { ChartPie } from './chart-pie';
import { AreaRenderer, BarRenderer, LineRenderer } from './chart-renderers';
import { VW, VH_SM, VH_LG, chartArea, normalize } from './sparkline-utils';

interface SparklineProps {
  tempData: number[];
  moistureData: number[];
  graphType: GraphType;
  metric: MetricFilter;
  timeRange: TimeRange;
  size?: 'sm' | 'lg';
  showGrid?: boolean;
  showDots?: boolean;
}

export const Sparkline = ({
  tempData,
  moistureData,
  graphType,
  metric,
  timeRange,
  size = 'sm',
  showGrid = true,
  showDots = true,
}: SparklineProps) => {
  if (tempData.length === 0 && moistureData.length === 0) return null;

  const vh = size === 'lg' ? VH_LG : VH_SM;
  const area = chartArea(vh);
  const allValues = [...tempData, ...moistureData];
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const tempN = normalize(tempData, minVal, maxVal, area);
  const moistN = normalize(moistureData, minVal, maxVal, area);
  const showTemp = metric !== 'moisture';
  const showMoist = metric !== 'temperature';
  const heightClass = size === 'lg' ? 'h-32' : 'h-20';
  const shared = { tempN, moistN, area, showTemp, showMoist, showDots };
  const isPie = graphType === 'pie';

  return (
    <div className="chart-container">
      <svg viewBox={`0 0 ${VW} ${vh}`} className={`w-full ${heightClass}`}>
        <ChartGradients />
        {!isPie && (
          <ChartGrid
            area={area}
            minVal={minVal}
            maxVal={maxVal}
            timeRange={timeRange}
            showGrid={showGrid}
          />
        )}
        {graphType === 'sparkline' && <LineRenderer {...shared} />}
        {graphType === 'area' && <AreaRenderer {...shared} />}
        {graphType === 'bar' && <BarRenderer {...shared} />}
        {isPie && (
          <ChartPie
            tempValue={tempData[tempData.length - 1]}
            moistValue={moistureData[moistureData.length - 1]}
            showTemp={showTemp}
            showMoist={showMoist}
            vh={vh}
          />
        )}
      </svg>
    </div>
  );
};
