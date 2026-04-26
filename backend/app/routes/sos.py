from fastapi import APIRouter, HTTPException, status

from backend.app.db.memory import sos_store
from backend.app.models.sos import SOSCreate, SOSCreateResponse, SOSRecord, SOSStatusUpdate
from backend.app.services.clustering import cluster_sos_signals
from backend.app.services.priority import calculate_priority_score, estimate_eta_minutes
from backend.app.websocket.manager import manager

router = APIRouter(prefix="/sos", tags=["sos"])


@router.post("", response_model=SOSCreateResponse, status_code=status.HTTP_201_CREATED)
async def receive_sos(payload: SOSCreate) -> SOSCreateResponse:
    priority_score = calculate_priority_score(payload)
    record = await sos_store.create(payload, priority_score)
    active_records = await sos_store.list_active()
    clusters = cluster_sos_signals(active_records)

    await manager.broadcast({
        "event": "new_sos",
        "data": record.model_dump(mode="json"),
        "clusters": [cluster.model_dump() for cluster in clusters]
    })

    return SOSCreateResponse(
        reference=record.reference,
        eta_minutes=estimate_eta_minutes(record.priority_score),
        priority_score=record.priority_score,
        cluster_count=len(clusters)
    )


@router.get("/active", response_model=list[SOSRecord])
async def list_active_sos() -> list[SOSRecord]:
    return await sos_store.list_active()


@router.patch("/{reference}/status", response_model=SOSRecord)
async def update_sos_status(reference: str, payload: SOSStatusUpdate) -> SOSRecord:
    updated = await sos_store.update_status(reference, payload.status)

    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="SOS reference not found")

    await manager.broadcast({
        "event": "sos_status_updated",
        "data": updated.model_dump(mode="json")
    })

    return updated
