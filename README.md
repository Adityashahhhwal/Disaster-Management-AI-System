# AI - Disaster Evacuation Platform

An intelligent disaster response system built around a backend-first rescue workflow. The platform is designed for the first 30 minutes of an incident: receive victim SOS signals, cluster nearby requests, prioritize rescue queues, and push live updates to a command dashboard.

**Live Demo:** https://disaster-management-ai-system.vercel.app/

Built as a Smart India Hackathon 2025 project by team **smurfs r3ign**.

## Why this exists
Disaster response needs a single command surface that stays readable under pressure. This project focuses on:
- A **central Leaflet map** with real pan/zoom behavior, mission markers, route overlays, and layer toggles
- **Clear, spaced dashboard cards** (stats, alerts, resources, system health)
- **Civilian SOS and safe-status flows** that simulate incident intake and rescue queue updates
- A **FastAPI backend** for SOS intake, live command updates, clustering, and priority scoring
- A modular component architecture compatible with **shadcn/ui**
- Progressive build-out toward **live disaster workflows**, API-backed feeds, and offline-friendly fallbacks

## Current Prototype Scope
This is now split into two layers: a Next.js command dashboard and an early FastAPI backend. The backend currently uses an in-memory store for fast local development; MongoDB, Redis pub/sub, OSRM routing, and SMS fallback are planned follow-up integrations.

Implemented today:
- Interactive Leaflet/OpenStreetMap mission map
- SOS intake and safe-status form simulations
- Command summary, incident timeline, resources, drones, and system health panels
- In-page command navigation for map, victims, resources, rescue teams, and settings
- FastAPI `POST /sos`, `GET /sos/active`, `PATCH /sos/{reference}/status`, `GET /clusters`, and `/ws/command`
- Geospatial SOS clustering and triage priority scoring services
- Dark-first dashboard theme with light mode support

## Tech Stack
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** with CSS variables + design tokens
- **shadcn/ui-compatible structure** (components.json aliases)
- **Framer Motion** (micro-interactions)
- **Leaflet + React-Leaflet** (interactive operational map)
- **Recharts** (operational telemetry)
- **next-themes** (dark-first theme)
- **FastAPI** (SOS intake, clustering, command WebSocket)
- **pytest** (backend algorithm/API tests)

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
- `backend/app/` - FastAPI routes, models, services, WebSocket manager, and persistence adapters
- `backend/tests/` - pytest coverage for clustering, priority scoring, and SOS APIs
- `app/` - Next.js routes (dashboard lives in `app/page.tsx`)
- `components/layout/` - App shell, sidebar, topbar
- `components/cards/` - Reusable operational cards
- `components/map/` - Map surface + layer controls
- `data/` - Mock dashboard data while backend integration is phased in
- `types/` - Shared TypeScript types

Reusable building blocks (current + planned):
- `StatCard`
- `AlertTimeline`
- `ResourceGauge`
- `DroneFleetCard`
- `SystemHealthCard`

## Local Development
Dashboard:
```bash
npm install
npm run dev
```
Then open http://localhost:3000

Backend:
```bash
python -m pip install -r backend/requirements-dev.txt
npm run backend:dev
```
Then open http://localhost:8000/docs

Useful checks:
```bash
npm run lint
npm run test
npm run typecheck
npm run backend:test
npm run build
```

## Progressive Delivery Plan
This repo is built iteratively:
1. Backend SOS intake + active SOS queue
2. WebSocket broadcast from backend to command dashboard
3. DBSCAN-style SOS clustering + priority scoring
4. Victim PWA: mobile-first, offline-friendly SOS submission
5. MongoDB persistence + Redis pub/sub
6. OSRM safe routing + SMS fallback via MSG91/Twilio
7. Dashboard consumes live REST/WebSocket data instead of mock data

## Prototype Reference
HTML prototypes are preserved as migration reference material:
- `stitch_main_disaster_management_dashboard/`

## Notes
- Dashboard mock data still lives in `data/dashboard.ts` while backend integration is phased in.
- Backend storage is intentionally in-memory in this first slice; it is shaped so MongoDB can replace it without changing API routes.
- The preserved HTML prototype is reference material, not the production app.
- Contributions and suggestions are welcome - open an issue with screenshots and expected behavior.
