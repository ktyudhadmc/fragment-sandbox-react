import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dropzone } from "./index";

describe("Dropzone", () => {
  it("renders the prompt text", () => {
    render(<Dropzone onFilesSelected={vi.fn()} text="Drop files here" />);
    expect(screen.getByText("Drop files here")).toBeInTheDocument();
  });

  it("opens the file picker when clicked", async () => {
    const user = userEvent.setup();
    render(<Dropzone onFilesSelected={vi.fn()} />);

    const input = document.querySelector("input[type=file]") as HTMLInputElement;
    const clickSpy = vi.spyOn(input, "click");

    await user.click(screen.getByRole("button"));

    expect(clickSpy).toHaveBeenCalled();
  });

  it("calls onFilesSelected with dropped files", () => {
    const onFilesSelected = vi.fn();
    render(<Dropzone onFilesSelected={onFilesSelected} />);

    const file = new File(["hello"], "hello.txt", { type: "text/plain" });
    const dropzone = screen.getByRole("button");

    const dataTransfer = { files: [file] } as unknown as DataTransfer;
    dropzone.dispatchEvent(
      Object.assign(new Event("drop", { bubbles: true, cancelable: true }), {
        dataTransfer,
      })
    );

    expect(onFilesSelected).toHaveBeenCalledWith([file]);
  });
});
