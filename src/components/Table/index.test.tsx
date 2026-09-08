import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  Table,
  TableBody,
  TableCell,
  TableCheckboxCell,
  TableCheckboxHeadCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "./index";
import { useBulkSelect } from "../../hooks/useBulkSelect";

describe("Table", () => {
  it("renders header and body rows", () => {
    render(
      <Table>
        <TableHead>
          <TableRow isHeader>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
            <TableCell>Engineer</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Ada" })).toBeInTheDocument();
  });
});

const ROWS = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
];

function SelectableTable() {
  const bulk = useBulkSelect<number>();
  const ids = ROWS.map((r) => r.id);

  return (
    <Table>
      <TableHead>
        <TableRow isHeader>
          <TableCheckboxHeadCell
            checked={bulk.isAllSelected(ids)}
            indeterminate={bulk.selectedIds.length > 0 && !bulk.isAllSelected(ids)}
            onChange={() => bulk.toggleAll(ids)}
          />
          <TableHeadCell>Name</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ROWS.map((row) => (
          <TableRow key={row.id} selected={bulk.isSelected(row.id)}>
            <TableCheckboxCell
              checked={bulk.isSelected(row.id)}
              onChange={() => bulk.toggleOne(row.id)}
            />
            <TableCell>{row.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

describe("Table row selection (TableCheckboxCell / TableCheckboxHeadCell)", () => {
  it("toggles a single row via its checkbox", async () => {
    const user = userEvent.setup();
    render(<SelectableTable />);

    await user.click(screen.getAllByRole("checkbox", { name: "Select row" })[0]);

    expect(screen.getAllByRole("checkbox", { name: "Select row" })[0]).toBeChecked();
    expect(screen.getAllByRole("checkbox", { name: "Select row" })[1]).not.toBeChecked();
  });

  it("select-all checkbox selects and clears every row", async () => {
    const user = userEvent.setup();
    render(<SelectableTable />);

    await user.click(screen.getByRole("checkbox", { name: "Select all rows" }));

    screen.getAllByRole("checkbox", { name: "Select row" }).forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    await user.click(screen.getByRole("checkbox", { name: "Select all rows" }));

    screen.getAllByRole("checkbox", { name: "Select row" }).forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("shows the select-all checkbox as indeterminate when only some rows are selected", () => {
    const { result } = renderHook(() => useBulkSelect<number>());
    act(() => result.current.toggleOne(1));

    render(
      <Table>
        <TableHead>
          <TableRow isHeader>
            <TableCheckboxHeadCell
              checked={result.current.isAllSelected([1, 2])}
              indeterminate={result.current.selectedIds.length > 0 && !result.current.isAllSelected([1, 2])}
              onChange={() => {}}
            />
          </TableRow>
        </TableHead>
      </Table>
    );

    const checkbox = screen.getByRole("checkbox", { name: "Select all rows" }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });
});
