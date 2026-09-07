import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./index";

describe("Tooltip", () => {
  it("is hidden until the trigger is hovered", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful info">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.hover(screen.getByText("Hover me"));

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful info");
    });
  });

  it("hides again on unhover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful info">
        <button>Hover me</button>
      </Tooltip>
    );

    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument());

    await user.unhover(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  });
});
