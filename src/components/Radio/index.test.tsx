import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "./index";

describe("Radio", () => {
  it("works standalone with checked/onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio value="a" label="Option A" checked={false} onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "Option A" }));

    expect(onChange).toHaveBeenCalledWith("a");
  });
});

function ControlledGroup() {
  const [value, setValue] = useState("a");
  return (
    <RadioGroup name="fruit" value={value} onChange={setValue}>
      <Radio value="a" label="Apple" />
      <Radio value="b" label="Banana" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("only allows one radio to be checked at a time", async () => {
    const user = userEvent.setup();
    render(<ControlledGroup />);

    expect(screen.getByRole("radio", { name: "Apple" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Banana" })).not.toBeChecked();

    await user.click(screen.getByRole("radio", { name: "Banana" }));

    expect(screen.getByRole("radio", { name: "Banana" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Apple" })).not.toBeChecked();
  });

  it("shares the same name attribute across radios", () => {
    render(<ControlledGroup />);
    expect(screen.getByRole("radio", { name: "Apple" })).toHaveAttribute(
      "name",
      "fruit"
    );
    expect(screen.getByRole("radio", { name: "Banana" })).toHaveAttribute(
      "name",
      "fruit"
    );
  });
});
