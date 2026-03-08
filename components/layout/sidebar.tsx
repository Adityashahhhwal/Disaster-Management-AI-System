import type { MouseEventHandler } from "react";

import { primaryNavigation } from "@/config/navigation";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

type SidebarProps = {
  mobile?: boolean;
  onNavigate?: MouseEventHandler<HTMLButtonElement>;
};

export function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  return (
    <aside className={cn(mobile ? "block h-full w-full" : "hidden w-64 shrink-0 xl:block")}>
      <div
        className={cn(
          "flex flex-col gap-8",
          mobile ? "h-full overflow-y-auto" : "sticky top-8 min-h-[calc(100vh-4rem)]"
        )}
      >
        <Panel tone="surface" padding="lg" className={cn("space-y-8 overflow-hidden", mobile && "min-h-fit")}>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-(--text-dim)">AI Evacuation Grid</p>
            <div>
              <h1 className="text-xl font-semibold text-(--text-main)">National Command</h1>
              <p className="mt-2 text-sm leading-6 text-(--text-dim)">
                Evacuation routing, shelter balancing, and live operational oversight.
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {primaryNavigation.map((item) => (
              <button
                key={item.label}
                onClick={onNavigate}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-colors",
                  item.active
                    ? "bg-black/5 text-(--text-main) dark:bg-white/5"
                    : "text-(--text-dim) hover:bg-black/5 hover:text-(--text-main) dark:hover:bg-white/5"
                )}
              >
                <span className="truncate">{item.label}</span>
                <span className={cn("h-2 w-2 rounded-full", item.active ? "bg-(--primary)" : "bg-transparent")} />
              </button>
            ))}
          </nav>
        </Panel>

        <Panel tone="surface" className="space-y-4 overflow-hidden">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-(--text-dim)">Current Status</p>
            <p className="mt-2 text-sm text-(--text-main)">Monsoon flood cascade active</p>
          </div>
          <div className="space-y-3 text-sm text-(--text-dim)">
            <p>14 sectors under watch</p>
            <p>46 ground teams deployed</p>
            <p>3 command approvals pending</p>
          </div>
        </Panel>
      </div>
    </aside>
  );
}
