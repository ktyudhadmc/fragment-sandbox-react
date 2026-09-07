import {
  cloneElement,
  isValidElement,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cx } from "../../../styled-system/css";
import { popover } from "../../../styled-system/recipes";
import { useDismiss } from "../../hooks/useDismiss";

export interface PopoverProps {
  trigger: ReactElement;
  children: ReactNode;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Popover({
  trigger,
  children,
  placement = "bottom-start",
  open: openProp,
  onOpenChange,
  className,
}: PopoverProps) {
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const containerRef = useRef<HTMLDivElement>(null);
  const styles = popover();

  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
  };

  useDismiss(open, containerRef, () => setOpen(false));

  if (!isValidElement(trigger)) return null;

  const isTop = placement.startsWith("top");
  const isEnd = placement.endsWith("end");

  const triggerEl = cloneElement(trigger as ReactElement<Record<string, unknown>>, {
    onClick: (event: ReactMouseEvent) => {
      (trigger.props as { onClick?: (e: ReactMouseEvent) => void }).onClick?.(
        event
      );
      setOpen(!open);
    },
    "aria-haspopup": "dialog",
    "aria-expanded": open,
  });

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      {triggerEl}
      {open && (
        <div
          role="dialog"
          className={cx(styles.content, className)}
          style={{
            position: "absolute",
            zIndex: 60,
            [isTop ? "bottom" : "top"]: "calc(100% + 8px)",
            [isEnd ? "right" : "left"]: 0,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

Popover.displayName = "Popover";

export function PopoverHeader({ children }: { children: ReactNode }) {
  const styles = popover();
  return <div className={styles.header}>{children}</div>;
}

export function PopoverBody({ children }: { children: ReactNode }) {
  const styles = popover();
  return <div className={styles.body}>{children}</div>;
}

export function PopoverFooter({ children }: { children: ReactNode }) {
  const styles = popover();
  return <div className={styles.footer}>{children}</div>;
}
