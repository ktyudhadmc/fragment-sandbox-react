import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cx } from "../../../styled-system/css";
import { drawer } from "../../../styled-system/recipes";
import { IconButton } from "../IconButton";
import { CloseIcon } from "../icons";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  placement?: DrawerPlacement;
  size?: "sm" | "md" | "lg" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  children,
  placement = "right",
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
}: DrawerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const styles = drawer({ placement, size });

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    contentRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className={styles.overlay}
        onClick={() => closeOnOverlayClick && onClose()}
      />
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cx(styles.content, className)}
      >
        {children}
      </div>
    </>,
    document.body
  );
}

Drawer.displayName = "Drawer";

export function DrawerHeader({ children }: { children: ReactNode }) {
  const styles = drawer();
  return <div className={styles.header}>{children}</div>;
}

export function DrawerBody({ children }: { children: ReactNode }) {
  const styles = drawer();
  return <div className={styles.body}>{children}</div>;
}

export function DrawerFooter({ children }: { children: ReactNode }) {
  const styles = drawer();
  return <div className={styles.footer}>{children}</div>;
}

export function DrawerCloseButton({ onClick }: { onClick: () => void }) {
  return <IconButton aria-label="Close" icon={<CloseIcon />} size="sm" onClick={onClick} />;
}
