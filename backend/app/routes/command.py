from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from backend.app.db.memory import sos_store
from backend.app.models.sos import SOSCluster
from backend.app.services.clustering import cluster_sos_signals
from backend.app.websocket.manager import manager

router = APIRouter(tags=["command"])


@router.get("/clusters", response_model=list[SOSCluster])
async def list_sos_clusters() -> list[SOSCluster]:
    active_records = await sos_store.list_active()
    return cluster_sos_signals(active_records)


@router.websocket("/ws/command")
async def command_feed(websocket: WebSocket) -> None:
    await manager.connect(websocket)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
