import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePagination } from "./usePagination";

describe("usePagination", () => {
  it("starts on page 1", () => {
    const { result } = renderHook(() => usePagination(5));
    expect(result.current.currentPage).toBe(1);
  });

  it("does not go below page 1 or above maxPageNum", () => {
    const { result } = renderHook(() => usePagination(2));

    act(() => result.current.goPrevPage());
    expect(result.current.currentPage).toBe(1);

    act(() => result.current.goNextPage());
    expect(result.current.currentPage).toBe(2);

    act(() => result.current.goNextPage());
    expect(result.current.currentPage).toBe(2);
  });

  it("jumps to a specific page and resets back to 1", () => {
    const { result } = renderHook(() => usePagination(10));

    act(() => result.current.goPageNum(7));
    expect(result.current.currentPage).toBe(7);

    act(() => result.current.resetPage());
    expect(result.current.currentPage).toBe(1);
  });
});
