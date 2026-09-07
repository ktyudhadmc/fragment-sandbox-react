import { createContext, useContext } from "react";

export interface AccordionContextValue {
  openValues: string[];
  toggle: (value: string) => void;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion.* must be used within <Accordion>");
  return ctx;
}

export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  disabled: boolean;
}

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
);

export function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error("Accordion.* must be used within <AccordionItem>");
  return ctx;
}
