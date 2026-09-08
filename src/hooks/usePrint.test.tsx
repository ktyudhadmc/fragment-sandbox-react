import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

interface CapturedOptions {
  documentTitle?: string;
  pageStyle?: string;
}

const useReactToPrintMock = vi.fn<(options: CapturedOptions) => () => void>(() => vi.fn());
vi.mock("react-to-print", () => ({
  useReactToPrint: (options: CapturedOptions) => useReactToPrintMock(options),
}));

import { usePrint } from "./usePrint";

describe("usePrint", () => {
  it("exposes a contentRef and a print function", () => {
    const { result } = renderHook(() => usePrint({ documentTitle: "Invoice" }));

    expect(result.current.contentRef).toBeDefined();
    expect(typeof result.current.print).toBe("function");
  });

  it("passes documentTitle and a @page style built from orientation/margin/pageSize", () => {
    renderHook(() =>
      usePrint({ documentTitle: "Invoice", orientation: "landscape", margin: "5mm", pageSize: "Letter" })
    );

    const options = useReactToPrintMock.mock.calls.at(-1)?.[0] as CapturedOptions;

    expect(options.documentTitle).toBe("Invoice");
    expect(options.pageStyle).toContain("Letter landscape");
    expect(options.pageStyle).toContain("margin: 5mm");
  });

  it("defaults to portrait A4 with a 10mm margin", () => {
    renderHook(() => usePrint());

    const options = useReactToPrintMock.mock.calls.at(-1)?.[0] as CapturedOptions;
    expect(options.pageStyle).toContain("A4 portrait");
    expect(options.pageStyle).toContain("margin: 10mm");
  });
});
