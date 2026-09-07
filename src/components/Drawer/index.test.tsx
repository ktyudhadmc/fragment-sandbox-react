import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Drawer, DrawerBody } from "./index";

describe("Drawer", () => {
  it("renders nothing when closed", () => {
    render(
      <Drawer isOpen={false} onClose={vi.fn()}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders its content when open", () => {
    render(
      <Drawer isOpen onClose={vi.fn()}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("calls onClose on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose}>
        <DrawerBody>Content</DrawerBody>
      </Drawer>
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
