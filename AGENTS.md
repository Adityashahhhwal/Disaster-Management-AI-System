# AI - Disaster Evacuation Platform

Build this project progressively as a modular Next.js 16 application using TypeScript, Tailwind CSS, shadcn/ui-compatible structure, Framer Motion, and Recharts.

## Product Direction

- Use a dark SaaS dashboard aesthetic inspired by Linear, Stripe, Vercel, and modern analytics tools.
- Keep the map as the central command surface.
- Prioritize clarity, spacing, and decision-ready information over dense decoration.

## Visual System

- Use a 12-column layout with rounded 2xl cards.
- Preserve a soft elevated card language with a bubbly shadow treatment.
- Base palette:
  - Background: #0F1115
  - Surface: #171A21
  - Card: #1E222B
  - Primary: #4F8CFF
  - Success: #22C55E
  - Danger: #EF4444
  - Warning: #F59E0B
  - Text main: #E6E8EB
  - Text dim: #9CA3AF
  - Border: #2A2F3A

## Architecture

- Keep components modular and reusable.
- Prefer folders under components/layout, components/cards, components/map, components/widgets, and components/charts.
- Reusable building blocks should include StatCard, AlertTimeline, ResourceGauge, DroneFleetCard, and SystemHealthCard.

## Delivery Order

1. Layout skeleton and design tokens.
2. Reusable cards and dashboard structure.
3. Map system and layer controls.
4. Disaster-specific operational features.
5. Responsiveness and overflow hardening.

## Constraints

- Do not generate the entire application at once.
- Keep each step production-minded and composable.
- Preserve the existing HTML prototypes as reference material during the migration.
