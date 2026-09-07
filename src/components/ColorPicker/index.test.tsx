import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ColorPicker } from "./index";

describe("ColorPicker", () => {
  it("opens the swatch panel when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<ColorPicker value="#2563eb" onChange={vi.fn()} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Pick a color" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls onChange when a swatch is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ColorPicker value="#2563eb" onChange={onChange} swatches={["#ff0000"]} />);

    await user.click(screen.getByRole("button", { name: "Pick a color" }));
    await user.click(screen.getByRole("button", { name: "#ff0000" }));

    expect(onChange).toHaveBeenCalledWith("#ff0000");
  });

  it("calls onChange only when the typed hex is valid", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ColorPicker value="#2563eb" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Pick a color" }));
    const hexInput = screen.getByLabelText("Hex value");

    await user.clear(hexInput);
    await user.type(hexInput, "notahex");
    expect(onChange).not.toHaveBeenCalled();

    await user.clear(hexInput);
    await user.type(hexInput, "#00ff00");
    expect(onChange).toHaveBeenCalledWith("#00ff00");
  });
});
