import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Rating } from "./index";

describe("Rating", () => {
  it("renders the configured number of stars", () => {
    render(<Rating value={3} maxValue={5} onChange={vi.fn()} />);
    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });

  it("marks the current value's star as checked", () => {
    render(<Rating value={3} onChange={vi.fn()} />);
    expect(screen.getByRole("radio", { name: "3 stars" })).toHaveAttribute(
      "aria-checked",
      "true"
    );
  });

  it("calls onChange when a star is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={2} onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "4 stars" }));

    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("does not call onChange when readOnly", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Rating value={2} readOnly onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "4 stars" }));

    expect(onChange).not.toHaveBeenCalled();
  });
});
