import { useCallback, useState } from "react";

export function useBulkSelect<T extends number | string>() {
  const [selectedIds, setSelectedIds] = useState<T[]>([]);

  const isSelected = useCallback((id: T) => selectedIds.includes(id), [selectedIds]);

  const toggleOne = useCallback((id: T) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }, []);

  const toggleAll = useCallback((ids: T[]) => {
    setSelectedIds((prev) => (prev.length === ids.length ? [] : ids));
  }, []);

  const clear = useCallback(() => setSelectedIds([]), []);

  const isAllSelected = useCallback(
    (ids: T[]) => ids.length > 0 && selectedIds.length === ids.length,
    [selectedIds]
  );

  return { selectedIds, isSelected, toggleOne, toggleAll, isAllSelected, clear };
}
