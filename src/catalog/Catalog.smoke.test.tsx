import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Catalog } from "./Catalog";

vi.mock("react-apexcharts", () => ({
  default: () => <div data-testid="apexchart-stub" />,
}));

describe("Catalog", () => {
  it("renders without crashing and shows every nav section", () => {
    render(<Catalog />);

    expect(screen.getByText("Fragment")).toBeInTheDocument();
    expect(screen.getByText("Component catalog")).toBeInTheDocument();

    // One heading per documented component/group, sanity-checking a few spread across categories.
    expect(screen.getAllByText("Button").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Date Picker").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Modal").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Chart").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Carousel").length).toBeGreaterThan(0);
  });
});
