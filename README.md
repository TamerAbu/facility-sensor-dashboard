**The System Design document (`docs/System Design.pdf`) is the answer for Task 1 of the assignment.**

# agriQ Facility Sensor Dashboard

Operator dashboard for monitoring grain storage conditions at the Harish 7 facility. Built for non-technical warehouse operators who need to act on sensor alerts quickly.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (validates TypeScript) |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |

## Tech Stack

- **Next.js 16** (App Router) with React 19
- **TypeScript** in strict mode
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **react-leaflet** + **Leaflet** for interactive map view (CartoDB Positron tiles)
- Hardcoded mock data (no backend)

## Pages

### Sites (`/sites`)
Overview of all 4 grain piles with a **Grid/Map toggle**. Grid view shows status cards with average temperature, moisture, and problem sensor count, sorted by severity (critical first). Map view displays piles as pulsing status-colored markers on an interactive map of the Emek Hefer Industrial Park, with popups showing readings and an inspect link. Includes an external context bar showing weather, gateway ambient readings, CBOT wheat price, and an economic urgency index.

### Pile Detail (`/sites/[pileId]`)
Layer stats cards (temperature variance, moisture range, sensor integrity) followed by a top-down sensor visualization with layer tabs (Bottom/Middle/Top). 10 sensors per layer positioned on a grid. Click a sensor dot to scroll to its card below. Sensor dashboard cards show readings, battery, last seen, and a sparkline chart with configurable graph type (Line/Bar/Area/Pie), metric filter, and time range (3d/7d/14d matching the real 12-hour sensor cycle).

### Alerts (`/alerts`)
Active alerts sorted by severity with filter toggles (All/Critical/Warning) and sort dropdown (Severity/Pile Name/Alert Type). Each alert card shows affected pile and layer, sensor IDs, a recommended action, and context-aware action buttons (Execute Action, Acknowledge, Schedule Maintenance, Schedule Replacement, or Investigate) based on alert type and severity. Operators can handle alerts (greys out card with timestamp) or dismiss them (with confirmation dialog and undo toast). The sidebar badge and summary bar update dynamically.

## Header Actions

- **Bell** - Notification dropdown showing active critical/warning alert counts with a link to the alerts page
- **Settings** - Facility threshold reference (temperature, moisture ranges, sensor cycle interval)
- **User** - Operator profile with name, role, email, and sign out

## Architecture

```
src/
  app/           Thin page files (~5 lines each)
  screens/       Screen-level layout components
  features/      Feature components grouped by page
  shared/        Reusable components (2+ screens)
  lib/           Types, constants, mock data, risk engine
```

## Data Sources

The dashboard consolidates four data sources (all hardcoded mock data):

1. **Sensor ball readings** - Temperature and moisture per sensor inside each grain pile
2. **Gateway readings** - Ambient temperature and humidity inside the storage cell
3. **Weather API** - External conditions for the Emek Hefer area
4. **CBOT commodity prices** - Wheat futures for economic urgency calculation

## Sensor Cycle

Sensors operate in deep sleep mode and transmit readings every **12 hours** via LoRa to the facility gateway. This extends battery life to 12+ months. The dashboard's historical charts reflect this cycle with time range options of 3, 7, and 14 days.

## Risk Logic

- Temperature: <30°C OK, 30-45°C Warning, >45°C Critical
- Moisture: <14% OK, 14-17% Warning, >17% Critical
- Both temp AND moisture in Warning range escalates to Critical (multiplier rule)
- Faulty sensor detection: deviation >15°C from layer average
- Rate of change: gradual rise (0.5-1°C/cycle) triggers watch state, sudden spike (>8°C/cycle) triggers immediate critical
- Sensor health: battery <20% warning, <10% critical; 2+ missed transmissions trigger maintenance alert
- Economic Urgency Index: combines deterioration rate with CBOT market price

## Production Notes

- **Alert state is in-memory only.** Handling or dismissing alerts resets on page navigation since there is no backend. In production, alert state (handled/dismissed) would be persisted via API and synced across sessions.
