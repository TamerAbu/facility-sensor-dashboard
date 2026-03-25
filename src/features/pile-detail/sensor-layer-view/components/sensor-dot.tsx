'use client';

import { useState } from 'react';

import { PILE_HEIGHT, PILE_WIDTH, STATUS_LABELS } from '@/lib/constants';
import type { SensorReading } from '@/lib/types';

interface SensorDotProps {
  sensor: SensorReading;
  onSensorClick?: (sensorId: string) => void;
}

export const SensorDot = ({ sensor, onSensorClick }: SensorDotProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const leftPercent = (sensor.position.x / PILE_WIDTH) * 100;
  const topPercent = (sensor.position.y / PILE_HEIGHT) * 100;

  return (
    <button
      type="button"
      className="sensor-dot absolute flex items-center justify-center"
      data-status={sensor.status}
      style={{
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      onClick={() => onSensorClick?.(sensor.sensorId)}
    >
      <span className="text-[9px] font-extrabold text-white">
        {sensor.sensorId}
      </span>

      {showTooltip && (
        <div className="sensor-tooltip">
          <div className="flex items-center gap-2">
            <span className="font-bold">{sensor.sensorId}</span>
            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-bold uppercase">
              {STATUS_LABELS[sensor.status]}
            </span>
          </div>
          <div className="mt-1.5 flex gap-3 font-mono text-[11px]">
            <span>{sensor.temperature.toFixed(1)}°C</span>
            <span className="text-slate-500">/</span>
            <span>{sensor.moisture.toFixed(1)}%</span>
          </div>
        </div>
      )}
    </button>
  );
};
