import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AppShell, Sidebar, Topbar, useSidebar } from "./index";

function DemoSidebar() {
  return (
    <Sidebar logo={<span>Fragment</span>}>
      <a href="#home">Home</a>
    </Sidebar>
  );
}

function CollapseState() {
  const { isExpanded } = useSidebar();
  return <span data-testid="expanded-state">{String(isExpanded)}</span>;
}

describe("Layout (Sidebar / Topbar / AppShell)", () => {
  it("renders the sidebar content and topbar toggle button", () => {
    render(
      <AppShell sidebar={<DemoSidebar />} topbar={<Topbar />}>
        <p>Page content</p>
      </AppShell>
    );

    expect(screen.getByText("Fragment")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Toggle sidebar" })).toBeInTheDocument();
  });

  it("toggles isExpanded when the topbar button is clicked (desktop width)", async () => {
    const user = userEvent.setup();
    render(
      <AppShell sidebar={<DemoSidebar />} topbar={<Topbar><CollapseState /></Topbar>}>
        <p>Page content</p>
      </AppShell>
    );

    expect(screen.getByTestId("expanded-state")).toHaveTextContent("true");

    await user.click(screen.getByRole("button", { name: "Toggle sidebar" }));

    expect(screen.getByTestId("expanded-state")).toHaveTextContent("false");
  });

  it("throws when useSidebar is used outside a SidebarProvider", () => {
    const Broken = () => {
      useSidebar();
      return null;
    };
    // Suppress React's expected error boundary console noise for this assertion.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Broken />)).toThrow(/SidebarProvider/);
    spy.mockRestore();
  });
});
