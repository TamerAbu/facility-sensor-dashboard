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
- Hardcoded mock data (no backend)

## Pages

### Sites (`/sites`)
Overview of all 4 grain piles with status cards. Each card shows average temperature, moisture, and problem sensor count. Piles sorted by severity (critical first). Includes an external context bar showing weather, gateway ambient readings, CBOT wheat price, and an economic urgency index.

### Pile Detail (`/sites/[pileId]`)
Top-down sensor visualization with layer tabs (Bottom/Middle/Top). 10 sensors per layer positioned on a grid. Hover for tooltip with readings. Stats cards show temperature variance, moisture range, and sensor integrity.

### Alerts (`/alerts`)
Active alerts sorted by severity with filter toggles (All/Critical/Warning). Each alert card shows affected pile and layer, sensor IDs, and a recommended action. Cards link to pile detail for drill-down.

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

## Risk Logic

- Temperature: <30°C OK, 30-45°C Warning, >45°C Critical
- Moisture: <14% OK, 14-17% Warning, >17% Critical
- Both temp AND moisture in Warning range escalates to Critical (multiplier rule)
- Faulty sensor detection: deviation >15°C from layer average
- Economic Urgency Index: combines deterioration rate with CBOT market price
