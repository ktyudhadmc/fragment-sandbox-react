import { useDisclosure } from "./useDisclosure";

/** Boolean open state for a Popover/menu, with the same method names hatchery-frontend's useDropdown used. */
export function useDropdown(initialState = false) {
  const { isOpen, open, close, toggle } = useDisclosure(initialState);
  return {
    isOpen,
    openDropdown: open,
    closeDropdown: close,
    toggleDropdown: toggle,
  };
}
