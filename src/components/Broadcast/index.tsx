import type { ReactNode } from "react";
import { cx } from "../../../styled-system/css";
import { broadcast } from "../../../styled-system/recipes";
import { IconButton } from "../IconButton";
import { CloseIcon } from "../icons";

export type BroadcastVariant = "info" | "success" | "warning" | "danger" | "neutral";

export interface BroadcastProps {
  children: ReactNode;
  variant?: BroadcastVariant;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
}

export function Broadcast({
  children,
  variant = "neutral",
  actionLabel,
  onAction,
  onClose,
  className,
}: BroadcastProps) {
  const styles = broadcast({ variant });

  return (
    <div role="region" aria-label="Announcement" className={cx(styles.root, className)}>
      <div className={styles.content}>
        <span>{children}</span>
        {actionLabel && (
          <button type="button" className={styles.action} onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
      {onClose && (
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          size="xs"
          className={styles.closeButton}
          onClick={onClose}
        />
      )}
    </div>
  );
}

Broadcast.displayName = "Broadcast";
