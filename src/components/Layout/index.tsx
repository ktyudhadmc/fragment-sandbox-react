import type { CSSProperties, ReactElement, ReactNode } from "react";
import { css } from "../../../styled-system/css";
import { SidebarProvider, useSidebar, type SidebarProviderProps } from "../Sidebar";

export interface LayoutProps extends Omit<SidebarProviderProps, "children"> {
  /** Your <Sidebar> element. */
  sidebar: ReactElement;
  /** Your <Navbar> element. */
  navbar?: ReactElement;
  children: ReactNode;
  /** Max width (px) of the page content area. */
  maxContentWidth?: number;
}

function LayoutContent({
  sidebar,
  navbar,
  children,
  maxContentWidth,
}: Pick<LayoutProps, "sidebar" | "navbar" | "children" | "maxContentWidth">) {
  const { isExpanded, isHovered, expandedWidth, collapsedWidth } = useSidebar();
  const offset = isExpanded || isHovered ? expandedWidth : collapsedWidth;

  return (
    <div className={css({ minH: "100vh", bg: "white" })}>
      {sidebar}

      <div
        className={css({
          minH: "100vh",
          transition: "margin-left 0.3s ease-in-out",
          marginLeft: { base: "0", lg: "[var(--content-offset)]" },
        })}
        style={{ "--content-offset": `${offset}px` } as CSSProperties}
      >
        {navbar}
        <div className={css({ overflowX: "auto" })}>
          <main className={css({ mx: "auto", px: "4", py: "2", w: "full" })} style={{ maxWidth: maxContentWidth }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

/**
 * Standard "sidebar + navbar + content" page shell. Owns the SidebarProvider,
 * so <Sidebar> and <Navbar> stay separate, independently usable components.
 */
export function Layout({ sidebar, navbar, children, maxContentWidth = 1650, ...providerProps }: LayoutProps) {
  return (
    <SidebarProvider {...providerProps}>
      <LayoutContent sidebar={sidebar} navbar={navbar} maxContentWidth={maxContentWidth}>
        {children}
      </LayoutContent>
    </SidebarProvider>
  );
}

Layout.displayName = "Layout";
