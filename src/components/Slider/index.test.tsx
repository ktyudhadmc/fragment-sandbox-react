import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./index";

describe("Slider", () => {
  it("renders a range input with the given value", () => {
    render(<Slider value={30} min={0} max={100} onChange={vi.fn()} aria-label="Volume" />);
    expect(screen.getByRole("slider")).toHaveValue("30");
  });

  it("calls onChange when the value changes", () => {
    const onChange = vi.fn();
    render(<Slider value={30} onChange={onChange} aria-label="Volume" />);

    fireEvent.change(screen.getByRole("slider"), { target: { value: "50" } });

    expect(onChange).toHaveBeenCalledWith(50);
  });

  it("disables the input when disabled", () => {
    render(<Slider value={30} onChange={vi.fn()} disabled aria-label="Volume" />);
    expect(screen.getByRole("slider")).toBeDisabled();
  });
});
