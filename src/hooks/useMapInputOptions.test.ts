import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useMapInputOptions } from "./useMapInputOptions";

describe("useMapInputOptions", () => {
  it("maps id/name records to label/value options", () => {
    const { result } = renderHook(() =>
      useMapInputOptions([{ id: 1, name: "Apple" }, { id: 2, name: "Banana" }])
    );

    expect(result.current).toEqual([
      { label: "Apple", value: 1 },
      { label: "Banana", value: 2 },
    ]);
  });

  it("falls back to a placeholder option when items is undefined", () => {
    const { result } = renderHook(() => useMapInputOptions(undefined));
    expect(result.current).toEqual([{ label: "No data found", value: "" }]);
  });

  it("prefixes the code when withCodeLabel is set", () => {
    const { result } = renderHook(() =>
      useMapInputOptions([{ id: 1, name: "Apple", code: "A1" }], { withCodeLabel: true })
    );
    expect(result.current[0].label).toBe("(A1) Apple");
  });

  it("supports fully custom label/value functions", () => {
    const { result } = renderHook(() =>
      useMapInputOptions([{ id: 1, name: "Apple" }], {
        withCustomLabel: (item) => `${item.name}!`,
        withCustomValue: (item) => `id-${item.id}`,
      })
    );
    expect(result.current).toEqual([{ label: "Apple!", value: "id-1" }]);
  });
});
