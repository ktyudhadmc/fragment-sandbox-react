import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from "./index";

describe("Accordion", () => {
  it("only keeps one item open by default", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionHeader>Section A</AccordionHeader>
          <AccordionPanel>Content A</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionHeader>Section B</AccordionHeader>
          <AccordionPanel>Content B</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    await user.click(screen.getByText("Section A"));
    expect(screen.getByText("Content A")).toBeInTheDocument();

    await user.click(screen.getByText("Section B"));
    expect(screen.getByText("Content B")).toBeInTheDocument();
    expect(screen.queryByText("Content A")).not.toBeInTheDocument();
  });

  it("allows multiple open items when allowMultiple is set", async () => {
    const user = userEvent.setup();
    render(
      <Accordion allowMultiple>
        <AccordionItem value="a">
          <AccordionHeader>Section A</AccordionHeader>
          <AccordionPanel>Content A</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionHeader>Section B</AccordionHeader>
          <AccordionPanel>Content B</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    await user.click(screen.getByText("Section A"));
    await user.click(screen.getByText("Section B"));

    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.getByText("Content B")).toBeInTheDocument();
  });
});
