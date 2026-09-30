import { useMemo, useState, type ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { useSidebar } from "./context";

export interface SidebarSubItem {
  name: string;
  path: string;
  badge?: string;
}

export interface SidebarItem {
  name: string;
  icon?: ReactNode;
  path?: string;
  subItems?: SidebarSubItem[];
}

export interface SidebarSection {
  key: string;
  title: string;
  items: SidebarItem[];
}

export interface SidebarLinkProps {
  href: string;
  className: string;
  children: ReactNode;
}

export interface SidebarMenuProps {
  sections: SidebarSection[];
  /** Current location; an item is active when this starts with its path. */
  activePath?: string;
  /** Swap in your router's link, e.g. `(p) => <Link to={p.href} className={p.className}>{p.children}</Link>`. */
  renderLink?: (props: SidebarLinkProps) => ReactNode;
}

const itemBase = css({
  display: "flex",
  alignItems: "center",
  w: "full",
  gap: "3",
  px: "3",
  py: "2",
  rounded: "lg",
  fontSize: "sm",
  fontWeight: "medium",
  cursor: "pointer",
  textDecoration: "none",
  bg: "transparent",
  borderWidth: "0",
  textAlign: "left",
});
const itemActive = css({ bg: "blue.50", color: "blue.600" });
const itemInactive = css({ color: "gray.700", _hover: { bg: "gray.100" } });
const subBase = css({
  display: "flex",
  alignItems: "center",
  gap: "2",
  px: "2",
  py: "2.5",
  rounded: "lg",
  fontSize: "sm",
  fontWeight: "medium",
  textDecoration: "none",
});
const badge = css({
  ml: "auto",
  px: "2.5",
  py: "0.5",
  rounded: "full",
  fontSize: "xs",
  textTransform: "uppercase",
  color: "blue.600",
  bg: "blue.100",
});
const iconBox = css({ display: "inline-flex", flexShrink: 0, w: "5", h: "5", "& svg": { w: "5", h: "5" } });
const list = css({ display: "flex", flexDirection: "column", listStyle: "none", m: "0", p: "0" });

const defaultLink = ({ href, className, children }: SidebarLinkProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={css({ ml: "auto", flexShrink: 0, transition: "transform 0.2s" })}
      style={{ transform: open ? "rotate(180deg)" : undefined }}
    >
      <path d="M4.79 7.4 10 12.6l5.21-5.2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dots() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx={6} cy={12} r={1.5} />
      <circle cx={12} cy={12} r={1.5} />
      <circle cx={18} cy={12} r={1.5} />
    </svg>
  );
}

export function SidebarMenu({ sections, activePath = "", renderLink = defaultLink }: SidebarMenuProps) {
  const { showExpanded } = useSidebar();

  // Group containing the active sub item is open by default; a manual toggle wins until the path changes.
  const autoOpen = useMemo(() => {
    for (const s of sections) {
      for (let i = 0; i < s.items.length; i++) {
        if (s.items[i].subItems?.some((sub) => activePath.startsWith(sub.path))) return `${s.key}-${i}`;
      }
    }
    return null;
  }, [sections, activePath]);
  const [manual, setManual] = useState<{ path: string; id: string | null } | null>(null);
  const open = manual && manual.path === activePath ? manual.id : autoOpen;

  const isActive = (path: string) => activePath !== "" && activePath.startsWith(path);

  return (
    <div className={css({ display: "flex", flexDirection: "column", gap: "4" })}>
      {sections.map((section) => (
        <div key={section.key}>
          <h2
            className={css({
              display: "flex",
              mb: "4",
              fontSize: "xs",
              lineHeight: "5",
              textTransform: "uppercase",
              color: "gray.400",
            })}
            style={{ justifyContent: showExpanded ? "flex-start" : "center" }}
          >
            {showExpanded ? section.title : <Dots />}
          </h2>
          <ul className={cx(list, css({ gap: "2" }))}>
            {section.items.map((item, index) => {
              const id = `${section.key}-${index}`;
              const isOpen = open === id;
              const active = item.path ? isActive(item.path) : isOpen;
              const cls = cx(itemBase, active ? itemActive : itemInactive);
              const content = (
                <>
                  {item.icon && <span className={iconBox}>{item.icon}</span>}
                  {showExpanded && <span>{item.name}</span>}
                </>
              );

              return (
                <li key={item.name}>
                  {item.subItems ? (
                    <button
                      type="button"
                      className={cls}
                      style={{ justifyContent: showExpanded ? "flex-start" : "center" }}
                      aria-expanded={isOpen}
                      onClick={() => setManual({ path: activePath, id: isOpen ? null : id })}
                    >
                      {content}
                      {showExpanded && <Chevron open={isOpen} />}
                    </button>
                  ) : (
                    item.path && renderLink({ href: item.path, className: cls, children: content })
                  )}

                  {item.subItems && showExpanded && (
                    <div
                      className={css({ display: "grid", transition: "grid-template-rows 0.3s" })}
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <ul
                        className={cx(list, css({ overflow: "hidden", minH: "0", gap: "1" }))}
                        style={{ marginLeft: 36, marginTop: isOpen ? 8 : 0 }}
                      >
                        {item.subItems.map((sub) => (
                          <li key={sub.name}>
                            {renderLink({
                              href: sub.path,
                              className: cx(subBase, isActive(sub.path) ? itemActive : itemInactive),
                              children: (
                                <>
                                  {sub.name}
                                  {sub.badge && <span className={badge}>{sub.badge}</span>}
                                </>
                              ),
                            })}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

SidebarMenu.displayName = "SidebarMenu";
