import {
  RATE_GRADUAL_MIN_CYCLES,
  RATE_GRADUAL_MIN_RISE,
  RATE_SUDDEN_SPIKE,
} from './constants';
import type { SensorHistory } from './types';

export const detectGradualRise = (history: SensorHistory): boolean => {
  const { readings } = history;
  if (readings.length < RATE_GRADUAL_MIN_CYCLES) return false;

  for (let i = 1; i < readings.length; i++) {
    const rise = readings[i].temperature - readings[i - 1].temperature;
    if (rise < RATE_GRADUAL_MIN_RISE) return false;
  }

  return true;
};

export const detectSuddenSpike = (history: SensorHistory): boolean => {
  const { readings } = history;
  if (readings.length < 2) return false;

  const latest = readings[readings.length - 1].temperature;
  const previous = readings[readings.length - 2].temperature;

  return latest - previous > RATE_SUDDEN_SPIKE;
};
