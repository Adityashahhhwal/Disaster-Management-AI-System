from backend.app.models.sos import NeedType, SOSRecord
from backend.app.services.clustering import cluster_sos_signals, haversine_meters


def make_record(reference: str, lat: float, lng: float, priority_score: float = 20) -> SOSRecord:
    return SOSRecord(
        reference=reference,
        lat=lat,
        lng=lng,
        people_count=2,
        needs=[NeedType.BOAT],
        priority_score=priority_score
    )


def test_haversine_distance_is_reasonable_for_nearby_points() -> None:
    distance = haversine_meters(22.5589, 88.3896, 22.5598, 88.3902)

    assert 110 <= distance <= 130


def test_cluster_sos_signals_groups_nearby_victims() -> None:
    records = [
        make_record("SOS-C4-204", 22.5589, 88.3896, priority_score=40),
        make_record("SOS-C4-205", 22.5594, 88.3901, priority_score=35),
        make_record("SOS-C4-206", 22.5865, 88.3742, priority_score=15)
    ]

    clusters = cluster_sos_signals(records, radius_meters=200)

    assert len(clusters) == 2
    assert clusters[0].references == ["SOS-C4-204", "SOS-C4-205"]
    assert clusters[0].signal_count == 2
    assert clusters[0].people_count == 4
    assert clusters[0].priority_score == 75
    assert clusters[1].references == ["SOS-C4-206"]
