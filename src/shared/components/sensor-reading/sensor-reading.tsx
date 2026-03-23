import {
  MOISTURE_OK_MAX,
  MOISTURE_WARNING_MAX,
  TEMP_OK_MAX,
  TEMP_WARNING_MAX,
} from '@/lib/constants';

interface SensorReadingProps {
  temperature: number;
  moisture: number;
}

const getValueColor = (
  value: number,
  okMax: number,
  warnMax: number,
): string => {
  if (value < okMax) return 'text-status-ok';
  if (value <= warnMax) return 'text-status-warning';
  return 'text-status-critical';
};

export const SensorReading = ({
  temperature,
  moisture,
}: SensorReadingProps) => (
  <div className="flex items-center gap-3 font-mono text-sm">
    <span className={getValueColor(temperature, TEMP_OK_MAX, TEMP_WARNING_MAX)}>
      {temperature.toFixed(1)}°C
    </span>
    <span className="text-border">/</span>
    <span
      className={getValueColor(moisture, MOISTURE_OK_MAX, MOISTURE_WARNING_MAX)}
    >
      {moisture.toFixed(1)}%
    </span>
  </div>
);
