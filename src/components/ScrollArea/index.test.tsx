import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./index";

describe("ScrollArea", () => {
  it("renders its children inside a scrollable container", () => {
    render(
      <ScrollArea data-testid="scroll">
        <p>Long content</p>
      </ScrollArea>
    );

    expect(screen.getByText("Long content")).toBeInTheDocument();
    expect(screen.getByTestId("scroll")).toBeInTheDocument();
  });
});
