import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { css, cx } from "../../../styled-system/css";
import { Calendar, type DateRange } from "../Calendar";
import { IconButton } from "../IconButton";
import { Input } from "../Input";
import { CalendarIcon, CloseIcon } from "../icons";
import { formatISODate } from "../Calendar/utils";

type Size = "sm" | "md" | "lg";

interface BaseProps {
  label?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  isClearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDate?: (date: Date) => boolean;
  className?: string;
}

interface SingleDatePickerProps extends BaseProps {
  isRange?: false;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

interface RangeDatePickerProps extends BaseProps {
  isRange: true;
  value?: DateRange;
  onChange?: (range: DateRange) => void;
}

export type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;

function formatValue(props: DatePickerProps): string {
  if (props.isRange) {
    const [start, end] = props.value ?? [null, null];
    if (!start) return "";
    if (!end) return formatISODate(start);
    return `${formatISODate(start)} – ${formatISODate(end)}`;
  }
  return props.value ? formatISODate(props.value) : "";
}

function hasValue(props: DatePickerProps): boolean {
  return props.isRange ? Boolean(props.value?.[0]) : Boolean(props.value);
}

export function DatePicker(props: DatePickerProps) {
  const {
    label,
    id,
    name,
    placeholder = "Select date",
    size = "md",
    disabled = false,
    invalid = false,
    errorMessage,
    isClearable = true,
    minDate,
    maxDate,
    disabledDate,
    className,
  } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleClear = () => {
    if (props.isRange) {
      props.onChange?.([null, null]);
    } else {
      props.onChange?.(null);
    }
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "Enter") {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cx(css({ position: "relative", width: "full" }), className)}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={css({
            display: "block",
            fontSize: "sm",
            fontWeight: "medium",
            color: "gray.700",
            mb: "1.5",
          })}
        >
          {label}
        </label>
      )}

      <div className={css({ position: "relative" })}>
        <Input
          id={inputId}
          name={name}
          size={size}
          invalid={invalid}
          disabled={disabled}
          readOnly
          value={formatValue(props)}
          placeholder={placeholder}
          onClick={() => !disabled && setOpen((v) => !v)}
          onKeyDown={handleTriggerKeyDown}
          aria-haspopup="dialog"
          aria-expanded={open}
          pr={isClearable && hasValue(props) ? "16" : "10"}
        />

        {isClearable && hasValue(props) && !disabled && (
          <IconButton
            aria-label="Clear date"
            icon={<CloseIcon />}
            size="xs"
            className={css({
              position: "absolute",
              top: "50%",
              right: "8",
              transform: "translateY(-50%)",
            })}
            onClick={(event) => {
              event.stopPropagation();
              handleClear();
            }}
          />
        )}

        <span
          className={css({
            position: "absolute",
            top: "50%",
            right: "3",
            transform: "translateY(-50%)",
            color: "gray.500",
            pointerEvents: "none",
            display: "flex",
          })}
        >
          <CalendarIcon />
        </span>
      </div>

      {invalid && errorMessage && (
        <p className={css({ fontSize: "xs", color: "red.500", mt: "1" })}>
          {errorMessage}
        </p>
      )}

      {open && !disabled && (
        <div
          className={css({
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            zIndex: 50,
          })}
        >
          {props.isRange ? (
            <Calendar
              isRange
              value={props.value}
              onChange={props.onChange}
              minDate={minDate}
              maxDate={maxDate}
              disabledDate={disabledDate}
            />
          ) : (
            <Calendar
              value={props.value}
              onChange={(date) => {
                props.onChange?.(date);
                setOpen(false);
              }}
              minDate={minDate}
              maxDate={maxDate}
              disabledDate={disabledDate}
            />
          )}
        </div>
      )}
    </div>
  );
}

DatePicker.displayName = "DatePicker";
