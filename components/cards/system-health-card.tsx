"use client";

import { useEffect, useRef, useState } from "react";

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import type { HealthPoint } from "@/types/dashboard";

import { ExpandablePanel } from "@/components/ui/expandable-panel";

export function SystemHealthCard({
  data
}: {
  data: HealthPoint[];
}) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const latestPoint = data[data.length - 1];

  useEffect(() => {
    const chartContainer = chartContainerRef.current;

    if (!chartContainer) {
      return;
    }

    const updateSize = () => {
      const { width, height } = chartContainer.getBoundingClientRect();

      setChartSize({
        width: Math.max(0, Math.floor(width)),
        height: Math.max(0, Math.floor(height))
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(chartContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <ExpandablePanel
      eyebrow="System Health"
      title="Network and response trend"
      summaryItems={[
        { label: "Connectivity", value: `${latestPoint?.connectivity ?? 0}%`, tone: "primary" },
        { label: "Response", value: `${latestPoint?.response ?? 0}%`, tone: "success" },
        { label: "Last window", value: latestPoint?.name ?? "Pending" }
      ]}
      className="h-full"
    >
      <div ref={chartContainerRef} className="bubble-subtle h-80 w-full min-w-0 rounded-[26px] p-4 sm:h-90">
        {chartSize.width > 0 && chartSize.height > 0 ? (
          <AreaChart width={chartSize.width} height={chartSize.height} data={data}>
            <defs>
              <linearGradient id="connectivity" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#4F8CFF" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#4F8CFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="response" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis axisLine={false} dataKey="name" tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--bubble-border)",
                borderRadius: 16,
                color: "var(--text-main)"
              }}
            />
            <Area dataKey="connectivity" fill="url(#connectivity)" stroke="#4F8CFF" strokeWidth={2.5} type="monotone" />
            <Area dataKey="response" fill="url(#response)" stroke="#22C55E" strokeWidth={2.5} type="monotone" />
          </AreaChart>
        ) : (
          <div className="grid h-full place-items-center rounded-2xl bg-black/4 text-sm text-(--text-dim) dark:bg-white/2">
            System trend loading
          </div>
        )}
      </div>
    </ExpandablePanel>
  );
}
