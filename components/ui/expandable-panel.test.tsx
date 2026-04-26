import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExpandablePanel } from "./expandable-panel";

const summaryItems = [{ label: "Open alerts", value: "03" }];

describe("ExpandablePanel", () => {
  it("renders body content by default", () => {
    render(
      <ExpandablePanel eyebrow="Live Incidents" title="Rescue updates" summaryItems={summaryItems}>
        <p>Critical incident body</p>
      </ExpandablePanel>
    );

    expect(screen.getByText("Critical incident body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /collapse panel/i })).toHaveAttribute("aria-expanded", "true");
  });

  it("respects defaultExpanded and toggles content", () => {
    render(
      <ExpandablePanel eyebrow="Live Incidents" title="Rescue updates" summaryItems={summaryItems} defaultExpanded={false}>
        <p>Critical incident body</p>
      </ExpandablePanel>
    );

    expect(screen.queryByText("Critical incident body")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /expand panel/i }));

    expect(screen.getByText("Critical incident body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /collapse panel/i })).toHaveAttribute("aria-expanded", "true");
  });
});
