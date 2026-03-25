import type { AlertActionType, AlertSeverity, AlertType } from './types';

export const getAlertPrimaryAction = (
  alertType: AlertType,
  severity: AlertSeverity,
  description: string,
): AlertActionType => {
  if (alertType === 'threshold') {
    return severity === 'critical' ? 'execute' : 'acknowledge';
  }

  if (alertType === 'rate-of-change') {
    return 'execute';
  }

  // sensor-health: distinguish by description content
  const lowerDescription = description.toLowerCase();

  if (lowerDescription.includes('battery')) {
    return 'schedule-replacement';
  }

  if (
    lowerDescription.includes('missed') ||
    lowerDescription.includes('transmission')
  ) {
    return 'investigate';
  }

  return 'schedule-maintenance';
};
