import pytest
from fastapi.testclient import TestClient

from backend.app.db.memory import sos_store
from backend.app.main import app

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_store() -> None:
    sos_store.reset()


def test_receive_sos_persists_and_returns_dispatch_reference() -> None:
    response = client.post(
        "/sos",
        json={
            "reporter_name": "Aditi Sharma",
            "phone": "+919800000001",
            "lat": 22.5589,
            "lng": 88.3896,
            "people_count": 3,
            "needs": ["medical"],
            "has_medical_emergency": True,
            "has_children": True
        }
    )

    assert response.status_code == 201
    body = response.json()
    assert body["reference"] == "SOS-C4-204"
    assert body["eta_minutes"] == 12
    assert body["priority_score"] > 40

    active_response = client.get("/sos/active")
    assert active_response.status_code == 200
    assert active_response.json()[0]["reference"] == "SOS-C4-204"


def test_clusters_endpoint_groups_active_sos() -> None:
    for lat, lng in [(22.5589, 88.3896), (22.5594, 88.3901), (22.5865, 88.3742)]:
        response = client.post(
            "/sos",
            json={
                "lat": lat,
                "lng": lng,
                "people_count": 2,
                "needs": ["boat"]
            }
        )
        assert response.status_code == 201

    clusters_response = client.get("/clusters")

    assert clusters_response.status_code == 200
    clusters = clusters_response.json()
    assert len(clusters) == 2
    assert clusters[0]["signal_count"] == 2


def test_status_update_removes_resolved_sos_from_active_list() -> None:
    create_response = client.post(
        "/sos",
        json={
            "lat": 22.5589,
            "lng": 88.3896,
            "people_count": 1,
            "needs": ["evacuation"]
        }
    )
    reference = create_response.json()["reference"]

    update_response = client.patch(f"/sos/{reference}/status", json={"status": "resolved"})

    assert update_response.status_code == 200
    assert update_response.json()["status"] == "resolved"
    assert client.get("/sos/active").json() == []
