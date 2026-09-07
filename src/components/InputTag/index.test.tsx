import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { InputTag } from "./index";

describe("InputTag", () => {
  it("shows the placeholder when there are no tags", () => {
    render(<InputTag placeholder="Add a skill" />);
    expect(screen.getByPlaceholderText("Add a skill")).toBeInTheDocument();
  });

  it("adds a tag when Enter is pressed", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputTag value={[]} onChange={onChange} />);

    const field = screen.getByRole("textbox");
    await user.type(field, "react{enter}");

    expect(onChange).toHaveBeenCalledWith(["react"]);
  });

  it("ignores empty and duplicate tags", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputTag value={["react"]} onChange={onChange} />);

    const field = screen.getByRole("textbox");
    await user.type(field, "{enter}");
    await user.type(field, "react{enter}");

    expect(onChange).not.toHaveBeenCalled();
  });

  it("removes a tag via its remove button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputTag value={["react", "vue"]} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Remove react" }));

    expect(onChange).toHaveBeenCalledWith(["vue"]);
  });

  it("removes the last tag on Backspace when the field is empty", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputTag value={["react", "vue"]} onChange={onChange} />);

    await user.click(screen.getByRole("textbox"));
    await user.keyboard("{Backspace}");

    expect(onChange).toHaveBeenCalledWith(["react"]);
  });
});
