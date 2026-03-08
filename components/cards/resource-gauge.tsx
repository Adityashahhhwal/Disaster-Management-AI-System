import type { ResourceItem } from "@/types/dashboard";

import { ExpandablePanel } from "@/components/ui/expandable-panel";

export function ResourceGauge({
  items
}: {
  items: ResourceItem[];
}) {
  const lowestResource = items.reduce((lowest, item) => (item.value < lowest.value ? item : lowest), items[0]);
  const averageReadiness = Math.round(items.reduce((sum, item) => sum + item.value, 0) / items.length);

  return (
    <ExpandablePanel
      eyebrow="Resource Pressure"
      title="Supply readiness"
      summaryItems={[
        { label: "Average readiness", value: `${averageReadiness}%` },
        { label: "Lowest buffer", value: `${lowestResource.value}%`, tone: lowestResource.tone },
        { label: "Watched pools", value: String(items.length).padStart(2, "0") }
      ]}
      className="h-full"
      bodyClassName="space-y-5"
    >
      {items.map((item) => {
        const color =
          item.tone === "success"
            ? "var(--success)"
            : item.tone === "warning"
              ? "var(--warning)"
              : "var(--danger)";

        return (
          <div key={item.label} className="bubble-subtle space-y-3 rounded-3xl p-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate text-(--text-main)">{item.label}</span>
              <span className="shrink-0 font-medium text-(--text-dim)">{item.value}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-black/7 dark:bg-white/6">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${item.value}%`,
                  background: color
                }}
              />
            </div>
          </div>
        );
      })}
    </ExpandablePanel>
  );
}
