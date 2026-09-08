import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export type PrintOrientation = "portrait" | "landscape";

export interface UsePrintOptions {
  documentTitle?: string;
  orientation?: PrintOrientation;
  margin?: string;
  /** e.g. "A4", "Letter". */
  pageSize?: string;
}

/**
 * Wraps `react-to-print` (optional peer dependency) so a printable region can
 * be declared once via `contentRef` and triggered imperatively via `print()`.
 */
export function usePrint({
  documentTitle = "Document",
  orientation: defaultOrientation = "portrait",
  margin = "10mm",
  pageSize = "A4",
}: UsePrintOptions = {}) {
  const [orientation, setOrientation] = useState<PrintOrientation>(defaultOrientation);
  const contentRef = useRef<HTMLDivElement>(null);

  const print = useReactToPrint({
    contentRef,
    documentTitle,
    pageStyle: `@page { size: ${pageSize} ${orientation}; margin: ${margin}; }`,
  });

  return { contentRef, orientation, setOrientation, print };
}
