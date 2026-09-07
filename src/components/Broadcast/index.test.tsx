import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Broadcast } from "./index";

describe("Broadcast", () => {
  it("renders its message", () => {
    render(<Broadcast>Scheduled maintenance tonight at 10 PM.</Broadcast>);
    expect(screen.getByRole("region", { name: "Announcement" })).toHaveTextContent(
      "Scheduled maintenance tonight at 10 PM."
    );
  });

  it("calls onAction when the action link is clicked", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(
      <Broadcast actionLabel="Learn more" onAction={onAction}>
        New feature available.
      </Broadcast>
    );

    await user.click(screen.getByText("Learn more"));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Broadcast onClose={onClose}>Dismissible message.</Broadcast>);

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
