import {
  BATTERY_CRITICAL_PERCENT,
  BATTERY_WARNING_PERCENT,
  CYCLE_INTERVAL_HOURS,
  MISSED_TRANSMISSION_THRESHOLD,
} from './constants';

export const classifyBattery = (
  batteryPercent: number,
): 'ok' | 'warning' | 'critical' => {
  if (batteryPercent < BATTERY_CRITICAL_PERCENT) return 'critical';
  if (batteryPercent < BATTERY_WARNING_PERCENT) return 'warning';
  return 'ok';
};

export const detectMissedTransmission = (
  lastTransmissionAt: string,
  currentTimestamp: string,
): boolean => {
  const lastTime = new Date(lastTransmissionAt).getTime();
  const currentTime = new Date(currentTimestamp).getTime();
  const hoursDiff = (currentTime - lastTime) / (1000 * 60 * 60);
  const maxGapHours = MISSED_TRANSMISSION_THRESHOLD * CYCLE_INTERVAL_HOURS;

  return hoursDiff > maxGapHours;
};
