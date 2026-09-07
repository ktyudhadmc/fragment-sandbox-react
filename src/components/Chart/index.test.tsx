import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Chart } from "./index";

vi.mock("react-apexcharts", () => ({
  default: vi.fn((props: { type: string; series: unknown; height: unknown }) => (
    <div data-testid="apexchart" data-type={props.type} data-height={String(props.height)} />
  )),
}));

describe("Chart", () => {
  it("passes type, series, and height through to the underlying chart", () => {
    const { getByTestId } = render(
      <Chart
        type="line"
        series={[{ name: "Sales", data: [10, 20, 30] }]}
        categories={["Jan", "Feb", "Mar"]}
        height={280}
      />
    );

    const node = getByTestId("apexchart");
    expect(node).toHaveAttribute("data-type", "line");
    expect(node).toHaveAttribute("data-height", "280");
  });
});
