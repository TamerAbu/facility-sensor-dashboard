export const VW = 200;
export const VH_SM = 60;
export const VH_LG = 100;
const LEFT_PAD = 28;
const RIGHT_PAD = 6;
const TOP_PAD = 8;
const BOTTOM_PAD = 14;

export const chartArea = (vh: number) => ({
  x: LEFT_PAD,
  y: TOP_PAD,
  w: VW - LEFT_PAD - RIGHT_PAD,
  h: vh - TOP_PAD - BOTTOM_PAD,
});

export const normalize = (
  data: number[],
  min: number,
  max: number,
  area: { h: number },
): number[] => {
  const range = max - min || 1;
  return data.map((v) => ((v - min) / range) * area.h);
};

export const toPoints = (
  normalized: number[],
  area: { x: number; y: number; w: number; h: number },
): string =>
  normalized
    .map((y, i) => {
      const x = area.x + (i / Math.max(normalized.length - 1, 1)) * area.w;
      return `${x},${area.y + area.h - y}`;
    })
    .join(' ');

export const toCoords = (
  normalized: number[],
  area: { x: number; y: number; w: number; h: number },
): { x: number; y: number }[] =>
  normalized.map((y, i) => ({
    x: area.x + (i / Math.max(normalized.length - 1, 1)) * area.w,
    y: area.y + area.h - y,
  }));

export const toAreaPath = (
  normalized: number[],
  area: { x: number; y: number; w: number; h: number },
): string => {
  const coords = toCoords(normalized, area);
  const baseline = area.y + area.h;
  const start = `M${coords[0].x},${baseline}`;
  const line = coords.map((p) => `L${p.x},${p.y}`).join('');
  const end = `L${coords[coords.length - 1].x},${baseline}Z`;
  return `${start}${line}${end}`;
};
