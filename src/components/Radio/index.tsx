import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { css, cx } from "../../../styled-system/css";
import { radio } from "../../../styled-system/recipes";
import { RadioGroupContext, useRadioGroupContext } from "./context";

export interface RadioProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "value" | "onChange"
  > {
  value: string;
  invalid?: boolean;
  label?: ReactNode;
  onChange?: (value: string) => void;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      invalid = false,
      disabled: disabledProp,
      checked: checkedProp,
      label,
      className,
      name: nameProp,
      onChange,
      ...props
    },
    ref
  ) => {
    const group = useRadioGroupContext();

    const checked = group ? group.value === value : (checkedProp ?? false);
    const disabled = group?.disabled || disabledProp || false;
    const name = group?.name ?? nameProp;

    const handleChange = () => {
      if (disabled) return;
      group?.onChange?.(value);
      onChange?.(value);
    };

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
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            onChange={handleChange}
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
          <span aria-hidden className={radio({ checked, invalid, disabled })}>
            {checked && (
              <span
                className={css({
                  w: "2",
                  h: "2",
                  rounded: "full",
                  bg: "blue.500",
                })}
              />
            )}
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

Radio.displayName = "Radio";

export interface RadioGroupProps {
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function RadioGroup({
  name,
  value,
  disabled,
  onChange,
  children,
  className,
  ...rest
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cx(css({ display: "flex", flexDirection: "column", gap: "2" }), className)}
      {...rest}
    >
      <RadioGroupContext.Provider value={{ name, value, disabled, onChange }}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}

RadioGroup.displayName = "RadioGroup";
