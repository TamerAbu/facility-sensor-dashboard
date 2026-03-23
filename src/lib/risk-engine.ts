import {
  FAULTY_DEVIATION_THRESHOLD,
  MOISTURE_OK_MAX,
  MOISTURE_WARNING_MAX,
  RECOMMENDED_ACTIONS,
  TEMP_OK_MAX,
  TEMP_WARNING_MAX,
} from './constants';
import type {
  Alert,
  AlertSeverity,
  Layer,
  Pile,
  PileStatus,
  SensorReading,
  SensorStatus,
} from './types';

const classifyValue = (
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

export const classifyPile = (sensors: SensorReading[]): PileStatus => {
  const nonFaulty = sensors.filter((s) => !s.isFaulty);
  if (nonFaulty.some((s) => s.status === 'critical')) return 'critical';
  if (nonFaulty.some((s) => s.status === 'warning')) return 'warning';
  return 'ok';
};

const getRecommendedAction = (
  layer: Layer,
  severity: AlertSeverity,
  hasBothWarning: boolean,
): string => {
  if (hasBothWarning) return RECOMMENDED_ACTIONS.BOTH_WARNING;
  if (layer === 'bottom') return RECOMMENDED_ACTIONS.BOTTOM_HIGH_TEMP;
  if (layer === 'middle') return RECOMMENDED_ACTIONS.MIDDLE_HIGH_TEMP_MOISTURE;
  return RECOMMENDED_ACTIONS.TOP_HIGH_READINGS;
};

export const generateAlerts = (piles: Pile[]): Alert[] => {
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
          id: `alert-${alertIndex}`,
          pileId: pile.id,
          pileName: pile.name,
          severity: 'warning',
          affectedSensors: [faulty.sensorId],
          layer,
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

      const hasBothWarning = problemSensors.some((s) => {
        const t = classifyValue(s.temperature, TEMP_OK_MAX, TEMP_WARNING_MAX);
        const m = classifyValue(
          s.moisture,
          MOISTURE_OK_MAX,
          MOISTURE_WARNING_MAX,
        );
        return t === 'warning' && m === 'warning';
      });

      alertIndex++;
      alerts.push({
        id: `alert-${alertIndex}`,
        pileId: pile.id,
        pileName: pile.name,
        severity: worstSeverity,
        affectedSensors: problemSensors.map((s) => s.sensorId),
        layer,
        description: buildAlertDescription(pile.name, layer, problemSensors),
        recommendedAction: getRecommendedAction(
          layer,
          worstSeverity,
          hasBothWarning,
        ),
      });
    }
  }

  return alerts.sort((a, b) => {
    const severityOrder = { critical: 0, warning: 1 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
};

const buildAlertDescription = (
  pileName: string,
  layer: Layer,
  sensors: SensorReading[],
): string => {
  const ids = sensors.map((s) => s.sensorId).join(', ');
  const avgTemp =
    sensors.reduce((sum, s) => sum + s.temperature, 0) / sensors.length;
  const avgMoist =
    sensors.reduce((sum, s) => sum + s.moisture, 0) / sensors.length;

  return (
    `${pileName} ${layer} layer: ${ids} averaging ` +
    `${avgTemp.toFixed(1)}°C / ${avgMoist.toFixed(1)}% moisture`
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
