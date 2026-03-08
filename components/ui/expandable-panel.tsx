import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Panel } from "./panel";

type SummaryTone = "default" | "primary" | "success" | "warning" | "danger";

type SummaryItem = {
  label: string;
  value: string;
  tone?: SummaryTone;
};

type ExpandablePanelProps = {
  eyebrow: string;
  title: string;
  summaryItems: SummaryItem[];
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  bodyClassName?: string;
};

const toneClasses: Record<SummaryTone, string> = {
  default: "text-(--text-main)",
  primary: "text-(--primary)",
  success: "text-(--success)",
  warning: "text-(--warning)",
  danger: "text-(--danger)"
};

export function ExpandablePanel({
  eyebrow,
  title,
  summaryItems,
  children,
  className,
  bodyClassName
}: ExpandablePanelProps) {
  return (
    <Panel className={cn("overflow-hidden", className)}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.24em] text-(--text-dim)">{eyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold text-(--text-main)">{title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 2xl:grid-cols-3">
          {summaryItems.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                "bubble-subtle min-w-0 rounded-[20px] px-3 py-2.5",
                summaryItems.length === 3 && index === 2 && "col-span-2 2xl:col-span-1"
              )}
            >
              <p className="text-[0.68rem] leading-4 uppercase tracking-[0.16em] text-(--text-dim) wrap-anywhere">{item.label}</p>
              <p className={cn("mt-1.5 text-base font-semibold leading-6 wrap-break-word", toneClasses[item.tone ?? "default"])}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={cn("mt-8", bodyClassName)}>{children}</div>
    </Panel>
  );
}
