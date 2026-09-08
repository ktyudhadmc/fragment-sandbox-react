import { describe, expect, it } from "vitest";
import { getPaginationRange } from "./utils";

describe("getPaginationRange", () => {
  it("returns every page when there are few enough pages", () => {
    expect(getPaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("shows dots on the right when near the start", () => {
    expect(getPaginationRange(1, 20)).toEqual([1, 2, "...", 20]);
  });

  it("shows dots on the left when near the end", () => {
    expect(getPaginationRange(20, 20)).toEqual([1, "...", 19, 20]);
  });

  it("shows dots on both sides when in the middle", () => {
    expect(getPaginationRange(10, 20)).toEqual([1, "...", 9, 10, 11, "...", 20]);
  });

  it("respects a larger siblingCount", () => {
    expect(getPaginationRange(10, 20, 2)).toEqual([
      1, "...", 8, 9, 10, 11, 12, "...", 20,
    ]);
  });
});
