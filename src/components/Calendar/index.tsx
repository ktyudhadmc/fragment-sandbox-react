import { useMemo, useState } from "react";
import { calendar } from "../../../styled-system/recipes";
import { IconButton } from "../IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import {
  MONTH_LABELS,
  WEEKDAY_LABELS,
  addMonths,
  formatISODate,
  getMonthGrid,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinRange,
  startOfDay,
} from "./utils";

export type DateRange = [Date | null, Date | null];

interface SingleCalendarProps {
  isRange?: false;
  value?: Date | null;
  onChange?: (date: Date) => void;
}

interface RangeCalendarProps {
  isRange: true;
  value?: DateRange;
  onChange?: (range: DateRange) => void;
}

export type CalendarProps = (SingleCalendarProps | RangeCalendarProps) & {
  /** Month currently shown. Defaults to today, or the selected date/range start. */
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabledDate?: (date: Date) => boolean;
  "aria-label"?: string;
};

function getInitialMonth(props: CalendarProps): Date {
  if (props.defaultMonth) return props.defaultMonth;
  if (props.isRange) {
    if (props.value?.[0]) return props.value[0];
  } else if (props.value) {
    return props.value;
  }
  return new Date();
}

export function Calendar(props: CalendarProps) {
  const { minDate, maxDate, disabledDate } = props;
  const [viewDate, setViewDate] = useState(() => getInitialMonth(props));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const styles = calendar();
  const days = useMemo(() => getMonthGrid(viewDate), [viewDate]);

  const isDisabled = (date: Date) => {
    if (minDate && isBefore(date, minDate)) return true;
    if (maxDate && isAfter(date, maxDate)) return true;
    if (disabledDate?.(date)) return true;
    return false;
  };

  const handleSelect = (date: Date) => {
    if (isDisabled(date)) return;

    if (props.isRange) {
      const [start, end] = props.value ?? [null, null];
      if (!start || (start && end)) {
        props.onChange?.([date, null]);
      } else if (isBefore(date, start)) {
        props.onChange?.([date, start]);
      } else {
        props.onChange?.([start, date]);
      }
      return;
    }

    props.onChange?.(date);
  };

  const rangeStart = props.isRange ? (props.value?.[0] ?? null) : null;
  const rangeEnd = props.isRange ? (props.value?.[1] ?? null) : null;
  const previewEnd =
    props.isRange && rangeStart && !rangeEnd ? hoverDate : null;

  const today = startOfDay(new Date());

  return (
    <div className={styles.root} aria-label={props["aria-label"] ?? "Calendar"}>
      <div className={styles.header}>
        <IconButton
          aria-label="Previous month"
          size="xs"
          icon={<ChevronLeftIcon />}
          onClick={() => setViewDate((d) => addMonths(d, -1))}
        />
        <span className={styles.monthLabel}>
          {MONTH_LABELS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <IconButton
          aria-label="Next month"
          size="xs"
          icon={<ChevronRightIcon />}
          onClick={() => setViewDate((d) => addMonths(d, 1))}
        />
      </div>

      <div className={styles.grid}>
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className={styles.weekday}>
            {label}
          </div>
        ))}

        {days.map((date) => {
          const outside = !isSameMonth(date, viewDate);
          const isToday = isSameDay(date, today);
          const selected = props.isRange
            ? isSameDay(date, rangeStart) || isSameDay(date, rangeEnd)
            : isSameDay(date, props.value);
          const effectiveEnd = rangeEnd ?? previewEnd;
          const inRange =
            props.isRange && rangeStart && effectiveEnd
              ? isWithinRange(date, rangeStart, effectiveEnd) ||
                isWithinRange(date, effectiveEnd, rangeStart)
              : false;

          const cellStyles = calendar({
            today: isToday,
            selected,
            inRange,
          });

          return (
            <button
              key={formatISODate(date)}
              type="button"
              aria-label={formatISODate(date)}
              aria-pressed={selected}
              aria-current={isToday ? "date" : undefined}
              disabled={isDisabled(date)}
              className={
                outside
                  ? `${cellStyles.day} ${styles.dayOutside}`
                  : cellStyles.day
              }
              onClick={() => handleSelect(date)}
              onMouseEnter={() => setHoverDate(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";
