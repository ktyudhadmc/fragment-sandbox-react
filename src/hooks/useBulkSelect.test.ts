import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useBulkSelect } from "./useBulkSelect";

describe("useBulkSelect", () => {
  it("toggles a single id in and out of the selection", () => {
    const { result } = renderHook(() => useBulkSelect<number>());

    act(() => result.current.toggleOne(1));
    expect(result.current.selectedIds).toEqual([1]);
    expect(result.current.isSelected(1)).toBe(true);

    act(() => result.current.toggleOne(1));
    expect(result.current.selectedIds).toEqual([]);
  });

  it("toggleAll selects everything, then clears when already fully selected", () => {
    const { result } = renderHook(() => useBulkSelect<number>());

    act(() => result.current.toggleAll([1, 2, 3]));
    expect(result.current.selectedIds).toEqual([1, 2, 3]);
    expect(result.current.isAllSelected([1, 2, 3])).toBe(true);

    act(() => result.current.toggleAll([1, 2, 3]));
    expect(result.current.selectedIds).toEqual([]);
  });

  it("clear empties the selection", () => {
    const { result } = renderHook(() => useBulkSelect<number>());

    act(() => result.current.toggleOne(1));
    act(() => result.current.clear());

    expect(result.current.selectedIds).toEqual([]);
  });
});
