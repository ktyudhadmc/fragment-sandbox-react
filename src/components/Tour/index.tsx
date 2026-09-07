import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { css } from "../../../styled-system/css";
import { Button } from "../Button";

export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
}

export interface TourProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
}

const GAP = 12;

export function Tour({ steps, isOpen, onClose }: TourProps) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setIndex(0);
  }

  const step = steps[index];

  useEffect(() => {
    if (!isOpen || !step) return;
    // Reads live layout of a consumer-rendered target element; cannot be
    // derived during render since the element's position depends on paint.
    const el = document.querySelector(step.target);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRect(el ? el.getBoundingClientRect() : null);
  }, [isOpen, step]);

  if (!isOpen || !step) return null;

  const placement = step.placement ?? "bottom";
  const cardPosition = rect
    ? placement === "bottom"
      ? { top: rect.bottom + GAP, left: rect.left }
      : placement === "top"
        ? { top: rect.top - GAP, left: rect.left, transform: "translateY(-100%)" }
        : placement === "left"
          ? { top: rect.top, left: rect.left - GAP, transform: "translateX(-100%)" }
          : { top: rect.top, left: rect.right + GAP }
    : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const isLast = index === steps.length - 1;

  return createPortal(
    <div
      className={css({
        position: "fixed",
        inset: 0,
        bg: "rgba(15, 23, 42, 0.5)",
        zIndex: 150,
      })}
      onClick={onClose}
    >
      {rect && (
        <div
          className={css({
            position: "fixed",
            borderWidth: "2px",
            borderColor: "blue.400",
            rounded: "md",
            boxShadow: "0 0 0 4000px rgba(15, 23, 42, 0.5)",
            pointerEvents: "none",
          })}
          style={{
            top: rect.top - 4,
            left: rect.left - 4,
            width: rect.width + 8,
            height: rect.height + 8,
          }}
        />
      )}

      <div
        role="dialog"
        aria-label={step.title}
        onClick={(event) => event.stopPropagation()}
        className={css({
          position: "fixed",
          zIndex: 151,
          bg: "white",
          rounded: "lg",
          boxShadow: "xl",
          p: "4",
          width: "72",
          display: "flex",
          flexDirection: "column",
          gap: "2",
        })}
        style={cardPosition}
      >
        <p className={css({ fontSize: "sm", fontWeight: "semibold", color: "gray.900" })}>
          {step.title}
        </p>
        <p className={css({ fontSize: "xs", color: "gray.600" })}>{step.content}</p>

        <div className={css({ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "2" })}>
          <span className={css({ fontSize: "xs", color: "gray.400" })}>
            {index + 1} / {steps.length}
          </span>
          <div className={css({ display: "flex", gap: "2" })}>
            <Button size="xs" variant="outline" onClick={onClose}>
              Skip
            </Button>
            <Button
              size="xs"
              onClick={() => (isLast ? onClose() : setIndex((i) => i + 1))}
            >
              {isLast ? "Done" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

Tour.displayName = "Tour";
