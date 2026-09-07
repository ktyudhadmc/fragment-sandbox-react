import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./index";

describe("Checkbox", () => {
  it("renders a label and reflects checked state", () => {
    render(<Checkbox label="Accept terms" checked readOnly />);
    const box = screen.getByRole("checkbox", { name: "Accept terms" });
    expect(box).toBeChecked();
  });

  it("calls onChange when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" checked={false} onChange={onChange} />);

    await user.click(screen.getByRole("checkbox", { name: "Accept terms" }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("does not fire onChange when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Checkbox label="Accept terms" checked={false} disabled onChange={onChange} />
    );

    await user.click(screen.getByRole("checkbox", { name: "Accept terms" }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("sets the indeterminate DOM property", () => {
    render(<Checkbox label="Select all" indeterminate readOnly />);
    const box = screen.getByRole("checkbox", { name: "Select all" }) as HTMLInputElement;
    expect(box.indeterminate).toBe(true);
  });
});
