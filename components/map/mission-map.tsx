"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { ExpandablePanel } from "@/components/ui/expandable-panel";
import type { MapLayerItem } from "@/types/dashboard";

const LeafletMissionMap = dynamic(
  () => import("./leaflet-mission-map").then((module) => module.LeafletMissionMap),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center bg-[rgba(15,17,21,0.72)] text-sm text-(--text-dim)">
        Loading live map...
      </div>
    )
  }
);

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
      eyebrow="Live Map"
      title="Eastern flood response overview"
      summaryItems={[
        { label: "Active layers", value: String(activeLayers).padStart(2, "0") },
        { label: "People stranded", value: "142", tone: "danger" },
        { label: "Safe corridor", value: "Delta route", tone: "primary" }
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

      <div className="bubble-subtle relative aspect-16/10 min-h-90 w-full overflow-hidden rounded-4xl bg-[#0f1115] sm:min-h-105 xl:min-h-130">
        <LeafletMissionMap />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute left-4 top-[4.25rem] max-w-55 rounded-[22px] border border-white/8 bg-[rgba(239,68,68,0.16)] px-4 py-3 shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur-md sm:left-6 sm:top-6"
        >
          <div className="text-sm font-medium text-(--text-main)">AI flood projection</div>
          <p className="mt-2 text-xs leading-5 text-(--text-dim)">Depth rising at 4.1 cm/min near the eastern canal edge. Vehicle access at risk.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="pointer-events-none absolute right-4 top-[4.25rem] max-w-55 rounded-[22px] border border-white/8 bg-[rgba(46,49,55,0.76)] p-4 shadow-[0_18px_44px_rgba(0,0,0,0.24)] backdrop-blur-md sm:right-[4.5rem] sm:top-6 dark:bg-[rgba(19,22,27,0.78)]"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-dim)">AI Route Recommendation</p>
          <div className="mt-3 text-sm text-(--text-main)">Relief Camp Delta to Hospital North</div>
          <p className="mt-2 text-xs leading-5 text-(--text-dim)">Travel time 11 min. Congestion stable. Two bridges verified open for medevac.</p>
        </motion.div>

        <div className="pointer-events-none absolute bottom-4 left-4 right-4 grid gap-4 md:grid-cols-3">
          {[
            ["Shelters online", "26 / 31"],
            ["Route confidence", "91%"],
            ["Model refresh", "24 sec"]
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
