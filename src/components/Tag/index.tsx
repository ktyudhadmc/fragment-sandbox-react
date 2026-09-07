import type { ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { tag } from "../../../styled-system/recipes";
import { CloseIcon } from "../icons";

export interface TagProps {
  children: ReactNode;
  colorScheme?: "gray" | "blue" | "green" | "red" | "yellow";
  onRemove?: () => void;
  className?: string;
}

export function Tag({ children, colorScheme = "gray", onRemove, className }: TagProps) {
  return (
    <span className={cx(tag({ colorScheme }), className)}>
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={onRemove}
          className={css({
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
            color: "inherit",
            opacity: 0.7,
            _hover: { opacity: 1 },
          })}
        >
          <CloseIcon width={10} height={10} />
        </button>
      )}
    </span>
  );
}

Tag.displayName = "Tag";
