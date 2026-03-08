"use client";

import { motion } from "framer-motion";

import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/dashboard";

const toneClasses = {
  primary: "text-(--primary)",
  success: "text-(--success)",
  warning: "text-(--warning)",
  danger: "text-(--danger)"
};

export function StatCard({
  title,
  value,
  delta,
  detail,
  tone,
  className
}: {
  title: string;
  value: string;
  delta: string;
  detail: string;
  tone: Tone;
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={className}
    >
      <Panel className="h-full overflow-hidden rounded-[28px] p-4 lg:p-5">
        <div className="flex h-full flex-col text-left">
          <div className="space-y-3">
            <p className="max-w-none text-sm leading-5 text-(--text-dim) lg:text-base lg:leading-6">{title}</p>
            <p className="text-[2rem] font-semibold leading-none tracking-tight text-(--text-main) lg:text-[2.2rem]">{value}</p>
            <span className={cn("inline-flex max-w-full text-sm font-medium leading-5 lg:text-base lg:leading-6", toneClasses[tone])}>{delta}</span>
          </div>

          <div className="bubble-subtle mt-3 rounded-3xl px-4 py-3">
            <p className="text-xs leading-5 text-(--text-dim) lg:text-sm lg:leading-6">{detail}</p>
          </div>
        </div>
      </Panel>
    </motion.article>
  );
}
