import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { table_to_book, writeFile } = vi.hoisted(() => ({
  table_to_book: vi.fn<(table: HTMLTableElement, opts: { sheet: string }) => { mock: string }>(
    () => ({ mock: "workbook" })
  ),
  writeFile: vi.fn<(workbook: unknown, fileName: string) => void>(),
}));

vi.mock("xlsx", () => ({
  utils: { table_to_book },
  writeFile,
}));

import { useExportXlsx } from "./useExportXlsx";

describe("useExportXlsx", () => {
  it("does nothing when the table ref isn't attached yet", () => {
    const { result } = renderHook(() => useExportXlsx("report"));

    result.current.exportXlsx();

    expect(table_to_book).not.toHaveBeenCalled();
    expect(writeFile).not.toHaveBeenCalled();
  });

  it("converts the referenced table and writes a file named after fileName", () => {
    const { result } = renderHook(() => useExportXlsx("report"));
    const table = document.createElement("table");
    (result.current.tableRef as { current: HTMLTableElement | null }).current = table;

    result.current.exportXlsx();

    expect(table_to_book).toHaveBeenCalledWith(table, { sheet: "Sheet1" });
    expect(writeFile).toHaveBeenCalledWith({ mock: "workbook" }, "report.xlsx");
  });
});
