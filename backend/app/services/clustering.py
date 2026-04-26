from math import asin, cos, radians, sin, sqrt

from backend.app.models.sos import SOSCluster, SOSRecord

EARTH_RADIUS_M = 6_371_000


def haversine_meters(a_lat: float, a_lng: float, b_lat: float, b_lng: float) -> float:
    lat_delta = radians(b_lat - a_lat)
    lng_delta = radians(b_lng - a_lng)
    a_lat_rad = radians(a_lat)
    b_lat_rad = radians(b_lat)

    value = sin(lat_delta / 2) ** 2 + cos(a_lat_rad) * cos(b_lat_rad) * sin(lng_delta / 2) ** 2
    return 2 * EARTH_RADIUS_M * asin(sqrt(value))


def cluster_sos_signals(records: list[SOSRecord], radius_meters: float = 200) -> list[SOSCluster]:
    unvisited = set(range(len(records)))
    clusters: list[SOSCluster] = []

    while unvisited:
        start = unvisited.pop()
        group = {start}
        frontier = [start]

        while frontier:
            current = frontier.pop()
            current_record = records[current]
            neighbors = [
                candidate
                for candidate in list(unvisited)
                if haversine_meters(
                    current_record.lat,
                    current_record.lng,
                    records[candidate].lat,
                    records[candidate].lng
                )
                <= radius_meters
            ]

            for neighbor in neighbors:
                unvisited.remove(neighbor)
                group.add(neighbor)
                frontier.append(neighbor)

        group_records = [records[index] for index in sorted(group)]
        centroid_lat = sum(record.lat for record in group_records) / len(group_records)
        centroid_lng = sum(record.lng for record in group_records) / len(group_records)
        priority_score = sum(record.priority_score for record in group_records)

        clusters.append(
            SOSCluster(
                id=f"cluster-{len(clusters) + 1}",
                centroid_lat=round(centroid_lat, 6),
                centroid_lng=round(centroid_lng, 6),
                signal_count=len(group_records),
                references=[record.reference for record in group_records],
                people_count=sum(record.people_count for record in group_records),
                priority_score=round(priority_score, 2)
            )
        )

    return sorted(clusters, key=lambda cluster: cluster.priority_score, reverse=True)
