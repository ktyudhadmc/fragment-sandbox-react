import { useDisclosure } from "./useDisclosure";

/** Boolean open state for a Modal, with the same method names hatchery-frontend's useModal used. */
export function useModal(initialState = false) {
  const { isOpen, open, close, toggle } = useDisclosure(initialState);
  return { isOpen, openModal: open, closeModal: close, toggleModal: toggle };
}
