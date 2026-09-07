import { cx } from "../../../styled-system/css";
import { progress } from "../../../styled-system/recipes";

export interface ProgressProps {
  value: number;
  max?: number;
  colorScheme?: "blue" | "green" | "red";
  className?: string;
  "aria-label"?: string;
}

export function Progress({
  value,
  max = 100,
  colorScheme = "blue",
  className,
  ...rest
}: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const styles = progress({ colorScheme });

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cx(styles.track, className)}
      {...rest}
    >
      <div className={styles.bar} style={{ width: `${percent}%` }} />
    </div>
  );
}

Progress.displayName = "Progress";
