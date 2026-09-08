import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useInfiniteHandler } from "./useInfiniteHandler";

describe("useInfiniteHandler", () => {
  it("sets the list on the first page", () => {
    // Stable references: the hook's effects key off these array/object
    // identities the same way a real fetch result would. Recreating a fresh
    // literal on every render (e.g. inline in the renderHook callback) would
    // make the effects re-fire after every state update they themselves
    // trigger, looping forever.
    const data = ["a", "b"];
    const pagination = { current_page: 1, last_page: 3 };

    const { result } = renderHook(() =>
      useInfiniteHandler({ data, pagination, loading: false, setPageNum: vi.fn() })
    );

    expect(result.current.list).toEqual(["a", "b"]);
    expect(result.current.hasMore).toBe(true);
  });

  it("appends subsequent pages instead of replacing", () => {
    const page1 = ["a", "b"];
    const page1Meta = { current_page: 1, last_page: 2 };
    const page2 = ["c", "d"];
    const page2Meta = { current_page: 2, last_page: 2 };

    const { result, rerender } = renderHook(
      (props: Parameters<typeof useInfiniteHandler<string>>[0]) => useInfiniteHandler(props),
      {
        initialProps: { data: page1, pagination: page1Meta, loading: false, setPageNum: vi.fn() },
      }
    );

    rerender({ data: page2, pagination: page2Meta, loading: false, setPageNum: vi.fn() });

    expect(result.current.list).toEqual(["a", "b", "c", "d"]);
    expect(result.current.hasMore).toBe(false);
  });

  it("loadMore advances the page only while there is more and not loading", () => {
    const setPageNum = vi.fn();
    const page1 = ["a"];
    const page1Meta = { current_page: 1, last_page: 2 };
    const page2Meta = { current_page: 2, last_page: 2 };

    const { result, rerender } = renderHook(
      (props: Parameters<typeof useInfiniteHandler<string>>[0]) => useInfiniteHandler(props),
      { initialProps: { data: page1, pagination: page1Meta, loading: false, setPageNum } }
    );

    act(() => result.current.loadMore());
    expect(setPageNum).toHaveBeenCalledWith(2);

    setPageNum.mockClear();
    rerender({ data: page1, pagination: page2Meta, loading: false, setPageNum });
    act(() => result.current.loadMore());
    expect(setPageNum).not.toHaveBeenCalled();
  });

  it("reset clears the list and goes back to page 1", () => {
    const setPageNum = vi.fn();
    const data = ["a", "b"];
    const pagination = { current_page: 2, last_page: 3 };

    const { result } = renderHook(() =>
      useInfiniteHandler({ data, pagination, loading: false, setPageNum })
    );

    act(() => result.current.reset());

    expect(result.current.list).toEqual([]);
    expect(setPageNum).toHaveBeenCalledWith(1);
  });
});
