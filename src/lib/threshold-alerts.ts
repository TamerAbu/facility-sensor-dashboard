import {
  MOISTURE_OK_MAX,
  MOISTURE_WARNING_MAX,
  RECOMMENDED_ACTIONS,
  TEMP_OK_MAX,
  TEMP_WARNING_MAX,
} from './constants';
import { classifyValue, toReadingSummary } from './sensor-classifier';
import type { Alert, AlertSeverity, Layer, Pile, SensorReading } from './types';

const getRecommendedAction = (
  layer: Layer,
  hasBothWarning: boolean,
): string => {
  if (hasBothWarning) return RECOMMENDED_ACTIONS.BOTH_WARNING;
  if (layer === 'bottom') return RECOMMENDED_ACTIONS.BOTTOM_HIGH_TEMP;
  if (layer === 'middle') return RECOMMENDED_ACTIONS.MIDDLE_HIGH_TEMP_MOISTURE;
  return RECOMMENDED_ACTIONS.TOP_HIGH_READINGS;
};

const avg = (sensors: SensorReading[], key: 'temperature' | 'moisture') =>
  (sensors.reduce((sum, s) => sum + s[key], 0) / sensors.length).toFixed(1);

const buildDescription = (
  pileName: string,
  layer: Layer,
  sensors: SensorReading[],
): string => {
  const ids = sensors.map((s) => s.sensorId).join(', ');
  return `${pileName} ${layer} layer: ${ids} averaging ${avg(sensors, 'temperature')}°C / ${avg(sensors, 'moisture')}% moisture`;
};

export const generateThresholdAlerts = (piles: Pile[]): Alert[] => {
  const alerts: Alert[] = [];
  let alertIndex = 0;

  for (const pile of piles) {
    const sensorsByLayer = new Map<Layer, SensorReading[]>();
    for (const sensor of pile.sensors) {
      const group = sensorsByLayer.get(sensor.layer) ?? [];
      group.push(sensor);
      sensorsByLayer.set(sensor.layer, group);
    }

    for (const [layer, sensors] of sensorsByLayer) {
      const faultySensors = sensors.filter((s) => s.isFaulty);
      for (const faulty of faultySensors) {
        alertIndex++;
        alerts.push({
          id: `alert-threshold-${alertIndex}`,
          pileId: pile.id,
          pileName: pile.name,
          severity: 'warning',
          affectedSensors: [faulty.sensorId],
          readings: toReadingSummary([faulty]),
          layer,
          alertType: 'threshold',
          description: `${faulty.sensorId} shows erratic readings`,
          recommendedAction: RECOMMENDED_ACTIONS.FAULTY_SENSOR,
        });
      }

      const problemSensors = sensors.filter(
        (s) =>
          !s.isFaulty && (s.status === 'warning' || s.status === 'critical'),
      );
      if (problemSensors.length === 0) continue;

      const worstSeverity: AlertSeverity = problemSensors.some(
        (s) => s.status === 'critical',
      )
        ? 'critical'
        : 'warning';

      const hasBothWarning = problemSensors.some(
        (s) =>
          classifyValue(s.temperature, TEMP_OK_MAX, TEMP_WARNING_MAX) ===
            'warning' &&
          classifyValue(s.moisture, MOISTURE_OK_MAX, MOISTURE_WARNING_MAX) ===
            'warning',
      );

      alertIndex++;
      alerts.push({
        id: `alert-threshold-${alertIndex}`,
        pileId: pile.id,
        pileName: pile.name,
        severity: worstSeverity,
        affectedSensors: problemSensors.map((s) => s.sensorId),
        readings: toReadingSummary(problemSensors),
        layer,
        alertType: 'threshold',
        description: buildDescription(pile.name, layer, problemSensors),
        recommendedAction: getRecommendedAction(layer, hasBothWarning),
      });
    }
  }

  return alerts;
};
