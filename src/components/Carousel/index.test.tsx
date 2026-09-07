import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Carousel } from "./index";

describe("Carousel", () => {
  it("renders all slides", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    );

    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  it("navigates with next/previous arrows", async () => {
    const user = userEvent.setup();
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    expect(screen.getByRole("button", { name: "Go to slide 1" })).toHaveAttribute(
      "aria-current",
      "true"
    );

    await user.click(screen.getByRole("button", { name: "Next slide" }));

    expect(screen.getByRole("button", { name: "Go to slide 2" })).toHaveAttribute(
      "aria-current",
      "true"
    );
  });

  it("wraps around when navigating past the last slide", async () => {
    const user = userEvent.setup();
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    await user.click(screen.getByRole("button", { name: "Previous slide" }));

    expect(screen.getByRole("button", { name: "Go to slide 2" })).toHaveAttribute(
      "aria-current",
      "true"
    );
  });

  it("does not render arrows or dots for a single slide", () => {
    render(
      <Carousel>
        <div>Only slide</div>
      </Carousel>
    );

    expect(screen.queryByRole("button", { name: "Next slide" })).not.toBeInTheDocument();
  });
});
