import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "./index";

function Example() {
  return (
    <Tabs defaultValue="profile">
      <TabList>
        <Tab value="profile">Profile</Tab>
        <Tab value="billing">Billing</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="profile">Profile panel</TabPanel>
        <TabPanel value="billing">Billing panel</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows the default tab's panel", () => {
    render(<Example />);
    expect(screen.getByText("Profile panel")).toBeInTheDocument();
    expect(screen.queryByText("Billing panel")).not.toBeInTheDocument();
  });

  it("switches panels when a tab is clicked", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("tab", { name: "Billing" }));

    expect(screen.getByText("Billing panel")).toBeInTheDocument();
    expect(screen.queryByText("Profile panel")).not.toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Billing" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
