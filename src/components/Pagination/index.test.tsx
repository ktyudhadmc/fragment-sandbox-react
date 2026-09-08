import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./index";

describe("Pagination", () => {
  it("shows the current range and total", () => {
    render(<Pagination page={2} pageSize={10} total={45} onPageChange={vi.fn()} />);
    expect(screen.getByText("Showing 11–20 of 45")).toBeInTheDocument();
  });

  it("calls onPageChange when a page number is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={1} pageSize={10} total={30} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "3" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables the previous button on the first page and next on the last", () => {
    render(<Pagination page={1} pageSize={10} total={10} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("advances via the next button", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={1} pageSize={10} total={30} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "Next page" }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("shows a page-size selector only when onPageSizeChange is provided", () => {
    const { rerender } = render(
      <Pagination page={1} pageSize={10} total={30} onPageChange={vi.fn()} />
    );
    expect(screen.queryByRole("button", { name: "10" })).not.toBeInTheDocument();

    rerender(
      <Pagination
        page={1}
        pageSize={10}
        total={30}
        onPageChange={vi.fn()}
        onPageSizeChange={vi.fn()}
      />
    );
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
