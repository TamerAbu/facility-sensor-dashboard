import { generateRateOfChangeAlerts } from './rate-of-change-alerts';
import {
  classifyPile,
  classifySensor,
  isFaultySensor,
} from './sensor-classifier';
import { generateSensorHealthAlerts } from './sensor-health-alerts';
import { generateThresholdAlerts } from './threshold-alerts';
import type { Alert, Layer, Pile, SensorReading } from './types';

export {
  classifyPile,
  classifySensor,
  isFaultySensor,
} from './sensor-classifier';

export const generateAlerts = (piles: Pile[]): Alert[] => {
  const thresholdAlerts = generateThresholdAlerts(piles);
  const rateOfChangeAlerts = generateRateOfChangeAlerts(piles);
  const sensorHealthAlerts = generateSensorHealthAlerts(piles);

  const allAlerts = [
    ...thresholdAlerts,
    ...rateOfChangeAlerts,
    ...sensorHealthAlerts,
  ];

  const severityOrder = { critical: 0, warning: 1 };
  return allAlerts.sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
  );
};

export const processSiteData = (piles: Pile[]): Pile[] =>
  piles.map((pile) => {
    const sensorsByLayer = new Map<Layer, SensorReading[]>();
    for (const sensor of pile.sensors) {
      const group = sensorsByLayer.get(sensor.layer) ?? [];
      group.push(sensor);
      sensorsByLayer.set(sensor.layer, group);
    }

    const processedSensors = pile.sensors.map((sensor) => {
      const layerSensors = sensorsByLayer.get(sensor.layer) ?? [];
      const faulty = sensor.isFaulty || isFaultySensor(sensor, layerSensors);
      const status = faulty
        ? ('faulty' as const)
        : classifySensor(sensor.temperature, sensor.moisture);
      return { ...sensor, isFaulty: faulty, status };
    });

    const nonFaulty = processedSensors.filter((s) => !s.isFaulty);
    const avgTemperature =
      nonFaulty.length > 0
        ? Math.round(
            (nonFaulty.reduce((sum, s) => sum + s.temperature, 0) /
              nonFaulty.length) *
              10,
          ) / 10
        : 0;
    const avgMoisture =
      nonFaulty.length > 0
        ? Math.round(
            (nonFaulty.reduce((sum, s) => sum + s.moisture, 0) /
              nonFaulty.length) *
              10,
          ) / 10
        : 0;

    return {
      ...pile,
      sensors: processedSensors,
      status: classifyPile(processedSensors),
      avgTemperature,
      avgMoisture,
    };
  });
