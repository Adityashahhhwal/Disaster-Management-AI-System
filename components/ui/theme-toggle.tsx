"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center rounded-4xl border border-black/8 bg-black/4 p-2 text-(--text-main) transition-colors hover:bg-black/7 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-4xl border transition-[transform,color,background-color,border-color] duration-300 ease-out",
          isDark ? "rotate-0" : "rotate-180",
          isDark
            ? "border-white/10 bg-white/10 text-(--warning)"
            : "border-black/10 bg-white text-(--primary)"
        )}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
    </button>
  );
}