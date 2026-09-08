import { useEffect, useState, type ReactNode } from "react";
import { SidebarContext, type SidebarContextValue } from "./context";

export interface SidebarProviderProps {
  children: ReactNode;
  defaultExpanded?: boolean;
  /** Below this width (px), the sidebar becomes an off-canvas mobile drawer. */
  mobileBreakpoint?: number;
}

export function SidebarProvider({
  children,
  defaultExpanded = true,
  mobileBreakpoint = 768,
}: SidebarProviderProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= mobileBreakpoint) setIsMobileOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);

  const value: SidebarContextValue = {
    isExpanded,
    isMobileOpen,
    isHovered,
    toggleSidebar: () => setIsExpanded((v) => !v),
    toggleMobileSidebar: () => setIsMobileOpen((v) => !v),
    closeMobileSidebar: () => setIsMobileOpen(false),
    toggleResponsiveSidebar: () => {
      if (window.innerWidth < mobileBreakpoint) setIsMobileOpen((v) => !v);
      else setIsExpanded((v) => !v);
    },
    setIsHovered,
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

SidebarProvider.displayName = "SidebarProvider";
