"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const rotationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);

    return () => {
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
      }
    };
  }, []);

  const isDark = mounted ? theme === "dark" : false;

  const toggleTheme = () => {
    setIsRotating(true);

    if (rotationTimeoutRef.current) {
      clearTimeout(rotationTimeoutRef.current);
    }

    rotationTimeoutRef.current = setTimeout(() => {
      setIsRotating(false);
      rotationTimeoutRef.current = null;
    }, 500);

    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center rounded-4xl border border-black/8 bg-black/4 p-2 text-(--text-main) transition-[transform,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-black/7 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10",
        className
      )}
      style={{ transform: isRotating ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <span
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-4xl border transition-[color,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
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
