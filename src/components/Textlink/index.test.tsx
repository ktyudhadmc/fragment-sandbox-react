import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textlink } from "./index";

describe("Textlink", () => {
  it("renders as an anchor with the given href", () => {
    render(<Textlink href="/docs">Read the docs</Textlink>);
    expect(screen.getByRole("link", { name: "Read the docs" })).toHaveAttribute(
      "href",
      "/docs"
    );
  });
});
