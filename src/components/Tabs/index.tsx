import { useState, type ReactNode } from "react";
import { cx } from "../../../styled-system/css";
import { tabs } from "../../../styled-system/recipes";
import { TabsContext, useTabsContext } from "./context";

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ value, defaultValue, onChange, children, className }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = value ?? internal;

  const setValue = (next: string) => {
    setInternal(next);
    onChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.displayName = "Tabs";

export function TabList({ children, className }: { children: ReactNode; className?: string }) {
  const styles = tabs();
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
  const styles = tabs({ selected });

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      className={cx(styles.tab, className)}
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
