import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

function mockMatchMedia(matches: boolean) {
  const listeners = new Set<() => void>();
  const mql = {
    matches,
    media: "",
    addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
  };

  window.matchMedia = vi.fn().mockReturnValue(mql);

  return {
    setMatches: (next: boolean) => {
      mql.matches = next;
      listeners.forEach((listener) => listener());
    },
  };
}

describe("useMediaQuery", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the current match state for a named breakpoint", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery("md"));
    expect(result.current).toBe(true);
  });

  it("resolves a named breakpoint to its min-width query", () => {
    mockMatchMedia(false);
    renderHook(() => useMediaQuery("lg"));
    expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 1024px)");
  });

  it("accepts a raw media query string", () => {
    mockMatchMedia(true);
    renderHook(() => useMediaQuery("(prefers-color-scheme: dark)"));
    expect(window.matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
  });

  it("updates when the media query change event fires", () => {
    const { setMatches } = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery("sm"));

    expect(result.current).toBe(false);
    act(() => setMatches(true));
    expect(result.current).toBe(true);
  });
});
