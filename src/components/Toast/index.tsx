import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { css } from "../../../styled-system/css";
import { toast as toastRecipe } from "../../../styled-system/recipes";
import { IconButton } from "../IconButton";
import { AlertIcon, CheckIcon, CloseIcon, InfoIcon } from "../icons";
import { toast, toastStore, type ToastItem, type ToastVariant } from "./store";

const VARIANT_ICON: Record<ToastVariant, ReactNode> = {
  success: <CheckIcon />,
  error: <AlertIcon />,
  warning: <AlertIcon />,
  info: <InfoIcon />,
};

export type ToastPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProviderProps {
  placement?: ToastPlacement;
}

function ToastCard({ item }: { item: ToastItem }) {
  const styles = toastRecipe({ variant: item.variant });

  useEffect(() => {
    if (item.duration <= 0) return;
    const timer = setTimeout(() => toast.dismiss(item.id), item.duration);
    return () => clearTimeout(timer);
  }, [item.id, item.duration]);

  return (
    <div className={styles.root} role="status">
      <span className={styles.icon}>{VARIANT_ICON[item.variant]}</span>
      <div className={styles.content}>
        <p className={styles.title}>{item.title}</p>
        {item.description && <p className={styles.description}>{item.description}</p>}
      </div>
      <IconButton
        aria-label="Dismiss"
        icon={<CloseIcon />}
        size="xs"
        className={styles.closeButton}
        onClick={() => toast.dismiss(item.id)}
      />
    </div>
  );
}

export function ToastProvider({ placement = "top-center" }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => toastStore.subscribe(setItems), []);

  const [vertical, horizontal] = placement.split("-") as ["top" | "bottom", "left" | "center" | "right"];

  return createPortal(
    <div
      className={css({
        position: "fixed",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        gap: "2",
        p: "4",
        top: vertical === "top" ? "0" : undefined,
        bottom: vertical === "bottom" ? "0" : undefined,
        left: horizontal === "left" ? "0" : horizontal === "center" ? "50%" : undefined,
        right: horizontal === "right" ? "0" : undefined,
        transform: horizontal === "center" ? "translateX(-50%)" : undefined,
      })}
    >
      {items.map((item) => (
        <ToastCard key={item.id} item={item} />
      ))}
    </div>,
    document.body
  );
}

ToastProvider.displayName = "ToastProvider";
