import {
  forwardRef,
  useEffect,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { css, cx } from "../../../styled-system/css";
import { checkbox } from "../../../styled-system/recipes";
import { CheckIcon, MinusIcon } from "../icons";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  indeterminate?: boolean;
  invalid?: boolean;
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      indeterminate = false,
      invalid = false,
      disabled = false,
      checked = false,
      label,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

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
            ref={(node) => {
              innerRef.current = node;
              if (typeof forwardedRef === "function") forwardedRef(node);
              else if (forwardedRef) forwardedRef.current = node;
            }}
            type="checkbox"
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
          <span
            aria-hidden
            className={checkbox({
              checked: checked || indeterminate,
              invalid,
              disabled,
            })}
          >
            {indeterminate ? (
              <MinusIcon width={12} height={12} />
            ) : checked ? (
              <CheckIcon width={12} height={12} />
            ) : null}
          </span>
        </span>
        {label && <span className={css({ fontSize: "sm", color: "gray.800" })}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
