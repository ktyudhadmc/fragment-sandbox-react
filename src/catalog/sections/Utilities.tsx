import { useRef, useState } from "react";
import { CatalogExample, CatalogSection } from "../CatalogSection";
import { AppShell, Sidebar, Topbar } from "../../components/Layout";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Input } from "../../components/Input";
import { Text } from "../../components/Text";
import { Modal, ModalBody, ModalHeader, ModalCloseButton } from "../../components/Modal";
import { useModal } from "../../hooks/useModal";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useCountdown } from "../../hooks/useCountdown";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";
import { useBulkSelect } from "../../hooks/useBulkSelect";
import { usePagination } from "../../hooks/usePagination";
import { css } from "../../../styled-system/css";

const ROWS = [
  { id: 1, name: "Invoice #1001" },
  { id: 2, name: "Invoice #1002" },
  { id: 3, name: "Invoice #1003" },
];

function DemoSidebarNav() {
  const linkStyle = css({
    display: "block",
    fontSize: "sm",
    color: "gray.600",
    px: "3",
    py: "2",
    rounded: "md",
    textDecoration: "none",
    _hover: { bg: "gray.100" },
  });

  return (
    <div className={css({ display: "flex", flexDirection: "column", gap: "1" })}>
      <a href="#" className={linkStyle}>Dashboard</a>
      <a href="#" className={linkStyle}>Orders</a>
      <a href="#" className={linkStyle}>Settings</a>
    </div>
  );
}

