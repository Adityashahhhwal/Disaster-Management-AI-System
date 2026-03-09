"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Panel } from "@/components/ui/panel";

type ActionTone = "primary" | "success" | "danger";

type ResponseAction = {
  label: string;
  hint: string;
  status: string;
  tone: ActionTone;
};

type StoryStep = {
  label: string;
  detail: string;
};

const actionToneClasses: Record<ActionTone, string> = {
  primary: "border-(--primary)/30 bg-(--primary)/12 text-(--text-main)",
  success: "border-(--success)/30 bg-(--success)/12 text-(--text-main)",
  danger: "border-(--danger)/30 bg-(--danger)/12 text-(--text-main)"
};

export function ResponseHero({
  actions,
  steps
}: {
  actions: ResponseAction[];
  steps: StoryStep[];
}) {
  const [selectedAction, setSelectedAction] = useState(actions[0]?.label ?? "");

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Panel tone="surface" padding="lg" className="overflow-hidden">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] xl:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-(--text-dim)">Public Emergency Entry</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-(--text-main) md:text-5xl">
              Emergency response control system for civilians and command teams.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-(--text-dim)">
              The platform should answer two questions immediately: who needs help right now, and where rescue teams should move next.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {actions.map((action, index) => (
                <motion.button
                  key={action.label}
                  type="button"
                  onClick={() => setSelectedAction(action.label)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: 0.06 * index }}
                  className={`rounded-3xl border px-4 py-4 text-left transition-transform hover:-translate-y-0.5 ${actionToneClasses[action.tone]} ${selectedAction === action.label ? "ring-2 ring-(--ring)" : "opacity-85"}`}
                  aria-pressed={selectedAction === action.label}
                >
                  <span className="block text-sm font-semibold">{action.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-(--text-dim)">{action.hint}</span>
                </motion.button>
              ))}
            </div>

            <div className="bubble-subtle mt-4 rounded-[26px] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-(--text-dim)">Selected Flow</p>
              <p className="mt-2 text-sm leading-6 text-(--text-main)">
                {actions.find((action) => action.label === selectedAction)?.status}
              </p>
            </div>
          </div>

          <div className="bubble-subtle rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-(--text-dim)">Mission Story</p>
            <div className="mt-4 space-y-3">
              {steps.map((step, index) => (
                <div key={step.label} className="rounded-[22px] border border-white/6 bg-black/8 px-4 py-3 dark:bg-white/3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-(--text-main)">{step.label}</span>
                    <span className="text-xs text-(--text-dim)">0{index + 1}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-(--text-dim)">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </motion.section>
  );
}