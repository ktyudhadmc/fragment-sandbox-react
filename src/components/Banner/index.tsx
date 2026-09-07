import type { ReactNode } from "react";
import { cx } from "../../../styled-system/css";
import { banner } from "../../../styled-system/recipes";
import { IconButton } from "../IconButton";
import { AlertIcon, CheckIcon, CloseIcon, InfoIcon } from "../icons";

export type BannerVariant = "info" | "success" | "warning" | "danger";

const VARIANT_ICON: Record<BannerVariant, ReactNode> = {
  info: <InfoIcon />,
  success: <CheckIcon />,
  warning: <AlertIcon />,
  danger: <AlertIcon />,
};

export interface BannerProps {
  title: string;
  description?: ReactNode;
  variant?: BannerVariant;
  onClose?: () => void;
  action?: ReactNode;
  className?: string;
}

export function Banner({
  title,
  description,
  variant = "info",
  onClose,
  action,
  className,
}: BannerProps) {
  const styles = banner({ variant });

  return (
    <div role="alert" className={cx(styles.root, className)}>
      <span className={styles.icon}>{VARIANT_ICON[variant]}</span>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
        {action}
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

Banner.displayName = "Banner";
