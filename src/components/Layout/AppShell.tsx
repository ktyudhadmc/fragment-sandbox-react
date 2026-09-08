import type { CSSProperties, ReactElement, ReactNode } from "react";
import { css } from "../../../styled-system/css";
import { SidebarProvider, type SidebarProviderProps } from "./SidebarProvider";
import { useSidebar } from "./context";

export interface AppShellProps {
  sidebar: ReactElement;
  topbar?: ReactElement;
  children: ReactNode;
  sidebarProps?: Omit<SidebarProviderProps, "children">;
}

function AppShellLayout({ sidebar, topbar, children }: Omit<AppShellProps, "sidebarProps">) {
  const { isExpanded, isHovered } = useSidebar();
  const showExpanded = isExpanded || isHovered;

  return (
    <div className={css({ minH: "100vh", bg: "gray.50" })}>
      {sidebar}

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          minH: "100vh",
          transition: "margin-left 0.2s",
        })}
        style={{ marginLeft: 0 }}
      >
        <div
          className={css({ marginLeft: { base: "0", md: "[var(--content-offset)]" } })}
          style={{ "--content-offset": `${showExpanded ? 260 : 80}px` } as CSSProperties}
        >
          {topbar}
          <main className={css({ p: { base: "4", md: "6" } })}>{children}</main>
        </div>
      </div>
    </div>
  );
}

/**
 * Wires SidebarProvider + a Sidebar + an optional Topbar into a standard
 * "sidebar + content" app layout. Pass the same width props to `sidebar`
 * and to `sidebarProps`/AppShell if you customize expandedWidth/collapsedWidth.
 */
export function AppShell({ sidebar, topbar, children, sidebarProps }: AppShellProps) {
  return (
    <SidebarProvider {...sidebarProps}>
      <AppShellLayout sidebar={sidebar} topbar={topbar}>
        {children}
      </AppShellLayout>
    </SidebarProvider>
  );
}

AppShell.displayName = "AppShell";
