import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Layout } from "./index";
import { Sidebar, useSidebar, type SidebarSection } from "../Sidebar";
import { Navbar } from "../Navbar";

const sections: SidebarSection[] = [
  {
    key: "main",
    title: "Menu",
    items: [
      { name: "Home", path: "/home" },
      {
        name: "Orders",
        subItems: [
          { name: "List", path: "/orders/list" },
          { name: "Create", path: "/orders/create", badge: "new" },
        ],
      },
    ],
  },
];

function CollapseState() {
  const { isExpanded } = useSidebar();
  return <span data-testid="expanded-state">{String(isExpanded)}</span>;
}

const renderLayout = (activePath = "/home") =>
  render(
    <Layout
      sidebar={<Sidebar logo={<span>Fragment</span>} sections={sections} activePath={activePath} />}
      navbar={
        <Navbar>
          <CollapseState />
        </Navbar>
      }
    >
      <p>Page content</p>
    </Layout>
  );

describe("Layout (Sidebar / Navbar)", () => {
  it("renders sidebar, navbar and content", () => {
    renderLayout();

    expect(screen.getByText("Fragment")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Toggle sidebar" })).toBeInTheDocument();
  });

  it("toggles isExpanded when the navbar button is clicked (desktop width)", async () => {
    const user = userEvent.setup();
    renderLayout();

    expect(screen.getByTestId("expanded-state")).toHaveTextContent("true");
    await user.click(screen.getByRole("button", { name: "Toggle sidebar" }));
    expect(screen.getByTestId("expanded-state")).toHaveTextContent("false");
  });

  it("auto-opens the submenu containing the active path and toggles on click", async () => {
    const user = userEvent.setup();
    renderLayout("/orders/list");

    const group = screen.getByRole("button", { name: /Orders/ });
    expect(group).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("new")).toBeInTheDocument();

    await user.click(group);
    expect(group).toHaveAttribute("aria-expanded", "false");
  });

  it("throws when useSidebar is used outside a SidebarProvider", () => {
    const Broken = () => {
      useSidebar();
      return null;
    };
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Broken />)).toThrow(/SidebarProvider/);
    spy.mockRestore();
  });
});
