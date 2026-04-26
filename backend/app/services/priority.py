from datetime import UTC, datetime

from backend.app.models.sos import NeedType, SOSCreate, SOSRecord


def calculate_priority_score(sos: SOSCreate | SOSRecord, now: datetime | None = None) -> float:
    score = 10.0
    score += sos.people_count * 2.5

    if NeedType.MEDICAL in sos.needs or sos.has_medical_emergency:
        score *= 2.0

    if sos.has_elderly:
        score *= 1.6

    if sos.has_children:
        score *= 1.5

    if isinstance(sos, SOSRecord):
        current_time = now or datetime.now(UTC)
        minutes_waiting = max(0.0, (current_time - sos.created_at).total_seconds() / 60)
        score += minutes_waiting * 0.8

    return round(score, 2)


def estimate_eta_minutes(priority_score: float) -> int:
    if priority_score >= 70:
        return 8

    if priority_score >= 45:
        return 12

    if priority_score >= 25:
        return 18

    return 25
