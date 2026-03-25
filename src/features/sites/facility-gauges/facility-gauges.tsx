import {
  GAUGE_ALERTS_MAX,
  GAUGE_HEALTH_MAX,
  GAUGE_HEALTH_MIN,
  GAUGE_LABELS,
  GAUGE_MOISTURE_MAX,
  GAUGE_TEMP_MAX,
  MOISTURE_OK_MAX,
  MOISTURE_WARNING_MAX,
  TEMP_OK_MAX,
  TEMP_WARNING_MAX,
} from '@/lib/constants';
import type { Alert, Pile, SensorStatus } from '@/lib/types';
import { buildPileTrendData } from '@/lib/trend-data';
import { GaugeDial } from './components/gauge-dial';
import type { GaugeZone } from './components/gauge-dial';
import { PileTrendChart } from './components/pile-trend-chart';

const TEMP_ZONES: GaugeZone[] = [
  { start: 0, end: TEMP_OK_MAX, color: 'var(--status-ok)' },
  { start: TEMP_OK_MAX, end: TEMP_WARNING_MAX, color: 'var(--status-warning)' },
  {
    start: TEMP_WARNING_MAX,
    end: GAUGE_TEMP_MAX,
    color: 'var(--status-critical)',
  },
];

const MOISTURE_ZONES: GaugeZone[] = [
  { start: 0, end: MOISTURE_OK_MAX, color: 'var(--status-ok)' },
  {
    start: MOISTURE_OK_MAX,
    end: MOISTURE_WARNING_MAX,
    color: 'var(--status-warning)',
  },
  {
    start: MOISTURE_WARNING_MAX,
    end: GAUGE_MOISTURE_MAX,
    color: 'var(--status-critical)',
  },
];

const HEALTH_ZONES: GaugeZone[] = [
  { start: GAUGE_HEALTH_MIN, end: 60, color: 'var(--status-critical)' },
  { start: 60, end: 85, color: 'var(--status-warning)' },
  { start: 85, end: GAUGE_HEALTH_MAX, color: 'var(--status-ok)' },
];

const ALERT_ZONES: GaugeZone[] = [
  { start: 0, end: 1, color: 'var(--status-ok)' },
  { start: 1, end: 4, color: 'var(--status-warning)' },
  { start: 4, end: GAUGE_ALERTS_MAX, color: 'var(--status-critical)' },
];

const classifyTemp = (value: number): SensorStatus => {
  if (value >= TEMP_WARNING_MAX) return 'critical';
  if (value >= TEMP_OK_MAX) return 'warning';
  return 'ok';
};

const classifyMoisture = (value: number): SensorStatus => {
  if (value >= MOISTURE_WARNING_MAX) return 'critical';
  if (value >= MOISTURE_OK_MAX) return 'warning';
  return 'ok';
};

const classifyHealth = (percent: number): SensorStatus => {
  if (percent < 60) return 'critical';
  if (percent < 85) return 'warning';
  return 'ok';
};

const classifyAlerts = (count: number): SensorStatus => {
  if (count >= 4) return 'critical';
  if (count >= 1) return 'warning';
  return 'ok';
};

const statusLabel = (status: SensorStatus): string => {
  if (status === 'ok') return GAUGE_LABELS.NORMAL;
  if (status === 'warning') return GAUGE_LABELS.ELEVATED;
  return GAUGE_LABELS.CRITICAL_LEVEL;
};

interface FacilityGaugesProps {
  piles: Pile[];
  alerts: Alert[];
}

export const FacilityGauges = ({ piles, alerts }: FacilityGaugesProps) => {
  const allSensors = piles.flatMap((p) => p.sensors);
  const nonFaulty = allSensors.filter((s) => !s.isFaulty);
  const totalSensors = allSensors.length;
  const faultySensors = allSensors.filter((s) => s.isFaulty).length;
  const healthPercent =
    totalSensors > 0
      ? Math.round(((totalSensors - faultySensors) / totalSensors) * 100)
      : 100;

  const avgTemp =
    nonFaulty.length > 0
      ? Math.round(
          (nonFaulty.reduce((s, r) => s + r.temperature, 0) /
            nonFaulty.length) *
            10,
        ) / 10
      : 0;

  const avgMoisture =
    nonFaulty.length > 0
      ? Math.round(
          (nonFaulty.reduce((s, r) => s + r.moisture, 0) / nonFaulty.length) *
            10,
        ) / 10
      : 0;

  const alertCount = alerts.length;
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical').length;
  const warningAlerts = alertCount - criticalAlerts;

  const tempStatus = classifyTemp(avgTemp);
  const moistStatus = classifyMoisture(avgMoisture);
  const healthStatus = classifyHealth(healthPercent);
  const alertStatus = classifyAlerts(alertCount);

  const alertLabel =
    alertCount === 0
      ? GAUGE_LABELS.NO_ALERTS
      : `${criticalAlerts} Critical, ${warningAlerts} Warning`;

  const healthLabel =
    faultySensors === 0
      ? GAUGE_LABELS.NORMAL
      : `${faultySensors} ${GAUGE_LABELS.FAULTY_SENSORS}`;

  const trendData = buildPileTrendData(piles);
  const pileNames = piles.map((p) => p.name);

  return (
    <div className="mb-8 space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <GaugeDial
          label={GAUGE_LABELS.AVG_TEMPERATURE}
          value={avgTemp}
          displayValue={`${avgTemp}°C`}
          statusLabel={statusLabel(tempStatus)}
          status={tempStatus}
          min={0}
          max={GAUGE_TEMP_MAX}
          zones={TEMP_ZONES}
        />
        <GaugeDial
          label={GAUGE_LABELS.AVG_MOISTURE}
          value={avgMoisture}
          displayValue={`${avgMoisture}%`}
          statusLabel={statusLabel(moistStatus)}
          status={moistStatus}
          min={0}
          max={GAUGE_MOISTURE_MAX}
          zones={MOISTURE_ZONES}
        />
        <GaugeDial
          label={GAUGE_LABELS.SENSOR_HEALTH}
          value={healthPercent}
          displayValue={`${healthPercent}%`}
          statusLabel={healthLabel}
          status={healthStatus}
          min={GAUGE_HEALTH_MIN}
          max={GAUGE_HEALTH_MAX}
          zones={HEALTH_ZONES}
        />
        <GaugeDial
          label={GAUGE_LABELS.ACTIVE_ALERTS}
          value={alertCount}
          displayValue={String(alertCount)}
          statusLabel={alertLabel}
          status={alertStatus}
          min={0}
          max={GAUGE_ALERTS_MAX}
          zones={ALERT_ZONES}
        />
      </div>
      <PileTrendChart data={trendData} pileNames={pileNames} />
    </div>
  );
};
