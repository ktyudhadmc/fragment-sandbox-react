import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from "./index";

describe("Textarea", () => {
  it("renders with a placeholder", () => {
    render(<Textarea placeholder="Notes" />);
    expect(screen.getByPlaceholderText("Notes")).toBeInTheDocument();
  });

  it("accepts multi-line typed input", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Notes" />);

    const field = screen.getByPlaceholderText("Notes");
    await user.type(field, "line one{enter}line two");

    expect(field).toHaveValue("line one\nline two");
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Textarea placeholder="Notes" disabled />);
    expect(screen.getByPlaceholderText("Notes")).toBeDisabled();
  });
});
