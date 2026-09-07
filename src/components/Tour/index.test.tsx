import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tour, type TourStep } from "./index";

const steps: TourStep[] = [
  { target: "#step-1", title: "Step one", content: "First thing to know." },
  { target: "#step-2", title: "Step two", content: "Second thing to know." },
];

function Fixture({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      <button id="step-1">Target 1</button>
      <button id="step-2">Target 2</button>
      <Tour steps={steps} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

describe("Tour", () => {
  it("renders nothing when closed", () => {
    render(<Fixture isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the first step when open", () => {
    render(<Fixture isOpen onClose={vi.fn()} />);
    expect(screen.getByText("Step one")).toBeInTheDocument();
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("advances to the next step", async () => {
    const user = userEvent.setup();
    render(<Fixture isOpen onClose={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getByText("Step two")).toBeInTheDocument();
  });

  it("calls onClose when Skip is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Fixture isOpen onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Skip" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Done is clicked on the last step", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Fixture isOpen onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Next" }));
    await user.click(screen.getByRole("button", { name: "Done" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
