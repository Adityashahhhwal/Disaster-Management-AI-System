"use client";

import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-transparent px-4 py-8 text-(--text-main) sm:px-6 xl:px-8">
      {isSidebarOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="relative z-10 flex h-full w-[min(20rem,calc(100vw-1rem))] max-w-full flex-col p-2 sm:p-4">
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setIsSidebarOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-(--surface) text-(--text-main) shadow-soft"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Sidebar mobile onNavigate={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-420 gap-8 xl:items-start">
        <Sidebar />

        <main className="min-w-0 flex-1 space-y-8 overflow-hidden">
          <Topbar onMenuToggle={() => setIsSidebarOpen(true)} />
          <div className="space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
