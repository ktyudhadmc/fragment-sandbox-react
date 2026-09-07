import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cx } from "../../../styled-system/css";
import { table } from "../../../styled-system/recipes";

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

export function TableRow({ children, isHeader = false }: { children: ReactNode; isHeader?: boolean }) {
  const styles = table();
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
