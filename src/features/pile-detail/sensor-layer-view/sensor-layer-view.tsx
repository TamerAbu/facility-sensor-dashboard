import type { SensorReading } from '@/lib/types';

import { SensorDot } from './components/sensor-dot';

interface SensorLayerViewProps {
  sensors: SensorReading[];
  onSensorClick?: (sensorId: string) => void;
}

export const SensorLayerView = ({
  sensors,
  onSensorClick,
}: SensorLayerViewProps) => (
  <div className="sensor-layer-grid relative aspect-[3/1] w-full max-h-80">
    {sensors.map((sensor) => (
      <SensorDot
        key={sensor.sensorId}
        sensor={sensor}
        onSensorClick={onSensorClick}
      />
    ))}
  </div>
);
