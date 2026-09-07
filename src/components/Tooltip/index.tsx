import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cx } from "../../../styled-system/css";
import { tooltip } from "../../../styled-system/recipes";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: TooltipPlacement;
  showDelay?: number;
  hideDelay?: number;
  className?: string;
}

const GAP = 8;

export function Tooltip({
  content,
  children,
  placement = "top",
  showDelay = 0,
  hideDelay = 0,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const styles = tooltip();

  const computePosition = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    switch (placement) {
      case "bottom":
        setCoords({ top: rect.bottom + GAP, left: rect.left + rect.width / 2 });
        break;
      case "left":
        setCoords({ top: rect.top + rect.height / 2, left: rect.left - GAP });
        break;
      case "right":
        setCoords({ top: rect.top + rect.height / 2, left: rect.right + GAP });
        break;
      default:
        setCoords({ top: rect.top - GAP, left: rect.left + rect.width / 2 });
    }
  };

  const show = () => {
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => {
      computePosition();
      setOpen(true);
    }, showDelay);
  };

  const hide = () => {
    clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => setOpen(false), hideDelay);
  };

  const transform =
    placement === "top"
      ? "translate(-50%, -100%)"
      : placement === "bottom"
        ? "translate(-50%, 0)"
        : placement === "left"
          ? "translate(-100%, -50%)"
          : "translate(0, -50%)";

  return (
    <>
      <span
        ref={triggerRef}
        style={{ display: "inline-block" }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={open ? "tooltip" : undefined}
      >
        {children}
      </span>
      {open &&
        createPortal(
          <div
            role="tooltip"
            id="tooltip"
            className={cx(styles.content, className)}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

Tooltip.displayName = "Tooltip";
