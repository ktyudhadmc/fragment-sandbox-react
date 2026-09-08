import { useRef } from "react";
import * as XLSX from "xlsx";

/**
 * Wraps `xlsx` (optional peer dependency) to export an HTML <table> — via
 * `tableRef` — to a downloadable .xlsx file.
 */
export function useExportXlsx(fileName: string) {
  const tableRef = useRef<HTMLTableElement>(null);

  const exportXlsx = () => {
    if (!tableRef.current) return;
    const workbook = XLSX.utils.table_to_book(tableRef.current, {
      sheet: "Sheet1",
    });
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return { tableRef, exportXlsx };
}
