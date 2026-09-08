import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select, type SelectOption } from "./index";

const options: SelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
];

describe("Select", () => {
  it("shows the placeholder when nothing is selected", () => {
    render(<Select options={options} placeholder="Pick a fruit" />);
    expect(screen.getByText("Pick a fruit")).toBeInTheDocument();
  });

  it("opens the option list on click and selects a single value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);

    await user.click(screen.getByRole("combobox"));
    expect(screen.getByText("Banana")).toBeInTheDocument();

    await user.click(screen.getByText("Banana"));

    expect(onChange).toHaveBeenCalledWith("banana");
  });

  it("shows the selected label in the control", () => {
    render(<Select options={options} value="apple" />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("does not select a disabled option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Cherry"));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("toggles multiple values without closing the menu", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select multiple options={options} value={[]} onChange={onChange} />);

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Apple"));

    expect(onChange).toHaveBeenCalledWith(["apple"]);
  });

  it("clears the value via the clear button", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select options={options} value="apple" isClearable onChange={onChange} />
    );

    await user.click(screen.getByRole("button", { name: "Clear selection" }));

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("calls onInputChange while typing, for async/server-side search", async () => {
    const user = userEvent.setup();
    const onInputChange = vi.fn();
    render(<Select options={options} onInputChange={onInputChange} />);

    await user.type(screen.getByRole("combobox"), "ban");

    expect(onInputChange).toHaveBeenCalledWith("ban");
  });

  it("shows a custom no-options message", async () => {
    const user = userEvent.setup();
    render(<Select options={[]} noOptionsMessage="Nothing here" />);

    await user.click(screen.getByRole("combobox"));

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});
