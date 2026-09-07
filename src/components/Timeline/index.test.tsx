import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline, TimelineItem } from "./index";

describe("Timeline", () => {
  it("renders each item's title and caption", () => {
    render(
      <Timeline>
        <TimelineItem title="Order placed" caption="Jan 1, 2026" />
        <TimelineItem title="Order shipped" caption="Jan 2, 2026" isLast />
      </Timeline>
    );

    expect(screen.getByText("Order placed")).toBeInTheDocument();
    expect(screen.getByText("Jan 1, 2026")).toBeInTheDocument();
    expect(screen.getByText("Order shipped")).toBeInTheDocument();
  });
});
