import { Panel } from "@/components/ui/panel";
import { ThemeToggle } from "../ui/theme-toggle";

type TopbarProps = {
  onMenuToggle?: () => void;
};

export function Topbar({ onMenuToggle }: TopbarProps) {
  return (
    <Panel tone="surface" padding="lg" className="relative overflow-hidden">
      <ThemeToggle className="absolute right-8 top-8 z-10" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 pr-20">
          <div className="mb-4 flex flex-wrap gap-3 xl:hidden">
            <button
              type="button"
              onClick={onMenuToggle}
              className="rounded-2xl border border-black/8 bg-black/4 px-4 py-3 text-sm text-(--text-main) transition-colors hover:bg-black/7 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10"
            >
              Navigation
            </button>
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-(--text-dim)">Emergency Response Control System</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-(--text-main) md:text-4xl">
            Detect, prioritize, and route rescue operations from one live map
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-(--text-dim)">
            Built for the first 30 minutes of a disaster event: find people at risk, keep corridors open, and show why the next move matters.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-(--text-dim)">
        </div>
      </div>
    </Panel>
  );
}
