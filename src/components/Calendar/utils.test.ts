import { describe, expect, it } from "vitest";
import {
  addDays,
  addMonths,
  formatISODate,
  getMonthGrid,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinRange,
} from "./utils";

describe("isSameDay", () => {
  it("returns true for equal dates regardless of time", () => {
    expect(
      isSameDay(new Date(2026, 0, 5, 3), new Date(2026, 0, 5, 22))
    ).toBe(true);
  });

  it("returns false when either date is missing", () => {
    expect(isSameDay(null, new Date())).toBe(false);
    expect(isSameDay(new Date(), null)).toBe(false);
  });

  it("returns false for different days", () => {
    expect(isSameDay(new Date(2026, 0, 5), new Date(2026, 0, 6))).toBe(false);
  });
});

describe("isSameMonth", () => {
  it("returns true for dates within the same month/year", () => {
    expect(isSameMonth(new Date(2026, 2, 1), new Date(2026, 2, 28))).toBe(
      true
    );
  });

  it("returns false across different years", () => {
    expect(isSameMonth(new Date(2025, 2, 1), new Date(2026, 2, 1))).toBe(
      false
    );
  });
});

describe("addMonths", () => {
  it("advances the month and clamps to day 1", () => {
    const result = addMonths(new Date(2026, 0, 31), 1);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(1);
  });

  it("wraps into the next year", () => {
    const result = addMonths(new Date(2026, 11, 1), 1);
    expect(result.getFullYear()).toBe(2027);
    expect(result.getMonth()).toBe(0);
  });
});

describe("addDays", () => {
  it("adds days across month boundaries", () => {
    const result = addDays(new Date(2026, 0, 31), 1);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(1);
  });
});

describe("isBefore / isAfter", () => {
  it("compares by calendar day, ignoring time", () => {
    const a = new Date(2026, 0, 1, 23, 59);
    const b = new Date(2026, 0, 2, 0, 0);
    expect(isBefore(a, b)).toBe(true);
    expect(isAfter(b, a)).toBe(true);
    expect(isBefore(a, a)).toBe(false);
  });
});

describe("isWithinRange", () => {
  it("returns true strictly between start and end", () => {
    const start = new Date(2026, 0, 1);
    const mid = new Date(2026, 0, 5);
    const end = new Date(2026, 0, 10);
    expect(isWithinRange(mid, start, end)).toBe(true);
  });

  it("returns false for the boundary dates themselves", () => {
    const start = new Date(2026, 0, 1);
    const end = new Date(2026, 0, 10);
    expect(isWithinRange(start, start, end)).toBe(false);
    expect(isWithinRange(end, start, end)).toBe(false);
  });
});

describe("getMonthGrid", () => {
  it("returns a 42-cell grid starting on a Sunday", () => {
    const grid = getMonthGrid(new Date(2026, 1, 15));
    expect(grid).toHaveLength(42);
    expect(grid[0].getDay()).toBe(0);
  });

  it("includes every day of the target month", () => {
    const grid = getMonthGrid(new Date(2026, 1, 15));
    const februaryDays = grid.filter((d) => d.getMonth() === 1);
    expect(februaryDays).toHaveLength(28);
  });
});

describe("formatISODate", () => {
  it("formats as YYYY-MM-DD with zero padding", () => {
    expect(formatISODate(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});
