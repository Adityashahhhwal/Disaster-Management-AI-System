from datetime import UTC, datetime
from enum import StrEnum
from typing import Literal
from uuid import uuid4

from pydantic import BaseModel, Field, field_validator


class NeedType(StrEnum):
    MEDICAL = "medical"
    BOAT = "boat"
    FOOD_WATER = "food_water"
    EVACUATION = "evacuation"
    UNKNOWN = "unknown"


class SOSCreate(BaseModel):
    reporter_name: str | None = Field(default=None, max_length=80)
    phone: str | None = Field(default=None, max_length=24)
    lat: float = Field(ge=-90, le=90)
    lng: float = Field(ge=-180, le=180)
    people_count: int = Field(ge=1, le=100)
    needs: list[NeedType] = Field(default_factory=lambda: [NeedType.UNKNOWN])
    has_medical_emergency: bool = False
    has_elderly: bool = False
    has_children: bool = False
    notes: str | None = Field(default=None, max_length=500)

    @field_validator("needs")
    @classmethod
    def normalize_needs(cls, needs: list[NeedType]) -> list[NeedType]:
        return needs or [NeedType.UNKNOWN]


class SOSRecord(SOSCreate):
    id: str = Field(default_factory=lambda: str(uuid4()))
    reference: str
    status: Literal["open", "assigned", "resolved", "safe"] = "open"
    priority_score: float = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class SOSStatusUpdate(BaseModel):
    status: Literal["open", "assigned", "resolved", "safe"]


class SOSCluster(BaseModel):
    id: str
    centroid_lat: float
    centroid_lng: float
    signal_count: int
    references: list[str]
    people_count: int
    priority_score: float


class SOSCreateResponse(BaseModel):
    reference: str
    eta_minutes: int
    priority_score: float
    cluster_count: int
