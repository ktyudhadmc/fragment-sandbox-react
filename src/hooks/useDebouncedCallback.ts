import { useEffect, useMemo, useRef } from "react";

export interface DebouncedFunction<Args extends unknown[]> {
  (...args: Args): void;
  cancel: () => void;
}

/**
 * Debounces a callback without pulling in lodash. The callback is kept in a
 * ref so the debounced function's identity stays stable across renders —
 * an inline arrow function passed as `callback` won't reset the pending timer.
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
): DebouncedFunction<Args> {
  const callbackRef = useRef(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debounced = useMemo(() => {
    const fn = ((...args: Args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        callbackRef.current(...args);
      }, delay);
    }) as DebouncedFunction<Args>;

    fn.cancel = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };

    return fn;
  }, [delay]);

  useEffect(() => () => debounced.cancel(), [debounced]);

  return debounced;
}
