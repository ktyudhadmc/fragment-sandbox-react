import { createContext, useContext } from "react";

export type TabsVariant = "underline" | "pill";
export type TabsOrientation = "horizontal" | "vertical";

export interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  variant: TabsVariant;
  orientation: TabsOrientation;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* must be used within <Tabs>");
  return ctx;
}
