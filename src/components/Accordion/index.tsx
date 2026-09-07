import { useState, type ReactNode } from "react";
import { cx } from "../../../styled-system/css";
import { accordion } from "../../../styled-system/recipes";
import { ChevronDownIcon } from "../icons";
import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext,
} from "./context";

export interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  allowToggle?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({
  children,
  allowMultiple = false,
  allowToggle = true,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [openValues, setOpenValues] = useState(defaultOpen);
  const styles = accordion();

  const toggle = (value: string) => {
    setOpenValues((current) => {
      const isOpen = current.includes(value);
      if (isOpen) {
        return allowToggle ? current.filter((v) => v !== value) : current;
      }
      return allowMultiple ? [...current, value] : [value];
    });
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggle }}>
      <div className={cx(styles.root, className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

Accordion.displayName = "Accordion";

export interface AccordionItemProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

export function AccordionItem({ value, children, disabled = false }: AccordionItemProps) {
  const { openValues } = useAccordionContext();
  const styles = accordion();
  const isOpen = openValues.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, disabled }}>
      <div className={styles.item}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

AccordionItem.displayName = "AccordionItem";

export function AccordionHeader({ children }: { children: ReactNode }) {
  const { toggle } = useAccordionContext();
  const { value, isOpen, disabled } = useAccordionItemContext();
  const styles = accordion({ open: isOpen });

  return (
    <button
      type="button"
      disabled={disabled}
      aria-expanded={isOpen}
      className={styles.header}
      onClick={() => toggle(value)}
    >
      {children}
      <AccordionIcon />
    </button>
  );
}

AccordionHeader.displayName = "AccordionHeader";

export function AccordionIcon() {
  const { isOpen } = useAccordionItemContext();
  const styles = accordion({ open: isOpen });
  return <ChevronDownIcon className={styles.icon} />;
}

AccordionIcon.displayName = "AccordionIcon";

export function AccordionPanel({ children }: { children: ReactNode }) {
  const { isOpen } = useAccordionItemContext();
  const styles = accordion();

  if (!isOpen) return null;

  return <div className={styles.panel}>{children}</div>;
}

AccordionPanel.displayName = "AccordionPanel";
