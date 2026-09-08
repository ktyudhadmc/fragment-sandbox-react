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

  describe("mode=month", () => {
    it("shows a month grid and formats the value as YYYY-MM", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DatePicker mode="month" onChange={onChange} />);

      await user.click(screen.getByPlaceholderText("Select month"));
      await user.click(screen.getByRole("button", { name: "Mar" }));

      expect(onChange).toHaveBeenCalledTimes(1);
      const picked = onChange.mock.calls[0][0] as Date;
      expect(picked.getMonth()).toBe(2);
      expect(picked.getDate()).toBe(1);
    });

    it("formats an existing value as YYYY-MM", () => {
      render(<DatePicker mode="month" value={new Date(2026, 2, 1)} onChange={vi.fn()} />);
      expect(screen.getByPlaceholderText("Select month")).toHaveValue("2026-03");
    });
  });

  describe("mode=time", () => {
    it("formats the value as HH:mm", () => {
      render(<DatePicker mode="time" value={new Date(2026, 0, 1, 14, 30)} onChange={vi.fn()} />);
      expect(screen.getByPlaceholderText("Select time")).toHaveValue("14:30");
    });

    it("updates the hour via the time selects", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DatePicker mode="time" value={new Date(2026, 0, 1, 9, 0)} onChange={onChange} />);

      await user.click(screen.getByPlaceholderText("Select time"));
      await user.selectOptions(screen.getByRole("combobox", { name: "Hour" }), "14");

      expect(onChange).toHaveBeenCalledTimes(1);
      expect((onChange.mock.calls[0][0] as Date).getHours()).toBe(14);
    });
  });

  describe("mode=datetime", () => {
    it("formats the value as YYYY-MM-DD HH:mm", () => {
      render(
        <DatePicker
          mode="datetime"
          value={new Date(2026, 1, 15, 8, 5)}
          onChange={vi.fn()}
        />
      );
      expect(screen.getByPlaceholderText("Select date & time")).toHaveValue(
        "2026-02-15 08:05"
      );
    });

    it("keeps the panel open after picking a day so time can still be set", async () => {
      const user = userEvent.setup();
      render(
        <DatePicker mode="datetime" value={new Date(2026, 1, 10, 9, 0)} onChange={vi.fn()} />
      );

      await user.click(screen.getByPlaceholderText("Select date & time"));
      await user.click(screen.getByRole("button", { name: "2026-02-15" }));

      expect(screen.getByRole("combobox", { name: "Hour" })).toBeInTheDocument();
    });
  });
});
