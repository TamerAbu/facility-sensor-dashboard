import { toAreaPath, toCoords, toPoints } from './sparkline-utils';

interface ChartArea {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface RendererProps {
  tempN: number[];
  moistN: number[];
  area: ChartArea;
  showTemp: boolean;
  showMoist: boolean;
  showDots: boolean;
}

const Dots = ({
  coords,
  fill,
}: {
  coords: { x: number; y: number }[];
  fill: string;
}) => (
  <>
    {coords.map((c, i) => (
      <circle key={i} cx={c.x} cy={c.y} r={2} fill={fill} opacity={0.9} />
    ))}
  </>
);

export const LineRenderer = ({
  tempN,
  moistN,
  area,
  showTemp,
  showMoist,
  showDots,
}: RendererProps) => (
  <>
    {showMoist && (
      <>
        <polyline
          points={toPoints(moistN, area)}
          fill="none"
          stroke="url(#moist-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />
        {showDots && <Dots coords={toCoords(moistN, area)} fill="#3b82f6" />}
      </>
    )}
    {showTemp && (
      <>
        <polyline
          points={toPoints(tempN, area)}
          fill="none"
          stroke="url(#temp-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />
        {showDots && <Dots coords={toCoords(tempN, area)} fill="#ef4444" />}
      </>
    )}
  </>
);

export const AreaRenderer = ({
  tempN,
  moistN,
  area,
  showTemp,
  showMoist,
  showDots,
}: RendererProps) => (
  <>
    {showMoist && (
      <>
        <path d={toAreaPath(moistN, area)} fill="url(#moist-fill)" />
        <polyline
          points={toPoints(moistN, area)}
          fill="none"
          stroke="url(#moist-gradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {showDots && <Dots coords={toCoords(moistN, area)} fill="#3b82f6" />}
      </>
    )}
    {showTemp && (
      <>
        <path d={toAreaPath(tempN, area)} fill="url(#temp-fill)" />
        <polyline
          points={toPoints(tempN, area)}
          fill="none"
          stroke="url(#temp-gradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {showDots && <Dots coords={toCoords(tempN, area)} fill="#ef4444" />}
      </>
    )}
  </>
);

export const BarRenderer = ({
  tempN,
  moistN,
  area,
  showTemp,
  showMoist,
}: Omit<RendererProps, 'showDots'>) => {
  const barW = area.w / (tempN.length * (showTemp && showMoist ? 3 : 2));
  const xPos = (i: number, length: number) =>
    area.x + (i / Math.max(length - 1, 1)) * area.w;

  return (
    <>
      {showMoist &&
        moistN.map((h, i) => {
          const x = xPos(i, moistN.length) + (showTemp ? -barW * 0.6 : 0);
          return (
            <rect
              key={`m${i}`}
              x={x - barW / 2}
              y={area.y + area.h - h}
              width={barW}
              height={Math.max(h, 0.5)}
              fill="url(#moist-gradient)"
              opacity={0.7}
              rx={1.5}
            />
          );
        })}
      {showTemp &&
        tempN.map((h, i) => {
          const x = xPos(i, tempN.length) + (showMoist ? barW * 0.6 : 0);
          return (
            <rect
              key={`t${i}`}
              x={x - barW / 2}
              y={area.y + area.h - h}
              width={barW}
              height={Math.max(h, 0.5)}
              fill="url(#temp-gradient)"
              opacity={0.7}
              rx={1.5}
            />
          );
        })}
    </>
  );
};
