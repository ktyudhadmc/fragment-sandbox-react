import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./index";

describe("IconButton", () => {
  it("exposes the accessible name via aria-label", () => {
    render(<IconButton aria-label="Close" icon={<span />} />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("defaults to type=button so it never submits a form", () => {
    render(<IconButton aria-label="Close" icon={<span />} />);
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "type",
      "button"
    );
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton aria-label="Close" icon={<span />} onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
