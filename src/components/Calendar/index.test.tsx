import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./index";

describe("Calendar", () => {
  it("shows the initial month label", () => {
    render(<Calendar defaultMonth={new Date(2026, 1, 10)} />);
    expect(screen.getByText("February 2026")).toBeInTheDocument();
  });

  it("navigates to the next and previous month", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={new Date(2026, 1, 10)} />);

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("March 2026")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("January 2026")).toBeInTheDocument();
  });

  it("calls onChange with the clicked date in single mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Calendar defaultMonth={new Date(2026, 1, 10)} onChange={onChange} />
    );

    await user.click(screen.getByRole("button", { name: "2026-02-15" }));

    expect(onChange).toHaveBeenCalledTimes(1);
    const called = onChange.mock.calls[0][0] as Date;
    expect(called.getDate()).toBe(15);
    expect(called.getMonth()).toBe(1);
  });

  it("does not allow selecting a date before minDate", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Calendar
        defaultMonth={new Date(2026, 1, 10)}
        minDate={new Date(2026, 1, 10)}
        onChange={onChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "2026-02-05" }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("builds a range across two clicks", async () => {
    const user = userEvent.setup();
    let range: [Date | null, Date | null] = [null, null];
    const onChange = vi.fn((next: [Date | null, Date | null]) => {
      range = next;
    });

    const { rerender } = render(
      <Calendar
        isRange
        defaultMonth={new Date(2026, 1, 10)}
        value={range}
        onChange={onChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "2026-02-05" }));
    rerender(
      <Calendar
        isRange
        defaultMonth={new Date(2026, 1, 10)}
        value={range}
        onChange={onChange}
      />
    );
    await user.click(screen.getByRole("button", { name: "2026-02-15" }));

    expect(range[0]?.getDate()).toBe(5);
    expect(range[1]?.getDate()).toBe(15);
  });
});
