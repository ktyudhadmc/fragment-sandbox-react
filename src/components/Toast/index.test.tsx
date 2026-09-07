import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ToastProvider } from "./index";
import { toast } from "./store";

describe("Toast", () => {
  afterEach(() => {
    toast.clearAll();
  });

  it("shows a toast triggered imperatively", async () => {
    render(<ToastProvider />);

    toast.success({ title: "Saved", description: "Your changes were saved." });

    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes were saved.")).toBeInTheDocument();
  });

  it("dismisses a toast via its close button", async () => {
    const user = userEvent.setup();
    render(<ToastProvider />);

    toast.info({ title: "Heads up", duration: 0 });
    await screen.findByText("Heads up");

    await user.click(screen.getByRole("button", { name: "Dismiss" }));

    await waitFor(() => expect(screen.queryByText("Heads up")).not.toBeInTheDocument());
  });

  it("clears all toasts", async () => {
    render(<ToastProvider />);

    toast.info({ title: "One", duration: 0 });
    toast.info({ title: "Two", duration: 0 });
    await screen.findByText("One");

    toast.clearAll();

    await waitFor(() => {
      expect(screen.queryByText("One")).not.toBeInTheDocument();
      expect(screen.queryByText("Two")).not.toBeInTheDocument();
    });
  });
});
