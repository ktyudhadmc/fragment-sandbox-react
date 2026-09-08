import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCountdown } from "./useCountdown";

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("counts down a fixed duration in seconds", () => {
    const { result } = renderHook(() => useCountdown({ duration: 65 }));

    expect(result.current.totalSeconds).toBe(65);
    expect(result.current.minutes).toBe(1);
    expect(result.current.seconds).toBe(5);
    expect(result.current.isFinished).toBe(false);

    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.totalSeconds).toBe(64);
  });

  it("reaches isFinished at zero and stops", () => {
    const { result } = renderHook(() => useCountdown({ duration: 2 }));

    act(() => vi.advanceTimersByTime(3000));

    expect(result.current.totalSeconds).toBe(0);
    expect(result.current.isFinished).toBe(true);
  });

  it("counts down to a target date", () => {
    const targetDate = new Date(Date.now() + 10_000);
    const { result } = renderHook(() => useCountdown({ targetDate }));

    expect(result.current.totalSeconds).toBeGreaterThanOrEqual(9);
    expect(result.current.totalSeconds).toBeLessThanOrEqual(10);
  });

  it("restarts the countdown when reset is called", () => {
    const { result } = renderHook(() => useCountdown({ duration: 5 }));

    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.totalSeconds).toBe(2);

    act(() => result.current.reset());
    expect(result.current.totalSeconds).toBe(5);
  });
});
