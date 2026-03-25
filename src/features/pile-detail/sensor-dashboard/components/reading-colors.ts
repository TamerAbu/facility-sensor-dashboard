export const tempColor = (value: number): string => {
  if (value > 45) return 'text-status-critical';
  if (value >= 30) return 'text-status-warning';
  return 'text-foreground';
};

export const moistureColor = (value: number): string => {
  if (value > 17) return 'text-status-critical';
  if (value >= 14) return 'text-status-warning';
  return 'text-foreground';
};

export const batteryColor = (pct: number): string => {
  if (pct <= 10) return 'text-status-critical';
  if (pct <= 20) return 'text-status-warning';
  return 'text-status-ok';
};
