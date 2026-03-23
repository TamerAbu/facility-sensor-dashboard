# agriQ Facility Sensor Dashboard — Implementation Plan

## Context

This is a take-home assignment for agriQ (grain storage monitoring company). Task 2 requires building a React 19 / Next.js operator dashboard with hardcoded mock data. The evaluators care about **clarity of thinking, quality of decisions, and design for non-technical grain storage operators**. No backend needed.

The project is already scaffolded: Next.js 16.2.1, React 19, TypeScript, Tailwind v4, ESLint + Prettier, CI pipeline.

---

## Project Structure

```
src/
  app/
    layout.tsx              — Update: wrap with AppShell (sidebar nav)
    page.tsx                — Redirect to /sites
    sites/
      page.tsx              — Pile cards grid
      [pileId]/
        page.tsx            — Single pile detail with sensor visualization
    alerts/
      page.tsx              — Active alerts list
    globals.css             — Add status color tokens
  lib/
    types.ts                — TypeScript interfaces
    constants.ts            — Thresholds, layer definitions
    mock-data.ts            — 30 sensors × 4 piles, matching assignment spec
    risk-engine.ts          — Pure functions: classify sensor/pile, detect faulty, generate alerts
  components/
    layout/
      app-shell.tsx         — Sidebar + header
      nav-link.tsx          — Nav item with optional badge
    ui/
      status-badge.tsx      — OK/Warning/Critical pill
      sensor-reading.tsx    — Temp + moisture display
      alert-card.tsx        — Single alert with action
    sites/
      pile-card.tsx         — Summary card for one pile
      pile-detail-header.tsx
      sensor-layer-view.tsx — Top-down footprint with positioned sensor dots
      sensor-dot.tsx        — Individual sensor with tooltip
      layer-tabs.tsx        — Bottom/Middle/Top tab selector
    alerts/
      alert-list.tsx        — Sorted list of alerts
      alert-severity-filter.tsx
```

---

## Branch Strategy

| # | Branch | Scope |
|---|--------|-------|
| 1 | `feat/data-layer` | types, constants, mock-data, risk-engine + unit tests |
| 2 | `feat/app-shell` | Layout, sidebar nav, theme tokens, placeholder pages |
| 3 | `feat/sites-page` | PileCard, StatusBadge, SensorReading, Sites overview |
| 4 | `feat/pile-detail` | Sensor visualization, layer tabs, pile detail page |
| 5 | `feat/alerts-page` | AlertCard, alert list, severity filter, Alerts page |
| 6 | `chore/polish` | Responsive fixes, README with setup instructions |

Each branch merges to `main` via PR before starting the next.

---

## Step 1: Data Layer (`feat/data-layer`)

### types.ts
- `SensorStatus`: `'ok' | 'warning' | 'critical' | 'faulty'`
- `PileStatus`: `'ok' | 'warning' | 'critical'`
- `Layer`: `'bottom' | 'middle' | 'top'`
- `SensorReading`: sensorId, layer, position {x,y}, temperature, moisture, status, isFaulty
- `Pile`: id, name, dimensions, grainType, sensors[], status, avgTemperature, avgMoisture
- `Site`: id, name, address, piles[]
- `Alert`: id, pileId, pileName, severity, affectedSensors[], layer, description, recommendedAction

### constants.ts
- Temp thresholds: <30 OK, 30-45 Warning, >45 Critical
- Moisture thresholds: <14% OK, 14-17% Warning, >17% Critical
- Layer definitions with sensor ranges
- Pile dimensions: 50×25×10

### mock-data.ts
Build all 30 sensors per pile with positions in a 2×5 grid per layer (with small offsets). Match exact values from assignment table.

### risk-engine.ts
- `classifySensor(temp, moisture)` — includes multiplier rule (both Warning → Critical)
- `classifyPile(sensors)` — worst non-faulty sensor wins
- `isFaultySensor(sensor, neighbors)` — deviation > 15°C from layer average
- `generateAlerts(piles)` — groups problem sensors by pile+layer, assigns recommended actions

