import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { useDropzoneMock } = vi.hoisted(() => ({
  useDropzoneMock: vi.fn(),
}));

vi.mock("react-dropzone", () => ({
  useDropzone: (options: { onDrop: (files: File[]) => void; onError: (err: Error) => void }) => {
    useDropzoneMock(options);
    return {
      getInputProps: () => ({}),
      getRootProps: () => ({}),
      isDragActive: false,
      open: vi.fn(),
    };
  },
}));

import { useFileUpload } from "./useFileUpload";

describe("useFileUpload", () => {
  it("starts with no file and no error", () => {
    const { result } = renderHook(() => useFileUpload());
    expect(result.current.file).toBeNull();
    expect(result.current.error).toBe("");
  });

  it("stores the dropped file with an object-url preview", () => {
    const originalCreate = URL.createObjectURL;
    URL.createObjectURL = vi.fn(() => "blob:preview");

    const { result } = renderHook(() => useFileUpload());
    const onDrop = useDropzoneMock.mock.calls.at(-1)?.[0].onDrop as (files: File[]) => void;
    const file = new File(["hello"], "hello.txt", { type: "text/plain" });

    act(() => onDrop([file]));

    expect(result.current.file).toEqual({ preview: "blob:preview", file, name: "hello.txt" });

    URL.createObjectURL = originalCreate;
  });

  it("onRemove revokes the preview URL and clears the file", () => {
    const originalCreate = URL.createObjectURL;
    const originalRevoke = URL.revokeObjectURL;
    URL.createObjectURL = vi.fn(() => "blob:preview");
    URL.revokeObjectURL = vi.fn();

    const { result } = renderHook(() => useFileUpload());
    const onDrop = useDropzoneMock.mock.calls.at(-1)?.[0].onDrop as (files: File[]) => void;
    const file = new File(["hello"], "hello.txt", { type: "text/plain" });

    act(() => onDrop([file]));
    act(() => result.current.onRemove());

    expect(result.current.file).toBeNull();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:preview");

    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
  });
});
