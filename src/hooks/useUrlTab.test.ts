import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useUrlTab } from "./useUrlTab";

function setUrl(search: string) {
  window.history.pushState(null, "", `/orders${search}`);
}

describe("useUrlTab", () => {
  afterEach(() => {
    window.history.pushState(null, "", "/");
  });

  it("falls back to defaultTab when the param is missing", () => {
    setUrl("");
    const { result } = renderHook(() => useUrlTab(["active", "archived"], "active"));
    expect(result.current.activeTab).toBe("active");
  });

  it("reads the tab from the URL when it's a valid value", () => {
    setUrl("?tab=archived");
    const { result } = renderHook(() => useUrlTab(["active", "archived"], "active"));
    expect(result.current.activeTab).toBe("archived");
  });

  it("falls back to defaultTab when the param value isn't in validValues", () => {
    setUrl("?tab=bogus");
    const { result } = renderHook(() => useUrlTab(["active", "archived"], "active"));
    expect(result.current.activeTab).toBe("active");
  });

  it("setTab updates both the URL and the returned activeTab", () => {
    setUrl("");
    const { result } = renderHook(() => useUrlTab(["active", "archived"], "active"));

    act(() => result.current.setTab("archived"));

    expect(result.current.activeTab).toBe("archived");
    expect(window.location.search).toBe("?tab=archived");
  });

  it("uses a custom paramKey", () => {
    setUrl("?view=archived");
    const { result } = renderHook(() => useUrlTab(["active", "archived"], "active", "view"));
    expect(result.current.activeTab).toBe("archived");
  });
});
