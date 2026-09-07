import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cx } from "../../../styled-system/css";
import { modal } from "../../../styled-system/recipes";
import { IconButton } from "../IconButton";
import { CloseIcon } from "../icons";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const styles = modal({ size });

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
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cx(styles.content, className)}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.displayName = "Modal";

export function ModalHeader({ children }: { children: ReactNode }) {
  const styles = modal();
  return <div className={styles.header}>{children}</div>;
}

export function ModalBody({ children }: { children: ReactNode }) {
  const styles = modal();
  return <div className={styles.body}>{children}</div>;
}

export function ModalFooter({ children }: { children: ReactNode }) {
  const styles = modal();
  return <div className={styles.footer}>{children}</div>;
}

export function ModalCloseButton({ onClick }: { onClick: () => void }) {
  const styles = modal();
  return (
    <IconButton
      aria-label="Close"
      icon={<CloseIcon />}
      size="sm"
      className={styles.closeButton}
      onClick={onClick}
    />
  );
}
