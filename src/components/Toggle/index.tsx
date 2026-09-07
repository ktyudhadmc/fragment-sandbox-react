import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { toggle } from "../../../styled-system/recipes";

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  invalid?: boolean;
  label?: ReactNode;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    { invalid = false, disabled = false, checked = false, label, className, ...props },
    ref
  ) => {
    const styles = toggle({ checked, invalid, disabled });

    return (
      <label
        className={cx(
          css({
            display: "inline-flex",
            alignItems: "center",
            gap: "2",
            cursor: disabled ? "not-allowed" : "pointer",
          }),
          className
        )}
      >
        <span className={css({ position: "relative", display: "inline-flex" })}>
          <input
            {...props}
            ref={ref}
            type="checkbox"
            role="switch"
            checked={checked}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            className={css({
              position: "absolute",
              inset: 0,
              width: "full",
              height: "full",
              opacity: 0,
              margin: 0,
              cursor: disabled ? "not-allowed" : "pointer",
            })}
          />
          <span aria-hidden className={styles.track}>
            <span className={styles.thumb} />
          </span>
        </span>
        {label && (
          <span className={css({ fontSize: "sm", color: "gray.800" })}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";
