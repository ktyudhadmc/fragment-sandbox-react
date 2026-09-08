import { css, cx } from "../../../styled-system/css";
import { IconButton } from "../IconButton";
import { Select } from "../Select";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { getPaginationRange } from "./utils";

export interface PaginationProps {
  /** Current page, 1-indexed. */
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  siblingCount?: number;
  className?: string;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 15, 25, 50, 100],
  siblingCount = 1,
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const range = getPaginationRange(page, totalPages, siblingCount);
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div
      className={cx(
        css({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "3",
          width: "full",
        }),
        className
      )}
    >
      <div className={css({ display: "flex", alignItems: "center", gap: "3" })}>
        <span className={css({ fontSize: "sm", color: "gray.600" })}>
          Showing {from}–{to} of {total}
        </span>

        {onPageSizeChange && (
          <div className={css({ width: "24" })}>
            <Select
              size="sm"
              value={String(pageSize)}
              onChange={(value) => value && onPageSizeChange(Number(value))}
              options={pageSizeOptions.map((size) => ({
                label: String(size),
                value: String(size),
              }))}
            />
          </div>
        )}
      </div>

      <div className={css({ display: "flex", alignItems: "center", gap: "1" })}>
        <IconButton
          aria-label="Previous page"
          size="sm"
          icon={<ChevronLeftIcon />}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        />

        {range.map((item, index) =>
          item === "..." ? (
            <span
              key={`dots-${index}`}
              className={css({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                w: "9",
                h: "9",
                fontSize: "sm",
                color: "gray.400",
              })}
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={css({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                w: "9",
                h: "9",
                fontSize: "sm",
                fontWeight: "medium",
                rounded: "md",
                cursor: "pointer",
                bg: item === page ? "blue.500" : "transparent",
                color: item === page ? "white" : "gray.700",
                _hover: { bg: item === page ? "blue.600" : "gray.100" },
              })}
            >
              {item}
            </button>
          )
        )}

        <IconButton
          aria-label="Next page"
          size="sm"
          icon={<ChevronRightIcon />}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        />
      </div>
    </div>
  );
}

Pagination.displayName = "Pagination";
