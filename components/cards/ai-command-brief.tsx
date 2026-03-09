import { ExpandablePanel } from "@/components/ui/expandable-panel";
import type { KeyMetric, Tone } from "@/types/dashboard";

type AiPriority = {
  label: string;
  value: string;
  detail: string;
  tone: Tone;
};

const toneClasses: Record<Tone, string> = {
  primary: "text-(--primary)",
  success: "text-(--success)",
  warning: "text-(--warning)",
  danger: "text-(--danger)"
};

export function AiCommandBrief({
  priorities,
  summaryItems
}: {
  priorities: AiPriority[];
  summaryItems: KeyMetric[];
}) {
  return (
    <ExpandablePanel
      eyebrow="AI Command Brief"
      title="Prediction-backed next moves"
      summaryItems={summaryItems}
      className="h-full"
      bodyClassName="space-y-4"
    >
      {priorities.map((item) => (
        <article key={item.label} className="bubble-subtle rounded-3xl p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-(--text-dim)">{item.label}</p>
              <p className={`mt-2 text-2xl font-semibold ${toneClasses[item.tone]}`}>{item.value}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs ${toneClasses[item.tone]} bg-black/8 dark:bg-white/5`}>
              AI live
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-(--text-dim)">{item.detail}</p>
        </article>
      ))}
    </ExpandablePanel>
  );
}