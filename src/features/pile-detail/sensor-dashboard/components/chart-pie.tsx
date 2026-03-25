interface ChartPieProps {
  tempValue: number;
  moistValue: number;
  showTemp: boolean;
  showMoist: boolean;
  vh: number;
}

const describeArc = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string => {
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
};

export const ChartPie = ({
  tempValue,
  moistValue,
  showTemp,
  showMoist,
  vh,
}: ChartPieProps) => {
  const cx = 100;
  const cy = vh / 2;
  const r = Math.min(vh / 2 - 6, 40);

  const total = (showTemp ? tempValue : 0) + (showMoist ? moistValue : 0) || 1;
  const tempPct = showTemp ? tempValue / total : 0;
  const moistPct = showMoist ? moistValue / total : 0;

  const tempEnd = tempPct * 360;
  const moistEnd = tempEnd + moistPct * 360;

  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="url(#pie-empty)" />
      {showTemp && tempPct > 0 && (
        <path
          d={describeArc(cx, cy, r, 0, Math.min(tempEnd, 359.9))}
          fill="url(#pie-temp)"
          opacity={0.85}
        />
      )}
      {showMoist && moistPct > 0 && (
        <path
          d={describeArc(cx, cy, r, tempEnd, Math.min(moistEnd, 359.9))}
          fill="url(#pie-moist)"
          opacity={0.85}
        />
      )}
      {showTemp && (
        <text
          x={cx - r - 4}
          y={cy + 3}
          textAnchor="end"
          className="chart-label-bright"
        >
          {tempValue}°C
        </text>
      )}
      {showMoist && (
        <text
          x={cx + r + 4}
          y={cy + 3}
          textAnchor="start"
          className="chart-label-bright"
        >
          {moistValue}%
        </text>
      )}
    </>
  );
};
