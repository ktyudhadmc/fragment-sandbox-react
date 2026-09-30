import { useState, type ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { useSidebar } from "../Sidebar";

export interface NavbarProps {
  /** Brand shown next to the toggle below the `lg` breakpoint (the sidebar shows it above). */
  logo?: ReactNode;
  /** Right-aligned actions (theme toggle, notifications, user menu, ...). Collapsible behind a "..." button on mobile. */
  children?: ReactNode;
  className?: string;
}

const toggleBtn = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  w: "8",
  h: "8",
  color: "gray.500",
  bg: "transparent",
  borderColor: "gray.200",
  rounded: "lg",
  cursor: "pointer",
  borderWidth: { base: "0", lg: "1px" },
});

function MenuIcon() {
  return (
    <svg width={16} height={12} viewBox="0 0 16 12" fill="none" aria-hidden>
      <path d="M1 1h14M1 11h14M1 6h7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx={6} cy={12} r={1.5} />
      <circle cx={12} cy={12} r={1.5} />
      <circle cx={18} cy={12} r={1.5} />
    </svg>
  );
}

export function Navbar({ logo, children, className }: NavbarProps) {
  const { isMobileOpen, toggleResponsiveSidebar } = useSidebar();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cx(
        css({
          position: "sticky",
          top: 0,
          zIndex: 80,
          display: "flex",
          flexDirection: { base: "column", lg: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          w: "full",
          bg: "white",
          borderColor: "gray.200",
          borderBottomWidth: { base: "0", lg: "1px" },
          px: { lg: "6" },
        }),
        className
      )}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          justifyContent: { base: "space-between", lg: "flex-start" },
          w: "full",
          gap: "3",
          px: { base: "3", lg: "0" },
          py: "3",
          borderColor: "gray.200",
          borderBottomWidth: { base: "1px", lg: "0" },
        })}
      >
        <button type="button" aria-label="Toggle sidebar" onClick={toggleResponsiveSidebar} className={toggleBtn}>
          {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {logo && <div className={css({ display: { base: "block", lg: "none" } })}>{logo}</div>}

        <button
          type="button"
          aria-label="Toggle actions"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={css({
            display: { base: "inline-flex", lg: "none" },
            alignItems: "center",
            justifyContent: "center",
            w: "10",
            h: "10",
            color: "gray.700",
            bg: "transparent",
            borderWidth: "0",
            rounded: "lg",
            cursor: "pointer",
            _hover: { bg: "gray.100" },
          })}
        >
          <DotsIcon />
        </button>
      </div>

      {children && (
        <div
          className={css({
            display: { base: menuOpen ? "flex" : "none", lg: "flex" },
            alignItems: "center",
            justifyContent: { base: "space-between", lg: "flex-end" },
            w: "full",
            gap: "4",
            px: { base: "5", lg: "0" },
            py: "2",
            boxShadow: { base: "0 4px 8px -2px rgba(16,24,40,0.1)", lg: "none" },
          })}
        >
          {children}
        </div>
      )}
    </header>
  );
}

Navbar.displayName = "Navbar";
