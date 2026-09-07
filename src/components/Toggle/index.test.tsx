import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./index";

describe("Toggle", () => {
  it("exposes a switch role", () => {
    render(<Toggle label="Notifications" checked readOnly />);
    expect(screen.getByRole("switch", { name: "Notifications" })).toBeChecked();
  });

  it("calls onChange when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle label="Notifications" checked={false} onChange={onChange} />);

    await user.click(screen.getByRole("switch", { name: "Notifications" }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Toggle label="Notifications" checked={false} disabled onChange={onChange} />
    );

    await user.click(screen.getByRole("switch", { name: "Notifications" }));

    expect(onChange).not.toHaveBeenCalled();
  });
});
