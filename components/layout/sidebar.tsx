"use client";

import type { MouseEventHandler } from "react";
import { useEffect, useState } from "react";

import { primaryNavigation } from "@/config/navigation";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";

type SidebarProps = {
  mobile?: boolean;
  onNavigate?: MouseEventHandler<HTMLAnchorElement>;
};

export function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const [activeHref, setActiveHref] = useState(primaryNavigation[0]?.href ?? "#command-center");

  useEffect(() => {
    const updateActiveHref = () => {
      setActiveHref(window.location.hash || "#command-center");
    };

    updateActiveHref();
    window.addEventListener("hashchange", updateActiveHref);

    return () => {
      window.removeEventListener("hashchange", updateActiveHref);
    };
  }, []);

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
            <p className="text-xs uppercase tracking-[0.24em] text-(--text-dim)">Disaster Response Grid</p>
            <div>
              <h1 className="text-xl font-semibold text-(--text-main)">National Command</h1>
              <p className="mt-2 text-sm leading-6 text-(--text-dim)">
                Civilian intake, live rescue routing, and AI-assisted flood response oversight.
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {primaryNavigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-colors",
                  activeHref === item.href
                    ? "bg-black/5 text-(--text-main) dark:bg-white/5"
                    : "text-(--text-dim) hover:bg-black/5 hover:text-(--text-main) dark:hover:bg-white/5"
                )}
              >
                <span className="truncate">{item.label}</span>
                <span className={cn("h-2 w-2 rounded-full", activeHref === item.href ? "bg-(--primary)" : "bg-transparent")} />
              </a>
            ))}
          </nav>
        </Panel>

        <Panel tone="surface" className="space-y-4 overflow-hidden">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-(--text-dim)">Current Status</p>
            <p className="mt-2 text-sm text-(--text-main)">Eastern flood cascade active</p>
          </div>
          <div className="space-y-3 text-sm text-(--text-dim)">
            <p>3 flood zones under active watch</p>
            <p>8 rescue teams and 3 medevac units deployed</p>
            <p>18 minute evacuation window in corridor delta</p>
          </div>
        </Panel>
      </div>
    </aside>
  );
}
