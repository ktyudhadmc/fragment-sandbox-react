import { useState } from "react";
import { CatalogExample, CatalogSection } from "../CatalogSection";
import { Tooltip } from "../../components/Tooltip";
import { Popover, PopoverBody, PopoverHeader } from "../../components/Popover";
import { Modal, ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from "../../components/Modal";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader } from "../../components/Drawer";
import { Tour } from "../../components/Tour";
import { Button } from "../../components/Button";

export function OverlaySections() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <>
      <CatalogSection
        id="tooltip"
        title="Tooltip"
        description="Shows on hover/focus of its child element."
        usage={`import { Tooltip } from "@ktyudhadmc/fragment";

<Tooltip content="Saved to your account" placement="top">
  <Button variant="outline">Hover me</Button>
</Tooltip>`}
        props={[
          { name: "content", type: "ReactNode", description: "Tooltip body. Required." },
          { name: "children", type: "ReactNode", description: "The trigger element (wrapped in a span). Required." },
          { name: "placement", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Side of the trigger the tooltip appears on." },
          { name: "showDelay / hideDelay", type: "number (ms)", default: "0 / 0", description: "Delay before showing/hiding." },
        ]}
      >
        <CatalogExample>
          <Tooltip content="Saved to your account">
            <Button size="sm" variant="outline">
              Hover me
            </Button>
          </Tooltip>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="popover"
        title="Popover"
        description="Opens on trigger click; closes on outside click or Escape."
        usage={`import { Popover, PopoverHeader, PopoverBody, PopoverFooter } from "@ktyudhadmc/fragment";

<Popover trigger={<Button variant="outline">Open popover</Button>} placement="bottom-start">
  <PopoverHeader>Quick settings</PopoverHeader>
  <PopoverBody>Manage your preferences here.</PopoverBody>
</Popover>`}
        props={[
          { name: "trigger", type: "ReactElement", description: "The element that opens the popover on click. Required." },
          { name: "children", type: "ReactNode", description: "Popover content — compose with PopoverHeader/Body/Footer. Required." },
          { name: "placement", type: '"bottom-start" | "bottom-end" | "top-start" | "top-end"', default: '"bottom-start"', description: "Where the panel is anchored relative to the trigger." },
          { name: "open / onOpenChange", type: "boolean / (open: boolean) => void", description: "Optional controlled mode; omit to let Popover manage its own state." },
        ]}
      >
        <CatalogExample>
          <Popover trigger={<Button size="sm" variant="outline">Open popover</Button>}>
            <PopoverHeader>Quick settings</PopoverHeader>
            <PopoverBody>Manage your preferences here.</PopoverBody>
          </Popover>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="modal"
        title="Modal"
        usage={`import { Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@ktyudhadmc/fragment";

<Modal isOpen={isOpen} onClose={close} size="md">
  <ModalHeader>
    Confirm action
    <ModalCloseButton onClick={close} />
  </ModalHeader>
  <ModalBody>Are you sure you want to continue?</ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={close}>Cancel</Button>
    <Button onClick={confirm}>Confirm</Button>
  </ModalFooter>
</Modal>`}
        props={[
          { name: "isOpen", type: "boolean", description: "Whether the modal is rendered. Required." },
          { name: "onClose", type: "() => void", description: "Called on Escape or overlay click. Required." },
          { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: "Max width of the dialog." },
          { name: "closeOnOverlayClick", type: "boolean", default: "true", description: "Whether clicking the backdrop calls onClose." },
          { name: "closeOnEsc", type: "boolean", default: "true", description: "Whether pressing Escape calls onClose." },
        ]}
      >
        <CatalogExample>
          <Button size="sm" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <ModalHeader>
              Confirm action
              <ModalCloseButton onClick={() => setModalOpen(false)} />
            </ModalHeader>
            <ModalBody>Are you sure you want to continue?</ModalBody>
            <ModalFooter>
              <Button size="sm" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setModalOpen(false)}>
                Confirm
              </Button>
            </ModalFooter>
          </Modal>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="drawer"
        title="Drawer"
        usage={`import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "@ktyudhadmc/fragment";

<Drawer isOpen={isOpen} onClose={close} placement="right" size="md">
  <DrawerHeader>Details</DrawerHeader>
  <DrawerBody>Drawer content goes here.</DrawerBody>
  <DrawerFooter>
    <Button onClick={close}>Close</Button>
  </DrawerFooter>
</Drawer>`}
        props={[
          { name: "isOpen", type: "boolean", description: "Whether the drawer is rendered. Required." },
          { name: "onClose", type: "() => void", description: "Called on Escape or overlay click. Required." },
          { name: "placement", type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: "Edge of the screen the panel slides from." },
          { name: "size", type: '"sm" | "md" | "lg" | "full"', default: '"md"', description: "Panel width (or height for top/bottom)." },
          { name: "closeOnOverlayClick / closeOnEsc", type: "boolean", default: "true / true", description: "Dismiss behavior." },
        ]}
      >
        <CatalogExample>
          <Button size="sm" onClick={() => setDrawerOpen(true)}>
            Open drawer
          </Button>
          <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <DrawerHeader>Details</DrawerHeader>
            <DrawerBody>Drawer content goes here.</DrawerBody>
            <DrawerFooter>
              <Button size="sm" onClick={() => setDrawerOpen(false)}>
                Close
              </Button>
            </DrawerFooter>
          </Drawer>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="tour"
        title="Tour"
        description="Guided step-by-step spotlight overlay that highlights a DOM element per step."
        usage={`import { Tour } from "@ktyudhadmc/fragment";

<Tour
  isOpen={isOpen}
  onClose={close}
  steps={[
    { target: "#tour-target", title: "Welcome", content: "This button starts the tour.", placement: "bottom" },
  ]}
/>`}
        props={[
          { name: "steps", type: "{ target: string; title: string; content: string; placement?: 'top'|'bottom'|'left'|'right' }[]", description: "target is a CSS selector for the element to highlight. Required." },
          { name: "isOpen", type: "boolean", description: "Whether the tour is active. Required." },
          { name: "onClose", type: "() => void", description: "Called on Skip or Done. Required." },
        ]}
      >
        <CatalogExample>
          <Button id="tour-target" size="sm" onClick={() => setTourOpen(true)}>
            Start tour
          </Button>
          <Tour
            isOpen={tourOpen}
            onClose={() => setTourOpen(false)}
            steps={[
              { target: "#tour-target", title: "Welcome", content: "This button starts the tour." },
            ]}
          />
        </CatalogExample>
      </CatalogSection>
    </>
  );
}
