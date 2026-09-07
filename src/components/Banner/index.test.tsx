import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Banner } from "./index";

describe("Banner", () => {
  it("renders title and description", () => {
    render(<Banner title="Update available" description="Version 2.0 is ready." />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Update available")).toBeInTheDocument();
    expect(screen.getByText("Version 2.0 is ready.")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Banner title="Update available" onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render a close button without onClose", () => {
    render(<Banner title="Update available" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
