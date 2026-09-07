import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./index";

describe("Text", () => {
  it("renders its children as a paragraph", () => {
    render(<Text>Hello world</Text>);
    const node = screen.getByText("Hello world");
    expect(node.tagName).toBe("P");
  });
});
