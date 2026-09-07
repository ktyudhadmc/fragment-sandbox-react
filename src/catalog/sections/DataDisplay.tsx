import { useState } from "react";
import { CatalogExample, CatalogSection } from "../CatalogSection";
import { Avatar } from "../../components/Avatar";
import { Tag } from "../../components/Tag";
import { Text } from "../../components/Text";
import { Divider } from "../../components/Divider";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "../../components/Table";
import { Chart } from "../../components/Chart";
import { ScrollArea } from "../../components/ScrollArea";
import { css } from "../../../styled-system/css";

const PEOPLE = [
  { name: "Ada Lovelace", role: "Engineer" },
  { name: "Grace Hopper", role: "Engineer" },
  { name: "Alan Turing", role: "Researcher" },
];

export function DataDisplaySections() {
  const [tags, setTags] = useState(["react", "panda-css", "design-system"]);

  return (
    <>
      <CatalogSection
        id="avatar"
        title="Avatar"
        description="Shows an image, falling back to initials derived from name if the image is missing or fails to load."
        usage={`import { Avatar } from "@ktyudhadmc/fragment";

<Avatar name="Ada Lovelace" size="md" />
<Avatar src="/user.jpg" name="Ada Lovelace" size="md" />`}
        props={[
          { name: "name", type: "string", description: "Used for the alt text and, when there's no image, the initials shown." },
          { name: "src", type: "string", description: "Image URL; falls back to initials if omitted or if it fails to load." },
          { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Diameter of the avatar." },
          { name: "shape", type: '"circle" | "square"', default: '"circle"', description: "Border radius." },
        ]}
      >
        <CatalogExample>
          <Avatar name="Ada Lovelace" size="sm" />
          <Avatar name="Grace Hopper" size="md" />
          <Avatar name="Alan Turing" size="lg" shape="square" />
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="tag"
        title="Tag"
        usage={`import { Tag } from "@ktyudhadmc/fragment";

<Tag colorScheme="blue" onRemove={() => removeTag("react")}>react</Tag>`}
        props={[
          { name: "children", type: "ReactNode", description: "Tag label. Required." },
          { name: "colorScheme", type: '"gray" | "blue" | "green" | "red" | "yellow"', default: '"gray"', description: "Background/text color pairing." },
          { name: "onRemove", type: "() => void", description: "If provided, shows a remove (×) button that calls this." },
        ]}
      >
        <CatalogExample>
          {tags.map((tag) => (
            <Tag key={tag} colorScheme="blue" onRemove={() => setTags((t) => t.filter((x) => x !== tag))}>
              {tag}
            </Tag>
          ))}
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="text"
        title="Text & Divider"
        usage={`import { Text, Divider } from "@ktyudhadmc/fragment";

<Text size="lg" weight="semibold">Heading text</Text>
<Text size="sm" colorScheme="muted">Muted supporting text</Text>
<Divider />`}
        props={[
          { name: "Text.size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Font size." },
          { name: "Text.weight", type: '"regular" | "medium" | "semibold" | "bold"', default: '"regular"', description: "Font weight." },
          { name: "Text.colorScheme", type: '"default" | "muted" | "danger" | "success"', default: '"default"', description: "Text color." },
          { name: "Divider.orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Line direction; vertical requires a sized parent." },
        ]}
      >
        <CatalogExample>
          <div className={css({ display: "flex", flexDirection: "column", gap: "1" })}>
            <Text size="lg" weight="semibold">
              Heading text
            </Text>
            <Text size="sm" colorScheme="muted">
              Muted supporting text
            </Text>
            <Divider className={css({ my: "2" })} />
            <Text size="sm" colorScheme="danger">
              Danger text
            </Text>
          </div>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="table"
        title="Table"
        usage={`import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableCell } from "@ktyudhadmc/fragment";

<Table hoverable>
  <TableHead>
    <TableRow isHeader>
      <TableHeadCell>Name</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Ada Lovelace</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
        props={[
          { name: "hoverable", type: "boolean", default: "true", description: "Highlights rows on hover." },
          { name: "bordered", type: "boolean", default: "false", description: "Adds a border around every cell." },
          { name: "narrow", type: "boolean", default: "false", description: "Reduces cell vertical padding." },
          { name: "TableRow.isHeader", type: "boolean", default: "false", description: "Applies the header row background — set on the row inside TableHead." },
        ]}
      >
        <CatalogExample>
          <Table hoverable>
            <TableHead>
              <TableRow isHeader>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Role</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PEOPLE.map((person) => (
                <TableRow key={person.name}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="chart"
        title="Chart"
        description="Wraps ApexCharts. Install apexcharts and react-apexcharts (optional peer dependencies) to use it."
        usage={`import { Chart } from "@ktyudhadmc/fragment";

<Chart
  type="area"
  height={220}
  series={[{ name: "Revenue", data: [30, 45, 28, 60, 50, 72] }]}
  categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
/>`}
        props={[
          { name: "type", type: '"line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "heatmap"', description: "Chart type. Required." },
          { name: "series", type: "{ name: string; data: number[] }[] | number[]", description: "Chart data. Required." },
          { name: "categories", type: "string[]", description: "X-axis labels for axis-based chart types." },
          { name: "height / width", type: "number | string", default: "320 / \"100%\"", description: "Chart dimensions." },
          { name: "colors", type: "string[]", description: "Series colors; defaults to this library's palette." },
          { name: "stacked", type: "boolean", default: "false", description: "Stacks series for bar/area charts." },
          { name: "showLegend", type: "boolean", default: "true", description: "Toggles the legend." },
          { name: "options", type: "ApexOptions", description: "Raw ApexCharts options, merged on top of the defaults for full control." },
        ]}
      >
        <CatalogExample>
          <div style={{ width: 400 }}>
            <Chart
              type="area"
              height={220}
              series={[{ name: "Revenue", data: [30, 45, 28, 60, 50, 72] }]}
              categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
            />
          </div>
        </CatalogExample>
      </CatalogSection>

      <CatalogSection
        id="scroll-area"
        title="Scroll Area"
        description="A plain scrollable container styled with a slim, theme-matched scrollbar (Panda recipe, not a JS scroll engine)."
        usage={`import { ScrollArea } from "@ktyudhadmc/fragment";

<ScrollArea direction="vertical" style={{ height: 200 }}>
  {longContent}
</ScrollArea>`}
        props={[
          { name: "direction", type: '"vertical" | "horizontal" | "both"', default: '"both"', description: "Which axis is allowed to scroll." },
          { name: "...rest", type: "HTMLStyledProps<'div'>", description: "Any native div attribute or Panda style prop — set a height/width to make it scroll." },
        ]}
      >
        <CatalogExample>
          <ScrollArea style={{ height: 100, width: 240 }}>
            <div style={{ height: 280, padding: 8 }}>
              Scrollable content that overflows the container height.
            </div>
          </ScrollArea>
        </CatalogExample>
      </CatalogSection>
    </>
  );
}
