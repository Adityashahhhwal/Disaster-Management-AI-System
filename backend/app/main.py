from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.routes import command, sos

app = FastAPI(
    title="RescueNet API",
    version="0.1.0",
    description="Backend-first SOS intake, clustering, priority scoring, and command WebSocket API."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(sos.router)
app.include_router(command.router)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
