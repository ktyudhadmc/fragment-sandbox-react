import { css } from "../../../styled-system/css";
import { useSidebar } from "./context";

/** Dimmed overlay behind the mobile drawer; click to close. */
export function SidebarBackdrop() {
  const { isMobileOpen, closeMobileSidebar } = useSidebar();
  if (!isMobileOpen) return null;

  return (
    <div
      onClick={closeMobileSidebar}
      className={css({
        position: "fixed",
        inset: 0,
        zIndex: 90,
        bg: "rgba(17, 24, 39, 0.5)",
        display: { base: "block", lg: "none" },
      })}
    />
  );
}

SidebarBackdrop.displayName = "SidebarBackdrop";
