import { AlertTimeline } from "@/components/cards/alert-timeline";
import { DroneFleetCard } from "@/components/cards/drone-fleet-card";
import { ResourceGauge } from "@/components/cards/resource-gauge";
import { StatCard } from "@/components/cards/stat-card";
import { SystemHealthCard } from "@/components/cards/system-health-card";
import { AppShell } from "@/components/layout/app-shell";
import { MissionMap } from "@/components/map/mission-map";
import { alerts, droneFleet, healthSeries, mapLayers, resourceItems, statCards } from "@/data/dashboard";

export default function Home() {
  return (
    <AppShell>
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-12">
        {statCards.map((card) => (
          <StatCard key={card.title} className="xl:col-span-3" {...card} />
        ))}
      </section>

      <section className="mt-8 min-h-100">
        <div className="bubble-subtle h-full w-full rounded-[26px] p-4">
          <MissionMap layers={mapLayers} />
        </div>
      </section>


      <section className="grid auto-rows-fr grid-cols-1 items-stretch gap-8 md:grid-cols-3">
        <div className="bubble-subtle min-w-0 h-full rounded-[26px] p-4">
          <AlertTimeline items={alerts} />
        </div>
        <div className="bubble-subtle min-w-0 h-full rounded-[26px] p-4">
          <DroneFleetCard items={droneFleet} />
        </div>
        <div className="bubble-subtle min-w-0 h-full rounded-[26px] p-4">
          <ResourceGauge items={resourceItems} />
        </div>
      </section>
        <div className="bubble-subtle min-w-0 h-full rounded-[26px] p-4">
          <SystemHealthCard data={healthSeries} />
        </div>
    </AppShell>
  );
}
