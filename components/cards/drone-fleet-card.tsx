import type { DroneItem } from "@/types/dashboard";

import { ExpandablePanel } from "@/components/ui/expandable-panel";

export function DroneFleetCard({
  items
}: {
  items: DroneItem[];
}) {
  const averageBattery = Math.round(items.reduce((sum, item) => sum + item.battery, 0) / items.length);
  const readyUnits = items.filter((item) => item.status.toLowerCase().includes("ready")).length;

  return (
    <ExpandablePanel
      eyebrow="Rescue Operations"
      title="Aerial coordination"
      summaryItems={[
        { label: "Active drones", value: String(items.length).padStart(2, "0") },
        { label: "Average battery", value: `${averageBattery}%`, tone: averageBattery < 50 ? "warning" : "success" },
        { label: "Payload ready", value: String(readyUnits).padStart(2, "0") }
      ]}
      className="h-full"
      bodyClassName="space-y-4"
    >
      {items.map((item) => (
        <article key={item.name} className="bubble-subtle rounded-3xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm text-(--text-dim)">{item.status}</p>
            </div>
            <span className="bubble-strong shrink-0 rounded-full px-3 py-1 text-xs text-(--text-dim)">{item.zone}</span>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-(--text-dim)">
            <span>Battery status</span>
            <span className="text-(--text-main)">{item.battery}%</span>
          </div>
        </article>
      ))}
    </ExpandablePanel>
  );
}
