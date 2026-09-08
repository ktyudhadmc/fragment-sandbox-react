import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useModal } from "./useModal";

describe("useModal", () => {
  it("exposes isOpen/openModal/closeModal/toggleModal", () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);

    act(() => result.current.openModal());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.closeModal());
    expect(result.current.isOpen).toBe(false);

    act(() => result.current.toggleModal());
    expect(result.current.isOpen).toBe(true);
  });
});
