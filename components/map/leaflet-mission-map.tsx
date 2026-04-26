"use client";

import L, { type LatLngExpression } from "leaflet";
import { Circle, LayerGroup, LayersControl, MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

import type { Tone } from "@/types/dashboard";

type MissionMarker = {
  label: string;
  role: string;
  position: LatLngExpression;
  tone: Exclude<Tone, "warning">;
  detail: string;
};

const center: LatLngExpression = [22.5667, 88.3697];

const missionMarkers: MissionMarker[] = [
  {
    label: "Ward 5 SOS Cluster",
    role: "Priority rescue",
    position: [22.5589, 88.3896],
    tone: "danger",
    detail: "31 rooftop calls grouped by telecom pings and drone thermal sweep."
  },
  {
    label: "Delta Relief Camp",
    role: "Shelter online",
    position: [22.5476, 88.3534],
    tone: "success",
    detail: "426 evacuees checked in. Pediatric triage team requested."
  },
  {
    label: "Hospital North",
    role: "Medevac destination",
    position: [22.5865, 88.3742],
    tone: "primary",
    detail: "Emergency beds available with ambulance access still open."
  }
];

const evacuationRoute: LatLngExpression[] = [
  [22.5476, 88.3534],
  [22.5548, 88.3617],
  [22.5639, 88.3678],
  [22.5758, 88.3713],
  [22.5865, 88.3742]
];

const rescueRoute: LatLngExpression[] = [
  [22.5865, 88.3742],
  [22.5762, 88.3812],
  [22.5682, 88.3861],
  [22.5589, 88.3896]
];

function markerIcon(tone: MissionMarker["tone"]) {
  return L.divIcon({
    className: `mission-marker mission-marker--${tone}`,
    html: '<span class="mission-marker__pulse"></span><span class="mission-marker__pin"></span>',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16]
  });
}

export function LeafletMissionMap() {
  return (
    <MapContainer
      center={center}
      zoom={13}
      minZoom={11}
      maxZoom={18}
      scrollWheelZoom
      className="mission-leaflet h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Mission markers">
          <LayerGroup>
            {missionMarkers.map((marker) => (
              <Marker key={marker.label} position={marker.position} icon={markerIcon(marker.tone)}>
                <Popup>
                  <div className="mission-popup">
                    <p className="mission-popup__role">{marker.role}</p>
                    <strong>{marker.label}</strong>
                    <span>{marker.detail}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Flood risk zone">
          <LayerGroup>
            <Circle
              center={[22.5618, 88.3862]}
              radius={1180}
              pathOptions={{
                color: "rgba(239,68,68,0.9)",
                fillColor: "rgba(239,68,68,0.24)",
                fillOpacity: 0.6,
                weight: 2
              }}
            />
            <Circle
              center={[22.5512, 88.3726]}
              radius={780}
              pathOptions={{
                color: "rgba(245,158,11,0.9)",
                fillColor: "rgba(245,158,11,0.18)",
                fillOpacity: 0.55,
                weight: 2
              }}
            />
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Evacuation route">
          <LayerGroup>
            <Polyline
              positions={evacuationRoute}
              pathOptions={{
                color: "rgba(79,140,255,0.95)",
                dashArray: "10 10",
                lineCap: "round",
                opacity: 0.95,
                weight: 5
              }}
            />
            <Polyline
              positions={rescueRoute}
              pathOptions={{
                color: "rgba(34,197,94,0.92)",
                dashArray: "3 10",
                lineCap: "round",
                opacity: 0.9,
                weight: 4
              }}
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
