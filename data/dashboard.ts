import type { AlertItem, DroneItem, HealthPoint, MapLayerItem, ResourceItem, StatCardItem } from "@/types/dashboard";

export const statCards: StatCardItem[] = [
  {
    title: "People In Evacuation Flow",
    value: "18,240",
    delta: "+12.4%",
    tone: "primary",
    detail: "Across 14 active corridors"
  },
  {
    title: "Shelter Capacity Used",
    value: "68%",
    delta: "+6 sites",
    tone: "warning",
    detail: "North-east cluster under strain"
  },
  {
    title: "Critical Alerts",
    value: "07",
    delta: "2 escalating",
    tone: "danger",
    detail: "Flash flood and bridge closures"
  },
  {
    title: "Mission Success Rate",
    value: "94.2%",
    delta: "+1.8%",
    tone: "success",
    detail: "Last 12 operational hours"
  }
];

export const alerts: AlertItem[] = [
  {
    title: "River belt overflow threshold breached",
    time: "2 min ago",
    level: "danger",
    description: "Sector C4 expected to lose vehicle access within 18 minutes."
  },
  {
    title: "Drone relay restored over corridor east-2",
    time: "11 min ago",
    level: "success",
    description: "Thermal telemetry and crowd density feed are back online."
  },
  {
    title: "Shelter Delta requesting medical overflow team",
    time: "19 min ago",
    level: "warning",
    description: "Pediatric intake exceeded current staffing buffer."
  }
];

export const mapLayers: MapLayerItem[] = [
  { label: "Flood zones", active: true, tone: "danger" },
  { label: "Shelters", active: true, tone: "success" },
  { label: "Hospitals", active: true, tone: "primary" },
  { label: "Routes", active: true, tone: "warning" },
  { label: "Rescue teams", active: false, tone: "primary" }
];

export const resourceItems: ResourceItem[] = [
  { label: "Emergency beds", value: 82, tone: "success" },
  { label: "Water units", value: 61, tone: "warning" },
  { label: "Power backups", value: 44, tone: "danger" }
];

export const droneFleet: DroneItem[] = [
  { name: "Aero-14", status: "Scanning route grid", battery: 88, zone: "C4" },
  { name: "Aero-09", status: "Victim heat signature lock", battery: 63, zone: "B2" },
  { name: "Aero-21", status: "Medical payload ready", battery: 47, zone: "Delta Shelter" }
];

export const healthSeries: HealthPoint[] = [
  { name: "00:00", connectivity: 86, response: 72 },
  { name: "03:00", connectivity: 83, response: 75 },
  { name: "06:00", connectivity: 79, response: 78 },
  { name: "09:00", connectivity: 90, response: 84 },
  { name: "12:00", connectivity: 92, response: 88 },
  { name: "15:00", connectivity: 94, response: 91 }
];
