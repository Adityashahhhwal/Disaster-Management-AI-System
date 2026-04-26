from datetime import UTC, datetime
from typing import Literal

from backend.app.models.sos import SOSCreate, SOSRecord

SOSStatus = Literal["open", "assigned", "resolved", "safe"]


class InMemorySOSStore:
    def __init__(self) -> None:
        self._records: list[SOSRecord] = []
        self._sequence = 204

    async def create(self, payload: SOSCreate, priority_score: float) -> SOSRecord:
        record = SOSRecord(
            **payload.model_dump(),
            reference=f"SOS-C4-{self._sequence}",
            priority_score=round(priority_score, 2)
        )
        self._sequence += 1
        self._records.append(record)
        return record

    async def list_active(self) -> list[SOSRecord]:
        return [record for record in self._records if record.status in {"open", "assigned"}]

    async def list_all(self) -> list[SOSRecord]:
        return list(self._records)

    async def update_status(self, reference: str, status: SOSStatus) -> SOSRecord | None:
        for index, record in enumerate(self._records):
            if record.reference == reference:
                updated = record.model_copy(update={"status": status, "updated_at": datetime.now(UTC)})
                self._records[index] = updated
                return updated

        return None

    def reset(self) -> None:
        self._records.clear()
        self._sequence = 204


sos_store = InMemorySOSStore()
