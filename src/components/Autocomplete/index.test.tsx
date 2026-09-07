import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Autocomplete } from "./index";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
];

describe("Autocomplete", () => {
  it("opens the suggestion list on focus", async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={options} onChange={vi.fn()} />);

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("selects an option and closes the list", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Autocomplete options={options} onChange={onChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Banana" }));

    expect(onChange).toHaveBeenCalledWith("banana");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("Banana");
  });

  it("shows the empty text when there are no options", async () => {
    const user = userEvent.setup();
    render(<Autocomplete options={[]} onChange={vi.fn()} emptyText="Nothing found" />);

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });
});
