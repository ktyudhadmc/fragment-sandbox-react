import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "./index";
import { Input } from "../Input";

describe("FormControl", () => {
  it("connects the label to the field via a shared id", () => {
    render(
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input placeholder="you@example.com" />
      </FormControl>
    );

    const label = screen.getByText("Email");
    const input = screen.getByPlaceholderText("you@example.com");
    expect(label).toHaveAttribute("for", input.id);
  });

  it("shows a required marker on the label when required", () => {
    render(
      <FormControl required>
        <FormLabel>Email</FormLabel>
      </FormControl>
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows helper text when not invalid, and error text when invalid", () => {
    const { rerender } = render(
      <FormControl invalid={false}>
        <FormHelperText>We never share your email.</FormHelperText>
        <FormErrorMessage>Email is required.</FormErrorMessage>
      </FormControl>
    );

    expect(screen.getByText("We never share your email.")).toBeInTheDocument();
    expect(screen.queryByText("Email is required.")).not.toBeInTheDocument();

    rerender(
      <FormControl invalid>
        <FormHelperText>We never share your email.</FormHelperText>
        <FormErrorMessage>Email is required.</FormErrorMessage>
      </FormControl>
    );

    expect(screen.queryByText("We never share your email.")).not.toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
  });
});
