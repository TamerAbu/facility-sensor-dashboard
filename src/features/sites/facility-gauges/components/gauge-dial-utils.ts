export interface GaugeZone {
  start: number;
  end: number;
  color: string;
}

export const ARC_START_ANGLE = Math.PI;
export const CX = 60;
export const CY = 58;
export const RADIUS = 42;

export const polarToCartesian = (angle: number) => ({
  x: CX + RADIUS * Math.cos(angle),
  y: CY - RADIUS * Math.sin(angle),
});

export const describeArc = (startAngle: number, endAngle: number) => {
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  const largeArc = startAngle - endAngle > Math.PI ? 1 : 0;
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};
