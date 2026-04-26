from datetime import UTC, datetime, timedelta

from backend.app.models.sos import NeedType, SOSCreate, SOSRecord
from backend.app.services.priority import calculate_priority_score, estimate_eta_minutes


def test_medical_children_and_elderly_raise_priority() -> None:
    sos = SOSCreate(
        lat=22.5589,
        lng=88.3896,
        people_count=3,
        needs=[NeedType.MEDICAL],
        has_medical_emergency=True,
        has_elderly=True,
        has_children=True
    )

    assert calculate_priority_score(sos) == 84.0


def test_waiting_time_increases_existing_record_priority() -> None:
    created_at = datetime.now(UTC) - timedelta(minutes=10)
    record = SOSRecord(
        reference="SOS-C4-204",
        lat=22.5589,
        lng=88.3896,
        people_count=1,
        needs=[NeedType.EVACUATION],
        created_at=created_at,
        updated_at=created_at
    )

    assert calculate_priority_score(record, now=datetime.now(UTC)) >= 20.5


def test_eta_shortens_for_higher_priority_incidents() -> None:
    assert estimate_eta_minutes(80) == 8
    assert estimate_eta_minutes(50) == 12
    assert estimate_eta_minutes(30) == 18
    assert estimate_eta_minutes(12) == 25
