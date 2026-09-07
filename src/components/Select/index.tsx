import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { css, cx } from "../../../styled-system/css";
import { selectField } from "../../../styled-system/recipes";
import { IconButton } from "../IconButton";
import { ChevronDownIcon, CloseIcon } from "../icons";
import { useFormControlContext } from "../FormControl/context";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

type Size = "sm" | "md" | "lg";

interface BaseProps {
  options: SelectOption[];
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  invalid?: boolean;
  isClearable?: boolean;
  id?: string;
  name?: string;
  className?: string;
  "aria-label"?: string;
}

interface SingleSelectProps extends BaseProps {
  multiple?: false;
  value?: string | null;
  onChange?: (value: string | null) => void;
}

interface MultiSelectProps extends BaseProps {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;

function isSelected(props: SelectProps, value: string): boolean {
  return props.multiple
    ? (props.value ?? []).includes(value)
    : props.value === value;
}

export function Select(props: SelectProps) {
  const ctx = useFormControlContext();
  const {
    options,
    placeholder = "Select an option",
    size = "md",
    disabled = ctx?.disabled ?? false,
    invalid = ctx?.invalid ?? false,
    isClearable = false,
    id,
    name,
    className,
  } = props;

  const generatedId = useId();
  const triggerId = id ?? ctx?.id ?? generatedId;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOptions = useMemo(
    () => options.filter((option) => isSelected(props, option.value)),
    [options, props]
  );

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

  const commitSelect = (option: SelectOption) => {
    if (option.disabled) return;

    if (props.multiple) {
      const current = props.value ?? [];
      const next = current.includes(option.value)
        ? current.filter((v) => v !== option.value)
        : [...current, option.value];
      props.onChange?.(next);
      return;
    }

    props.onChange?.(option.value);
    setOpen(false);
  };

  const handleClear = () => {
    if (props.multiple) props.onChange?.([]);
    else props.onChange?.(null);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent) => {
    if (disabled) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
      } else if (activeIndex >= 0) {
        commitSelect(options[activeIndex]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const styles = selectField({ size, invalid });
  const hasValue = selectedOptions.length > 0;

  const displayLabel = props.multiple
    ? selectedOptions.map((o) => o.label).join(", ")
    : selectedOptions[0]?.label;

  return (
    <div ref={containerRef} className={cx(styles.root, className)}>
      <button
        type="button"
        id={triggerId}
        name={name}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={styles.trigger}
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
      >
        {hasValue ? (
          <span className={styles.valueText}>{displayLabel}</span>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}

        <span
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "1",
            flexShrink: 0,
          })}
        >
          {isClearable && hasValue && !disabled && (
            <IconButton
              aria-label="Clear selection"
              icon={<CloseIcon />}
              size="xs"
              onClick={(event) => {
                event.stopPropagation();
                handleClear();
              }}
            />
          )}
          <ChevronDownIcon
            className={css({ color: "gray.500" })}
            style={{
              transform: open ? "rotate(180deg)" : undefined,
              transition: "transform 0.15s",
            }}
          />
        </span>
      </button>

      {open && !disabled && (
        <ul role="listbox" aria-multiselectable={props.multiple} className={styles.menu}>
          {options.length === 0 && <li className={styles.empty}>No options</li>}
          {options.map((option, index) => {
            const selected = isSelected(props, option.value);
            const optionStyles = selectField({
              active: selected,
              focused: index === activeIndex,
            });

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={selected}
                aria-disabled={option.disabled}
                className={optionStyles.option}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commitSelect(option)}
              >
                <span className={optionStyles.optionLabel}>{option.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

Select.displayName = "Select";
