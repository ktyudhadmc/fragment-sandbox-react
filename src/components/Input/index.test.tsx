import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./index";

describe("Input", () => {
  it("renders with a placeholder", () => {
    render(<Input placeholder="Search" />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Search" />);

    const input = screen.getByPlaceholderText("Search");
    await user.type(input, "hello");

    expect(input).toHaveValue("hello");
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Input placeholder="Search" disabled />);
    expect(screen.getByPlaceholderText("Search")).toBeDisabled();
  });

  it("forwards a ref to the underlying input element", () => {
    let node: HTMLInputElement | null = null;
    render(
      <Input
        placeholder="Search"
        ref={(el) => {
          node = el;
        }}
      />
    );
    expect(node).toBeInstanceOf(HTMLInputElement);
  });
});
