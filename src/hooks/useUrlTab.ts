import { useCallback, useEffect, useState } from "react";

const URL_TAB_CHANGE_EVENT = "fragment:url-tab-change";

function readTab(paramKey: string, validValues: readonly string[], fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const value = new URLSearchParams(window.location.search).get(paramKey);
  return value && validValues.includes(value) ? value : fallback;
}

/**
 * Router-agnostic equivalent of hatchery-frontend's useTabs — keeps the
 * active tab in sync with a `?tab=` query param using the native History API
 * (pushState + popstate), so it works without react-router or any other
 * router dependency. Falls back to `defaultTab` when the param is missing or
 * not one of `validValues`.
 */
export function useUrlTab(validValues: readonly string[], defaultTab: string, paramKey = "tab") {
  const [activeTab, setActiveTab] = useState(() => readTab(paramKey, validValues, defaultTab));

  useEffect(() => {
    const sync = () => setActiveTab(readTab(paramKey, validValues, defaultTab));

    window.addEventListener("popstate", sync);
    window.addEventListener(URL_TAB_CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(URL_TAB_CHANGE_EVENT, sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramKey, defaultTab, validValues.join("|")]);

  const setTab = useCallback(
    (tab: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set(paramKey, tab);
      window.history.pushState(null, "", url);
      window.dispatchEvent(new Event(URL_TAB_CHANGE_EVENT));
    },
    [paramKey]
  );

  return { activeTab, setTab };
}
