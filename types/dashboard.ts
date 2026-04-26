export type Tone = "primary" | "success" | "warning" | "danger";

export type KeyMetric = {
  label: string;
  value: string;
  tone?: Tone;
};

export type StatCardItem = {
  title: string;
  value: string;
  delta: string;
  tone: Tone;
  detail: string;
};

export type AlertItem = {
  title: string;
  time: string;
  level: Exclude<Tone, "primary">;
  description: string;
};

export type MapLayerItem = {
  label: string;
  active: boolean;
  tone: Tone;
};

export type ResourceItem = {
  label: string;
  value: number;
  tone: Exclude<Tone, "primary">;
};

export type DroneItem = {
  name: string;
  status: string;
  battery: number;
  zone: string;
};

export type HealthPoint = {
  name: string;
  connectivity: number;
  response: number;
};

export type ResponseAction = {
  id: "need-help" | "safe" | "map";
  label: string;
  hint: string;
  status: string;
  tone: "primary" | "success" | "danger";
};

export type StoryStep = {
  label: string;
  detail: string;
};

export type AiPriorityItem = {
  label: string;
  value: string;
  detail: string;
  tone: Tone;
};
