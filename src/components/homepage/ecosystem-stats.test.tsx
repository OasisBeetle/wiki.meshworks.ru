import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EcosystemStats } from "./ecosystem-stats";

describe("EcosystemStats", () => {
  it("renders a deterministic stat-card order", () => {
    render(<EcosystemStats />);

    const statOrder = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("data-stat-item"))
      .filter(Boolean);

    expect(statOrder).toEqual(["devices", "setup", "basics", "firmware"]);
  });
});
