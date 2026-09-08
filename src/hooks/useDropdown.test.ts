import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDropdown } from "./useDropdown";

describe("useDropdown", () => {
  it("exposes isOpen/openDropdown/closeDropdown/toggleDropdown", () => {
    const { result } = renderHook(() => useDropdown());
    expect(result.current.isOpen).toBe(false);

    act(() => result.current.openDropdown());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.closeDropdown());
    expect(result.current.isOpen).toBe(false);
  });
});
