import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./index";

describe("Progress", () => {
  it("exposes progressbar aria attributes", () => {
    render(<Progress value={40} max={80} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemax", "80");
  });

  it("clamps the visual fill between 0 and 100 percent", () => {
    render(<Progress value={150} max={100} />);
    const fill = screen.getByRole("progressbar").firstElementChild as HTMLElement;
    expect(fill.style.width).toBe("100%");
  });
});
