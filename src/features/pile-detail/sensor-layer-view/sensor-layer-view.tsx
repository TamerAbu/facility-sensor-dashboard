import type { SensorReading } from '@/lib/types';

import { SensorDot } from './components/sensor-dot';

interface SensorLayerViewProps {
  sensors: SensorReading[];
}

export const SensorLayerView = ({ sensors }: SensorLayerViewProps) => (
  <div className="sensor-layer-grid relative aspect-[2/1] w-full">
    {sensors.map((sensor) => (
      <SensorDot key={sensor.sensorId} sensor={sensor} />
    ))}
  </div>
);
