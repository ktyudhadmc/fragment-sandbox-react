import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tag } from "./index";

describe("Tag", () => {
  it("renders its children", () => {
    render(<Tag>react</Tag>);
    expect(screen.getByText("react")).toBeInTheDocument();
  });

  it("calls onRemove when the remove button is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>react</Tag>);

    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("does not render a remove button without onRemove", () => {
    render(<Tag>react</Tag>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
