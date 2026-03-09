import type { AlertItem } from "@/types/dashboard";

import { ExpandablePanel } from "@/components/ui/expandable-panel";

const levelStyles = {
  danger: "bg-(--danger)",
  warning: "bg-(--warning)",
  success: "bg-(--success)"
};

export function AlertTimeline({
  items
}: {
  items: AlertItem[];
}) {
  const criticalCount = items.filter((item) => item.level === "danger").length;

  return (
    <ExpandablePanel
      eyebrow="Live Incidents"
      title="Rescue-critical updates"
      summaryItems={[
        { label: "Open alerts", value: String(items.length).padStart(2, "0") },
        { label: "Critical", value: String(criticalCount).padStart(2, "0"), tone: criticalCount > 0 ? "danger" : "default" },
        { label: "Latest", value: items[0]?.time ?? "No updates" }
      ]}
      className="h-full"
      bodyClassName="space-y-4"
    >
      {items.map((item) => (
        <article key={item.title} className="bubble-subtle rounded-3xl p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className={`status-dot ${levelStyles[item.level]}`} />
              <h3 className="truncate text-sm font-semibold text-(--text-main)">{item.title}</h3>
            </div>
            <span className="shrink-0 text-xs text-(--text-dim)">{item.time}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-(--text-dim)">{item.description}</p>
        </article>
      ))}
    </ExpandablePanel>
  );
}