export function UtilitiesSections() {
  const printRef = useRef<HTMLDivElement>(null);
  const demoModal = useModal();
  const isMdUp = useMediaQuery("md");
  const countdown = useCountdown({ duration: 90 });
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debouncedSetQuery = useDebouncedCallback(setDebouncedQuery, 400);
  const bulkSelect = useBulkSelect<number>();
  const pagination = usePagination(5);

  return (
    <>
      <CatalogSection
        id="layout"
        title="Layout (AppShell / Sidebar / Topbar)"
        description="Sidebar + Topbar + content shell with a collapsible/mobile-off-canvas sidebar, modeled after hatchery-frontend's SidebarContext pattern."
        usage={`import { AppShell, Sidebar, Topbar, SidebarProvider, useSidebar } from "@ktyudhadmc/fragment";

<AppShell
  sidebar={
    <Sidebar logo={<Logo />}>
      <a href="/dashboard">Dashboard</a>
      <a href="/orders">Orders</a>
    </Sidebar>
  }
  topbar={<Topbar><UserMenu /></Topbar>}
>
  <Page />
</AppShell>

// or compose manually with the provider + hook:
<SidebarProvider defaultExpanded>
  <MyCustomChrome /> {/* can call useSidebar() anywhere inside */}
</SidebarProvider>`}
        props={[
          { name: "AppShell.sidebar", type: "ReactElement", description: "Your <Sidebar> element. Required." },
          { name: "AppShell.topbar", type: "ReactElement", description: "Your <Topbar> element." },
          { name: "AppShell.sidebarProps", type: "{ defaultExpanded?, mobileBreakpoint? }", description: "Forwarded to the internal SidebarProvider." },
          { name: "Sidebar.logo / Sidebar.footer", type: "ReactNode", description: "Slots rendered above/below the nav children." },
          { name: "Sidebar.expandedWidth / collapsedWidth", type: "number (px)", default: "260 / 80", description: "Panel width in each state." },
          { name: "Topbar.children", type: "ReactNode", description: "Right-aligned content (search, notifications, user menu, ...)." },
          { name: "useSidebar()", type: "() => SidebarContextValue", description: "Access isExpanded/isMobileOpen/isHovered and their toggle functions from any descendant of SidebarProvider/AppShell." },
        ]}
      >
        <CatalogExample>
          <div
            className={css({
              position: "relative",
              width: "full",
              maxW: "2xl",
              height: "72",
              overflow: "hidden",
              borderWidth: "1px",
              borderColor: "gray.200",
              rounded: "lg",
            })}
            // A transform creates a containing block for fixed-position
            // descendants, so AppShell's fixed Sidebar/Topbar stay inside
            // this preview box instead of pinning to the real viewport.
            style={{ transform: "translate(0)" }}
          >
            <div className={css({ position: "absolute", inset: 0 })}>
              <AppShell
                sidebar={
                  <Sidebar logo={<strong>Fragment</strong>} expandedWidth={200} collapsedWidth={64}>
                    <DemoSidebarNav />
                  </Sidebar>
                }
                topbar={<Topbar>Welcome back</Topbar>}
              >
                <p className={css({ fontSize: "sm", color: "gray.600" })}>
                  Page content sits here. Click the hamburger icon in the topbar to collapse the sidebar.
                </p>
              </AppShell>
            </div>
          </div>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-print"
        title="usePrint"
        description="Wraps react-to-print (optional peer dependency) to print a specific region of the page."
        usage={`import { usePrint } from "@ktyudhadmc/fragment";

const { contentRef, print, orientation, setOrientation } = usePrint({
  documentTitle: "Invoice #1024",
  pageSize: "A4",
});

<div ref={contentRef}>{invoiceMarkup}</div>
<Button onClick={() => print()}>Print</Button>`}
        props={[
          { name: "documentTitle", type: "string", default: '"Document"', description: "Title used for the print job / saved PDF file name." },
          { name: "orientation", type: '"portrait" | "landscape"', default: '"portrait"', description: "Initial @page orientation; setOrientation updates it." },
          { name: "margin", type: "string", default: '"10mm"', description: "@page margin." },
          { name: "pageSize", type: "string", default: '"A4"', description: "@page size, e.g. \"A4\", \"Letter\"." },
          { name: "returns.contentRef", type: "RefObject<HTMLDivElement>", description: "Attach to the element you want printed." },
          { name: "returns.print", type: "() => void", description: "Call to open the print dialog for contentRef's content." },
        ]}
      >
        <CatalogExample>
          <div ref={printRef} className={css({ fontSize: "sm", color: "gray.700" })}>
            Invoice #1024 — this region would be sent to the printer.
          </div>
          <Button size="sm" variant="outline" disabled>
            Print (requires react-to-print)
          </Button>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-export-xlsx"
        title="useExportXlsx"
        description="Wraps xlsx (optional peer dependency) to export an HTML <table> to a downloadable .xlsx file."
        usage={`import { useExportXlsx } from "@ktyudhadmc/fragment";
import { Table } from "@ktyudhadmc/fragment";

const { tableRef, exportXlsx } = useExportXlsx("sales-report");

<table ref={tableRef}>{...}</table>
<Button onClick={exportXlsx}>Export to Excel</Button>`}
        props={[
          { name: "fileName", type: "string", description: "Downloaded file is named `${fileName}.xlsx`. Required." },
          { name: "returns.tableRef", type: "RefObject<HTMLTableElement>", description: "Attach to the <table> element to export." },
          { name: "returns.exportXlsx", type: "() => void", description: "Converts the referenced table and triggers the download." },
        ]}
      >
        <CatalogExample>
          <Button size="sm" variant="outline" disabled>
            Export to Excel (requires xlsx)
          </Button>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-modal"
        title="useModal / useDrawer / useDropdown"
        description="Three thin, differently-named wrappers around the same open/close/toggle boolean state (useDisclosure), matching hatchery-frontend's hook names so a boolean-state hook always reads as what it's driving."
        usage={`import { useModal, useDrawer, useDropdown, useDisclosure } from "@ktyudhadmc/fragment";

const { isOpen, openModal, closeModal, toggleModal } = useModal();
const { isExpanded, openDrawer, closeDrawer, toggleDrawer } = useDrawer();
const { isOpen, openDropdown, closeDropdown, toggleDropdown } = useDropdown();

// or use the shared primitive directly under your own names:
const { isOpen, open, close, toggle } = useDisclosure();`}
        props={[
          { name: "initialState", type: "boolean", default: "false", description: "Starting open state (same param on all four hooks)." },
          { name: "useModal → isOpen, openModal, closeModal, toggleModal", type: "", description: "" },
          { name: "useDrawer → isExpanded, openDrawer, closeDrawer, toggleDrawer", type: "", description: "" },
          { name: "useDropdown → isOpen, openDropdown, closeDropdown, toggleDropdown", type: "", description: "" },
          { name: "useDisclosure → isOpen, open, close, toggle", type: "", description: "The shared primitive the other three are built on." },
        ]}
      >
        <CatalogExample>
          <Button size="sm" onClick={demoModal.openModal}>
            Open modal via useModal()
          </Button>
          <Modal isOpen={demoModal.isOpen} onClose={demoModal.closeModal} size="sm">
            <ModalHeader>
              Hi there
              <ModalCloseButton onClick={demoModal.closeModal} />
            </ModalHeader>
            <ModalBody>Driven entirely by useModal()'s isOpen/closeModal.</ModalBody>
          </Modal>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-media-query"
        title="useMediaQuery"
        description="Reactive matchMedia state — pass a named breakpoint or a raw media query string."
        usage={`import { useMediaQuery } from "@ktyudhadmc/fragment";

const isMdUp = useMediaQuery("md"); // (min-width: 768px)
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");`}
        props={[
          { name: "query", type: '"sm" | "md" | "lg" | "xl" | string', description: "A named breakpoint (sm=640px, md=768px, lg=1024px, xl=1280px, min-width) or any raw media query." },
          { name: "returns", type: "boolean", description: "Whether the query currently matches; updates live on resize/scheme change." },
        ]}
      >
        <CatalogExample>
          <Text size="sm">
            Viewport is currently <strong>{isMdUp ? "≥ 768px (md)" : "< 768px"}</strong>
          </Text>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-countdown"
        title="useCountdown"
        description="Ticks down from a fixed duration or to a target date, once per second."
        usage={`import { useCountdown } from "@ktyudhadmc/fragment";

const { minutes, seconds, isFinished, reset } = useCountdown({ duration: 90 });
// or: useCountdown({ targetDate: "2026-12-31T00:00:00" })`}
        props={[
          { name: "options", type: '{ duration: number } | { targetDate: string | Date }', description: "Either a fixed number of seconds, or an absolute date to count down to." },
          { name: "returns", type: "{ totalSeconds, days, hours, minutes, seconds, isFinished, reset }", description: "reset() restarts the countdown from its original duration/targetDate." },
        ]}
      >
        <CatalogExample>
          <Text size="sm">
            {String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
            {countdown.isFinished && " — done!"}
          </Text>
          <Button size="xs" variant="outline" onClick={countdown.reset}>
            Reset
          </Button>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-debounced-callback"
        title="useDebouncedCallback"
        description="Debounces a callback without a lodash dependency; always invokes the latest callback/args when the delay elapses, and exposes .cancel()."
        usage={`import { useDebouncedCallback } from "@ktyudhadmc/fragment";

const debouncedSearch = useDebouncedCallback((query: string) => {
  fetchResults(query);
}, 400);

<Input onChange={(e) => debouncedSearch(e.target.value)} />`}
        props={[
          { name: "callback", type: "(...args) => void", description: "Function to debounce. Required." },
          { name: "delay", type: "number (ms)", description: "Debounce delay. Required." },
          { name: "returns", type: "DebouncedFunction", description: "Call it like the original function; call .cancel() to drop a pending invocation." },
        ]}
      >
        <CatalogExample>
          <Input
            size="sm"
            placeholder="Type to search..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              debouncedSetQuery(event.target.value);
            }}
          />
          <Text size="xs" colorScheme="muted">
            Debounced value: "{debouncedQuery}"
          </Text>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-bulk-select"
        title="useBulkSelect"
        description="Row-selection state for a Table — track selected ids, toggle one/all, and check select-all state."
        usage={`import { useBulkSelect } from "@ktyudhadmc/fragment";

const { selectedIds, isSelected, toggleOne, toggleAll, isAllSelected, clear } = useBulkSelect<number>();

<Checkbox checked={isAllSelected(rowIds)} onChange={() => toggleAll(rowIds)} />
<Checkbox checked={isSelected(row.id)} onChange={() => toggleOne(row.id)} />`}
        props={[
          { name: "selectedIds", type: "T[]", description: "Currently selected ids." },
          { name: "isSelected(id)", type: "(id: T) => boolean", description: "" },
          { name: "toggleOne(id)", type: "(id: T) => void", description: "" },
          { name: "toggleAll(ids)", type: "(ids: T[]) => void", description: "Selects all ids, or clears if all are already selected." },
          { name: "isAllSelected(ids)", type: "(ids: T[]) => boolean", description: "" },
          { name: "clear()", type: "() => void", description: "" },
        ]}
      >
        <CatalogExample>
          <div className={css({ display: "flex", flexDirection: "column", gap: "2" })}>
            <Checkbox
              label="Select all"
              checked={bulkSelect.isAllSelected(ROWS.map((r) => r.id))}
              onChange={() => bulkSelect.toggleAll(ROWS.map((r) => r.id))}
            />
            {ROWS.map((row) => (
              <Checkbox
                key={row.id}
                label={row.name}
                checked={bulkSelect.isSelected(row.id)}
                onChange={() => bulkSelect.toggleOne(row.id)}
              />
            ))}
            <Text size="xs" colorScheme="muted">
              Selected: {bulkSelect.selectedIds.join(", ") || "none"}
            </Text>
          </div>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-pagination-hook"
        title="usePagination (hook)"
        description="Imperative page-number state — the counterpart to the visual <Pagination> component, for when you'd rather manage the page yourself."
        usage={`import { usePagination } from "@ktyudhadmc/fragment";

const { currentPage, goNextPage, goPrevPage, goPageNum, resetPage } = usePagination(maxPageNum);`}
        props={[
          { name: "maxPageNum", type: "number", description: "Last valid page number. Required." },
          { name: "returns.currentPage", type: "number", description: "" },
          { name: "returns.goNextPage / goPrevPage", type: "() => void", description: "No-ops past the first/last page." },
          { name: "returns.goPageNum(page)", type: "(page: number) => void", description: "" },
          { name: "returns.resetPage()", type: "() => void", description: "Back to page 1." },
        ]}
      >
        <CatalogExample>
          <Button size="xs" variant="outline" onClick={pagination.goPrevPage}>
            Prev
          </Button>
          <Text size="sm">Page {pagination.currentPage} / 5</Text>
          <Button size="xs" variant="outline" onClick={pagination.goNextPage}>
            Next
          </Button>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-infinite-handler"
        title="useInfiniteHandler"
        description="Accumulates page-number API responses into one flat list for 'Load more' / infinite-scroll UIs — page 1 replaces the list, later pages append."
        usage={`import { useInfiniteHandler } from "@ktyudhadmc/fragment";

const { list, hasMore, loadMore, reset } = useInfiniteHandler({
  data: response?.data,
  pagination: response?.meta, // { current_page, last_page }
  loading,
  setPageNum,
});`}
        props={[
          { name: "data", type: "T[] | undefined", description: "Latest fetched page." },
          { name: "pagination", type: "{ current_page: number; last_page: number }", description: "" },
          { name: "loading", type: "boolean", description: "Prevents loadMore from firing a duplicate request." },
          { name: "setPageNum", type: "(page: number) => void", description: "Your fetch trigger — called with the next page number." },
          { name: "returns", type: "{ list, hasMore, loadMore, reset }", description: "" },
        ]}
      >
        <CatalogExample>
          <Text size="sm" colorScheme="muted">
            State-accumulation hook — see the usage snippet above; wire `data`/`pagination` to your fetch hook's response.
          </Text>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-map-input-options"
        title="useMapInputOptions"
        description="Maps API records (id/name or title, optional code) into { label, value } options ready for Select/Autocomplete/SegmentedControl."
        usage={`import { useMapInputOptions } from "@ktyudhadmc/fragment";

const options = useMapInputOptions(customers, {
  withCodeLabel: true, // "(C001) Acme Inc."
});

<Select options={options} value={value} onChange={setValue} />`}
        props={[
          { name: "items", type: "T[] | undefined", description: "Records with at least an id and name/title." },
          { name: "options.withCodeLabel", type: "boolean", description: 'Renders label as "(code) name".' },
          { name: "options.withCode / withDisabled", type: "boolean", description: "Copies item.code / item.disabled onto the option." },
          { name: "options.withCustomLabel / withCustomValue", type: "(item: T) => string | number", description: "Full override of label/value." },
          { name: "options.withExtraFields", type: "(item: T) => Record<string, unknown>", description: "Merge extra fields onto each option." },
          { name: "options.emptyLabel", type: "string", default: '"No data found"', description: "Placeholder option's label when items is undefined." },
        ]}
      >
        <CatalogExample>
          <Text size="sm" colorScheme="muted">
            Pure data-mapping hook — no visual output. See the usage snippet.
          </Text>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-file-upload"
        title="useFileUpload"
        description="Wraps react-dropzone (optional peer dependency) for the common single-file-with-preview case, powering a custom drop area."
        usage={`import { useFileUpload } from "@ktyudhadmc/fragment";

const { getRootProps, getInputProps, isDragActive, file, error, onRemove, openPreview } =
  useFileUpload({ accept: { "image/*": [] } });

<div {...getRootProps()}>
  <input {...getInputProps()} />
  {file ? <img src={file.preview} /> : "Drop an image"}
</div>`}
        props={[
          { name: "options", type: "DropzoneOptions", description: "Any react-dropzone option (accept, maxSize, ...); maxFiles defaults to 1 and noClick to true." },
          { name: "returns.file", type: "{ preview, file, name } | null", description: "preview is an object URL, auto-revoked on removal/unmount." },
          { name: "returns.onRemove", type: "() => void", description: "Clears the file and revokes its preview URL." },
          { name: "returns.openPreview", type: "() => void", description: "Opens the preview URL in a new tab." },
          { name: "returns.getRootProps / getInputProps / isDragActive / open", type: "", description: "Passed straight through from react-dropzone." },
        ]}
      >
        <CatalogExample>
          <Text size="sm" colorScheme="muted">
            Requires react-dropzone at runtime — see the usage snippet above.
          </Text>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="use-url-tab"
        title="useUrlTab"
        description="Router-agnostic equivalent of hatchery-frontend's useTabs — keeps the active tab in a `?tab=` query param using the native History API (no react-router dependency)."
        usage={`import { useUrlTab } from "@ktyudhadmc/fragment";

const { activeTab, setTab } = useUrlTab(["active", "archived"], "active");

<Tabs value={activeTab} onChange={setTab}>...</Tabs>`}
        props={[
          { name: "validValues", type: "readonly string[]", description: "Accepted tab values. Required." },
          { name: "defaultTab", type: "string", description: "Used when the URL param is missing or not in validValues. Required." },
          { name: "paramKey", type: "string", default: '"tab"', description: "Query param name to read/write." },
          { name: "returns", type: "{ activeTab, setTab }", description: "setTab(value) pushes a new URL via history.pushState and updates activeTab." },
        ]}
      >
        <CatalogExample>
          <Text size="sm" colorScheme="muted">
            URL-syncing hook — see the usage snippet above; pair it with Tabs' value/onChange.
          </Text>
        </CatalogExample>
      </CatalogSection>
    </>
  );
}
