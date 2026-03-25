import {
  GAUGE_ALERTS_MAX,
  GAUGE_HEALTH_MAX,
  GAUGE_HEALTH_MIN,
  GAUGE_LABELS,
  GAUGE_MOISTURE_MAX,
  GAUGE_TEMP_MAX,
  UI_LABELS,
} from '@/lib/constants';
import type { Alert, Pile } from '@/lib/types';
import { buildPileTrendData } from '@/lib/trend-data';
import { GaugeDial } from './components/gauge-dial';
import { PileTrendChart } from './components/pile-trend-chart';
import {
  classifyAlerts,
  classifyHealth,
  classifyMoisture,
  classifyTemp,
  statusLabel,
} from './gauge-classifiers';
import {
  ALERT_ZONES,
  HEALTH_ZONES,
  MOISTURE_ZONES,
  TEMP_ZONES,
} from './gauge-zones';
import { computeSiteAggregates } from './site-aggregates';

interface FacilityGaugesProps {
  piles: Pile[];
  alerts: Alert[];
}

export const FacilityGauges = ({ piles, alerts }: FacilityGaugesProps) => {
  const agg = computeSiteAggregates(piles, alerts);

  const alertLabel =
    agg.alertCount === 0
      ? GAUGE_LABELS.NO_ALERTS
      : `${agg.criticalCount} Critical, ${agg.warningCount} Warning`;

  const healthLabel =
    agg.faultyCount === 0
      ? GAUGE_LABELS.NORMAL
      : `${agg.faultyCount} ${GAUGE_LABELS.FAULTY_SENSORS}`;

  return (
    <div className="mb-8 space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <GaugeDial
          label={UI_LABELS.AVG_TEMPERATURE}
          value={agg.avgTemp}
          displayValue={`${agg.avgTemp}°C`}
          statusLabel={statusLabel(classifyTemp(agg.avgTemp))}
          status={classifyTemp(agg.avgTemp)}
          min={0}
          max={GAUGE_TEMP_MAX}
          zones={TEMP_ZONES}
        />
        <GaugeDial
          label={UI_LABELS.AVG_MOISTURE}
          value={agg.avgMoisture}
          displayValue={`${agg.avgMoisture}%`}
          statusLabel={statusLabel(classifyMoisture(agg.avgMoisture))}
          status={classifyMoisture(agg.avgMoisture)}
          min={0}
          max={GAUGE_MOISTURE_MAX}
          zones={MOISTURE_ZONES}
        />
        <GaugeDial
          label={GAUGE_LABELS.SENSOR_HEALTH}
          value={agg.healthPercent}
          displayValue={`${agg.healthPercent}%`}
          statusLabel={healthLabel}
          status={classifyHealth(agg.healthPercent)}
          min={GAUGE_HEALTH_MIN}
          max={GAUGE_HEALTH_MAX}
          zones={HEALTH_ZONES}
        />
        <GaugeDial
          label={GAUGE_LABELS.ACTIVE_ALERTS}
          value={agg.alertCount}
          displayValue={String(agg.alertCount)}
          statusLabel={alertLabel}
          status={classifyAlerts(agg.alertCount)}
          min={0}
          max={GAUGE_ALERTS_MAX}
          zones={ALERT_ZONES}
        />
      </div>
      <PileTrendChart
        data={buildPileTrendData(piles)}
        pileNames={piles.map((p) => p.name)}
      />
    </div>
  );
};
