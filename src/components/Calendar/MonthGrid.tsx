import { useState } from "react";
import { css } from "../../../styled-system/css";
import { IconButton } from "../IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { MONTH_LABELS } from "./utils";

export interface MonthGridProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  defaultYear?: Date;
}

function isMonthDisabled(year: number, month: number, minDate?: Date, maxDate?: Date) {
  if (minDate && (year < minDate.getFullYear() || (year === minDate.getFullYear() && month < minDate.getMonth()))) {
    return true;
  }
  if (maxDate && (year > maxDate.getFullYear() || (year === maxDate.getFullYear() && month > maxDate.getMonth()))) {
    return true;
  }
  return false;
}

export function MonthGrid({ value, onChange, minDate, maxDate, defaultYear }: MonthGridProps) {
  const [year, setYear] = useState(() => (defaultYear ?? value ?? new Date()).getFullYear());

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "3",
        p: "3",
        bg: "white",
        rounded: "lg",
        borderWidth: "1px",
        borderColor: "gray.200",
        boxShadow: "md",
        minW: "64",
      })}
    >
      <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between" })}>
        <IconButton aria-label="Previous year" size="xs" icon={<ChevronLeftIcon />} onClick={() => setYear((y) => y - 1)} />
        <span className={css({ fontSize: "sm", fontWeight: "medium", color: "gray.800" })}>{year}</span>
        <IconButton aria-label="Next year" size="xs" icon={<ChevronRightIcon />} onClick={() => setYear((y) => y + 1)} />
      </div>

      <div className={css({ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2" })}>
        {MONTH_LABELS.map((label, month) => {
          const selected = value?.getFullYear() === year && value?.getMonth() === month;
          const disabled = isMonthDisabled(year, month, minDate, maxDate);

          return (
            <button
              key={label}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              onClick={() => onChange?.(new Date(year, month, 1))}
              className={css({
                py: "2",
                fontSize: "sm",
                rounded: "md",
                cursor: "pointer",
                borderWidth: "1px",
                borderColor: "transparent",
                bg: selected ? "blue.500" : "transparent",
                color: selected ? "white" : "gray.800",
                _hover: { bg: selected ? "blue.600" : "gray.100" },
                _disabled: { cursor: "not-allowed", color: "gray.300", _hover: { bg: "transparent" } },
              })}
            >
              {label.slice(0, 3)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

MonthGrid.displayName = "MonthGrid";
