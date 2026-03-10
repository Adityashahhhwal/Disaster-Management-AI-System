# AI - Disaster Evacuation Platform

An intelligent, map-first disaster response dashboard built with Next.js 16 + TypeScript. The platform is designed for the first 30 minutes of an incident: triage incoming SOS signals, maintain situational awareness, and route resources using decision-ready analytics and AI recommendations.

**Live Demo:** https://disaster-management-ai-system.vercel.app/

## Why this exists
Disaster response needs a single command surface that stays readable under pressure. This project focuses on:
- A **central operational map** with layer toggles and mission context
- **Clear, spaced dashboard cards** (stats, alerts, resources, system health)
- A modular component architecture compatible with **shadcn/ui**
- Progressive build-out to support **disaster-specific workflows** and offline-friendly fallbacks

## Tech Stack
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** with CSS variables + design tokens
- **shadcn/ui-compatible structure** (components.json aliases)
- **Framer Motion** (micro-interactions)
- **Recharts** (operational telemetry)
- **next-themes** (dark-first theme)

## UI / Visual System
Dark SaaS dashboard aesthetic inspired by Linear / Stripe / Vercel.

Base palette (dark mode):
- Background: `#0F1115`
- Surface: `#171A21`
- Card: `#1E222B`
- Primary: `#4F8CFF`
- Success: `#22C55E`
- Danger: `#EF4444`
- Warning: `#F59E0B`
- Text main: `#E6E8EB`
- Text dim: `#9CA3AF`
- Border: `#2A2F3A`

Layout rules:
- 12-column grid
- Rounded **2xl** cards
- Soft elevated, “bubbly” shadow treatment

## Project Structure
Key folders (intentionally modular):
- `app/` – Next.js routes (dashboard lives in `app/page.tsx`)
- `components/layout/` – App shell, sidebar, topbar
- `components/cards/` – Reusable operational cards
- `components/map/` – Map surface + layer controls
- `components/widgets/` – Small interactive UI blocks (future)
- `components/charts/` – Chart wrappers (future)
- `data/` – Mock operational data for UI scaffolding
- `types/` – Shared TypeScript types

Reusable building blocks (current + planned):
- `StatCard`
- `AlertTimeline`
- `ResourceGauge` (planned)
- `DroneFleetCard`
- `SystemHealthCard`

## Local Development
```bash
npm install
npm run dev
```
Then open http://localhost:3000

## Progressive Delivery Plan
This repo is built iteratively (do not generate everything at once):
1. Layout skeleton + design tokens
2. Reusable cards + dashboard composition
3. Map system + layer controls
4. Disaster-specific operational workflows (routing, shelters, requests, triage)
5. Responsiveness + overflow hardening

## Prototype Reference
HTML prototypes are preserved as migration reference material:
- `stitch_main_disaster_management_dashboard/`

## Notes
- The UI currently uses mock data to validate layout, spacing, and interaction patterns.
- Contributions and suggestions are welcome—open an issue with screenshots and expected behavior.
