# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

agriQ Facility Sensor Dashboard — a grain storage monitoring dashboard for non-technical warehouse operators. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Uses hardcoded mock data (no backend).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (also validates TypeScript)
- `npm run lint` — run ESLint
- `npm run lint:fix` — auto-fix lint issues
- `npm run format` — format source files with Prettier
- `npm run format:check` — check formatting without modifying

## Architecture

### Folder Structure

```
src/
  app/                              → Thin pages (~5 lines). Import and render a Screen.
    sites/
      page.tsx                      → renders <SitesScreen />
      [pileId]/
        page.tsx                    → renders <PileDetailScreen />
    alerts/
      page.tsx                      → renders <AlertsScreen />

  screens/                          → Screen-level layout components. One per page.
    sites-screen.tsx
    pile-detail-screen.tsx
    alerts-screen.tsx

  features/                         → Grouped by page. Each feature has:
    sites/                            main file + index.ts + components/ subfolder.
      pile-card/
        pile-card.tsx
        index.ts
        components/
    pile-detail/
      sensor-layer-view/
        sensor-layer-view.tsx
        index.ts
        components/
          sensor-dot.tsx
      layer-tabs/
        layer-tabs.tsx
        index.ts
    alerts/
      alert-card/
        alert-card.tsx
        index.ts
        components/
      alert-list/
        alert-list.tsx
        index.ts

  shared/                           → Reusable UI components used by 2+ screens.
    components/
      status-badge/
        status-badge.tsx
        index.ts
      sensor-reading/
        sensor-reading.tsx
        index.ts

  lib/                              → Data, types, constants, logic. No UI code.
    types.ts
    constants.ts
    mock-data.ts
    risk-engine.ts
```

- **Path alias**: `@/*` maps to `./src/*`
- **Pages**: `/sites` (pile overview), `/sites/[pileId]` (sensor detail), `/alerts` (active alerts)
- **Mock data is the single source of truth** — all components read from `lib/mock-data.ts`, never duplicate values
- **Server Components by default** — `'use client'` on leaf components only, never on page or screen level

## Code Rules

### File Organization
- Max 100 lines per file. If exceeded, split it.
- One component per file.
- Files in kebab-case (`pile-card.tsx`), components in PascalCase (`PileCard`).

### TypeScript
- Strict mode. No `any` type, ever.
- Props defined as `PileCardProps`, `SensorDotProps` (no `I` prefix).
- Use union types for status values: `'ok' | 'warning' | 'critical' | 'faulty'`.

### Components
- Arrow functions for components.
- Destructure props in the function signature.
- `app/page.tsx` files only import and render the corresponding Screen component.
- `features/` components own their sub-components in a `components/` subfolder.
- `shared/components/` only for components used across multiple screens.
- `lib/` is pure functions and data only — no UI code.

### Styling
- Tailwind classes only. No inline styles.
- No magic numbers — use constants for thresholds, dimensions, and meaningful values.
- Status colors defined as CSS variables in `globals.css` (`--status-ok`, `--status-warning`, `--status-critical`).
- Status color coding is consistent everywhere: green = OK, amber = Warning, red = Critical, grey = Faulty.

### Naming
- Variables: descriptive names (`filteredAlerts`, `criticalSensors`). Never `data`, `arr`, `temp`, `val`.
- Constants: UPPER_SNAKE_CASE (`TEMP_WARNING_THRESHOLD`).

### Constants & Strings
- No hardcoded strings in components — labels, messages, status text go in `constants.ts`.
- No hardcoded threshold values in components — import from `constants.ts`.
- Alert recommended actions defined in a mapping object in `constants.ts` or `risk-engine.ts`.

### Imports
- Order: React → Next.js → lib → features → shared → relative.
- No unused imports or variables.

### General
- No commented-out code.
- No `console.log` in committed code.
- `const` over `let`. Never `var`.
- Lucide React for all icons.
- Light mode only — no dark mode.

## Domain

- Sensor thresholds: Temp <30°C OK, 30-45 Warning, >45 Critical; Moisture <14% OK, 14-17% Warning, >17% Critical
- Both temp AND moisture in Warning range → escalate to Critical (multiplier rule)
- Prettier: single quotes, semicolons, trailing commas
