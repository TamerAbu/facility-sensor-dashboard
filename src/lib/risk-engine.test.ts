import { describe, expect, it } from 'vitest';

import {
  classifyPile,
  classifySensor,
  generateAlerts,
  isFaultySensor,
} from './risk-engine';
import type { SensorReading } from './types';

const makeSensor = (overrides: Partial<SensorReading> = {}): SensorReading => ({
  sensorId: 'S01',
  layer: 'bottom',
  position: { x: 10, y: 10 },
  temperature: 20,
  moisture: 10,
  status: 'ok',
  isFaulty: false,
  ...overrides,
});

describe('classifySensor', () => {
  it('returns ok when both values are below thresholds', () => {
    expect(classifySensor(25, 12)).toBe('ok');
  });

  it('returns warning for temp in warning range', () => {
    expect(classifySensor(35, 10)).toBe('warning');
  });

  it('returns warning for moisture in warning range', () => {
    expect(classifySensor(20, 15)).toBe('warning');
  });

  it('returns critical for temp above critical threshold', () => {
    expect(classifySensor(50, 10)).toBe('critical');
  });

  it('returns critical for moisture above critical threshold', () => {
    expect(classifySensor(20, 18)).toBe('critical');
  });

  it('escalates to critical when both temp AND moisture are warning (multiplier rule)', () => {
    expect(classifySensor(35, 15)).toBe('critical');
  });
});

describe('isFaultySensor', () => {
  it('returns false when sensor is within normal range', () => {
    const sensors = [
      makeSensor({ sensorId: 'S01', temperature: 25 }),
      makeSensor({ sensorId: 'S02', temperature: 26 }),
      makeSensor({ sensorId: 'S03', temperature: 24 }),
    ];
    expect(isFaultySensor(sensors[0], sensors)).toBe(false);
  });

  it('returns true when sensor deviates >15°C from layer average', () => {
    const sensors = [
      makeSensor({ sensorId: 'S01', temperature: 95 }),
      makeSensor({ sensorId: 'S02', temperature: 25 }),
      makeSensor({ sensorId: 'S03', temperature: 26 }),
    ];
    expect(isFaultySensor(sensors[0], sensors)).toBe(true);
  });
});

describe('classifyPile', () => {
  it('returns ok when all sensors are ok', () => {
    const sensors = [makeSensor(), makeSensor({ sensorId: 'S02' })];
    expect(classifyPile(sensors)).toBe('ok');
  });

  it('returns warning when worst sensor is warning', () => {
    const sensors = [
      makeSensor({ status: 'ok' }),
      makeSensor({ sensorId: 'S02', status: 'warning' }),
    ];
    expect(classifyPile(sensors)).toBe('warning');
  });

  it('returns critical when any sensor is critical', () => {
    const sensors = [
      makeSensor({ status: 'ok' }),
      makeSensor({ sensorId: 'S02', status: 'critical' }),
    ];
    expect(classifyPile(sensors)).toBe('critical');
  });

  it('ignores faulty sensors for pile classification', () => {
    const sensors = [
      makeSensor({ status: 'ok' }),
      makeSensor({ sensorId: 'S02', status: 'critical', isFaulty: true }),
    ];
    expect(classifyPile(sensors)).toBe('ok');
  });
});

describe('generateAlerts', () => {
  it('returns empty array for piles with no problems', () => {
    const pile = {
      id: 'p1',
      name: 'Test',
      dimensions: { width: 50, height: 25, depth: 10 },
      grainType: 'Wheat',
      sensors: [makeSensor()],
      status: 'ok' as const,
      avgTemperature: 20,
      avgMoisture: 10,
    };
    expect(generateAlerts([pile])).toEqual([]);
  });

  it('generates alert for faulty sensor', () => {
    const pile = {
      id: 'p1',
      name: 'Test',
      dimensions: { width: 50, height: 25, depth: 10 },
      grainType: 'Wheat',
      sensors: [makeSensor({ isFaulty: true })],
      status: 'ok' as const,
      avgTemperature: 20,
      avgMoisture: 10,
    };
    const alerts = generateAlerts([pile]);
    expect(alerts.length).toBe(1);
    expect(alerts[0].severity).toBe('warning');
  });

  it('sorts alerts by severity — critical first', () => {
    const pile = {
      id: 'p1',
      name: 'Test',
      dimensions: { width: 50, height: 25, depth: 10 },
      grainType: 'Wheat',
      sensors: [
        makeSensor({ sensorId: 'S01', isFaulty: true }),
        makeSensor({ sensorId: 'S02', status: 'critical' }),
      ],
      status: 'critical' as const,
      avgTemperature: 50,
      avgMoisture: 10,
    };
    const alerts = generateAlerts([pile]);
    expect(alerts[0].severity).toBe('critical');
  });
});
