import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Collapse } from "./index";

describe("Collapse", () => {
  it("renders its children regardless of open state", () => {
    render(
      <Collapse isOpen={false}>
        <p>Hidden content</p>
      </Collapse>
    );
    expect(screen.getByText("Hidden content")).toBeInTheDocument();
  });

  it("sets height to 0 when closed", () => {
    const { container } = render(
      <Collapse isOpen={false}>
        <p>Content</p>
      </Collapse>
    );
    expect((container.firstChild as HTMLElement).style.height).toBe("0px");
  });
});
