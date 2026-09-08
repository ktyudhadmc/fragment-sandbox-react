import { css } from "../../styled-system/css";
import { Text } from "../components/Text";
import { Badge } from "../components/Badge";
import { ActionsSections } from "./sections/Actions";
import { FormsSections } from "./sections/Forms";
import { FeedbackSections } from "./sections/Feedback";
import { OverlaySections } from "./sections/Overlay";
import { NavigationSections } from "./sections/Navigation";
import { DataDisplaySections } from "./sections/DataDisplay";
import { UtilitiesSections } from "./sections/Utilities";

const NAV_GROUPS = [
  {
    label: "Actions",
    items: [
      { id: "button", label: "Button" },
      { id: "icon-button", label: "Icon Button" },
      { id: "textlink", label: "Textlink" },
    ],
  },
  {
    label: "Forms",
    items: [
      { id: "input", label: "Input" },
      { id: "textarea", label: "Textarea" },
      { id: "form-control", label: "Form Control" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio" },
      { id: "toggle", label: "Toggle" },
      { id: "select", label: "Select" },
      { id: "autocomplete", label: "Autocomplete" },
      { id: "input-tag", label: "Input Tag" },
      { id: "date-picker", label: "Date Picker" },
      { id: "slider", label: "Slider" },
      { id: "rating", label: "Rating" },
      { id: "color-picker", label: "Color Picker" },
      { id: "dropzone", label: "Dropzone" },
      { id: "segmented-control", label: "Segmented Control" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { id: "badge", label: "Badge" },
      { id: "banner", label: "Banner" },
      { id: "broadcast", label: "Broadcast" },
      { id: "toast", label: "Toast" },
      { id: "progress", label: "Progress" },
      { id: "spinner", label: "Spinner" },
      { id: "skeleton", label: "Skeleton" },
    ],
  },
  {
    label: "Overlay",
    items: [
      { id: "tooltip", label: "Tooltip" },
      { id: "popover", label: "Popover" },
      { id: "modal", label: "Modal" },
      { id: "drawer", label: "Drawer" },
      { id: "tour", label: "Tour" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { id: "tabs", label: "Tabs" },
      { id: "accordion", label: "Accordion" },
      { id: "collapse", label: "Collapse" },
      { id: "timeline", label: "Timeline" },
      { id: "carousel", label: "Carousel" },
    ],
  },
  {
    label: "Data display",
    items: [
      { id: "avatar", label: "Avatar" },
      { id: "tag", label: "Tag" },
      { id: "text", label: "Text & Divider" },
      { id: "table", label: "Table" },
      { id: "pagination", label: "Pagination" },
      { id: "chart", label: "Chart" },
      { id: "scroll-area", label: "Scroll Area" },
    ],
  },
  {
    label: "Layout & utilities",
    items: [
      { id: "layout", label: "Layout (AppShell)" },
      { id: "use-print", label: "usePrint" },
      { id: "use-export-xlsx", label: "useExportXlsx" },
      { id: "use-modal", label: "useModal / useDrawer / useDropdown" },
      { id: "use-media-query", label: "useMediaQuery" },
      { id: "use-countdown", label: "useCountdown" },
      { id: "use-debounced-callback", label: "useDebouncedCallback" },
      { id: "use-bulk-select", label: "useBulkSelect" },
      { id: "use-pagination-hook", label: "usePagination (hook)" },
      { id: "use-infinite-handler", label: "useInfiniteHandler" },
      { id: "use-map-input-options", label: "useMapInputOptions" },
      { id: "use-file-upload", label: "useFileUpload" },
      { id: "use-url-tab", label: "useUrlTab" },
    ],
  },
];

const TOTAL_COMPONENTS = NAV_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

export function Catalog() {
  return (
    <div className={css({ display: "flex", minH: "100vh", bg: "gray.50" })}>
      <aside
        className={css({
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          width: "60",
          flexShrink: 0,
          borderRightWidth: "1px",
          borderColor: "gray.200",
          bg: "white",
          px: "4",
          py: "6",
        })}
      >
        <div className={css({ mb: "6" })}>
          <Text size="lg" weight="bold" className={css({ color: "gray.900" })}>
            Fragment
          </Text>
          <Text size="xs" colorScheme="muted">
            React design system · {TOTAL_COMPONENTS} components
          </Text>
        </div>

        <nav className={css({ display: "flex", flexDirection: "column", gap: "5" })}>
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <Text
                size="xs"
                weight="semibold"
                className={css({
                  color: "gray.400",
                  textTransform: "uppercase",
                  letterSpacing: "wide",
                  mb: "2",
                })}
              >
                {group.label}
              </Text>
              <div className={css({ display: "flex", flexDirection: "column", gap: "0.5" })}>
                {group.items.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={css({
                      fontSize: "sm",
                      color: "gray.600",
                      px: "2",
                      py: "1",
                      rounded: "md",
                      textDecoration: "none",
                      _hover: { bg: "gray.100", color: "gray.900" },
                    })}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className={css({ flex: "1", px: "8", py: "6", maxW: "4xl" })}>
        <div className={css({ display: "flex", alignItems: "center", gap: "2", mb: "1" })}>
          <Text size="xl" weight="bold" className={css({ color: "gray.900" })}>
            Component catalog
          </Text>
          <Badge colorScheme="blue">v0.0.1</Badge>
        </div>
        <Text size="sm" colorScheme="muted" className={css({ mb: "6" })}>
          Live reference for every component in this library, styled to match Mekari Pixel 3.
        </Text>

        <ActionsSections />
        <FormsSections />
        <FeedbackSections />
        <OverlaySections />
        <NavigationSections />
        <DataDisplaySections />
        <UtilitiesSections />
      </main>
    </div>
  );
}
