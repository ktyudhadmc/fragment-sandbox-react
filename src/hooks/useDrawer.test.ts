import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDrawer } from "./useDrawer";

describe("useDrawer", () => {
  it("exposes isExpanded/openDrawer/closeDrawer/toggleDrawer", () => {
    const { result } = renderHook(() => useDrawer());
    expect(result.current.isExpanded).toBe(false);

    act(() => result.current.openDrawer());
    expect(result.current.isExpanded).toBe(true);

    act(() => result.current.toggleDrawer());
    expect(result.current.isExpanded).toBe(false);
  });
});
