import { AiCommandBrief } from "@/components/cards/ai-command-brief";
import { AlertTimeline } from "@/components/cards/alert-timeline";
import { DroneFleetCard } from "@/components/cards/drone-fleet-card";
import { ResponseHero } from "@/components/cards/response-hero";
import { ResourceGauge } from "@/components/cards/resource-gauge";
import { StatCard } from "@/components/cards/stat-card";
import { SystemHealthCard } from "@/components/cards/system-health-card";
import { AppShell } from "@/components/layout/app-shell";
import { MissionMap } from "@/components/map/mission-map";
import { Panel } from "@/components/ui/panel";
import {
  aiPriorities,
  aiSummary,
  alerts,
  droneFleet,
  healthSeries,
  mapLayers,
  missionSteps,
  resourceItems,
  responseActions,
  statCards
} from "@/data/dashboard";

export default function Home() {
  return (
    <AppShell>
      <section id="command-center" className="scroll-mt-8 grid gap-8 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <ResponseHero actions={responseActions} steps={missionSteps} />
        </div>
        <div className="xl:col-span-5">
          <AiCommandBrief priorities={aiPriorities} summaryItems={aiSummary} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </section>

      <section id="live-map" className="scroll-mt-8">
        <MissionMap layers={mapLayers} />
      </section>

      <section id="resources" className="scroll-mt-8 grid auto-rows-fr grid-cols-1 items-stretch gap-8 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <ResourceGauge items={resourceItems} />
        </div>
        <div className="xl:col-span-7">
          <SystemHealthCard data={healthSeries} />
        </div>
      </section>

      <section className="grid auto-rows-fr grid-cols-1 items-stretch gap-8 xl:grid-cols-12">
        <div id="victim-monitoring" className="scroll-mt-8 xl:col-span-7">
          <AlertTimeline items={alerts} />
        </div>
        <div id="rescue-teams" className="scroll-mt-8 xl:col-span-5">
          <DroneFleetCard items={droneFleet} />
        </div>
      </section>

      <section id="settings" className="scroll-mt-8">
        <Panel tone="surface" padding="lg" className="overflow-hidden">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-(--text-dim)">Platform Mode</p>
              <h2 className="mt-2 text-2xl font-semibold text-(--text-main)">Prototype with operational mock data</h2>
              <p className="mt-3 text-sm leading-6 text-(--text-dim)">
                This build demonstrates the command workflow, map layers, and response decisions before live sensor, SOS, and dispatch APIs are connected.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["Data source", "Mock incident feed"],
                ["Map provider", "OpenStreetMap + Leaflet"],
                ["Next step", "API + alert sync"]
              ].map(([label, value]) => (
                <div key={label} className="bubble-subtle rounded-3xl p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-(--text-dim)">{label}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-(--text-main)">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>
    </AppShell>
  );
}
