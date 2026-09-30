import { createContext, useContext } from "react";

export interface SidebarContextValue {
  /** Desktop expanded (true) / collapsed (false) state. */
  isExpanded: boolean;
  /** Mobile off-canvas open state. */
  isMobileOpen: boolean;
  isHovered: boolean;
  /** Whether the panel currently renders at full width (expanded, hovered or mobile-open). */
  showExpanded: boolean;
  expandedWidth: number;
  collapsedWidth: number;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  /** Toggles the mobile drawer below the breakpoint, desktop collapse above it — wire this to a single hamburger button. */
  toggleResponsiveSidebar: () => void;
  setIsHovered: (hovered: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider");
  return ctx;
}
