import { useEffect, useState } from "react";

const BREAKPOINTS = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

function supportsMatchMedia(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function";
}

/** Pass a named breakpoint ("sm" | "md" | "lg" | "xl") or a raw media query string. */
export function useMediaQuery(query: Breakpoint | string): boolean {
  const resolvedQuery = query in BREAKPOINTS ? BREAKPOINTS[query as Breakpoint] : query;

  const [matches, setMatches] = useState(() => {
    if (!supportsMatchMedia()) return false;
    return window.matchMedia(resolvedQuery).matches;
  });

  useEffect(() => {
    if (!supportsMatchMedia()) return;

    const media = window.matchMedia(resolvedQuery);
    const listener = () => setMatches(media.matches);

    // Re-syncs in case `resolvedQuery` changed since the initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [resolvedQuery]);

  return matches;
}
