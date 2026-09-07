import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./index";

const options = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month", disabled: true },
];

describe("SegmentedControl", () => {
  it("marks the selected option as checked", () => {
    render(<SegmentedControl options={options} value="week" onChange={vi.fn()} />);
    expect(screen.getByRole("radio", { name: "Week" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("calls onChange when an option is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="day" onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "Week" }));

    expect(onChange).toHaveBeenCalledWith("week");
  });

  it("does not call onChange for a disabled option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="day" onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "Month" }));

    expect(onChange).not.toHaveBeenCalled();
  });
});
