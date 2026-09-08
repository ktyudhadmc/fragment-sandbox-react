import { useMemo } from "react";

export interface MapInputOptionsConfig<T> {
  withCodeLabel?: boolean;
  withCode?: boolean;
  withDisabled?: boolean;
  withCustomLabel?: (item: T) => string;
  withCustomValue?: (item: T) => string | number;
  withExtraFields?: (item: T) => Record<string, unknown>;
  emptyLabel?: string;
}

export interface MappedOption {
  label: string;
  value: string | number;
  [key: string]: unknown;
}

/**
 * Maps API records (with a name/title + id) into { label, value } options
 * ready for Select/Autocomplete/SegmentedControl, with common label/value
 * overrides.
 */
export function useMapInputOptions<T extends { id?: string | number; code?: string; name?: string; title?: string; disabled?: boolean }>(
  items: T[] | undefined,
  options?: MapInputOptionsConfig<T>
): MappedOption[] {
  return useMemo(() => {
    if (!items) return [{ label: options?.emptyLabel ?? "No data found", value: "" }];

    return items.map((item) => ({
      label: options?.withCustomLabel
        ? options.withCustomLabel(item)
        : options?.withCodeLabel && item.code
          ? `(${item.code}) ${item.title ?? item.name}`
          : (item.title ?? item.name ?? ""),
      value: options?.withCustomValue ? options.withCustomValue(item) : (item.id ?? ""),
      ...(options?.withCode && { code: item.code }),
      ...(options?.withDisabled && { disabled: item.disabled }),
      ...options?.withExtraFields?.(item),
    }));
  }, [items, options]);
}
