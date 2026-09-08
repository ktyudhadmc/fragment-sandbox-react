import type { ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { useSidebar } from "./context";

export interface SidebarProps {
  /** Rendered at the top, e.g. a logo — shown in full when expanded, can be swapped for a compact mark when collapsed. */
  logo?: ReactNode;
  /** Rendered at the bottom of the panel. */
  footer?: ReactNode;
  children: ReactNode;
  expandedWidth?: number;
  collapsedWidth?: number;
  className?: string;
}

export function Sidebar({
  logo,
  footer,
  children,
  expandedWidth = 260,
  collapsedWidth = 80,
  className,
}: SidebarProps) {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, closeMobileSidebar } = useSidebar();
  const showExpanded = isExpanded || isHovered || isMobileOpen;

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className={css({
            position: "fixed",
            inset: 0,
            bg: "rgba(15, 23, 42, 0.5)",
            zIndex: 90,
            display: { base: "block", md: "none" },
          })}
        />
      )}

      <aside
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cx(
          css({
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            zIndex: 95,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            bg: "white",
            borderRightWidth: "1px",
            borderColor: "gray.200",
            transition: "width 0.2s, transform 0.2s",
            overflowX: "hidden",
            transform: { base: isMobileOpen ? "translateX(0)" : "translateX(-100%)", md: "translateX(0)" },
          }),
          className
        )}
        style={{ width: showExpanded ? expandedWidth : collapsedWidth }}
      >
        {logo && (
          <div className={css({ display: "flex", alignItems: "center", h: "16", px: "4", flexShrink: 0 })}>
            {logo}
          </div>
        )}

        <nav className={css({ flex: "1", overflowY: "auto", px: "2", py: "2" })}>{children}</nav>

        {footer && <div className={css({ px: "4", py: "3", flexShrink: 0 })}>{footer}</div>}
      </aside>
    </>
  );
}

Sidebar.displayName = "Sidebar";
