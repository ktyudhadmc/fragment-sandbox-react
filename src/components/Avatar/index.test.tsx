import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./index";

describe("Avatar", () => {
  it("shows initials derived from the name when there is no image", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("renders an image when src is provided", () => {
    render(<Avatar src="/avatar.png" name="Ada Lovelace" />);
    expect(document.querySelector("img")).toHaveAttribute("src", "/avatar.png");
  });

  it("falls back to initials when the image fails to load", () => {
    render(<Avatar src="/broken.png" name="Ada Lovelace" />);
    const img = document.querySelector("img")!;
    fireEvent.error(img);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });
});
