import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cx } from "../../../styled-system/css";
import { table } from "../../../styled-system/recipes";
import { Checkbox } from "../Checkbox";

export interface TableProps {
  children: ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
  narrow?: boolean;
  className?: string;
}

export function Table({ children, hoverable, bordered, narrow, className }: TableProps) {
  const styles = table({ hoverable, bordered, narrow });

  return (
    <div className={styles.container}>
      <table className={cx(styles.root, className)}>{children}</table>
    </div>
  );
}

Table.displayName = "Table";

export function TableHead({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export interface TableRowProps {
  children: ReactNode;
  isHeader?: boolean;
  /** Highlights the row (e.g. when it's part of a bulk selection). */
  selected?: boolean;
}

export function TableRow({ children, isHeader = false, selected = false }: TableRowProps) {
  const styles = table({ selected });
  return <tr className={isHeader ? styles.headRow : styles.row}>{children}</tr>;
}

export function TableHeadCell({ children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  const styles = table();
  return (
    <th className={styles.headCell} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  const styles = table();
  return (
    <td className={styles.cell} {...props}>
      {children}
    </td>
  );
}

export interface TableCheckboxHeadCellProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  "aria-label"?: string;
}

/**
 * "Select all" header cell — pairs with useBulkSelect:
 * `checked={isAllSelected(ids)} onChange={() => toggleAll(ids)}`.
 */
export function TableCheckboxHeadCell({
  checked,
  indeterminate = false,
  onChange,
  "aria-label": ariaLabel = "Select all rows",
}: TableCheckboxHeadCellProps) {
  const styles = table();
  return (
    <th className={styles.checkboxCell}>
      <Checkbox
        aria-label={ariaLabel}
        checked={checked}
        indeterminate={indeterminate}
        onChange={onChange}
      />
    </th>
  );
}

TableCheckboxHeadCell.displayName = "TableCheckboxHeadCell";

export interface TableCheckboxCellProps {
  checked: boolean;
  onChange: () => void;
  "aria-label"?: string;
}

/**
 * Row-selection checkbox cell — pairs with useBulkSelect:
 * `checked={isSelected(row.id)} onChange={() => toggleOne(row.id)}`.
 */
export function TableCheckboxCell({
  checked,
  onChange,
  "aria-label": ariaLabel = "Select row",
}: TableCheckboxCellProps) {
  const styles = table();
  return (
    <td className={styles.checkboxCell}>
      <Checkbox aria-label={ariaLabel} checked={checked} onChange={onChange} />
    </td>
  );
}

TableCheckboxCell.displayName = "TableCheckboxCell";
