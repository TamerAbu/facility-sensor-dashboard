import { RECOMMENDED_ACTIONS } from './constants';
import { getHistoryForSensor } from './mock-history';
import { detectGradualRise, detectSuddenSpike } from './rate-of-change-engine';
import type { Alert, Pile } from './types';

export const generateRateOfChangeAlerts = (piles: Pile[]): Alert[] => {
  const alerts: Alert[] = [];
  let alertIndex = 0;

  for (const pile of piles) {
    for (const sensor of pile.sensors) {
      const history = getHistoryForSensor(
        pile.id,
        sensor.sensorId,
        pile.sensors,
      );
      if (!history) continue;

      const reading = {
        sensorId: sensor.sensorId,
        temperature: sensor.temperature,
        moisture: sensor.moisture,
      };

      if (detectSuddenSpike(history)) {
        alertIndex++;
        alerts.push({
          id: `alert-roc-${alertIndex}`,
          pileId: pile.id,
          pileName: pile.name,
          severity: 'critical',
          affectedSensors: [sensor.sensorId],
          readings: [reading],
          layer: sensor.layer,
          alertType: 'rate-of-change',
          description: `${sensor.sensorId} temperature spiked >8°C in one cycle`,
          recommendedAction: RECOMMENDED_ACTIONS.SUDDEN_SPIKE,
        });
      } else if (detectGradualRise(history)) {
        alertIndex++;
        alerts.push({
          id: `alert-roc-${alertIndex}`,
          pileId: pile.id,
          pileName: pile.name,
          severity: 'warning',
          affectedSensors: [sensor.sensorId],
          readings: [reading],
          layer: sensor.layer,
          alertType: 'rate-of-change',
          description: `${sensor.sensorId} temperature rising steadily over ${history.readings.length} cycles`,
          recommendedAction: RECOMMENDED_ACTIONS.GRADUAL_RISE,
        });
      }
    }
  }

  return alerts;
};
