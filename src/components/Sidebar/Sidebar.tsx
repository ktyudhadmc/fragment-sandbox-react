import type { ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { useSidebar } from "./context";
import { SidebarBackdrop } from "./Backdrop";
import { SidebarMenu, type SidebarMenuProps } from "./SidebarMenu";

export interface SidebarProps extends Partial<Pick<SidebarMenuProps, "sections" | "activePath" | "renderLink">> {
  /** Shown at the top when the panel is expanded. */
  logo?: ReactNode;
  /** Compact mark shown at the top when collapsed; falls back to `logo`. */
  collapsedLogo?: ReactNode;
  /** Extra content rendered in the scroll area, after the menu sections. */
  children?: ReactNode;
  /** Rendered at the bottom while expanded (e.g. a promo widget). */
  footer?: ReactNode;
  className?: string;
}

export function Sidebar({
  logo,
  collapsedLogo,
  sections,
  activePath,
  renderLink,
  children,
  footer,
  className,
}: SidebarProps) {
  const { isExpanded, isMobileOpen, setIsHovered, showExpanded, expandedWidth, collapsedWidth } = useSidebar();

  return (
    <>
      <SidebarBackdrop />
      <aside
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cx(
          css({
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 95,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            px: "5",
            bg: "white",
            color: "gray.900",
            borderRightWidth: "1px",
            borderColor: "gray.200",
            overflowX: "hidden",
            transition: "width 0.3s ease-in-out, transform 0.3s ease-in-out",
            transform: { base: "translateX(-100%)", lg: "translateX(0)" },
          }),
          className
        )}
        style={{
          width: showExpanded ? expandedWidth : collapsedWidth,
          ...(isMobileOpen ? { transform: "translateX(0)" } : null),
        }}
      >
        {(logo || collapsedLogo) && (
          <div className={css({ display: "flex", justifyContent: "center", py: "8", flexShrink: 0 })}>
            {showExpanded ? logo : (collapsedLogo ?? logo)}
          </div>
        )}

        <div
          className={css({
            flex: "1",
            minH: "0",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          })}
        >
          <nav className={css({ mb: "6" })}>
            {sections && <SidebarMenu sections={sections} activePath={activePath} renderLink={renderLink} />}
            {children}
          </nav>
        </div>

        {footer && showExpanded && <div className={css({ flexShrink: 0, pb: "5" })}>{footer}</div>}
      </aside>
    </>
  );
}

Sidebar.displayName = "Sidebar";