### Recommended actions mapping
| Condition | Action |
|-----------|--------|
| Bottom layer high temp | "Turn on aeration fans for bottom zone. Check again in 6 hours." |
| Middle layer high temp+moisture | "URGENT: Begin grain turning or transfer." |
| Top layer high readings | "Check if external weather is causing surface heating." |
| Faulty sensor | "Sensor may be malfunctioning. Schedule physical inspection." |
| Both temp AND moisture warning | "Activate aeration immediately. If no improvement in 12h, begin grain transfer." |

---

## Step 2: App Shell (`feat/app-shell`)

- Left sidebar with two nav links: Sites (warehouse icon), Alerts (bell icon + badge count)
- Header: "agriQ" branding + "Harish 7, Emek Hefer"
- Sidebar collapses to icons on mobile
- Add theme tokens to globals.css (status-ok, status-warning, status-critical colors)
- Redirect `/` → `/sites`
- Lucide React for icons
- Light mode only (warehouse environment)

---

## Step 3: Sites Overview (`feat/sites-page`)

- Grid of 4 PileCards (2×2 desktop, 1 col mobile)
- PileCard: name, StatusBadge, avg temp/moisture, problem sensor count
- Left border color = status color for instant visual scanning
- Sorted: Critical first, then Warning, then OK
- Click navigates to `/sites/[pileId]`

---

## Step 4: Pile Detail (`feat/pile-detail`)

### Sensor Visualization: Top-down footprint with layer tabs

**Why this approach**: Operators think about piles from above. 10 dots per layer = no visual clutter. Layer tabs use sensor numbering operators already know. On desktop, all 3 layers shown stacked vertically.

- `SensorDot`: 40px circle, color-coded, sensor ID label, tooltip on hover/tap showing temp + moisture + status
- Critical sensors pulse gently, faulty sensors show diagonal strikethrough pattern
- `SensorLayerView`: 50×25 rectangle with absolutely positioned dots
- `LayerTabs`: Bottom (S01-S10) / Middle (S11-S20) / Top (S21-S30)
- Layer stats bar: avg temp, avg moisture, problem count
- `'use client'` only for SensorDot (tooltip hover) and LayerTabs (active tab state)

---

## Step 5: Alerts Page (`feat/alerts-page`)

**Design for**: "A person who walks in and needs to act immediately."

- Top summary bar: "3 active alerts: 1 critical, 2 warnings"
- Filter toggles: All / Critical / Warning
- AlertCards sorted by severity then timestamp
- Each card: left color stripe, pile+layer name (large bold), affected sensor IDs, current readings (color-coded), recommended action in highlighted box
- Faulty sensor alerts use grey/blue distinct from red/amber
- Alert count badge in sidebar nav

---

## Step 6: Polish (`chore/polish`)

- Responsive testing: 1920×1080 (primary — wall monitor), 1024px (tablet), 390px (phone)
- Typography: body 16px min, sensor readings 18-20px, pile names 24px
- Update README with setup instructions (required by submission)
- Final lint + format pass

---

## Key Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Pile detail routing | `/sites/[pileId]` route | Shareable URLs, clean nav, works on tablets |
| Sensor visualization | Top-down footprint + layer tabs | Matches operator mental model, no 3D complexity |
| Component library | None (Tailwind only) | Zero deps, shows CSS skill, small app |
| State management | Props only (no Redux/Zustand) | Static mock data, no async state |
| Server vs Client components | Server by default, `'use client'` only for interactive bits | Minimizes client JS |
| Dark mode | Excluded | Warehouses are lit; better to polish one mode well |
| Icons | Lucide React | Tree-shakable, consistent style, wide icon selection |

---

## Verification

1. `npm run lint` — no errors
2. `npm run format:check` — no errors
3. `npm run build` — succeeds with no TypeScript errors
4. `npm run dev` — verify:
   - Sites page shows 4 pile cards sorted by severity
   - Each pile click shows sensor visualization with 30 sensors across 3 layers
   - Problem sensors visually distinct (amber/red/grey)
   - Alerts page shows correct alerts with recommended actions
   - Responsive at 1920×1080, 1024px, 390px
5. CI pipeline passes (lint, format, build)
