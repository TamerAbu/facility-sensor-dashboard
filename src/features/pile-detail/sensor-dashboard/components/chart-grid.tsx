interface ChartGridProps {
  area: { x: number; y: number; w: number; h: number };
  minVal: number;
  maxVal: number;
  timeRange: string;
  showGrid: boolean;
}

export const ChartGrid = ({
  area,
  minVal,
  maxVal,
  timeRange,
  showGrid,
}: ChartGridProps) => {
  const midVal = Math.round(((minVal + maxVal) / 2) * 10) / 10;

  return (
    <>
      {showGrid &&
        [0.25, 0.5, 0.75].map((pct) => (
          <line
            key={pct}
            x1={area.x}
            y1={area.y + area.h * (1 - pct)}
            x2={area.x + area.w}
            y2={area.y + area.h * (1 - pct)}
            stroke="rgba(0,0,0,0.06)"
            strokeDasharray="3,3"
          />
        ))}
      <line
        x1={area.x}
        y1={area.y + area.h}
        x2={area.x + area.w}
        y2={area.y + area.h}
        stroke="rgba(0,0,0,0.08)"
      />
      <text
        x={area.x - 3}
        y={area.y + 3}
        textAnchor="end"
        className="chart-label"
      >
        {maxVal}
      </text>
      <text
        x={area.x - 3}
        y={area.y + area.h / 2 + 2}
        textAnchor="end"
        className="chart-label"
      >
        {midVal}
      </text>
      <text
        x={area.x - 3}
        y={area.y + area.h}
        textAnchor="end"
        className="chart-label"
      >
        {minVal}
      </text>
      <text
        x={area.x}
        y={area.y + area.h + 11}
        textAnchor="start"
        className="chart-label"
      >
        -{timeRange}
      </text>
      <text
        x={area.x + area.w}
        y={area.y + area.h + 11}
        textAnchor="end"
        className="chart-label"
      >
        now
      </text>
    </>
  );
};
