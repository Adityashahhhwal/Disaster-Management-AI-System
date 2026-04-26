import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ResourceGauge } from "./resource-gauge";

const resources = [
  { label: "Emergency beds", value: 82, tone: "success" as const },
  { label: "Water units", value: 61, tone: "warning" as const },
  { label: "Power backups", value: 44, tone: "danger" as const }
];

describe("ResourceGauge", () => {
  it("summarizes average readiness and lowest buffer", () => {
    render(<ResourceGauge items={resources} />);

    expect(screen.getByText("Supply readiness")).toBeInTheDocument();
    expect(screen.getByText("62%")).toBeInTheDocument();
    expect(screen.getAllByText("44%")).toHaveLength(2);
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders each resource pool", () => {
    render(<ResourceGauge items={resources} />);

    expect(screen.getByText("Emergency beds")).toBeInTheDocument();
    expect(screen.getByText("Water units")).toBeInTheDocument();
    expect(screen.getByText("Power backups")).toBeInTheDocument();
  });
});
