import { css } from "../../../styled-system/css";
import { StarIcon } from "../icons/StarIcon";

export interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  maxValue?: number;
  readOnly?: boolean;
  showValue?: boolean;
  className?: string;
}

export function Rating({
  value,
  onChange,
  maxValue = 5,
  readOnly = false,
  showValue = false,
  className,
}: RatingProps) {
  const stars = Array.from({ length: maxValue }, (_, i) => i + 1);

  return (
    <div
      role="radiogroup"
      aria-label="Rating"
      className={`${css({ display: "inline-flex", alignItems: "center", gap: "1" })} ${className ?? ""}`}
    >
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={star === value}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          disabled={readOnly}
          onClick={() => !readOnly && onChange?.(star)}
          className={css({
            display: "inline-flex",
            color: star <= value ? "yellow.400" : "gray.300",
            cursor: readOnly ? "default" : "pointer",
            bg: "transparent",
            border: "none",
            p: "0",
          })}
        >
          <StarIcon filled={star <= value} />
        </button>
      ))}
      {showValue && (
        <span className={css({ fontSize: "sm", color: "gray.600", ml: "1" })}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}

Rating.displayName = "Rating";
