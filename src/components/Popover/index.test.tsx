import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Popover, PopoverBody } from "./index";

describe("Popover", () => {
  it("opens on trigger click and shows its content", async () => {
    const user = userEvent.setup();
    render(
      <Popover trigger={<button>Open</button>}>
        <PopoverBody>Panel content</PopoverBody>
      </Popover>
    );

    expect(screen.queryByText("Panel content")).not.toBeInTheDocument();

    await user.click(screen.getByText("Open"));

    expect(screen.getByText("Panel content")).toBeInTheDocument();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Popover trigger={<button>Open</button>}>
          <PopoverBody>Panel content</PopoverBody>
        </Popover>
        <button>Outside</button>
      </div>
    );

    await user.click(screen.getByText("Open"));
    expect(screen.getByText("Panel content")).toBeInTheDocument();

    await user.click(screen.getByText("Outside"));
    expect(screen.queryByText("Panel content")).not.toBeInTheDocument();
  });
});
