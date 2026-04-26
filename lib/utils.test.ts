import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("merges conditional class names", () => {
    expect(cn("text-sm", false && "hidden", "font-medium")).toBe("text-sm font-medium");
  });

  it("resolves conflicting Tailwind utilities", () => {
    expect(cn("px-2 py-3", "px-4")).toBe("py-3 px-4");
  });
});
