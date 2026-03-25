import { jsPDF } from 'jspdf';

import { STATUS_LABELS } from './constants';
import { generateAlerts, processSiteData } from './risk-engine';
import type { Alert, Pile, Site } from './types';

const PAGE_MARGIN = 20;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;
const LINE_HEIGHT = 7;
const SECTION_GAP = 12;

const SEVERITY_LABELS: Record<string, string> = {
  critical: 'CRITICAL',
  warning: 'WARNING',
};

const addPageHeader = (doc: jsPDF, siteName: string) => {
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`${siteName} — Facility Report`, PAGE_MARGIN, 25);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text(`Generated: ${new Date().toLocaleString()}`, PAGE_MARGIN, 33);
  doc.setTextColor(0, 0, 0);
};

const checkPageBreak = (
  doc: jsPDF,
  cursorY: number,
  needed: number,
): number => {
  if (cursorY + needed > 280) {
    doc.addPage();
    return 20;
  }
  return cursorY;
};

const renderPileSection = (doc: jsPDF, pile: Pile, startY: number): number => {
  let cursorY = checkPageBreak(doc, startY, 40);

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(pile.name, PAGE_MARGIN, cursorY);
  cursorY += LINE_HEIGHT;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const statusLabel = STATUS_LABELS[pile.status];
  doc.text(
    `Status: ${statusLabel}  |  Grain: ${pile.grainType}  |  Avg Temp: ${pile.avgTemperature}°C  |  Avg Moisture: ${pile.avgMoisture}%`,
    PAGE_MARGIN,
    cursorY,
  );
  cursorY += LINE_HEIGHT + 2;

  const faultySensors = pile.sensors.filter((s) => s.isFaulty);
  const criticalSensors = pile.sensors.filter(
    (s) => s.status === 'critical' && !s.isFaulty,
  );
  const warningSensors = pile.sensors.filter(
    (s) => s.status === 'warning' && !s.isFaulty,
  );

  if (
    faultySensors.length === 0 &&
    criticalSensors.length === 0 &&
    warningSensors.length === 0
  ) {
    doc.setTextColor(34, 139, 34);
    doc.text('All sensors nominal.', PAGE_MARGIN + 4, cursorY);
    doc.setTextColor(0, 0, 0);
    cursorY += LINE_HEIGHT;
  } else {
    const problemGroups = [
      {
        label: 'Faulty',
        sensors: faultySensors,
        color: [120, 120, 120] as [number, number, number],
      },
      {
        label: 'Critical',
        sensors: criticalSensors,
        color: [200, 30, 30] as [number, number, number],
      },
      {
        label: 'Warning',
        sensors: warningSensors,
        color: [200, 150, 0] as [number, number, number],
      },
    ];

    for (const group of problemGroups) {
      if (group.sensors.length === 0) continue;
      cursorY = checkPageBreak(doc, cursorY, 14);

      doc.setTextColor(group.color[0], group.color[1], group.color[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(
        `${group.label} (${group.sensors.length}):`,
        PAGE_MARGIN + 4,
        cursorY,
      );
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      cursorY += LINE_HEIGHT;

      for (const sensor of group.sensors) {
        cursorY = checkPageBreak(doc, cursorY, LINE_HEIGHT);
        doc.setFontSize(8);
        doc.text(
          `${sensor.sensorId} (${sensor.layer}) — ${sensor.temperature}°C / ${sensor.moisture}%`,
          PAGE_MARGIN + 8,
          cursorY,
        );
        cursorY += LINE_HEIGHT - 1;
      }
      cursorY += 2;
    }
  }

  return cursorY + 4;
};

const renderAlertsSection = (
  doc: jsPDF,
  alerts: Alert[],
  startY: number,
): number => {
  let cursorY = checkPageBreak(doc, startY, 20);

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Active Alerts', PAGE_MARGIN, cursorY);
  cursorY += LINE_HEIGHT + 2;

  if (alerts.length === 0) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(34, 139, 34);
    doc.text('No active alerts.', PAGE_MARGIN + 4, cursorY);
    doc.setTextColor(0, 0, 0);
    return cursorY + LINE_HEIGHT;
  }

  for (const alert of alerts) {
    cursorY = checkPageBreak(doc, cursorY, 30);

    const isCritical = alert.severity === 'critical';
    doc.setTextColor(
      isCritical ? 200 : 200,
      isCritical ? 30 : 150,
      isCritical ? 30 : 0,
    );
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(
      `[${SEVERITY_LABELS[alert.severity]}] ${alert.pileName} — ${alert.description}`,
      PAGE_MARGIN + 4,
      cursorY,
    );
    doc.setTextColor(0, 0, 0);
    cursorY += LINE_HEIGHT;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(
      `Sensors: ${alert.affectedSensors.join(', ')}  |  Layer: ${alert.layer}`,
      PAGE_MARGIN + 8,
      cursorY,
    );
    cursorY += LINE_HEIGHT - 1;

    const actionLines = doc.splitTextToSize(
      `Action: ${alert.recommendedAction}`,
      CONTENT_WIDTH - 12,
    ) as string[];
    for (const line of actionLines) {
      cursorY = checkPageBreak(doc, cursorY, LINE_HEIGHT);
      doc.text(line, PAGE_MARGIN + 8, cursorY);
      cursorY += LINE_HEIGHT - 1;
    }
    cursorY += 4;
  }

  return cursorY;
};

export const downloadFacilityReport = (site: Site) => {
  const processedPiles = processSiteData(site.piles);
  const alerts = generateAlerts(processedPiles);

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  addPageHeader(doc, site.name);

  let cursorY = 42;

  // Pile statuses
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Pile Status Overview', PAGE_MARGIN, cursorY);
  cursorY += LINE_HEIGHT + 3;

  for (const pile of processedPiles) {
    cursorY = renderPileSection(doc, pile, cursorY);
  }

  cursorY += SECTION_GAP;

  // Alerts
  cursorY = renderAlertsSection(doc, alerts, cursorY);

  // Footer on last page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, PAGE_WIDTH - PAGE_MARGIN, 290, {
      align: 'right',
    });
    doc.text('agriQ Industrial Sentinel', PAGE_MARGIN, 290);
    doc.setTextColor(0, 0, 0);
  }

  doc.save(`${site.name.replace(/\s+/g, '-')}-report.pdf`);
};
