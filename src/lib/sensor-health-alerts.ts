import { CURRENT_TIMESTAMP, RECOMMENDED_ACTIONS } from './constants';
import {
  classifyBattery,
  detectMissedTransmission,
} from './sensor-health-engine';
import type { Alert, Layer, Pile, SensorReading } from './types';

const toReading = (s: SensorReading) => ({
  sensorId: s.sensorId,
  temperature: s.temperature,
  moisture: s.moisture,
});

export const generateSensorHealthAlerts = (piles: Pile[]): Alert[] => {
  const alerts: Alert[] = [];
  let alertIndex = 0;

  for (const pile of piles) {
    for (const sensor of pile.sensors) {
      const batteryStatus = classifyBattery(sensor.batteryPercent);
      if (batteryStatus !== 'ok') {
        alertIndex++;
        const action =
          batteryStatus === 'critical'
            ? RECOMMENDED_ACTIONS.LOW_BATTERY_CRITICAL
            : RECOMMENDED_ACTIONS.LOW_BATTERY_WARNING;
        alerts.push({
          id: `alert-health-${alertIndex}`,
          pileId: pile.id,
          pileName: pile.name,
          severity: batteryStatus,
          affectedSensors: [sensor.sensorId],
          readings: [toReading(sensor)],
          layer: sensor.layer,
          alertType: 'sensor-health',
          description: `${sensor.sensorId} battery at ${sensor.batteryPercent}%`,
          recommendedAction: action,
        });
      }
    }

    const missedByLayer = new Map<Layer, SensorReading[]>();
    for (const sensor of pile.sensors) {
      if (
        detectMissedTransmission(sensor.lastTransmissionAt, CURRENT_TIMESTAMP)
      ) {
        const group = missedByLayer.get(sensor.layer) ?? [];
        group.push(sensor);
        missedByLayer.set(sensor.layer, group);
      }
    }

    for (const [layer, sensors] of missedByLayer) {
      alertIndex++;
      const ids = sensors.map((s) => s.sensorId).join(', ');
      alerts.push({
        id: `alert-health-${alertIndex}`,
        pileId: pile.id,
        pileName: pile.name,
        severity: 'warning',
        affectedSensors: sensors.map((s) => s.sensorId),
        readings: sensors.map(toReading),
        layer,
        alertType: 'sensor-health',
        description: `${ids} missed 2+ transmissions`,
        recommendedAction: RECOMMENDED_ACTIONS.MISSED_TRANSMISSION,
      });
    }
  }

  return alerts;
};
