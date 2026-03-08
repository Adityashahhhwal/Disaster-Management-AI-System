"use client";

import { motion } from "framer-motion";

import { ExpandablePanel } from "@/components/ui/expandable-panel";
import type { MapLayerItem } from "@/types/dashboard";

export function MissionMap({
  layers
}: {
  layers: MapLayerItem[];
}) {
  const colorMap = {
    primary: "var(--primary)",
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)"
  };
  const activeLayers = layers.filter((layer) => layer.active).length;

  return (
    <ExpandablePanel
      eyebrow="Live Mission Map"
      title="Evacuation corridors and risk overlay"
      summaryItems={[
        { label: "Active layers", value: String(activeLayers).padStart(2, "0") },
        { label: "Priority route", value: "11 min", tone: "primary" },
        { label: "Prediction refresh", value: "28 sec" }
      ]}
      defaultExpanded
      className="overflow-hidden"
      bodyClassName="space-y-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {layers.map((layer) => (
            <span
              key={layer.label}
              className="rounded-full border px-3 py-1.5 text-xs font-medium"
              style={{
                borderColor: "var(--bubble-border)",
                color: layer.active ? colorMap[layer.tone] : "var(--text-dim)",
                background: layer.active ? "var(--bubble-subtle)" : "transparent"
              }}
            >
              {layer.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid-noise bubble-subtle relative aspect-16/10 min-h-90 w-full overflow-hidden rounded-4xl bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.10))] sm:min-h-105 xl:min-h-130">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_28%,rgba(79,140,255,0.14),transparent_16%),radial-gradient(circle_at_28%_68%,rgba(239,68,68,0.18),transparent_18%),radial-gradient(circle_at_74%_70%,rgba(34,197,94,0.14),transparent_16%)]" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="none">
          <path d="M120 470C210 390 310 360 390 320C510 259 585 116 830 148" stroke="rgba(79,140,255,0.9)" strokeDasharray="10 10" strokeLinecap="round" strokeWidth="6" />
          <path d="M90 240C220 275 268 245 408 212C550 179 678 292 878 242" stroke="rgba(245,158,11,0.9)" strokeDasharray="14 12" strokeLinecap="round" strokeWidth="5" />
          <path d="M330 110C430 134 480 203 560 242C650 286 740 316 850 396" stroke="rgba(34,197,94,0.72)" strokeLinecap="round" strokeWidth="4" />
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute left-[6%] top-[12%] max-w-55 rounded-[22px] border border-white/8 bg-[rgba(239,68,68,0.12)] px-4 py-3 sm:left-[12%] sm:top-[18%]"
        >
          <div className="text-sm font-medium text-(--text-main)">Flood breach cluster</div>
          <p className="mt-2 text-xs leading-5 text-(--text-dim)">Depth rising at 4.1 cm/min near the eastern canal edge.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="absolute right-[4%] top-[10%] max-w-55 rounded-[22px] border border-white/8 bg-[rgba(46,49,55,0.76)] p-4 backdrop-blur-sm sm:right-[7%] sm:top-[20%] dark:bg-[rgba(19,22,27,0.78)]"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-dim)">Priority Route</p>
          <div className="mt-3 text-sm text-(--text-main)">Relief Camp Delta to Hospital North</div>
          <p className="mt-2 text-xs leading-5 text-(--text-dim)">Travel time 11 min. Civilian density moderate. Two bridges verified open.</p>
        </motion.div>

        <div className="absolute bottom-4 left-4 right-4 grid gap-4 md:grid-cols-3">
          {[
            ["Shelters online", "26 / 31"],
            ["Route confidence", "91%"],
            ["Prediction refresh", "28 sec"]
          ].map(([label, value]) => (
            <div key={label} className="min-w-0 rounded-[22px] border border-white/8 bg-[rgba(46,49,55,0.7)] px-4 py-3 backdrop-blur-sm dark:bg-[rgba(19,22,27,0.72)]">
              <p className="text-xs uppercase tracking-[0.2em] text-(--text-dim)">{label}</p>
              <p className="mt-2 text-xl font-semibold text-(--text-main)">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </ExpandablePanel>
  );
}