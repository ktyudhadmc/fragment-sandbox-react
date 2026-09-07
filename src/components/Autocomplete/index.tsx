import { useEffect, useId, useRef, useState } from "react";
import { cx } from "../../../styled-system/css";
import { selectField } from "../../../styled-system/recipes";
import { Input } from "../Input";
import { useFormControlContext } from "../FormControl/context";

export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  onInputChange?: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  emptyText?: string;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  className?: string;
}

export function Autocomplete({
  options,
  value,
  onChange,
  onInputChange,
  placeholder = "Search...",
  isLoading = false,
  emptyText = "No result found",
  disabled = false,
  invalid = false,
  id,
  className,
}: AutocompleteProps) {
  const ctx = useFormControlContext();
  const generatedId = useId();
  const inputId = id ?? ctx?.id ?? generatedId;

  const selectedOption = options.find((o) => o.value === value);
  const [query, setQuery] = useState(selectedOption?.label ?? "");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const styles = selectField({ invalid: invalid || ctx?.invalid });

  const [syncedValue, setSyncedValue] = useState(value);
  if (value !== syncedValue) {
    setSyncedValue(value);
    setQuery(selectedOption?.label ?? "");
  }

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className={cx(styles.root, className)}>
      <Input
        id={inputId}
        value={query}
        placeholder={placeholder}
        disabled={disabled || ctx?.disabled}
        invalid={invalid || ctx?.invalid}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          onInputChange?.(event.target.value);
        }}
      />

      {open && !disabled && (
        <ul role="listbox" className={styles.menu}>
          {isLoading && <li className={styles.empty}>Loading…</li>}
          {!isLoading && options.length === 0 && (
            <li className={styles.empty}>{emptyText}</li>
          )}
          {!isLoading &&
            options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                className={styles.option}
                onClick={() => {
                  onChange?.(option.value);
                  setQuery(option.label);
                  setOpen(false);
                }}
              >
                <span className={styles.optionLabel}>{option.label}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

Autocomplete.displayName = "Autocomplete";
