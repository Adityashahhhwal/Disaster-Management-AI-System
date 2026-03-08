"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";
    const root = document.documentElement;
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const centerX = `${buttonRect.left + buttonRect.width / 2}px`;
    const centerY = `${buttonRect.top + buttonRect.height / 2}px`;

    root.style.setProperty("--theme-transition-x", centerX);
    root.style.setProperty("--theme-transition-y", centerY);

    const fallbackTransition = () => {
      root.classList.add("theme-transitioning");
      flushSync(() => setTheme(nextTheme));
      window.setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 800);
    };

    const transitionDocument = document as ViewTransitionDocument;

    if (!transitionDocument.startViewTransition) {
      fallbackTransition();
      return;
    }

    root.classList.add("theme-transitioning");

    const transition = transitionDocument.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
    });

    transition.finished.finally(() => {
      root.classList.remove("theme-transitioning");
    });
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
      <motion.span
        key={isDark ? "dark" : "light"}
        initial={{ rotate: isDark ? -72 : 72, scale: 0.92, opacity: 0.65 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-4xl border transition-colors",
          isDark
            ? "border-white/10 bg-white/10 text-(--warning)"
            : "border-black/10 bg-white text-(--primary)"
        )}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </motion.span>
    </button>
  );
}