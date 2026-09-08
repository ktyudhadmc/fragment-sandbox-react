import { useId, useMemo } from "react";
import ReactSelect, {
  components,
  type ClearIndicatorProps,
  type DropdownIndicatorProps,
  type MultiValue,
  type SingleValue,
  type StylesConfig,
} from "react-select";
import { token } from "../../../styled-system/tokens";
import { useFormControlContext } from "../FormControl/context";
import { ChevronDownIcon, CloseIcon } from "../icons";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

type Size = "sm" | "md" | "lg";

const SIZE_HEIGHT: Record<Size, number> = { sm: 32, md: 36, lg: 44 };
const SIZE_FONT: Record<Size, string> = { sm: "12px", md: "14px", lg: "16px" };

interface BaseProps {
  options: SelectOption[];
  placeholder?: string;
  size?: Size;
  disabled?: boolean;
  invalid?: boolean;
  isClearable?: boolean;
  /** Enables the text filter box; set false for a plain closed-list dropdown. */
  isSearchable?: boolean;
  /** Shows react-select's built-in loading spinner and swaps the "no options" message. */
  isLoading?: boolean;
  /** Fires on every keystroke in the filter box — wire this to a debounced/server-side search. */
  onInputChange?: (value: string) => void;
  /** Fires when the menu list is scrolled to the bottom — wire this to load the next page. */
  onMenuScrollToBottom?: () => void;
  noOptionsMessage?: string;
  loadingMessage?: string;
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

function toResolvedValue(props: SelectProps): SelectOption | SelectOption[] | null {
  if (props.multiple) {
    const selected = props.value ?? [];
    return props.options.filter((option) => selected.includes(option.value));
  }
  return props.options.find((option) => option.value === props.value) ?? null;
}

function buildStyles(size: Size, invalid: boolean): StylesConfig<SelectOption, boolean> {
  const height = SIZE_HEIGHT[size];

  return {
    control: (base, state) => ({
      ...base,
      minHeight: height,
      fontSize: SIZE_FONT[size],
      borderRadius: token("radii.md"),
      borderColor: invalid
        ? token("colors.red.500")
        : state.isFocused
          ? token("colors.blue.400")
          : token("colors.gray.300"),
      boxShadow: state.isFocused
        ? `0 0 0 3px ${invalid ? token("colors.red.100") : token("colors.blue.100")}`
        : "none",
      backgroundColor: state.isDisabled ? token("colors.gray.100") : token("colors.white"),
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      "&:hover": {
        borderColor: state.isDisabled
          ? token("colors.gray.300")
          : invalid
            ? token("colors.red.500")
            : token("colors.blue.400"),
      },
    }),
    valueContainer: (base) => ({ ...base, padding: "0 0.875rem" }),
    input: (base) => ({ ...base, margin: 0, padding: 0, color: token("colors.gray.800") }),
    placeholder: (base) => ({ ...base, color: token("colors.gray.400") }),
    singleValue: (base, state) => ({
      ...base,
      color: state.isDisabled ? token("colors.gray.400") : token("colors.gray.800"),
    }),
    indicatorSeparator: () => ({ display: "none" }),
    indicatorsContainer: (base) => ({ ...base, height }),
    dropdownIndicator: (base) => ({ ...base, color: token("colors.gray.500"), padding: "0 0.5rem" }),
    clearIndicator: (base) => ({ ...base, color: token("colors.gray.400"), padding: "0 0.25rem" }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: token("colors.gray.100"),
      borderRadius: token("radii.sm"),
    }),
    multiValueLabel: (base) => ({ ...base, color: token("colors.gray.700"), fontSize: SIZE_FONT[size] }),
    multiValueRemove: (base) => ({
      ...base,
      color: token("colors.gray.500"),
      ":hover": { backgroundColor: token("colors.gray.200"), color: token("colors.gray.700") },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 50,
      borderRadius: token("radii.lg"),
      boxShadow: token("shadows.md"),
      border: `1px solid ${token("colors.gray.200")}`,
      overflow: "hidden",
    }),
    menuList: (base) => ({ ...base, padding: "0.25rem" }),
    option: (base, state) => ({
      ...base,
      borderRadius: token("radii.md"),
      fontSize: SIZE_FONT[size],
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      color: state.isSelected ? token("colors.white") : token("colors.gray.800"),
      backgroundColor: state.isSelected
        ? token("colors.blue.500")
        : state.isFocused
          ? token("colors.gray.100")
          : "transparent",
      ":active": {
        backgroundColor: state.isSelected ? token("colors.blue.500") : token("colors.gray.100"),
      },
    }),
    noOptionsMessage: (base) => ({ ...base, color: token("colors.gray.400"), fontSize: SIZE_FONT[size] }),
    loadingMessage: (base) => ({ ...base, color: token("colors.gray.400"), fontSize: SIZE_FONT[size] }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };
}

function ClearIndicator({ innerProps }: ClearIndicatorProps<SelectOption, boolean>) {
  // Deliberately skip react-select's default ClearIndicator wrapper — it
  // forces aria-hidden="true" on its container, which would hide our
  // accessible name from the tree no matter what we render inside it.
  return (
    <div
      {...innerProps}
      role="button"
      aria-label="Clear selection"
      aria-hidden={undefined}
      style={{ display: "flex", alignItems: "center", padding: "0 0.25rem", cursor: "pointer" }}
    >
      <CloseIcon width={14} height={14} />
    </div>
  );
}

function DropdownIndicator(props: DropdownIndicatorProps<SelectOption, boolean>) {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon width={14} height={14} />
    </components.DropdownIndicator>
  );
}

/** A single/multi select built on react-select, so async search, infinite scroll and loading states come for free instead of being hand-rolled. */
export function Select(props: SelectProps) {
  const ctx = useFormControlContext();
  const {
    options,
    placeholder = "Select an option",
    size = "md",
    disabled = ctx?.disabled ?? false,
    invalid = ctx?.invalid ?? false,
    isClearable = false,
    isSearchable = true,
    isLoading = false,
    onInputChange,
    onMenuScrollToBottom,
    noOptionsMessage = "No options",
    loadingMessage = "Loading...",
    id,
    name,
    className,
    multiple,
    ...rest
  } = props;

  const generatedId = useId();
  const inputId = id ?? ctx?.id ?? generatedId;

  const resolvedValue = useMemo(() => toResolvedValue(props), [props]);
  const styles = useMemo(() => buildStyles(size, invalid), [size, invalid]);

  return (
    <ReactSelect<SelectOption, boolean>
      inputId={inputId}
      name={name}
      className={className}
      classNamePrefix="fragment-select"
      aria-label={rest["aria-label"]}
      placeholder={placeholder}
      options={options}
      isOptionDisabled={(option) => Boolean(option.disabled)}
      isMulti={multiple}
      isDisabled={disabled}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isLoading={isLoading}
      components={{ ClearIndicator, DropdownIndicator }}
      value={resolvedValue}
      onChange={(next) => {
        if (multiple) {
          (props as MultiSelectProps).onChange?.(
            ((next as MultiValue<SelectOption>) ?? []).map((option) => option.value)
          );
        } else {
          (props as SingleSelectProps).onChange?.((next as SingleValue<SelectOption>)?.value ?? null);
        }
      }}
      onInputChange={onInputChange ? (input) => onInputChange(input) : undefined}
      onMenuScrollToBottom={onMenuScrollToBottom}
      noOptionsMessage={() => noOptionsMessage}
      loadingMessage={() => loadingMessage}
      menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
      styles={styles}
    />
  );
}

Select.displayName = "Select";
