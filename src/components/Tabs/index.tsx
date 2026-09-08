import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { tabs, segmentedControl } from "../../../styled-system/recipes";
import { TabsContext, useTabsContext, type TabsOrientation, type TabsVariant } from "./context";

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** "underline" (default) draws a bottom border on the active tab; "pill" shows a sliding segmented-control-style indicator. */
  variant?: TabsVariant;
  /** "vertical" stacks the tab list on the left with a right-side border/indicator instead of a bottom one. */
  orientation?: TabsOrientation;
  children: ReactNode;
  className?: string;
}

export function Tabs({
  value,
  defaultValue,
  onChange,
  variant = "underline",
  orientation = "horizontal",
  children,
  className,
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = value ?? internal;

  const setValue = (next: string) => {
    setInternal(next);
    onChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value: current, setValue, variant, orientation }}>
      <div
        className={cx(
          orientation === "vertical" && css({ display: "flex", gap: "6" }),
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

Tabs.displayName = "Tabs";

export function TabList({ children, className }: { children: ReactNode; className?: string }) {
  const ctx = useTabsContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });

  useLayoutEffect(() => {
    if (ctx.variant !== "pill") return;
    const active = containerRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (active) {
      setSliderStyle({ width: active.offsetWidth, left: active.offsetLeft });
    }
  }, [ctx.variant, ctx.value, children]);

  if (ctx.variant === "pill") {
    const styles = segmentedControl();
    return (
      <div ref={containerRef} role="tablist" className={cx(styles.root, css({ position: "relative" }), className)}>
        <span
          aria-hidden
          className={css({
            position: "absolute",
            top: "1",
            bottom: "1",
            rounded: "md",
            bg: "white",
            boxShadow: "sm",
            transition: "left 0.2s, width 0.2s",
          })}
          style={{ width: sliderStyle.width, left: sliderStyle.left }}
        />
        {children}
      </div>
    );
  }

  const styles = tabs({ orientation: ctx.orientation });
  return (
    <div role="tablist" className={cx(styles.list, className)}>
      {children}
    </div>
  );
}

TabList.displayName = "TabList";

export interface TabProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function Tab({ value, children, disabled = false, className }: TabProps) {
  const ctx = useTabsContext();
  const selected = ctx.value === value;

  const styles =
    ctx.variant === "pill"
      ? segmentedControl({ selected }).option
      : tabs({ selected, orientation: ctx.orientation }).tab;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      className={cx(
        styles,
        ctx.variant === "pill" && css({ position: "relative", zIndex: 1, bg: "transparent" }),
        className
      )}
      onClick={() => !disabled && ctx.setValue(value)}
    >
      {children}
    </button>
  );
}

Tab.displayName = "Tab";

export function TabPanels({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

TabPanels.displayName = "TabPanels";

export function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useTabsContext();
  const styles = tabs();

  if (ctx.value !== value) return null;

  return (
    <div role="tabpanel" className={styles.panel}>
      {children}
    </div>
  );
}

TabPanel.displayName = "TabPanel";
