import {
  FAULTY_DEVIATION_THRESHOLD,
  MOISTURE_OK_MAX,
  MOISTURE_WARNING_MAX,
  TEMP_OK_MAX,
  TEMP_WARNING_MAX,
} from './constants';
import type {
  PileStatus,
  SensorReading,
  SensorReadingSummary,
  SensorStatus,
} from './types';

export const classifyValue = (
  value: number,
  okMax: number,
  warnMax: number,
): 'ok' | 'warning' | 'critical' => {
  if (value < okMax) return 'ok';
  if (value <= warnMax) return 'warning';
  return 'critical';
};

export const classifySensor = (
  temperature: number,
  moisture: number,
): SensorStatus => {
  const tempStatus = classifyValue(temperature, TEMP_OK_MAX, TEMP_WARNING_MAX);
  const moistStatus = classifyValue(
    moisture,
    MOISTURE_OK_MAX,
    MOISTURE_WARNING_MAX,
  );

  if (tempStatus === 'critical' || moistStatus === 'critical')
    return 'critical';
  if (tempStatus === 'warning' && moistStatus === 'warning') return 'critical';
  if (tempStatus === 'warning' || moistStatus === 'warning') return 'warning';
  return 'ok';
};

export const isFaultySensor = (
  sensor: SensorReading,
  layerSensors: SensorReading[],
): boolean => {
  const others = layerSensors.filter(
    (s) => s.sensorId !== sensor.sensorId && !s.isFaulty,
  );
  if (others.length === 0) return false;

  const avgTemp =
    others.reduce((sum, s) => sum + s.temperature, 0) / others.length;
  return Math.abs(sensor.temperature - avgTemp) > FAULTY_DEVIATION_THRESHOLD;
};

export const toReadingSummary = (
  sensors: SensorReading[],
): SensorReadingSummary[] =>
  sensors.map((s) => ({
    sensorId: s.sensorId,
    temperature: s.temperature,
    moisture: s.moisture,
  }));

export const classifyPile = (sensors: SensorReading[]): PileStatus => {
  const nonFaulty = sensors.filter((s) => !s.isFaulty);
  if (nonFaulty.some((s) => s.status === 'critical')) return 'critical';
  if (nonFaulty.some((s) => s.status === 'warning')) return 'warning';
  return 'ok';
};
