import type { ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { IconButton } from "../IconButton";
import { useSidebar } from "./context";

function MenuIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

export interface TopbarProps {
  /** Extra content aligned to the right (search, notifications, user menu, ...). */
  children?: ReactNode;
  className?: string;
}

export function Topbar({ children, className }: TopbarProps) {
  const { toggleResponsiveSidebar } = useSidebar();

  return (
    <header
      className={cx(
        css({
          position: "sticky",
          top: 0,
          zIndex: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          h: "16",
          px: "4",
          bg: "white",
          borderBottomWidth: "1px",
          borderColor: "gray.200",
        }),
        className
      )}
    >
      <IconButton
        aria-label="Toggle sidebar"
        icon={<MenuIcon />}
        onClick={toggleResponsiveSidebar}
      />
      <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>{children}</div>
    </header>
  );
}

Topbar.displayName = "Topbar";
