import type { ReactNode } from "react";
import { cx } from "../../../styled-system/css";
import { segmentedControl } from "../../../styled-system/recipes";

export interface SegmentedControlOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  fullWidth = true,
  className,
  ...rest
}: SegmentedControlProps) {
  const rootStyles = segmentedControl({ fullWidth });

  return (
    <div role="radiogroup" className={cx(rootStyles.root, className)} {...rest}>
      {options.map((option) => {
        const selected = option.value === value;
        const styles = segmentedControl({ selected, fullWidth });

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={option.disabled}
            className={styles.option}
            onClick={() => !option.disabled && onChange?.(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

SegmentedControl.displayName = "SegmentedControl";
