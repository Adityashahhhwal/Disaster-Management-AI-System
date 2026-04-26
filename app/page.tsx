import { AiCommandBrief } from "@/components/cards/ai-command-brief";
import { AlertTimeline } from "@/components/cards/alert-timeline";
import { DroneFleetCard } from "@/components/cards/drone-fleet-card";
import { ResponseHero } from "@/components/cards/response-hero";
import { StatCard } from "@/components/cards/stat-card";
import { AppShell } from "@/components/layout/app-shell";
import { MissionMap } from "@/components/map/mission-map";
import { aiPriorities, aiSummary, alerts, droneFleet, mapLayers, missionSteps, responseActions, statCards } from "@/data/dashboard";

export default function Home() {
  return (
    <AppShell>
      <section className="grid gap-8 xl:grid-cols-12">
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

      <section id="live-map">
        <MissionMap layers={mapLayers} />
      </section>

      <section className="grid auto-rows-fr grid-cols-1 items-stretch gap-8 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <AlertTimeline items={alerts} />
        </div>
        <div className="xl:col-span-5">
          <DroneFleetCard items={droneFleet} />
        </div>
      </section>
    </AppShell>
  );
}
