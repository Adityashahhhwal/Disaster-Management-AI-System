# RescueNet Architecture

This project is moving from a dashboard-only prototype to a backend-first disaster response system.

## Product Split

- Victim PWA: ultra-light mobile interface for SOS, safe-status, location capture, and nearest shelter guidance.
- Command dashboard: operator interface for live SOS pins, clusters, rescue queue, team status, resources, and system health.
- FastAPI backend: source of truth for intake, clustering, priority scoring, routing, status updates, and live broadcast.

## Current Backend Slice

Implemented:
- `POST /sos` accepts victim signals and returns a dispatch reference.
- `GET /sos/active` lists open or assigned SOS records.
- `PATCH /sos/{reference}/status` updates rescue state.
- `GET /clusters` groups nearby active SOS records.
- `/ws/command` is ready for live dashboard broadcasts.
- Priority scoring accounts for people count, medical needs, elderly, children, and wait time.
- Clustering uses haversine distance and connected groups within a rescue radius.

Current storage is in-memory so tests and local demos are fast. Replace `backend/app/db/memory.py` with a MongoDB adapter next.

## Target Architecture

```text
Victim PWA  ------ REST ------\
                               FastAPI Backend --- MongoDB
Dashboard   --- WebSocket ----/       |
                                      Redis pub/sub
                                      OSRM routing
                                      MSG91/Twilio SMS
```

## Next Backend Steps

1. Connect MongoDB persistence for SOS records, shelters, rescue teams, and status history.
2. Add dashboard WebSocket client so new SOS pins appear without polling.
3. Add rescue team assignment data model and queue endpoint.
4. Add OSRM route safety service with flood-zone checks.
5. Add SMS confirmation and nearby flood alert fallback.
6. Build the victim PWA as a separate mobile-first app, not as another dashboard panel.
