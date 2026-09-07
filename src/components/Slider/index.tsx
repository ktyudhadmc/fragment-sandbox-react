import { css } from "../../../styled-system/css";
import { slider } from "../../../styled-system/recipes";

export interface SliderProps {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
  ...rest
}: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;
  const styles = slider({ disabled });

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <div className={styles.track}>
        <div className={styles.range} style={{ width: `${percent}%` }} />
        <div className={styles.thumb} style={{ left: `${percent}%` }} />
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(event) => onChange?.(Number(event.target.value))}
        className={css({
          position: "absolute",
          inset: 0,
          width: "full",
          height: "full",
          opacity: 0,
          margin: 0,
          cursor: disabled ? "not-allowed" : "pointer",
        })}
        {...rest}
      />
    </div>
  );
}

Slider.displayName = "Slider";
