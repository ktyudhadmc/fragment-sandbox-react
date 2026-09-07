import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "./index";

describe("DatePicker", () => {
  it("renders a placeholder and label", () => {
    render(<DatePicker label="Birthday" placeholder="Pick a date" />);
    expect(screen.getByText("Birthday")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Pick a date")).toBeInTheDocument();
  });

  it("opens the calendar when the input is clicked", async () => {
    const user = userEvent.setup();
    render(<DatePicker placeholder="Pick a date" />);

    expect(screen.queryByText(/\d{4}/)).not.toBeInTheDocument();

    await user.click(screen.getByPlaceholderText("Pick a date"));

    expect(
      screen.getByRole("button", { name: "Next month" })
    ).toBeInTheDocument();
  });

  it("selects a date, closes the calendar, and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        placeholder="Pick a date"
        value={null}
        onChange={onChange}
      />
    );

    await user.click(screen.getByPlaceholderText("Pick a date"));
    await user.click(screen.getByRole("button", { name: /^\d{4}-\d{2}-15$/ }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByRole("button", { name: "Next month" })
    ).not.toBeInTheDocument();
  });

  it("shows a formatted value and clear button once a date is set", () => {
    render(<DatePicker value={new Date(2026, 1, 15)} onChange={vi.fn()} />);

    expect(screen.getByPlaceholderText("Select date")).toHaveValue(
      "2026-02-15"
    );
    expect(
      screen.getByRole("button", { name: "Clear date" })
    ).toBeInTheDocument();
  });

  it("clears the value when the clear button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker value={new Date(2026, 1, 15)} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Clear date" }));

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled placeholder="Pick a date" />);

    await user.click(screen.getByPlaceholderText("Pick a date"));

    expect(
      screen.queryByRole("button", { name: "Next month" })
    ).not.toBeInTheDocument();
  });

  it("shows the error message when invalid", () => {
    render(<DatePicker invalid errorMessage="Date is required" />);
    expect(screen.getByText("Date is required")).toBeInTheDocument();
  });
});
