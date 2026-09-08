import { useDisclosure } from "./useDisclosure";

/** Boolean open state for a Drawer, with the same method names hatchery-frontend's useDrawer used. */
export function useDrawer(initialState = false) {
  const { isOpen, open, close, toggle } = useDisclosure(initialState);
  return {
    isExpanded: isOpen,
    openDrawer: open,
    closeDrawer: close,
    toggleDrawer: toggle,
  };
}
