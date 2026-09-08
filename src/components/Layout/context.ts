import { createContext, useContext } from "react";

export interface SidebarContextValue {
  /** Desktop collapsed/expanded state. */
  isExpanded: boolean;
  /** Mobile off-canvas open state. */
  isMobileOpen: boolean;
  isHovered: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  /** Toggles mobile drawer below the breakpoint, desktop collapse above it — wire this to a single hamburger button. */
  toggleResponsiveSidebar: () => void;
  setIsHovered: (hovered: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider");
  return ctx;
}
