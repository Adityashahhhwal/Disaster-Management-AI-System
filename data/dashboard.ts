import type {
  AiPriorityItem,
  AlertItem,
  DroneItem,
  HealthPoint,
  KeyMetric,
  MapLayerItem,
  ResourceItem,
  ResponseAction,
  StatCardItem,
  StoryStep
} from "@/types/dashboard";

export const statCards: StatCardItem[] = [
  {
    title: "Flood zones",
    value: "03",
    delta: "2 expanding",
    tone: "danger",
    detail: "Eastern canal and low-bridge corridor"
  },
  {
    title: "People stranded",
    value: "142",
    delta: "31 rooftop SOS",
    tone: "primary",
    detail: "Confirmed by calls, drones, and sensor feeds"
  },
  {
    title: "Active rescue teams",
    value: "08",
    delta: "3 medevac ready",
    tone: "success",
    detail: "Distributed across five access corridors"
  }
];

export const responseActions: ResponseAction[] = [
  {
    id: "need-help",
    label: "I need help",
    hint: "Raise an SOS with your live location and nearest landmark.",
    status: "SOS intake active. The system should now ask for location, phone access, and number of people with you.",
    tone: "danger"
  },
  {
    id: "safe",
    label: "I am safe",
    hint: "Update your status so rescue teams stop searching your zone.",
    status: "Safe status queued. Civilian search priority should drop and family notifications can be triggered.",
    tone: "success"
  },
  {
    id: "map",
    label: "View live map",
    hint: "Open evacuation corridors, shelters, and hospital access routes.",
    status: "Live map mode selected. Show the nearest shelter, open route, and hospital access within one view.",
    tone: "primary"
  }
];

export const missionSteps: StoryStep[] = [
  {
    label: "Detect disaster",
    detail: "River sensors and rainfall models confirm a three-zone flood cascade."
  },
  {
    label: "Locate victims",
    detail: "Emergency calls, thermal drone sweeps, and shelter intake data are merged."
  },
  {
    label: "Deploy rescue",
    detail: "Teams are routed through the two corridors still above safe depth."
  },
  {
    label: "Track recovery",
    detail: "Command monitors shelter load, medical overflow, and route reopen windows."
  }
];

export const aiSummary: KeyMetric[] = [
  { label: "Risk model refresh", value: "24 sec", tone: "primary" },
  { label: "Evacuation window", value: "18 min", tone: "danger" },
  { label: "Route confidence", value: "91%", tone: "success" }
];

export const aiPriorities: AiPriorityItem[] = [
  {
    label: "Flood risk",
    value: "High in sector C4",
    detail: "Water depth is projected to breach ambulance access within 18 minutes if rain holds.",
    tone: "danger"
  },
  {
    label: "Best evacuation route",
    value: "Delta corridor",
    detail: "AI recommends rerouting civilians through the school bridge before congestion spikes.",
    tone: "primary"
  },
  {
    label: "Rescue priority",
    value: "142 stranded",
    detail: "Three rooftop clusters and one medical shelter overflow site are ranked as immediate targets.",
    tone: "success"
  }
];

export const alerts: AlertItem[] = [
  {
    title: "Ward 5 rooftop SOS cluster confirmed",
    time: "2 min ago",
    level: "danger",
    description: "Eleven civilians detected by thermal sweep after telecom pings dropped from the block."
  },
  {
    title: "School bridge remains open for evacuation",
    time: "11 min ago",
    level: "success",
    description: "Traffic AI estimates a 14-minute window before water rises over the eastern ramp."
  },
  {
    title: "Delta shelter requests pediatric triage team",
    time: "19 min ago",
    level: "warning",
    description: "Intake crossed medical staffing buffer after evacuees from canal blocks arrived."
  }
];

export const mapLayers: MapLayerItem[] = [
  { label: "Flood zones", active: true, tone: "danger" },
  { label: "Shelters", active: true, tone: "success" },
  { label: "Hospitals", active: true, tone: "primary" },
  { label: "Evac routes", active: true, tone: "primary" },
  { label: "Rescue teams", active: true, tone: "success" }
];

export const resourceItems: ResourceItem[] = [
  { label: "Emergency beds", value: 82, tone: "success" },
  { label: "Water units", value: 61, tone: "warning" },
  { label: "Power backups", value: 44, tone: "danger" }
];

export const droneFleet: DroneItem[] = [
  { name: "Aero-14", status: "Scanning canal breach and bridge traffic", battery: 88, zone: "C4" },
  { name: "Aero-09", status: "Holding victim heat-signature lock", battery: 63, zone: "Ward 5" },
  { name: "Aero-21", status: "Medical payload ready for shelter transfer", battery: 47, zone: "Delta Shelter" }
];

export const healthSeries: HealthPoint[] = [
  { name: "00:00", connectivity: 86, response: 72 },
  { name: "03:00", connectivity: 83, response: 75 },
  { name: "06:00", connectivity: 79, response: 78 },
  { name: "09:00", connectivity: 90, response: 84 },
  { name: "12:00", connectivity: 92, response: 88 },
  { name: "15:00", connectivity: 94, response: 91 }
];
