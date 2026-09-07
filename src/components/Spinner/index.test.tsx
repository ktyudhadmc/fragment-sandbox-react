import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./index";

describe("Spinner", () => {
  it("exposes a status role with an accessible label", () => {
    render(<Spinner label="Loading data" />);
    expect(screen.getByRole("status", { name: "Loading data" })).toBeInTheDocument();
  });
});
