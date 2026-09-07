import type { ReactNode } from "react";
import { css } from "../../styled-system/css";
import { Divider } from "../components/Divider";
import { Text } from "../components/Text";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "../components/Table";

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface CatalogSectionProps {
  id: string;
  title: string;
  description?: string;
  /** Minimal code sample showing the most common usage. */
  usage?: string;
  /** Public prop reference for this component. */
  props?: PropDef[];
  children: ReactNode;
}

export function CatalogSection({
  id,
  title,
  description,
  usage,
  props,
  children,
}: CatalogSectionProps) {
  return (
    <section
      id={id}
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "3",
        pt: "8",
        scrollMarginTop: "6",
      })}
    >
      <div>
        <Text size="lg" weight="semibold" className={css({ color: "gray.900" })}>
          {title}
        </Text>
        {description && (
          <Text size="sm" colorScheme="muted" className={css({ mt: "1" })}>
            {description}
          </Text>
        )}
      </div>

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "5",
          p: "5",
          bg: "white",
          borderWidth: "1px",
          borderColor: "gray.200",
          rounded: "lg",
        })}
      >
        {children}
      </div>

      {usage && <CodeBlock code={usage} />}

      {props && props.length > 0 && <PropsTable props={props} />}

      <Divider className={css({ mt: "2" })} />
    </section>
  );
}

export interface CatalogExampleProps {
  label?: string;
  children: ReactNode;
}

export function CatalogExample({ label, children }: CatalogExampleProps) {
  return (
    <div className={css({ display: "flex", flexDirection: "column", gap: "2" })}>
      {label && (
        <Text size="xs" colorScheme="muted" weight="medium">
          {label}
        </Text>
      )}
      <div className={css({ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "3" })}>
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div>
      <Text size="xs" weight="medium" colorScheme="muted" className={css({ mb: "1.5" })}>
        Usage
      </Text>
      <pre
        className={css({
          bg: "gray.900",
          color: "gray.50",
          fontSize: "xs",
          lineHeight: "1.6",
          rounded: "md",
          p: "3",
          overflowX: "auto",
          fontFamily: "mono",
        })}
      >
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div>
      <Text size="xs" weight="medium" colorScheme="muted" className={css({ mb: "1.5" })}>
        Props
      </Text>
      <Table bordered={false} narrow>
        <TableHead>
          <TableRow isHeader>
            <TableHeadCell>Prop</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Default</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell>
                <code className={css({ fontFamily: "mono", fontSize: "xs", color: "blue.700" })}>
                  {prop.name}
                </code>
              </TableCell>
              <TableCell>
                <code className={css({ fontFamily: "mono", fontSize: "xs", color: "gray.600" })}>
                  {prop.type}
                </code>
              </TableCell>
              <TableCell>
                {prop.default ? (
                  <code className={css({ fontFamily: "mono", fontSize: "xs", color: "gray.500" })}>
                    {prop.default}
                  </code>
                ) : (
                  <span className={css({ color: "gray.300" })}>—</span>
                )}
              </TableCell>
              <TableCell className={css({ fontSize: "sm", color: "gray.600" })}>
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
