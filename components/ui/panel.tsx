import type { HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const panelVariants = cva("bubble-panel rounded-[30px] border shadow-soft backdrop-blur-sm", {
  variants: {
    tone: {
      surface: "bg-[color:var(--surface)]",
      card: "bg-[color:var(--card)]"
    },
    padding: {
      md: "p-6",
      lg: "p-8"
    }
  },
  defaultVariants: {
    tone: "card",
    padding: "md"
  }
});

type PanelProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof panelVariants>;

export function Panel({ className, tone, padding, ...props }: PanelProps) {
  return <div className={cn(panelVariants({ tone, padding }), className)} {...props} />;
}
